```ts
<template>
  <div class="ai-container">
    <div
      style="
        height: 80%;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 12px;
      "
    >
      <Welcome
        v-if="list.length === 0"
        title="有什么可以帮到你？ 😄"
        variant="borderless"
        :style="{ background: bgColor }"
      />

      <BubbleList :list="list" max-height="350px" class="bubble-list" />
    </div>

    <EditorSender
      ref="senderRef"
      placeholder="💌 请输入您的想法"
      @submit="sendStreamRequest"
      :loading="EditorSenderLoading"
    />
  </div>
</template>

<script setup lang="ts">
import {
  EditorSender,
  useXStream,
  BubbleList,
  Welcome,
} from "vue-element-plus-x";
import type { SubmitResult } from "vue-element-plus-x/types/EditorSender";
import type {
  BubbleListItemProps,
  BubbleListProps,
} from "vue-element-plus-x/types/BubbleList";
import { v4 as uuidv4 } from "uuid";

type listType = BubbleListItemProps & {
  key: string;
  role: "user" | "ai";
};

const { startStream, cancel, data, error, isLoading } = useXStream();
const avatarAI =
  "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png";
const avatarUser =
  "https://foruda.gitee.com/avatar/1676366952875849306/10728918_ma-sining_1676366952.png";
const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";
const API_KEY = "sk-"; // 请替换为实际的 API Key
const bgColor = ref(
  "linear-gradient(97deg, rgba(90,196,255,0.12) 0%, rgba(174,136,255,0.12) 100%)"
);

const EditorSenderLoading = ref(false);
const senderRef = ref();
const list = ref<BubbleListProps<listType>["list"]>([]);
const streamResult = ref(""); // 存储流式返回的结果
let aiBubble: listType | null = null; // 存储AI气泡的引用

// 生成气泡项
function generateFakeItems(isRoleAi: boolean, content: string = ""): listType {
  const role = isRoleAi ? "ai" : "user";
  const placement = role === "ai" ? "start" : "end";
  const key = uuidv4();
  const shape = "corner";
  const variant = role === "ai" ? "filled" : "outlined";
  const isMarkdown = role === "ai"; // AI回复使用markdown渲染
  const typing = false; // 初始不开启打字效果，后面单独处理
  const avatar = role === "ai" ? avatarAI : avatarUser;

  return {
    key,
    role,
    placement,
    content,
    loading: role === "ai", // AI气泡初始显示加载状态
    shape,
    variant,
    isMarkdown,
    typing,
    isFog: role === "ai",
    avatar,
    avatarSize: "24px",
    avatarGap: "12px",
  };
}

// 更新AI气泡内容
function updateAIBubbleContent(content: string) {
  if (aiBubble) {
    // 找到列表中的AI气泡并更新
    const index = list.value.findIndex(
      (item: listType) => item.key === aiBubble!.key
    );
    if (index !== -1) {
      list.value[index] = {
        ...list.value[index],
        content,
        loading: false,
        typing: true, // 开启打字效果
      };
      // 创建一个新数组触发响应式更新
      list.value = [...list.value];
    }
  }
}

// 处理流式响应的核心方法
async function sendStreamRequest(value: SubmitResult) {
  if (!value.text.trim()) return;

  EditorSenderLoading.value = true;
  senderRef.value?.clear(); // 输入框清空
  streamResult.value = ""; // 清空历史结果

  // 添加用户消息
  const userBubble = generateFakeItems(false, value.text);
  list.value.push(userBubble);

  // 添加AI消息（初始为加载状态）
  aiBubble = generateFakeItems(true, "");
  list.value.push(aiBubble);

  // 滚动到底部
  setTimeout(() => {
    const container = document.querySelector(".ai-container > div");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, 100);

  try {
    // 1. 使用fetch发送流式请求
    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "You are a helpful assistant" },
          ...list.value
            .filter(
              (item: listType) => item.role === "user" || item.role === "ai"
            )
            .map((item: listType) => ({
              role: item.role === "user" ? "user" : "assistant",
              content: item.content,
            })),
        ],
        max_tokens: 1024,
        temperature: 0.2,
        stream: true, // 开启流式
      }),
    });

    if (!response.ok) {
      throw new Error(`请求失败：${response.status} ${response.statusText}`);
    }

    // 2. 获取标准的ReadableStream实例
    const readableStream = response.body;
    if (!readableStream) {
      throw new Error("响应体无流式数据");
    }

    // 3. 创建自定义的ReadableStream处理器
    const decoder = new TextDecoder();
    const customStream = new ReadableStream({
      async start(controller) {
        const reader = readableStream.getReader();

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              // 流结束
              controller.enqueue("[DONE]");
              break;
            }

            // 解码数据
            const chunk = decoder.decode(value);

            // 按行分割（SSE格式）
            const lines = chunk.split("\n");

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6);

                if (data === "[DONE]") {
                  controller.enqueue("[DONE]");
                  continue;
                }

                try {
                  const parsed = JSON.parse(data);
                  if (parsed.choices?.[0]?.delta?.content) {
                    // 拼接内容
                    streamResult.value += parsed.choices[0].delta.content;
                    // 实时更新气泡内容
                    updateAIBubbleContent(streamResult.value);

                    // 发送更新到useXStream（如果需要）
                    controller.enqueue(parsed.choices[0].delta.content);
                  }
                } catch (e) {
                  // 忽略解析错误
                  console.log("解析chunk错误:", e);
                }
              }
            }
          }
        } catch (error) {
          console.error("读取流错误:", error);
          controller.error(error);
        } finally {
          reader.releaseLock();
          controller.close();
        }
      },
    });

    // 4. 使用useXStream消费流式数据
    await startStream({
      readableStream: customStream,
    });

    // 5. 流结束后更新状态
    EditorSenderLoading.value = false;

    // 确保最终内容正确显示
    if (aiBubble) {
      updateAIBubbleContent(streamResult.value);
    }
  } catch (error) {
    console.error("请求失败", error);
    EditorSenderLoading.value = false;

    // 显示错误信息
    if (aiBubble) {
      const index = list.value.findIndex(
        (item: listType) => item.key === aiBubble!.key
      );
      if (index !== -1) {
        list.value[index] = {
          ...list.value[index],
          content: "抱歉，请求失败，请检查网络连接或API配置。",
          loading: false,
          typing: true,
        };
        list.value = [...list.value];
      }
    }
  }
}

// 清空聊天记录
function clearChat() {
  list.value = [];
  streamResult.value = "";
  aiBubble = null;
}

// 如果需要，可以暴露方法给父组件
defineExpose({
  clearChat,
});
</script>

<style scoped lang="scss">
.ai-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  > div:first-child {
    flex: 1;
    min-height: 0; // 修复滚动问题
  }
}
.bubble-list {
  height: 100%;
  :deep(.el-bubble-list) {
    height: 100% !important;
  }
}

// 自定义滚动条样式
.ai-container > div::-webkit-scrollbar {
  width: 6px;
}

.ai-container > div::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.ai-container > div::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.ai-container > div::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>

```
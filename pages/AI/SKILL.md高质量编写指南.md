# 🚀 Aster Agent 开发必备：SKILL.md 高质量编写指南

> **导读**：在 Aster 智能体框架中，`SKILL.md` 是连接人类意图与 Agent 执行能力的“说明书”。一份优秀的 `SKILL.md` 能让 Agent 精准理解任务、规范调用工具、避免幻觉操作。本文将深度解析 `SKILL.md` 的标准结构、元数据规范、正文写作技巧及实战案例，助你打造高可用、易维护的 Agent 技能库！

---

## 一、为什么 SKILL.md 如此重要？

在 Aster 架构中，Agent 并非“全知全能”，它依赖 `SKILL.md` 文件来：

- ✅ **理解技能用途**：知道何时该触发此技能
- ✅ **获取执行步骤**：按图索骥完成复杂任务
- ✅ **规范工具调用**：避免随意发明命令导致错误
- ✅ **保障安全边界**：明确禁止操作与错误处理机制

> 💡 **核心原则**：`SKILL.md` 不是给人看的文档，而是**给 Agent 读的指令集**。清晰、结构化、可执行是第一要务！

---

## 二、标准文件结构

每个 Skill 应独立存放在 `skills/` 目录下的子文件夹中，推荐结构如下：

```bash
workspace/
  skills/
    markdown-segment-translator/   # 技能目录（建议与 name 字段一致）
      SKILL.md                     # 核心说明书（必填）
      scripts/                     # 配套脚本（可选）
        segment_tool.py
    pdf-form-filler/
      SKILL.md
      scripts/
        fill_pdf_form.py
```

### `SKILL.md` 组成要素

`SKILL.md` 由两部分构成：

1. **YAML Frontmatter**（元数据区）：Agent 在 Level 1 快速扫描时只读取此部分，用于判断是否匹配用户意图。
2. **Markdown 正文**（说明书区）：当 Agent 决定使用该技能时，会主动 `Read` 此文件，严格按步骤执行。

---

## 三、元数据规范（YAML Frontmatter）

YAML 区域位于文件顶部，用 `---` 包裹，包含三个核心字段：

```yaml
---
name: markdown-segment-translator
description: 将长 Markdown 文档按段切分并翻译，保持格式和术语准确性。适用于“翻译整篇 Markdown 文档”之类的请求。
allowed-tools: ["Bash", "Read", "Write"]
---
```

### 字段详解与约束

| 字段 | 要求 | 说明 | 示例 |
|------|------|------|------|
| `name` | **必填**1-64字符仅小写字母、数字、连字符禁止包含 `anthropic`/`claude` | 技能唯一标识，**强烈建议与目录名一致** | ✅ `markdown-translator`❌ `My Translator` |
| `description` | **必填**≤1024字符非空禁止 XML 标签 | 需同时说明“做什么”+“何时用”，使用用户自然语言风格 | ✅ “检查角色行为与世界设定一致性，适用于长篇小说写作”❌ “一个很厉害的检查工具” |
| `allowed-tools` | 可选 | 提示常用工具列表，不影响实际权限，但有助于调试与路由 | `["Bash", "Read", "Write"]` |

> ⚠️ **注意**：当前 `SkillLoader` 会严格校验 `name` 和 `description`，不符合规范将导致技能加载失败！

### 扩展字段（高级用法）

虽然默认注入器不识别，但你可在 YAML 中添加自定义字段供逻辑层解析：

```yaml
---
name: consistency-checker
description: 检查长篇写作中的角色、设定、时间线一致性
allowed-tools: ["Read", "Grep"]
version: 1.2.0
triggers: ["检查矛盾", "前后不一致", "设定冲突"]
---
```

---

## 四、正文结构（说明书区）

正文是 Agent 的“操作手册”，建议采用以下固定骨架：

```markdown
# 人类可读的技能名称

## 何时使用
- 场景1：用户说“...”时
- 场景2：需要跨文件对比...
- 场景3：涉及...流程时

## 前置假设
- 环境依赖：已安装 python3, pip install xxx
- 目录结构：
  ```bash
  specs/knowledge/characters/
  drafts/current-chapter.md
  ```

## 操作步骤
### 第1步：xxx
1. 使用 `Bash` 执行：`python3 scripts/xxx.py --input ...`
2. 关注输出中的 `ok` 字段或特定文件路径

### 第2步：xxx
1. 使用 `Read` 读取文件：`{"path": "output/segment_1.md"}`
2. 处理内容...
3. 使用 `Write` 写入结果：`{"path": "output/result.md", "content": "..."}`

## 错误处理
- 若文件不存在：说明缺失项，继续最佳努力分析
- 若命令报错：重试一次，仍失败则返回错误信息

## 安全注意事项
- ❌ 禁止直接修改原始文件
- ❌ 禁止调用未授权的外部 API
- ✅ 修改前需用户确认
```

### 4.1 明确写出工具调用方式（关键！）

**不要假设 Agent 会猜对命令！** 必须提供真实可复用的示例：

✅ 正确写法：
```markdown
### 第1步：分段处理
使用 `Bash` 工具执行：
```bash
python3 workspace/skills/markdown-translator/scripts/segment_tool.py \
  segment \
  --input workspace/doc.md \
  --segment-size 1000 \
  --max-segments 5
```
执行后应生成：
- `output/segments/segment_1.md`
- `output/segments/segment_2.md`
```

❌ 错误写法：
```markdown
### 第1步：分段处理
运行分段脚本，把大文件切成小块。
```
（Agent 可能发明错误的参数或路径！）

### 4.2 明确写出文件读写模板

对于 `Read` / `Write` 工具，给出 JSON 格式的调用示例：

```markdown
### 第2步：翻译分段
对每个 `output/segments/segment_X.md`：
1. 使用 `Read` 读取：
   ```json
   {"path": "output/segments/segment_1.md"}
   ```
2. 翻译内容（保持 Markdown 结构）
3. 使用 `Write` 写入：
   ```json
   {"path": "output/translations/translated_1.md", "content": "<翻译结果>"}
   ```
```

---

## 五、与 System Prompt 配合

`SKILL.md` 本身不修改 System Prompt，但建议在模板中加入通用规则，引导 Agent 正确使用技能：

> **System Prompt 示例片段**：
> ```
> 当系统列出 Active Skills 时：
> 1. 先阅读技能列表，判断是否需要调用某个 Skill；
> 2. 如需调用，必须先使用 `Read` 或 `Bash + cat` 打开对应的 `SKILL.md` 文件；
> 3. 严格按照 `SKILL.md` 中的步骤和命令执行，禁止自行发明流程。
> ```

---

## 六、完整实战案例：一致性检查 Skill

下面是一个符合所有规范的完整示例：

```yaml
---
name: consistency-checker
description: 在长篇写作过程中检查角色行为、世界设定和时间线的一致性。适用于“检查这一章有没有前后矛盾”之类的请求。
allowed-tools: ["Read", "Grep"]
---
```

```markdown
# 写作一致性检查 Skill

## 何时使用
- 用户要求“检查角色/设定/时间线一致性”
- 用户在写长篇故事，提到“前面说过”“和之前冲突”
- 需要跨章节对比设定或角色档案

## 前置假设
- 角色档案位于 `spec/knowledge/characters/`
- 世界观设定位于 `spec/knowledge/worldbuilding/`
- 时间线记录为 `spec/tracking/timeline.json`
- 当前章节草稿位于 `drafts/current-chapter.md`

## 操作步骤

### 第1步：加载参考资料
使用 `Read` 工具读取以下文件（如存在）：
- 主角角色档案：`spec/knowledge/characters/main-character.md`
- 当前章节草稿：`drafts/current-chapter.md`
- 时间线文件：`spec/tracking/timeline.json`

将这些内容作为后续分析的“事实来源”。

### 第2步：检查角色一致性
- 比对当前章节中的角色行为、外貌、知识状态是否与角色档案一致
- 对发现的冲突，输出：
  - 冲突描述
  - 参考来源（文件 + 段落）
  - 建议修正方案

### 第3步：检查世界设定与时间线
- 对照世界观文档和时间线 JSON，找出：
  - 时间顺序错乱
  - 设定被隐形修改
  - 违反已建立规则的情节

## 错误处理
- 若参考文件不存在：说明缺失哪类信息，继续使用可用部分做最佳努力分析
- 若未发现冲突：明确说明“未发现明显一致性问题”

## 安全注意事项
- ❌ 不要随意修改原始参考文件
- ✅ 如用户要求自动修正，先给出变更建议，待用户确认后再执行 `Write`
```

---

## 七、常见陷阱与避坑指南

| 陷阱 | 后果 | 解决方案 |
|------|------|----------|
| `name` 含大写或空格 | 技能加载失败 | 严格使用 `kebab-case`（小写+连字符） |
| `description` 太模糊 | Agent 无法匹配意图 | 加入用户原话风格，如“当用户说‘...’时” |
| 步骤缺少命令示例 | Agent 发明错误命令 | 每一步都给出完整命令行或 JSON 调用模板 |
| 未定义错误处理 | Agent 遇错崩溃 | 明确列出常见错误及应对策略 |
| 忽略安全限制 | 误删文件或泄露数据 | 在“安全注意事项”中明确禁止操作 |

---

## 八、进阶技巧

### 1. 多版本管理
在 YAML 中添加 `version` 字段，配合 Git 标签管理技能迭代：
```yaml
version: 2.1.0
changelog: "新增时间线JSON解析支持"
```

### 2. 触发词优化
添加 `triggers` 字段（需自定义解析逻辑），提升意图匹配准确率：
```yaml
triggers: ["检查矛盾", "前后不一致", "设定冲突", "逻辑漏洞"]
```

### 3. 多语言支持
在正文中使用多语言注释，适配国际化团队：
```markdown
## 何时使用 / When to Use
- 中文场景：用户说“检查矛盾”
- English: When user says "check for inconsistencies"
```

---

## 九、总结

编写高质量的 `SKILL.md` 是构建可靠 Aster Agent 的基石。记住三大黄金法则：

1. **结构化**：严格遵循 YAML + Markdown 双段式结构
2. **可执行**：每一步都提供真实命令/调用模板
3. **防御性**：明确错误处理与安全边界

> 🎯 **行动建议**：立即检查你现有的 `SKILL.md`，对照本文规范进行优化！一个清晰的说明书，能让你的 Agent 从“偶尔靠谱”升级为“始终可信”。

---

## 🔗 相关链接

- Aster 官方文档：[https://astercloud.github.io/aster](https://astercloud.github.io/aster)
- Skills 系统概述：[https://astercloud.github.io/aster/core-concepts/skills-system](https://astercloud.github.io/aster/core-concepts/skills-system)
- 工具开发指南：[https://astercloud.github.io/aster/tools/builtin/developing-tools](https://astercloud.github.io/aster/tools/builtin/developing-tools)
- GitHub 仓库：[https://github.com/astercloud/aster](https://github.com/astercloud/aster)

---

**作者**：Aster 技术布道师  
**发布时间**：2026年2月26日  
**标签**：#Aster #AI Agent #SKILL.md #技能开发 #最佳实践 #CSDN原创

---

💬 **互动话题**：你在编写 `SKILL.md` 时遇到过哪些坑？欢迎在评论区分享经验！

> 喜欢本文请点赞❤️收藏⭐转发↗️，关注我获取更多 Aster 框架深度解析！
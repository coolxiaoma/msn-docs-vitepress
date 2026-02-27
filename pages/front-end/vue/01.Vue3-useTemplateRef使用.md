# Vue 3.5 useTemplateRef 简单指南

## 这是什么？

`useTemplateRef` 是 Vue 3.5 的新功能，用来更方便地获取页面上的元素或组件。

### 基本用法

```vue
<template>
  <input ref="myInput" />
  <button @click="focusInput">点击聚焦输入框</button>
</template>

<script setup>
import { useTemplateRef } from 'vue'

// 直接告诉它要找哪个 ref
const inputEl = useTemplateRef('myInput')

const focusInput = () => {
  inputEl.value?.focus() // 让输入框获得焦点
}
</script>
```

## 解决了什么问题？

### 1. 不再需要变量名匹配

**以前的问题：**
```vue
<template>
  <input ref="inputEl" /> <!-- 这里的名字 -->
</template>

<script setup>
const inputEl = ref(null) // 必须和上面一样！容易写错
</script>
```

**现在：**
```vue
<template>
  <input ref="myInput" />
</template>

<script setup>
const anyName = useTemplateRef('myInput') // 名字随便起，不会错
const whatever = useTemplateRef('myInput') // 这样也行
</script>
```

### 2. 在函数中更好用

**以前的问题：**
```javascript
// 封装一个聚焦功能
function useFocus() {
  const inputEl = ref(null) // ❌ 不知道怎么跟模板连接
  
  const focus = () => {
    inputEl.value?.focus()
  }
  
  return { inputEl, focus } // 必须把 inputEl 也返回出去
}
```

**现在：**
```javascript
// 封装一个聚焦功能
function useFocus(refName) {
  const target = useTemplateRef(refName) // ✅ 直接告诉它找哪个元素
  
  const focus = () => {
    target.value?.focus()
  }
  
  return { focus } // 只需要返回功能，更干净
}

// 使用
const { focus } = useFocus('emailInput') // 告诉它要找叫 'emailInput' 的元素
```

### 3. 动态元素处理更方便

```vue
<template>
  <div v-for="item in list" :key="item.id">
    <input :ref="`input-${item.id}`" />
    <button @click="focusItem(item.id)">聚焦这个</button>
  </div>
</template>

<script setup>
const list = [
  { id: 1, name: '第一项' },
  { id: 2, name: '第二项' }
]

const focusItem = (id) => {
  const el = useTemplateRef(`input-${id}`)
  el.value?.focus() // 直接聚焦到对应的输入框
}
</script>
```

## 实际使用例子

### 表单验证后自动聚焦

```vue
<template>
  <input ref="email" v-model="email" placeholder="邮箱" />
  <input ref="username" v-model="username" placeholder="用户名" />
  <button @click="submit">提交</button>
</template>

<script setup>
import { useTemplateRef } from 'vue'

const email = ref('')
const username = ref('')

const emailInput = useTemplateRef('email')
const usernameInput = useTemplateRef('username')

const submit = () => {
  if (!email.value.includes('@')) {
    emailInput.value?.focus() // 邮箱格式错误，聚焦回邮箱输入框
    return
  }
  
  if (!username.value) {
    usernameInput.value?.focus() // 用户名为空，聚焦到用户名输入框
    return
  }
  
  // 提交表单...
}
</script>
```

### 控制子组件

```vue
<template>
  <!-- 子组件 -->
  <MyCounter ref="counter" />
  
  <!-- 父组件的按钮 -->
  <button @click="add">+1</button>
  <button @click="reset">重置</button>
</template>

<script setup>
import MyCounter from './MyCounter.vue'

// 获取子组件的控制权
const counter = useTemplateRef('counter')

const add = () => {
  counter.value?.increment() // 调用子组件的方法
}

const reset = () => {
  counter.value?.reset() // 调用子组件的方法
}
</script>
```

## 需要注意的地方

1. **元素可能不存在**
```javascript
const el = useTemplateRef('myElement')
el.value?.doSomething() // 记得用 ?. 因为元素可能为 null
```

2. **等待元素出现**
```vue
<template>
  <input v-if="show" ref="myInput" />
</template>

<script setup>
const show = ref(false)
const inputEl = useTemplateRef('myInput')

const showAndFocus = async () => {
  show.value = true
  // 需要等一下子，让页面更新
  await nextTick()
  inputEl.value?.focus() // 现在可以聚焦了
}
</script>
```

## 总结

**useTemplateRef 的好处：**
- ✅ 变量名随便起，不会出错
- ✅ 在封装的函数中更好用
- ✅ 处理动态元素更简单
- ✅ 代码更清晰易懂

**什么时候用：**
- 需要操作 DOM 元素时（聚焦、获取尺寸等）
- 需要调用子组件的方法时
- 在循环中需要操作特定元素时

这个新功能让 Vue 的模板引用变得更简单、更灵活，特别是当你想要封装一些通用功能的时候！
# [无感刷新Token：如何做到让用户“永不掉线”](https://mp.weixin.qq.com/s/10Eqks77NNBZkPOJeOmISw)
::: tip
关于本文<br>
来源：微信公众号「JavaScript」<br>
地址：https://mp.weixin.qq.com/s/10Eqks77NNBZkPOJeOmISw
:::

## 背景

没有什么比在用户操作得正嗨时，突然提示“登录已过期，请重新登录”的提示更让人沮丧的了。这种突兀的中断不仅破坏了用户体验，甚至可能导致未保存的数据丢失。

然而，出于安全考虑，用于身份验证的 Token（通常是 Access Token）必须有较短的有效期。那么，如何在保证安全的前提下，创造一种“永不掉线”的丝滑体验呢？

## 为什么需要刷新 Token

我们通常使用 Access Token 来验证用户的每一次 API 请求。为了安全，Access Token 的生命周期被设计得很短（例如 30 分钟或 1 小时）。如果有效期太长，一旦泄露，攻击者就能在很长一段时间内冒充用户进行操作，风险极高。

这就产生了一个矛盾：

- 安全性要求：Access Token 有效期要短。
- 用户体验要求：用户不想频繁地被强制重新登录。

为了解决这个矛盾，Refresh Token 应运而生。

## 核心理念：双 Token 认证系统

无感刷新机制的核心在于引入两种类型的 Token：

- Access Token（访问令牌）
  - 用途：用于访问受保护的 API 资源，附加在每个请求的 Header 中。
  - 特点：生命周期短（如 1 小时），无状态，服务器无需存储。
  - 存储：通常存储在客户端内存中（如 Vuex/Redux），因为需要频繁读取。
- Refresh Token（刷新令牌）
  - 用途：当 Access Token 过期时，专门用于获取一个新的 Access Token。
  - 特点：生命周期长（如 7 天或 30 天），与特定用户绑定，服务器需要安全存储其有效性记录。
  - 存储：必须安全存储。最佳实践是存储在 HttpOnly Cookie 中，防止客户端 JavaScript（如 XSS 攻击）读取。

既然如此，为何不直接使用 Refresh Token 呢？

## 为什么不直接使用 Refresh Token

- Access Token 通常是无状态的，服务器无需记录它，但这也意味着基于 JWT 的 Access Token 无法“主动吊销”。
- Refresh Token 是有状态的，服务器需要维护其有效性（例如数据库“白名单”或“吊销列表”）。当用户更改密码或从某设备“主动登出”时，服务器可以将对应 Refresh Token 设为无效。

## 无感刷新的详细工作流

1. 首次登录：
   - 用户使用用户名和密码登录。
   - 服务器验证成功后，返回一个 Access Token 和一个 Refresh Token。
2. 正常请求：
   - 客户端将 Access Token 存储起来，并在后续的每次 API 请求中，通过 Authorization 请求头发送给服务器。
3. Token 过期：
   - 当 Access Token 过期后，客户端再次用它请求 API。
   - 服务器拒绝该请求，并返回状态码 401 Unauthorized。
4. 拦截 401 错误：
   - 客户端请求层（如 Axios 拦截器）捕获 401 错误。
   - 暂停该失败的请求，不立即提示“已掉线”。
5. 发起刷新请求：
   - 拦截器使用 Refresh Token 调用专门的刷新接口（例如 `/api/auth/refresh`）。
6. 处理刷新结果：
   - 刷新成功：服务器验证 Refresh Token 有效，签发新的 Access Token（有时也会返回新的 Refresh Token——称为“刷新令牌旋转”，更安全），并返回给客户端。
   - 刷新失败：若 Refresh Token 也过期或无效，服务器返回错误（如 403 Forbidden），表示会话已结束。
7. 重试与终结：
   - 若刷新成功：客户端使用新的 Access Token 自动重发刚才失败的 API 请求，过程对用户无感。
   - 若刷新失败：客户端清除所有认证信息，强制登出，并重定向到登录页面。

> <span style="color: red">实战演练：使用 Axios 拦截器实现无感刷新 (请看原文)</span>

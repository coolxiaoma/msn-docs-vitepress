# 五层网络模型
分层的意义
当遇到一个复杂问题的时候，可以使用分层的思想把问题简单化

比如，你有半杯82年的可乐，想分享给你的朋友王富贵，但你们已经10年没有联系了。要完成这件事，你可能要考虑：

我用什么装可乐？

可能的方案：塑料瓶、玻璃瓶、煤气罐

怎么保证可乐始终处于低温？

可能的方案：保温杯、小冰箱、冰盒

如何保证可乐不被运输的人偷喝？

可能的方案：封条、在上面写「毒药」

如何获取王富贵的地址？

可能的方案：报案失踪、联系私人侦探、联系物流公司的朋友

如何运输？

## 分层的意义

当遇到一个复杂问题的时候，可以使用分层的思想把问题简单化

比如，你有半杯82年的可乐，想分享给你的朋友王富贵，但你们已经10年没有联系了。要完成这件事，你可能要考虑：

- 我用什么装可乐？

  可能的方案：塑料瓶、玻璃瓶、煤气罐

- 怎么保证可乐始终处于低温？

  可能的方案：保温杯、小冰箱、冰盒

- 如何保证可乐不被运输的人偷喝？

  可能的方案：封条、在上面写「毒药」

- 如何获取王富贵的地址？

  可能的方案：报案失踪、联系私人侦探、联系物流公司的朋友
  
- 如何运输？

  可能的方案：自行车、汽车、火车、高铁、飞机、火箭

这就形成了一个分层结构

<img src="http://mdrs.yuanjin.tech/img/20210927145456.png" alt="image-20210927145456656" style="zoom:50%;" />  



从常理出发，我们可以得出以下结论：

- 每层相对独立，只需解决自己的问题
- 每层无须考虑上层的交付，仅需把自己的结果交给下层即可
- 每层有多种方案可供选择，选择不同的方案不会对上下层造成影响
- 每一层会在上一层的基础上增加一些额外信息

## 五层网络模型

![image-20211008163417521](http://mdrs.yuanjin.tech/img/20211008163417.png)

## 数据的封装和解封装

![image-20211008163458168](http://mdrs.yuanjin.tech/img/20211008163458.png)

## 四层、五层、七层

![image-20211008164017299](http://mdrs.yuanjin.tech/img/20211008164017.png)

## 面试题

说说网络的五层模型（寺库）

> 参考答案：
>
> 从上到下分别为：应用层、传输层、网络层、数据链路层、物理层。在发送消息时，消息从上到下进行打包，每一层会在上一层基础上加包，而接受消息时，从下到上进行解包，最终得到原始信息。
>
> 其中：
>
> 应用层主要面向互联网中的应用场景，比如网页、邮件、文件中心等等，它的代表协议有 http、smtp、pop3、ftp、DNS 等等
>
> 传输层主要面向传输过程，比如 TCP 协议是为了保证可靠的传输，而 UDP 协议则是一种无连接的广播，它们提供了不同的传输方式
>
> 网络层主要解决如何定位目标以及如何寻找最优路径的问题，比如 IP 等等
>
> 数据链路层的作用是将数据在一个子网（广播域）内有效传输，MAC地址、交换机都是属于该层的
>
> 物理层是要解决二进制数据到信号之间的互转问题，集线器、双绞线、同轴电缆等都是属于盖层的设备

## 请求方法的本质

**请求方法是请求行中的第一个单词，它向服务器描述了客户端发出请求的动作类型。在 HTTP 协议中，不同的请求方法只是包含了不同的语义，但服务器和浏览器的一些约定俗成的行为造成了它们具体的区别**

![image-20210914102745190](http://mdrs.yuanjin.tech/img/20210914102745.png)

```js
fetch('https://www.baidu.com', {
  method: 'heiheihei', // 告诉百度，我这次请求是来嘿嘿嘿的
});
```

上面的请求中，我们使用了自定义方法`heiheihei`。虽然百度服务器无法理解这样的请求是在干什么，但这样的请求也是可以正常发送到百度服务器的。

在实践中，客户端和服务器慢慢的形成了一个共识，约定俗成的规定了一些常见的请求方法：

- GET，表示向服务器获取资源。业务数据在请求行中，无须请求体
- POST，表示向服务器提交信息，通常用于产生新的数据，比如注册。业务数据在请求体中
- PUT，表示希望修改服务器的数据，通常用于修改。业务数据在请求体中
- DELETE，表示希望删除服务器的数据。业务数据在请求行中，无须请求体。
- OPTIONS，发生在跨域的预检请求中，表示客户端向服务器申请跨域提交
- TRACE，回显服务器收到的请求，主要用于测试和诊断
- CONNECT，用于建立连接管道，通常在代理场景中使用，网页中很少用到

## GET 和 POST 的区别

**由于浏览器和服务器约定俗称的规则**，造成了 GET 和 POST 请求在 web 中的区别：

1. 浏览器在发送 GET 请求时，不会附带请求体
2. GET 请求的传递信息量有限，适合传递少量数据；POST 请求的传递信息量是没有限制的，适合传输大量数据。
3. GET 请求只能传递 ASCII 数据，遇到非 ASCII 数据需要进行编码；POST 请求没有限制
4. 大部分 GET 请求传递的数据都附带在 path 参数中，能够通过分享地址完整的重现页面，但同时也暴露了数据，若有敏感数据传递，不应该使用 GET 请求，至少不应该放到 path 中
5. 刷新页面时，若当前的页面是通过 POST 请求得到的，则浏览器会提示用户是否重新提交。若是 GET 请求得到的页面则没有提示。
6. GET 请求的地址可以被保存为浏览器书签，POST 不可以

## 面试题

1. http 常见请求方法有哪些？

> 参考答案：
>
> - GET，表示向服务器获取资源
> - POST，表示向服务器提交信息，通常用于产生新的数据，比如注册
> - PUT，表示希望修改服务器的数据，通常用于修改
> - DELETE，表示希望删除服务器的数据
> - OPTIONS，发生在跨域的预检请求中，表示客户端向服务器申请跨域提交
> - TRACE，回显服务器收到的请求，主要用于测试和诊断
> - CONNECT，用于建立连接管道，通常在代理场景中使用，网页中很少用到

2. GET 和 POST 的区别（流利说）

> 参考答案：
>
> 从 http 协议的角度来说，GET 和 POST 它们都只是请求行中的第一个单词，除了语义不同，其实没有本质的区别。
>
> 之所以在实际开发中会产生各种区别，主要是因为浏览器的默认行为造成的。
>
> 受浏览器的影响，在实际开发中，GET 和 POST 有以下区别：
>
> 1. 浏览器在发送 GET 请求时，不会附带请求体
> 2. GET 请求的传递信息量有限，适合传递少量数据；POST 请求的传递信息量是没有限制的，适合传输大量数据。
> 3. GET 请求只能传递 ASCII 数据，遇到非 ASCII 数据需要进行编码；POST 请求没有限制
> 4. 大部分 GET 请求传递的数据都附带在 path 参数中，能够通过分享地址完整的重现页面，但同时也暴露了数据，若有敏感数据传递，不应该使用 GET 请求，至少不应该放到 path 中
> 5. 刷新页面时，若当前的页面是通过 POST 请求得到的，则浏览器会提示用户是否重新提交。若是 GET 请求得到的页面则没有提示。
> 6. GET 请求的地址可以被保存为浏览器书签，POST 不可以


# Cookie
## 一个不大不小的问题

假设服务器有一个接口，通过请求这个接口，可以添加一个管理员

但是，不是任何人都有权力做这种操作的

那么服务器如何知道请求接口的人是有权力的呢？

答案是：只有登录过的管理员才能做这种操作

可问题是，客户端和服务器的传输使用的是http协议，http协议是无状态的，什么叫无状态，就是**服务器不知道这一次请求的人，跟之前登录请求成功的人是不是同一个人**

![img](http://mdrs.yuanjin.tech/img/image-20200417161014030.png)

![img](http://mdrs.yuanjin.tech/img/image-20200417161244373.png)

由于http协议的无状态，服务器**忘记**了之前的所有请求，它无法确定这一次请求的客户端，就是之前登录成功的那个客户端。

> 你可以把服务器想象成有着严重脸盲症的东哥，他没有办法分清楚跟他说话的人之前做过什么

于是，服务器想了一个办法

它按照下面的流程来认证客户端的身份

1. 客户端登录成功后，服务器会给客户端一个出入证
2. 后续客户端的每次请求，都必须要附带这个出入证

![img](http://mdrs.yuanjin.tech/img/image-20200417161950450.png)

服务器发扬了认证不认人的优良传统，就可以很轻松的识别身份了。

但是，用户不可能只在一个网站登录，于是客户端会收到来自各个网站的出入证，因此，就要求客户端要有一个类似于卡包的东西，能够具备下面的功能：

1. **能够存放多个出入证**。这些出入证来自不同的网站，也可能是一个网站有多个出入证，分别用于出入不同的地方
2. **能够自动出示出入证**。客户端在访问不同的网站时，能够自动的把对应的出入证附带请求发送出去。
3. **正确的出示出入证**。客户端不能将肯德基的出入证发送给麦当劳。
4. **管理出入证的有效期**。客户端要能够自动的发现那些已经过期的出入证，并把它从卡包内移除。

能够满足上面所有要求的，就是cookie

cookie类似于一个卡包，专门用于存放各种出入证，并有着一套机制来自动管理这些证件。

卡包内的每一张卡片，称之为**一个cookie**。

## cookie的组成

cookie是浏览器中特有的一个概念，它就像浏览器的专属卡包，管理着各个网站的身份信息。

每个cookie就相当于是属于某个网站的一个卡片，它记录了下面的信息：

- key：键，比如「身份编号」
- value：值，比如袁小进的身份编号「14563D1550F2F76D69ECBF4DD54ABC95」，这有点像卡片的条形码，当然，它可以是任何信息
- domain：域，表达这个cookie是属于哪个网站的，比如`yuanjin.tech`，表示这个cookie是属于`yuanjin.tech`这个网站的
- path：路径，表达这个cookie是属于该网站的哪个基路径的，就好比是同一家公司不同部门会颁发不同的出入证。比如`/news`，表示这个cookie属于`/news`这个路径的。（后续详细解释）
- secure：是否使用安全传输（后续详细解释）
- expire：过期时间，表示该cookie在什么时候过期

当浏览器向服务器发送一个请求的时候，它会瞄一眼自己的卡包，看看哪些卡片适合附带捎给服务器

如果一个cookie**同时满足**以下条件，则这个cookie会被附带到请求中

- cookie没有过期
- cookie中的域和这次请求的域是匹配的
  - 比如cookie中的域是`yuanjin.tech`，则可以匹配的请求域是`yuanjin.tech`、`www.yuanjin.tech`、`blogs.yuanjin.tech`等等
  - 比如cookie中的域是`www.yuanjin.tech`，则只能匹配`www.yuanjin.tech`这样的请求域
  - cookie是不在乎端口的，只要域匹配即可
- cookie中的path和这次请求的path是匹配的
  - 比如cookie中的path是`/news`，则可以匹配的请求路径可以是`/news`、`/news/detail`、`/news/a/b/c`等等，但不能匹配`/blogs`
  - 如果cookie的path是`/`，可以想象，能够匹配所有的路径
- 验证cookie的安全传输
  - 如果cookie的secure属性是true，则请求协议必须是`https`，否则不会发送该cookie
  - 如果cookie的secure属性是false，则请求协议可以是`http`，也可以是`https`

如果一个cookie满足了上述的所有条件，则浏览器会把它自动加入到这次请求中

具体加入的方式是，**浏览器会将符合条件的cookie，自动放置到请求头中**，例如，当我在浏览器中访问百度的时候，它在请求头中附带了下面的cookie：

![img](http://mdrs.yuanjin.tech/img/image-20200417170328584.png)

看到打马赛克的地方了吗？这部分就是通过请求头`cookie`发送到服务器的，它的格式是`键=值; 键=值; 键=值; ...`，每一个键值对就是一个符合条件的cookie。

**cookie中包含了重要的身份信息，永远不要把你的cookie泄露给别人！！！**否则，他人就拿到了你的证件，有了证件，就具备了为所欲为的可能性。

## 如何设置cookie

由于cookie是保存在浏览器端的，同时，很多证件又是服务器颁发的

所以，cookie的设置有两种模式：

- 服务器响应：这种模式是非常普遍的，当服务器决定给客户端颁发一个证件时，它会在响应的消息中包含cookie，浏览器会自动的把cookie保存到卡包中
- 客户端自行设置：这种模式少见一些，不过也有可能会发生，比如用户关闭了某个广告，并选择了「以后不要再弹出」，此时就可以把这种小信息直接通过浏览器的JS代码保存到cookie中。后续请求服务器时，服务器会看到客户端不想要再次弹出广告的cookie，于是就不会再发送广告过来了。

## 服务器端设置cookie

服务器可以通过设置响应头，来告诉浏览器应该如何设置cookie

响应头按照下面的格式设置：

```yaml
set-cookie: cookie1
set-cookie: cookie2
set-cookie: cookie3
...
```

通过这种模式，就可以在一次响应中设置多个cookie了，具体设置多少个cookie，设置什么cookie，根据你的需要自行处理

其中，每个cookie的格式如下：

```
键=值; path=?; domain=?; expire=?; max-age=?; secure; httponly
```

每个cookie除了键值对是必须要设置的，其他的属性都是可选的，并且顺序不限

当这样的响应头到达客户端后，**浏览器会自动的将cookie保存到卡包中，如果卡包中已经存在一模一样的卡片（其他path、domain相同），则会自动的覆盖之前的设置**。

下面，依次说明每个属性值：

- **path**：设置cookie的路径。如果不设置，浏览器会将其自动设置为当前请求的路径。比如，浏览器请求的地址是`/login`，服务器响应了一个`set-cookie: a=1`，浏览器会将该cookie的path设置为请求的路径`/login`

- **domain**：设置cookie的域。如果不设置，浏览器会自动将其设置为当前的请求域，比如，浏览器请求的地址是

  ```
  http://www.yuanjin.tech
  ```

  ，服务器响应了一个

  ```
  set-cookie: a=1
  ```

  ，浏览器会将该cookie的domain设置为请求的域

  ```
  www.yuanjin.tech
  ```

  - 这里值得注意的是，如果服务器响应了一个无效的域，浏览器是不认的
  - 什么是无效的域？就是响应的域连根域都不一样。比如，浏览器请求的域是`yuanjin.tech`，服务器响应的cookie是`set-cookie: a=1; domain=baidu.com`，这样的域浏览器是不认的。
  - 如果浏览器连这样的情况都允许，就意味着张三的服务器，有权利给用户一个cookie，用于访问李四的服务器，这会造成很多安全性的问题

- **expire**：设置cookie的过期时间。这里必须是一个有效的GMT时间，即格林威治标准时间字符串，比如`Fri, 17 Apr 2020 09:35:59 GMT`，表示格林威治时间的`2020-04-17 09:35:59`，即北京时间的`2020-04-17 17:35:59`。当客户端的时间达到这个时间点后，会自动销毁该cookie。

- **max-age**：设置cookie的相对有效期。expire和max-age通常仅设置一个即可。比如设置`max-age`为`1000`，浏览器在添加cookie时，会自动设置它的`expire`为当前时间加上1000秒，作为过期时间。

  - 如果不设置expire，又没有设置max-age，则表示会话结束后过期。
  - 对于大部分浏览器而言，关闭所有浏览器窗口意味着会话结束。

- **secure**：设置cookie是否是安全连接。如果设置了该值，则表示该cookie后续只能随着`https`请求发送。如果不设置，则表示该cookie会随着所有请求发送。

- **httponly**：设置cookie是否仅能用于传输。如果设置了该值，表示该cookie仅能用于传输，而不允许在客户端通过JS获取，这对防止跨站脚本攻击（XSS）会很有用。

  - 关于如何通过JS获取，后续会讲解
- 关于什么是XSS，不在本文讨论范围

下面来一个例子，客户端通过`post`请求服务器`http://yuanjin.tech/login`，并在消息体中给予了账号和密码，服务器验证登录成功后，在响应头中加入了以下内容：

```
set-cookie: token=123456; path=/; max-age=3600; httponly
```

当该响应到达浏览器后，浏览器会创建下面的cookie：

```yaml
key: token
value: 123456
domain: yuanjin.tech
path: /
expire: 2020-04-17 18:55:00 #假设当前时间是2020-04-17 17:55:00
secure: false  #任何请求都可以附带这个cookie，只要满足其他要求
httponly: true #不允许JS获取该cookie
```

于是，随着浏览器后续对服务器的请求，只要满足要求，这个cookie就会被附带到请求头中传给服务器：

```yaml
cookie: token=123456; 其他cookie...
```

现在，还剩下最后一个问题，就是如何删除浏览器的一个cookie呢？

如果要删除浏览器的cookie，只需要让服务器响应一个同样的域、同样的路径、同样的key，只是时间过期的cookie即可

**所以，删除cookie其实就是修改cookie**

下面的响应会让浏览器删除`token`

```yaml
set-cookie: token=; domain=yuanjin.tech; path=/; max-age=-1
```

浏览器按照要求修改了cookie后，会发现cookie已经过期，于是自然就会删除了。

> 无论是修改还是删除，都要注意cookie的域和路径，因为完全可能存在域或路径不同，但key相同的cookie
>
> 因此无法仅通过key确定是哪一个cookie

## 客户端设置cookie

既然cookie是存放在浏览器端的，所以浏览器向JS公开了接口，让其可以设置cookie

```js
document.cookie = "键=值; path=?; domain=?; expire=?; max-age=?; secure";
```

可以看出，在客户端设置cookie，和服务器设置cookie的格式一样，只是有下面的不同

- 没有httponly。因为httponly本来就是为了限制在客户端访问的，既然你是在客户端配置，自然失去了限制的意义。
- path的默认值。在服务器端设置cookie时，如果没有写path，使用的是请求的path。而在客户端设置cookie时，也许根本没有请求发生。因此，path在客户端设置时的默认值是当前网页的path
- domain的默认值。和path同理，客户端设置时的默认值是当前网页的domain
- 其他：一样
- 删除cookie：和服务器也一样，修改cookie的过期时间即可

## 总结

以上，就是cookie原理部分的内容。

如果把它用于登录场景，就是如下的流程：

**登录请求**

1. 浏览器发送请求到服务器，附带账号密码
2. 服务器验证账号密码是否正确，如果不正确，响应错误，如果正确，在响应头中设置cookie，附带登录认证信息（至于登录认证信息是设么样的，如何设计，要考虑哪些问题，就是另一个话题了，可以百度 jwt）
3. 客户端收到cookie，浏览器自动记录下来

**后续请求**

1. 浏览器发送请求到服务器，希望添加一个管理员，并将cookie自动附带到请求中
2. 服务器先获取cookie，验证cookie中的信息是否正确，如果不正确，不予以操作，如果正确，完成正常的业务流程

## cookie/sessionStorage/localStorage 的区别

### 面试题

cookie/sessionStorage/localStorage 的区别

> 参考答案：
>
> cookie、sessionStorage、localStorage 都是保存本地数据的方式
>
> 其中，cookie 兼容性较好，所有浏览器均支持。浏览器针对 cookie 会有一些默认行为，比如当响应头中出现`set-cookie`字段时，浏览器会自动保存 cookie 的值；再比如，浏览器发送请求时，会附带匹配的 cookie 到请求头中。这些默认行为，使得 cookie 长期以来担任着维持登录状态的责任。与此同时，也正是因为浏览器的默认行为，给了恶意攻击者可乘之机，CSRF 攻击就是一个典型的利用 cookie 的攻击方式。虽然 cookie 不断的改进，但前端仍然需要另一种更加安全的保存数据的方式
>
> HTML5 新增了 sessionStorage 和 localStorage，前者用于保存会话级别的数据，后者用于更持久的保存数据。浏览器针对它们没有任何默认行为，这样一来，就把保存数据、读取数据的工作交给了前端开发者，这就让恶意攻击者难以针对登录状态进行攻击。
> cookie 的大小是有限制的，一般浏览器会限制同一个域下的 cookie 总量不超过 4KB，而 sessionStorage 和 localStorage 则拥有更大的空间，多数浏览器一般要求不超过 5MB~10MB
> cookie 会与 domain、path 关联，而 sessionStorage 和 localStorage 只与 domain 关联

# JWT
## 概述

回顾登录的流程：

<img src="http://mdrs.yuanjin.tech/img/image-20200417161950450.png" alt="img"  align="left"/>

接下来的问题是：这个出入证（令牌）里面到底存啥？

一种比较简单的办法就是直接存储用户信息的JSON串，这会造成下面的几个问题：

- 非浏览器环境，如何在令牌中记录过期时间
- 如何防止令牌被伪造

JWT就是为了解决这些问题出现的。

JWT全称`Json Web Token`，本质就是一个字符串

它要解决的问题，就是在互联网环境中，提供**统一的、安全的**令牌格式

因此，jwt只是一个令牌格式而已，你可以把它存储到cookie，也可以存储到localstorage，没有任何限制！

同样的，对于传输，你可以使用任何传输方式来传输jwt，一般来说，我们会使用消息头来传输它

比如，当登录成功后，服务器可以给客户端响应一个jwt：

```
HTTP/1.1 200 OK
...
set-cookie:token=jwt令牌
authentication:jwt令牌
...

{..., token:jwt令牌}
```

可以看到，jwt令牌可以出现在响应的任何一个地方，客户端和服务器自行约定即可。

> 当然，它也可以出现在响应的多个地方，比如为了充分利用浏览器的cookie，同时为了照顾其他设备，也可以让jwt出现在`set-cookie`和`authorization或body`中，尽管这会增加额外的传输量。

当客户端拿到令牌后，它要做的只有一件事：存储它。

你可以存储到任何位置，比如手机文件、PC文件、localstorage、cookie

当后续请求发生时，你只需要将它作为请求的一部分发送到服务器即可。

虽然jwt没有明确要求应该如何附带到请求中，但通常我们会使用如下的格式：

```
GET /api/resources HTTP/1.1
...
authorization: bearer jwt令牌
...
```

这样一来，服务器就能够收到这个令牌了，通过对令牌的验证，即可知道该令牌是否有效。

它们的完整交互流程是非常简单清晰的

![image-20200422172837190](http://mdrs.yuanjin.tech/img/image-20200422172837190.png)

## 令牌的组成

为了保证令牌的安全性，jwt令牌由三个部分组成，分别是：

1. header：令牌头部，记录了整个令牌的类型和签名算法
2. payload：令牌负荷，记录了保存的主体信息，比如你要保存的用户信息就可以放到这里
3. signature：令牌签名，按照头部固定的签名算法对整个令牌进行签名，该签名的作用是：保证令牌不被伪造和篡改

它们组合而成的完整格式是：`header.payload.signature`

比如，一个完整的jwt令牌如下：

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1ODc1NDgyMTV9.BCwUy3jnUQ_E6TqCayc7rCHkx-vxxdagUwPOWqwYCFc
```

它各个部分的值分别是：

- `header：eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`
- `payload：eyJmb28iOiJiYXIiLCJpYXQiOjE1ODc1NDgyMTV9`
- `signature: BCwUy3jnUQ_E6TqCayc7rCHkx-vxxdagUwPOWqwYCFc`

下面分别对每个部分进行说明

### header

它是令牌头部，记录了整个令牌的类型和签名算法

它的格式是一个`json`对象，如下：

```json
{
  "alg":"HS256",
  "typ":"JWT"
}
```

该对象记录了：

- alg：signature部分使用的签名算法，通常可以取两个值
  - HS256：一种对称加密算法，使用同一个秘钥对signature加密解密
  - RS256：一种非对称加密算法，使用私钥签名，公钥验证
- typ：整个令牌的类型，固定写`JWT`即可

设置好了`header`之后，就可以生成`header`部分了

具体的生成方式及其简单，就是把`header`部分使用`base64 url`编码即可

> `base64 url`不是一个加密算法，而是一种编码方式，它是在`base64`算法的基础上对`+`、`=`、`/`三个字符做出特殊处理的算法
>
> 而`base64`是使用64个可打印字符来表示一个二进制数据，具体的做法参考[百度百科](https://baike.baidu.com/item/base64/8545775?fr=aladdin)

浏览器提供了`btoa`函数，可以完成这个操作：

```js
window.btoa(JSON.stringify({
  "alg":"HS256",
  "typ":"JWT"
}))
// 得到字符串：eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

同样的，浏览器也提供了`atob`函数，可以对其进行解码：

```js
window.atob("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9")
// 得到字符串：{"alg":"HS256","typ":"JWT"}
```

> nodejs中没有提供这两个函数，可以安装第三方库`atob`和`bota`搞定
>
> 或者，手动搞定

### payload

这部分是jwt的主体信息，它仍然是一个JSON对象，它可以包含以下内容：

```json
{
  "ss"："发行者",
  "iat"："发布时间",
  "exp"："到期时间",
  "sub"："主题",
  "aud"："听众",
  "nbf"："在此之前不可用",
  "jti"："JWT ID"
}
```

以上属性可以全写，也可以一个都不写，它只是一个规范，就算写了，也需要你在将来验证这个jwt令牌时手动处理才能发挥作用

上述属性表达的含义分别是：

- ss：发行该jwt的是谁，可以写公司名字，也可以写服务名称
- iat：该jwt的发放时间，通常写当前时间的时间戳
- exp：该jwt的到期时间，通常写时间戳
- sub：该jwt是用于干嘛的
- aud：该jwt是发放给哪个终端的，可以是终端类型，也可以是用户名称，随意一点
- nbf：一个时间点，在该时间点到达之前，这个令牌是不可用的
- jti：jwt的唯一编号，设置此项的目的，主要是为了防止重放攻击（重放攻击是在某些场景下，用户使用之前的令牌发送到服务器，被服务器正确的识别，从而导致不可预期的行为发生）

可是到现在，看了半天，没有出现我想要写入的数据啊😂

当用户登陆成功之后，我可能需要把用户的一些信息写入到jwt令牌中，比如用户id、账号等等（密码就算了😳）

其实很简单，payload这一部分只是一个json对象而已，你可以向对象中加入任何想要加入的信息

比如，下面的json对象仍然是一个有效的payload

```json
{
  "foo":"bar",
  "iat":1587548215
}
```

`foo: bar`是我们自定义的信息，`iat: 1587548215`是jwt规范中的信息

最终，payload部分和header一样，需要通过`base64 url`编码得到：

```js
window.btoa(JSON.stringify({
  "foo":"bar",
  "iat":1587548215
}))
// 得到字符串：eyJmb28iOiJiYXIiLCJpYXQiOjE1ODc1NDgyMTV9
```

### signature

这一部分是jwt的签名，正是它的存在，保证了整个jwt不被篡改

这部分的生成，是对前面两个部分的编码结果，按照头部指定的方式进行加密

比如：头部指定的加密方法是`HS256`，前面两部分的编码结果是`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1ODc1NDgyMTV9`

则第三部分就是用对称加密算法`HS256`对字符串`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1ODc1NDgyMTV9`进行加密，当然你得指定一个秘钥，比如`shhhhh`

```js
HS256(`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1ODc1NDgyMTV9`, "shhhhh")
// 得到：BCwUy3jnUQ_E6TqCayc7rCHkx-vxxdagUwPOWqwYCFc
```

最终，将三部分组合在一起，就得到了完整的jwt

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE1ODc1NDgyMTV9.BCwUy3jnUQ_E6TqCayc7rCHkx-vxxdagUwPOWqwYCFc
```

由于签名使用的秘钥保存在服务器，这样一来，客户端就无法伪造出签名，因为它拿不到秘钥。

换句话说，之所以说无法伪造jwt，就是因为第三部分的存在。

而前面两部分并没有加密，只是一个编码结果而已，可以认为几乎是明文传输

> 这不会造成太大的问题，因为既然用户登陆成功了，它当然有权力查看自己的用户信息
>
> 甚至在某些网站，用户的基本信息可以被任何人查看
>
> 你要保证的，是不要把敏感的信息存放到jwt中，比如密码

jwt的`signature`可以保证令牌不被伪造，那如何保证令牌不被篡改呢？

比如，某个用户登陆成功了，获得了jwt，但他人为的篡改了`payload`，比如把自己的账户余额修改为原来的两倍，然后重新编码出`payload`发送到服务器，服务器如何得知这些信息被篡改过了呢？

这就要说到令牌的验证了

## 令牌的验证

![image-20200422172837190](http://mdrs.yuanjin.tech/img/image-20200422172837190.png)

令牌在服务器组装完成后，会以任意的方式发送到客户端

客户端会把令牌保存起来，后续的请求会将令牌发送给服务器

而服务器需要验证令牌是否正确，如何验证呢？

首先，服务器要验证这个令牌是否被篡改过，验证方式非常简单，就是对`header+payload`用同样的秘钥和加密算法进行重新加密

然后把加密的结果和传入jwt的`signature`进行对比，如果完全相同，则表示前面两部分没有动过，就是自己颁发的，如果不同，肯定是被篡改过了。

```
传入的header.传入的payload.传入的signature
新的signature = header中的加密算法(传入的header.传入的payload, 秘钥)
验证：新的signature == 传入的signature
```

当令牌验证为没有被篡改后，服务器可以进行其他验证：比如是否过期、听众是否满足要求等等，这些就视情况而定了

注意：这些验证都需要服务器手动完成，没有哪个服务器会给你进行自动验证，当然，你可以借助第三方库来完成这些操作

## 总结

最后，总结一下jwt的特点：

- jwt本质上是一种令牌格式。它和终端设备无关，同样和服务器无关，甚至与如何传输无关，它只是规范了令牌的格式而已
- jwt由三部分组成：header、payload、signature。主体信息在payload
- jwt难以被篡改和伪造。这是因为有第三部分的签名存在。

## 面试题

请阐述JWT的令牌格式

> 参考答案：
>
> token 分为三段，分别是 header、payload、signature
>
> 其中，header 标识签名算法和令牌类型；payload 标识主体信息，包含令牌过期时间、发布时间、发行者、主体内容等；signature 是使用特定的算法对前面两部分进行加密，得到的加密结果。
>
> token 有防篡改的特点，如果攻击者改动了前面两个部分，就会导致和第三部分对应不上，使得 token 失效。而攻击者不知道加密秘钥，因此又无法修改第三部分的值。
>
> 所以，在秘钥不被泄露的前提下，一个验证通过的 token 是值得被信任的。


# 同源策略
浏览器有一个重要的安全策略，称之为「同源策略」

其中，$源=协议+主机+端口$，两个源相同，称之为同源，两个源不同，称之为跨源或跨域

比如：

| 源 1                  | 源 2                      | 是否同源 |
| --------------------- | ------------------------- | -------- |
| http://www.baidu.com  | http://www.baidu.com/news | ✅       |
| https://www.baidu.com | http://www.baidu.com      | ❌       |
| http://localhost:5000 | http://localhost:7000     | ❌       |
| http://localhost:5000 | http://127.0.0.1:5000     | ❌       |
| http://www.baidu.com  | http://baidu.com          | ❌       |
|                       |                           |          |

**同源策略是指，若页面的源和页面运行过程中加载的源不一致时，出于安全考虑，浏览器会对跨域的资源访问进行一些限制**

![image-20210916104747296](http://mdrs.yuanjin.tech/img/20210916104747.png)

同源策略对 ajax 的跨域限制的最为*凶狠*，默认情况下，它不允许 ajax 访问跨域资源

![image-20210916105741041](http://mdrs.yuanjin.tech/img/20210916105741.png)

所以，我们通常所说的跨域问题，就是同源策略对 ajax 产生的影响

有多种方式解决跨域问题，常见的有：

- **代理**，常用
- **CORS**，常用
- JSONP

无论使用哪一种方式，都是要让浏览器知道，我这次跨域请求的是自己人，就不要拦截了。


# 跨域-代理
**对于前端开发而言**，大部分的跨域问题，都是通过代理解决的

**代理适用的场景是：生产环境不发生跨域，但开发环境发生跨域**

因此，只需要在开发环境使用代理解决跨域即可，这种代理又称之为开发代理

![image-20210916125008693](http://mdrs.yuanjin.tech/img/20210916125008.png)

在实际开发中，只需要对开发服务器稍加配置即可完成

```js
// vue 的开发服务器代理配置
// vue.config.js
module.exports = {
  devServer: { // 配置开发服务器
    proxy: { // 配置代理
      "/api": { // 若请求路径以 /api 开头
        target: "http://dev.taobao.com", // 将其转发到 http://dev.taobao.com
      },
    },
  },
};
```


# 跨域-CORS
## 概述

`CORS`是基于`http1.1`的一种跨域解决方案，它的全称是**C**ross-**O**rigin **R**esource **S**haring，跨域资源共享。

它的总体思路是：**如果浏览器要跨域访问服务器的资源，需要获得服务器的允许**

![image-20200421152122793](http://mdrs.yuanjin.tech/img/image-20200421152122793.png)

而要知道，一个请求可以附带很多信息，从而会对服务器造成不同程度的影响

比如有的请求只是获取一些新闻，有的请求会改动服务器的数据

针对不同的请求，CORS 规定了三种不同的交互模式，分别是：

- **简单请求**
- **需要预检的请求**
- **附带身份凭证的请求**

这三种模式从上到下层层递进，请求可以做的事越来越多，要求也越来越严格。

下面分别说明三种请求模式的具体规范。

## 简单请求

当浏览器端运行了一段 ajax 代码（无论是使用 XMLHttpRequest 还是 fetch api），浏览器会首先判断它属于哪一种请求模式

### 简单请求的判定

当请求**同时满足**以下条件时，浏览器会认为它是一个简单请求：

1. **请求方法属于下面的一种：**
   - get
   - post
   - head
2. **请求头仅包含安全的字段，常见的安全字段如下：**
   - `Accept`
   - `Accept-Language`
   - `Content-Language`
   - `Content-Type`
   - `DPR`
   - `Downlink`
   - `Save-Data`
   - `Viewport-Width`
   - `Width`
   
3. **请求头如果包含`Content-Type`，仅限下面的值之一：**
   - `text/plain`
   - `multipart/form-data`
   - `application/x-www-form-urlencoded`

如果以上三个条件同时满足，浏览器判定为简单请求。

下面是一些例子：

```js
// 简单请求
fetch('http://crossdomain.com/api/news');

// 请求方法不满足要求，不是简单请求
fetch('http://crossdomain.com/api/news', {
  method: 'PUT',
});

// 加入了额外的请求头，不是简单请求
fetch('http://crossdomain.com/api/news', {
  headers: {
    a: 1,
  },
});

// 简单请求
fetch('http://crossdomain.com/api/news', {
  method: 'post',
});

// content-type不满足要求，不是简单请求
fetch('http://crossdomain.com/api/news', {
  method: 'post',
  headers: {
    'content-type': 'application/json',
  },
});
```

### 简单请求的交互规范

当浏览器判定某个**ajax 跨域请求**是**简单请求**时，会发生以下的事情

1. **请求头中会自动添加`Origin`字段**

比如，在页面`http://my.com/index.html`中有以下代码造成了跨域

```js
// 简单请求
fetch('http://crossdomain.com/api/news');
```

请求发出后，请求头会是下面的格式：

```
GET /api/news/ HTTP/1.1
Host: crossdomain.com
Connection: keep-alive
...
Referer: http://my.com/index.html
Origin: http://my.com
```

看到最后一行没，`Origin`字段会告诉服务器，是哪个源地址在跨域请求

2. **服务器响应头中应包含`Access-Control-Allow-Origin`**

当服务器收到请求后，如果允许该请求跨域访问，需要在响应头中添加`Access-Control-Allow-Origin`字段

该字段的值可以是：

- \*：表示我很开放，什么人我都允许访问
- 具体的源：比如`http://my.com`，表示我就允许你访问

> 实际上，这两个值对于客户端`http://my.com`而言，都一样，因为客户端才不会管其他源服务器允不允许，就关心自己是否被允许
>
> 当然，服务器也可以维护一个可被允许的源列表，如果请求的`Origin`命中该列表，才响应`*`或具体的源
>
> **为了避免后续的麻烦，强烈推荐响应具体的源**

假设服务器做出了以下的响应：

```
HTTP/1.1 200 OK
Date: Tue, 21 Apr 2020 08:03:35 GMT
...
Access-Control-Allow-Origin: http://my.com
...

消息体中的数据
```

当浏览器看到服务器允许自己访问后，高兴的像一个两百斤的孩子，于是，它就把响应顺利的交给 js，以完成后续的操作

下图简述了整个交互过程

![image-20200421162846480](http://mdrs.yuanjin.tech/img/image-20200421162846480.png)

## 需要预检的请求

简单的请求对服务器的威胁不大，所以允许使用上述的简单交互即可完成。

但是，如果浏览器不认为这是一种简单请求，就会按照下面的流程进行：

1. **浏览器发送预检请求，询问服务器是否允许**
2. **服务器允许**
3. **浏览器发送真实请求**
4. **服务器完成真实的响应**

比如，在页面`http://my.com/index.html`中有以下代码造成了跨域

```js
// 需要预检的请求
fetch('http://crossdomain.com/api/user', {
  method: 'POST', // post 请求
  headers: {
    // 设置请求头
    a: 1,
    b: 2,
    'content-type': 'application/json',
  },
  body: JSON.stringify({ name: '袁小进', age: 18 }), // 设置请求体
});
```

浏览器发现它不是一个简单请求，则会按照下面的流程与服务器交互

1. **浏览器发送预检请求，询问服务器是否允许**

```
OPTIONS /api/user HTTP/1.1
Host: crossdomain.com
...
Origin: http://my.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: a, b, content-type
```

可以看出，这并非我们想要发出的真实请求，请求中不包含我们的请求头，也没有消息体。

这是一个预检请求，它的目的是询问服务器，是否允许后续的真实请求。

预检请求**没有请求体**，它包含了后续真实请求要做的事情

预检请求有以下特征：

- 请求方法为`OPTIONS`
- 没有请求体
- 请求头中包含
  - `Origin`：请求的源，和简单请求的含义一致
  - `Access-Control-Request-Method`：后续的真实请求将使用的请求方法
  - `Access-Control-Request-Headers`：后续的真实请求会改动的请求头

2. **服务器允许**

服务器收到预检请求后，可以检查预检请求中包含的信息，如果允许这样的请求，需要响应下面的消息格式

```
HTTP/1.1 200 OK
Date: Tue, 21 Apr 2020 08:03:35 GMT
...
Access-Control-Allow-Origin: http://my.com
Access-Control-Allow-Methods: POST
Access-Control-Allow-Headers: a, b, content-type
Access-Control-Max-Age: 86400
...
```

对于预检请求，不需要响应任何的消息体，只需要在响应头中添加：

- `Access-Control-Allow-Origin`：和简单请求一样，表示允许的源
- `Access-Control-Allow-Methods`：表示允许的后续真实的请求方法
- `Access-Control-Allow-Headers`：表示允许改动的请求头
- `Access-Control-Max-Age`：告诉浏览器，多少秒内，对于同样的请求源、方法、头，都不需要再发送预检请求了

3. **浏览器发送真实请求**

预检被服务器允许后，浏览器就会发送真实请求了，上面的代码会发生下面的请求数据

```
POST /api/user HTTP/1.1
Host: crossdomain.com
Connection: keep-alive
...
Referer: http://my.com/index.html
Origin: http://my.com

{"name": "袁小进", "age": 18 }
```

4. **服务器响应真实请求**

```
HTTP/1.1 200 OK
Date: Tue, 21 Apr 2020 08:03:35 GMT
...
Access-Control-Allow-Origin: http://my.com
...

添加用户成功
```

可以看出，当完成预检之后，后续的处理与简单请求相同

下图简述了整个交互过程

![image-20200421165913320](http://mdrs.yuanjin.tech/img/image-20200421165913320.png)

## 附带身份凭证的请求

默认情况下，ajax 的跨域请求并不会附带 cookie，这样一来，某些需要权限的操作就无法进行

不过可以通过简单的配置就可以实现附带 cookie

```js
// xhr
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

// fetch api
fetch(url, {
  credentials: 'include',
});
```

这样一来，该跨域的 ajax 请求就是一个*附带身份凭证的请求*

当一个请求需要附带 cookie 时，无论它是简单请求，还是预检请求，都会在请求头中添加`cookie`字段

而服务器响应时，需要明确告知客户端：服务器允许这样的凭据

告知的方式也非常的简单，只需要在响应头中添加：`Access-Control-Allow-Credentials: true`即可

对于一个附带身份凭证的请求，若服务器没有明确告知，浏览器仍然视为跨域被拒绝。

另外要特别注意的是：**对于附带身份凭证的请求，服务器不得设置 `Access-Control-Allow-Origin 的值为*`**。这就是为什么不推荐使用\*的原因

## 一个额外的补充

在跨域访问时，JS 只能拿到一些最基本的响应头，如：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma，如果要访问其他头，则需要服务器设置本响应头。

`Access-Control-Expose-Headers`头让服务器把允许浏览器访问的头放入白名单，例如：

```
Access-Control-Expose-Headers: authorization, a, b
```

这样 JS 就能够访问指定的响应头了。




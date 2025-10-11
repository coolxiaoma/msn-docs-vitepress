import{_ as n,c as a,o as p,ag as e}from"./chunks/framework.B4sg4S7y.js";const h=JSON.parse('{"title":"React Hooks 超详解：从实战角度解析 7 个真正值得掌握的核心 Hook","description":"","frontmatter":{},"headers":[],"relativePath":"pages/front-end/react/React Hooks超详解.md","filePath":"pages/front-end/react/React Hooks超详解.md"}'),l={name:"pages/front-end/react/React Hooks超详解.md"};function i(c,s,t,o,r,d){return p(),a("div",null,[...s[0]||(s[0]=[e(`<h1 id="react-hooks-超详解-从实战角度解析-7-个真正值得掌握的核心-hook" tabindex="-1">React Hooks 超详解：从实战角度解析 7 个真正值得掌握的核心 Hook <a class="header-anchor" href="#react-hooks-超详解-从实战角度解析-7-个真正值得掌握的核心-hook" aria-label="Permalink to &quot;React Hooks 超详解：从实战角度解析 7 个真正值得掌握的核心 Hook&quot;">​</a></h1><h2 id="前言-停止收集-hook-像收集卡片一样" tabindex="-1">前言：停止收集 Hook 像收集卡片一样 <a class="header-anchor" href="#前言-停止收集-hook-像收集卡片一样" aria-label="Permalink to &quot;前言：停止收集 Hook 像收集卡片一样&quot;">​</a></h2><p>作为一个在 React 生态摸爬滚打多年的开发者，我见过太多同行陷入 &quot;Hook 收集癖&quot; 的陷阱。每当看到新文章介绍某个 &quot;革命性&quot; 的自定义 Hook，就忍不住想要尝试，结果项目代码变成了意大利面条。</p><p>经过无数个项目的踩坑和重构，我得出一个残酷的真相：90% 的自定义 Hook 都是过度设计的产物。</p><p>真正能在生产环境中站得住脚的，其实就是那几个经得起考验的 &quot;老兵&quot;。今天我们就来深度剖析这 7 个 Hook，从源码原理到最佳实践，一次性搞透。</p><h2 id="_1-usestate-不可撼动的状态管理基石" tabindex="-1">1. useState：不可撼动的状态管理基石 <a class="header-anchor" href="#_1-usestate-不可撼动的状态管理基石" aria-label="Permalink to &quot;1. useState：不可撼动的状态管理基石&quot;">​</a></h2><h3 id="核心原理解析" tabindex="-1">核心原理解析 <a class="header-anchor" href="#核心原理解析" aria-label="Permalink to &quot;核心原理解析&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// React内部useState的简化实现</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function useState(initialState) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span> const hook = getCurrentHook();</span></span>
<span class="line"><span></span></span>
<span class="line"><span> if (hook.memoizedState === null) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   hook.memoizedState = typeof initialState === &#39;function&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     ? initialState() : initialState;</span></span>
<span class="line"><span></span></span>
<span class="line"><span> }</span></span>
<span class="line"><span></span></span>
<span class="line"><span> const setState = (newState) =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   const currentState = hook.memoizedState;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   const nextState = typeof newState === &#39;function&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     ? newState(currentState) : newState;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  </span></span>
<span class="line"><span></span></span>
<span class="line"><span>   if (Object.is(currentState, nextState)) return;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  </span></span>
<span class="line"><span></span></span>
<span class="line"><span>   hook.memoizedState = nextState;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   scheduleWork(); // 触发重新渲染</span></span>
<span class="line"><span></span></span>
<span class="line"><span> };</span></span>
<span class="line"><span></span></span>
<span class="line"><span> return[hook.memoizedState, setState];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="实战最佳实践" tabindex="-1">实战最佳实践 <a class="header-anchor" href="#实战最佳实践" aria-label="Permalink to &quot;实战最佳实践&quot;">​</a></h3><p>❌ 常见误区：状态过度拆分</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 过度拆分，管理成本高</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const[firstName, setFirstName] = useState(&#39;&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const[lastName, setLastName] = useState(&#39;&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const[email, setEmail] = useState(&#39;&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const[phone, setPhone] = useState(&#39;&#39;)；</span></span></code></pre></div><p>✅ 推荐做法：合理聚合</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 语义化聚合，逻辑清晰</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const[userForm, setUserForm] = useState({</span></span>
<span class="line"><span></span></span>
<span class="line"><span> firstName: &#39;&#39;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span> lastName: &#39;&#39;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span> email: &#39;&#39;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span> phone: &#39;&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 使用函数式更新避免闭包陷阱</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const updateField = (field, value) =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span> setUserForm(prev =&gt; ({ ...prev,[field]: value }));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>};</span></span></code></pre></div><h3 id="性能优化要点" tabindex="-1">性能优化要点 <a class="header-anchor" href="#性能优化要点" aria-label="Permalink to &quot;性能优化要点&quot;">​</a></h3><p>React 的状态更新使用<code>Object.is\`\`()</code>进行浅比较，因此对象和数组的更新需要特别注意：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// ❌ 直接修改引用，React无法检测到变化</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const addItem = () =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span> items.push(newItem);</span></span>
<span class="line"><span></span></span>
<span class="line"><span> setItems(items);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ✅ 创建新引用，触发更新</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const addItem = () =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span> setItems(prev =&gt;[...prev, newItem]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>};</span></span></code></pre></div><h2 id="_2-useeffect-副作用管理的双刃剑" tabindex="-1">2. useEffect：副作用管理的双刃剑 <a class="header-anchor" href="#_2-useeffect-副作用管理的双刃剑" aria-label="Permalink to &quot;2. useEffect：副作用管理的双刃剑&quot;">​</a></h2><h3 id="深入理解-effect-执行机制" tabindex="-1">深入理解 Effect 执行机制 <a class="header-anchor" href="#深入理解-effect-执行机制" aria-label="Permalink to &quot;深入理解 Effect 执行机制&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// React内部useEffect的执行逻辑</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function useEffect(callback, deps) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span> const hook = getCurrentHook();</span></span>
<span class="line"><span></span></span>
<span class="line"><span> const nextDeps = deps === undefined ? null : deps;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span> if (hook.memoizedState !== null) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   const prevDeps = hook.memoizedState.deps;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   if (nextDeps !== null &amp;&amp; areHookInputsEqual(nextDeps, prevDeps)) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     return; // 依赖未变化，跳过执行</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span></span></span>
<span class="line"><span> }</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span> // 清理上一次的effect</span></span>
<span class="line"><span></span></span>
<span class="line"><span> if (hook.memoizedState?.destroy) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   hook.memoizedState.destroy();</span></span>
<span class="line"><span></span></span>
<span class="line"><span> }</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span> // 执行新的effect</span></span>
<span class="line"><span></span></span>
<span class="line"><span> const destroy = callback();</span></span>
<span class="line"><span></span></span>
<span class="line"><span> hook.memoizedState = { deps: nextDeps, destroy };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="实战场景深度解析" tabindex="-1">实战场景深度解析 <a class="header-anchor" href="#实战场景深度解析" aria-label="Permalink to &quot;实战场景深度解析&quot;">​</a></h3><h4 id="场景-1-数据获取" tabindex="-1">场景 1：数据获取 <a class="header-anchor" href="#场景-1-数据获取" aria-label="Permalink to &quot;场景 1：数据获取&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// ❌ 竞态条件和内存泄漏风险</span></span>
<span class="line"><span></span></span>
<span class="line"><span>useEffect(() =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span> fetchUserData(userId).then(setUser);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>},[userId]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ✅ 完善的异步数据获取</span></span>
<span class="line"><span></span></span>
<span class="line"><span>useEffect(() =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span> let cancelled = false;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span> const loadUser = async () =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   try {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     setLoading(true);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     const userData = await fetchUserData(userId);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     if (!cancelled) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>       setUser(userData);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   } catch (error) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     if (!cancelled) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>       setError(error);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   } finally {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     if (!cancelled) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>       setLoading(false);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span></span></span>
<span class="line"><span> };</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span> loadUser();</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span> return () =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   cancelled = true;</span></span>
<span class="line"><span></span></span>
<span class="line"><span> };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>},[userId]);</span></span></code></pre></div><h4 id="场景-2-事件监听器管理" tabindex="-1">场景 2：事件监听器管理 <a class="header-anchor" href="#场景-2-事件监听器管理" aria-label="Permalink to &quot;场景 2：事件监听器管理&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>useEffect(() =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span> const handleResize = throttle(() =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   setWindowSize({</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     width: window.innerWidth,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     height: window.innerHeight</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   });</span></span>
<span class="line"><span></span></span>
<span class="line"><span> }, 100);</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span> window.addEventListener(&#39;resize&#39;, handleResize);</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span> // 关键：清理函数防止内存泄漏</span></span>
<span class="line"><span></span></span>
<span class="line"><span> return () =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   window.removeEventListener(&#39;resize&#39;, handleResize);</span></span>
<span class="line"><span></span></span>
<span class="line"><span> };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>},[]);</span></span></code></pre></div><h3 id="依赖数组的科学管理" tabindex="-1">依赖数组的科学管理 <a class="header-anchor" href="#依赖数组的科学管理" aria-label="Permalink to &quot;依赖数组的科学管理&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// ❌ 过度依赖，导致频繁执行</span></span>
<span class="line"><span></span></span>
<span class="line"><span>useEffect(() =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span> updateChart(data, config, theme, user);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>},[data, config, theme, user]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ✅ 精确依赖，配合useCallback优化</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const updateChartData = useCallback(() =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span> updateChart(data, config);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>},[data, config]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>useEffect(() =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span> updateChartData();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>},[updateChartData]);</span></span></code></pre></div><h2 id="_3-usecontext-跨组件通信的优雅方案" tabindex="-1">3. useContext：跨组件通信的优雅方案 <a class="header-anchor" href="#_3-usecontext-跨组件通信的优雅方案" aria-label="Permalink to &quot;3. useContext：跨组件通信的优雅方案&quot;">​</a></h2><h3 id="context-设计原则与性能考量" tabindex="-1">Context 设计原则与性能考量 <a class="header-anchor" href="#context-设计原则与性能考量" aria-label="Permalink to &quot;Context 设计原则与性能考量&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// ✅ 按功能域拆分Context，避免过度渲染</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const ThemeContext = createContext();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const UserContext = createContext();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const SettingsContext = createContext();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ❌ 单一巨型Context，牵一发动全身</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const AppContext = createContext();</span></span></code></pre></div><h3 id="高级封装模式" tabindex="-1">高级封装模式 <a class="header-anchor" href="#高级封装模式" aria-label="Permalink to &quot;高级封装模式&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 自定义Hook封装，提供类型安全和默认值</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function useTheme() {</span></span>
<span class="line"><span></span></span>
<span class="line"><span> const context = useContext(ThemeContext);</span></span>
<span class="line"><span></span></span>
<span class="line"><span> if (!context) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   throw new Error(&#39;useTheme必须在ThemeProvider内使用&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span> }</span></span>
<span class="line"><span></span></span>
<span class="line"><span> return context;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// Provider组件的性能优化</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function ThemeProvider({ children }) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span> const[theme, setTheme] = useState(&#39;light&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span> // 使用useMemo避免每次渲染都创建新对象</span></span>
<span class="line"><span></span></span>
<span class="line"><span> const value = useMemo(() =&gt; ({</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   theme,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   setTheme,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   toggleTheme: () =&gt; setTheme(prev =&gt; prev === &#39;light&#39; ? &#39;dark&#39; : &#39;light&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span> }),[theme]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span> return (</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;ThemeContext.Provider value={value}&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     {children}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;/ThemeContext.Provider&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span> );</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="_4-usememo-计算结果的智能缓存" tabindex="-1">4. useMemo：计算结果的智能缓存 <a class="header-anchor" href="#_4-usememo-计算结果的智能缓存" aria-label="Permalink to &quot;4. useMemo：计算结果的智能缓存&quot;">​</a></h2><h3 id="缓存策略的底层实现" tabindex="-1">缓存策略的底层实现 <a class="header-anchor" href="#缓存策略的底层实现" aria-label="Permalink to &quot;缓存策略的底层实现&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// React内部useMemo的简化实现</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function useMemo(create, deps) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span> const hook = getCurrentHook();</span></span>
<span class="line"><span></span></span>
<span class="line"><span> const nextDeps = deps === undefined ? null : deps;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span> if (hook.memoizedState !== null) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   const prevDeps = hook.memoizedState\\[1];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   if (nextDeps !== null &amp;&amp; areHookInputsEqual(nextDeps, prevDeps)) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     return hook.memoizedState\\[0]; // 返回缓存值</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span></span></span>
<span class="line"><span> }</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span> const nextValue = create();</span></span>
<span class="line"><span></span></span>
<span class="line"><span> hook.memoizedState =[nextValue, nextDeps];</span></span>
<span class="line"><span></span></span>
<span class="line"><span> return nextValue;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="实际应用场景" tabindex="-1">实际应用场景 <a class="header-anchor" href="#实际应用场景" aria-label="Permalink to &quot;实际应用场景&quot;">​</a></h3><h4 id="场景-1-复杂数据处理" tabindex="-1">场景 1：复杂数据处理 <a class="header-anchor" href="#场景-1-复杂数据处理" aria-label="Permalink to &quot;场景 1：复杂数据处理&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 大数据量的过滤和排序</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const processedData = useMemo(() =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span> return rawData</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   .filter(item =&gt; item.status === &#39;active&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   .sort((a, b) =&gt; b.priority - a.priority)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   .slice(0, 100);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>},[rawData]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 计算密集型操作</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const expensiveValue = useMemo(() =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span> return heavyComputationFunction(input);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>},[input]);</span></span></code></pre></div><h4 id="场景-2-引用稳定性优化" tabindex="-1">场景 2：引用稳定性优化 <a class="header-anchor" href="#场景-2-引用稳定性优化" aria-label="Permalink to &quot;场景 2：引用稳定性优化&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 为子组件提供稳定的props引用</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const chartConfig = useMemo(() =&gt; ({</span></span>
<span class="line"><span></span></span>
<span class="line"><span> type: &#39;line&#39;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span> data: processedData,</span></span>
<span class="line"><span></span></span>
<span class="line"><span> options: {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   responsive: true,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   plugins: {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     legend: { position: &#39;top&#39; }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span></span></span>
<span class="line"><span> }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}),[processedData]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>return&lt;Chart config={chartConfig} /&gt;;</span></span></code></pre></div><h3 id="性能权衡分析" tabindex="-1">性能权衡分析 <a class="header-anchor" href="#性能权衡分析" aria-label="Permalink to &quot;性能权衡分析&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// ❌ 过度使用，反而增加开销</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const simpleValue = useMemo(() =&gt; a + b,[a, b]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// ✅ 合理使用，真正发挥作用</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const complexValue = useMemo(() =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span> // 假设这是一个耗时的计算</span></span>
<span class="line"><span></span></span>
<span class="line"><span> return expensiveCalculation(data);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>},[data]);</span></span></code></pre></div><h2 id="_5-usecallback-函数引用的稳定化工具" tabindex="-1">5. useCallback：函数引用的稳定化工具 <a class="header-anchor" href="#_5-usecallback-函数引用的稳定化工具" aria-label="Permalink to &quot;5. useCallback：函数引用的稳定化工具&quot;">​</a></h2><h3 id="与-usememo-的本质区别" tabindex="-1">与 useMemo 的本质区别 <a class="header-anchor" href="#与-usememo-的本质区别" aria-label="Permalink to &quot;与 useMemo 的本质区别&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// useCallback实际上是useMemo的特殊形式</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const memoizedCallback = useCallback(fn, deps);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 等价于</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const memoizedCallback = useMemo(() =&gt; fn, deps);</span></span></code></pre></div><h3 id="典型应用模式" tabindex="-1">典型应用模式 <a class="header-anchor" href="#典型应用模式" aria-label="Permalink to &quot;典型应用模式&quot;">​</a></h3><h4 id="模式-1-优化子组件渲染" tabindex="-1">模式 1：优化子组件渲染 <a class="header-anchor" href="#模式-1-优化子组件渲染" aria-label="Permalink to &quot;模式 1：优化子组件渲染&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const ParentComponent = ({ items }) =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span> // ❌ 每次渲染都创建新函数，导致子组件重渲染</span></span>
<span class="line"><span></span></span>
<span class="line"><span> const handleItemClick = (id) =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   updateItem(id);</span></span>
<span class="line"><span></span></span>
<span class="line"><span> };</span></span>
<span class="line"><span></span></span>
<span class="line"><span> // ✅ 稳定的函数引用</span></span>
<span class="line"><span></span></span>
<span class="line"><span> const handleItemClick = useCallback((id) =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   updateItem(id);</span></span>
<span class="line"><span></span></span>
<span class="line"><span> },[]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span> return (</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;div&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     {items.map(item =&gt; (</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      &lt;MemoizedItem</span></span>
<span class="line"><span></span></span>
<span class="line"><span>         key={item.id}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>         item={item}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>         onClick={handleItemClick}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>       /&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     ))}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span> );</span></span>
<span class="line"><span></span></span>
<span class="line"><span>};</span></span></code></pre></div><h4 id="模式-2-自定义-hook-中的函数导出" tabindex="-1">模式 2：自定义 Hook 中的函数导出 <a class="header-anchor" href="#模式-2-自定义-hook-中的函数导出" aria-label="Permalink to &quot;模式 2：自定义 Hook 中的函数导出&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function useApiCall(endpoint) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span> const[data, setData] = useState(null);</span></span>
<span class="line"><span></span></span>
<span class="line"><span> const[loading, setLoading] = useState(false);</span></span>
<span class="line"><span></span></span>
<span class="line"><span> const fetchData = useCallback(async (params = {}) =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   setLoading(true);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   try {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     const result = await api.get(endpoint, { params });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     setData(result.data);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   } catch (error) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     console.error(&#39;API调用失败:&#39;, error);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   } finally {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     setLoading(false);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   }</span></span>
<span class="line"><span></span></span>
<span class="line"><span> },[endpoint]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span> return { data, loading, fetchData };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="_6-useref-可变引用的多面手" tabindex="-1">6. useRef：可变引用的多面手 <a class="header-anchor" href="#_6-useref-可变引用的多面手" aria-label="Permalink to &quot;6. useRef：可变引用的多面手&quot;">​</a></h2><h3 id="核心机制深度理解" tabindex="-1">核心机制深度理解 <a class="header-anchor" href="#核心机制深度理解" aria-label="Permalink to &quot;核心机制深度理解&quot;">​</a></h3><p>useRef 的独特之处在于它绕过了 React 的渲染机制：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// useRef的内部实现简化版本</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function useRef(initialValue) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span> const hook = getCurrentHook();</span></span>
<span class="line"><span></span></span>
<span class="line"><span> if (hook.memoizedState === null) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   hook.memoizedState = { current: initialValue };</span></span>
<span class="line"><span></span></span>
<span class="line"><span> }</span></span>
<span class="line"><span></span></span>
<span class="line"><span> return hook.memoizedState;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="高级应用场景" tabindex="-1">高级应用场景 <a class="header-anchor" href="#高级应用场景" aria-label="Permalink to &quot;高级应用场景&quot;">​</a></h3><h4 id="场景-1-dom-操作与焦点管理" tabindex="-1">场景 1：DOM 操作与焦点管理 <a class="header-anchor" href="#场景-1-dom-操作与焦点管理" aria-label="Permalink to &quot;场景 1：DOM 操作与焦点管理&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function SearchInput() {</span></span>
<span class="line"><span></span></span>
<span class="line"><span> const inputRef = useRef(null);</span></span>
<span class="line"><span></span></span>
<span class="line"><span> const[query, setQuery] = useState(&#39;&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span> // 组件挂载时自动聚焦</span></span>
<span class="line"><span></span></span>
<span class="line"><span> useEffect(() =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   inputRef.current?.focus();</span></span>
<span class="line"><span></span></span>
<span class="line"><span> },[]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span> const clearAndFocus = () =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   setQuery(&#39;&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   inputRef.current?.focus();</span></span>
<span class="line"><span></span></span>
<span class="line"><span> };</span></span>
<span class="line"><span></span></span>
<span class="line"><span> return (</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;div&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;input</span></span>
<span class="line"><span></span></span>
<span class="line"><span>       ref={inputRef}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>       value={query}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>       onChange={(e) =&gt; setQuery(e.target.value)}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>       placeholder=&quot;搜索...&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     /&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;button onClick={clearAndFocus}&gt;清空\\&lt;/button&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span> );</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="场景-2-保存前一次的值" tabindex="-1">场景 2：保存前一次的值 <a class="header-anchor" href="#场景-2-保存前一次的值" aria-label="Permalink to &quot;场景 2：保存前一次的值&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function usePrevious(value) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span> const ref = useRef();</span></span>
<span class="line"><span></span></span>
<span class="line"><span> useEffect(() =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   ref.current = value;</span></span>
<span class="line"><span></span></span>
<span class="line"><span> });</span></span>
<span class="line"><span></span></span>
<span class="line"><span> return ref.current;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 使用示例</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function Component({ count }) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span> const prevCount = usePrevious(count);</span></span>
<span class="line"><span></span></span>
<span class="line"><span> return (</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;div&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;p&gt;当前值: {count}\\&lt;/p&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;p&gt;前一个值: {prevCount}\\&lt;/p&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;p&gt;变化量: {count - (prevCount || 0)}\\&lt;/p&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;/div&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span> );</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="场景-3-定时器和间隔器管理" tabindex="-1">场景 3：定时器和间隔器管理 <a class="header-anchor" href="#场景-3-定时器和间隔器管理" aria-label="Permalink to &quot;场景 3：定时器和间隔器管理&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function useInterval(callback, delay) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span> const savedCallback = useRef();</span></span>
<span class="line"><span></span></span>
<span class="line"><span> // 保存最新的回调函数</span></span>
<span class="line"><span></span></span>
<span class="line"><span> useEffect(() =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   savedCallback.current = callback;</span></span>
<span class="line"><span></span></span>
<span class="line"><span> },[callback]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span> // 设置间隔器</span></span>
<span class="line"><span></span></span>
<span class="line"><span> useEffect(() =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   if (delay === null) return;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  </span></span>
<span class="line"><span></span></span>
<span class="line"><span>   const tick = () =&gt; savedCallback.current();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   const id = setInterval(tick, delay);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   return () =&gt; clearInterval(id);</span></span>
<span class="line"><span></span></span>
<span class="line"><span> },[delay]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="_7-usereducer-复杂状态逻辑的终极武器" tabindex="-1">7. useReducer：复杂状态逻辑的终极武器 <a class="header-anchor" href="#_7-usereducer-复杂状态逻辑的终极武器" aria-label="Permalink to &quot;7. useReducer：复杂状态逻辑的终极武器&quot;">​</a></h2><h3 id="设计哲学与适用场景" tabindex="-1">设计哲学与适用场景 <a class="header-anchor" href="#设计哲学与适用场景" aria-label="Permalink to &quot;设计哲学与适用场景&quot;">​</a></h3><p>当组件状态满足以下条件时，考虑使用 useReducer：</p><ol><li><p>状态逻辑复杂，涉及多个子值</p></li><li><p>下一个状态依赖于前一个状态</p></li><li><p>状态更新需要复杂的业务逻辑</p></li></ol><h3 id="企业级实战案例" tabindex="-1">企业级实战案例 <a class="header-anchor" href="#企业级实战案例" aria-label="Permalink to &quot;企业级实战案例&quot;">​</a></h3><h4 id="复杂表单状态管理" tabindex="-1">复杂表单状态管理 <a class="header-anchor" href="#复杂表单状态管理" aria-label="Permalink to &quot;复杂表单状态管理&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const formReducer = (state, action) =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span> switch (action.type) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   case &#39;SET\\_FIELD&#39;:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     return {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>       ...state,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>       values: {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>         ...state.values,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        [action.field]: action.value</span></span>
<span class="line"><span></span></span>
<span class="line"><span>       },</span></span>
<span class="line"><span></span></span>
<span class="line"><span>       errors: {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>         ...state.errors,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        [action.field]: null // 清除该字段错误</span></span>
<span class="line"><span></span></span>
<span class="line"><span>       }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    </span></span>
<span class="line"><span></span></span>
<span class="line"><span>   case &#39;SET\\_ERRORS&#39;:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     return {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>       ...state,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>       errors: action.errors</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    </span></span>
<span class="line"><span></span></span>
<span class="line"><span>   case &#39;SET\\_LOADING&#39;:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     return {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>       ...state,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>       loading: action.loading</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    </span></span>
<span class="line"><span></span></span>
<span class="line"><span>   case &#39;RESET\\_FORM&#39;:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     return action.initialState;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    </span></span>
<span class="line"><span></span></span>
<span class="line"><span>   default:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     throw new Error(\\\`未知的action类型:\${action.type}\\\`);</span></span>
<span class="line"><span></span></span>
<span class="line"><span> }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function useForm(initialValues) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span> const[state, dispatch] = useReducer(formReducer, {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   values: initialValues,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   errors: {},</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   loading: false</span></span>
<span class="line"><span></span></span>
<span class="line"><span> });</span></span>
<span class="line"><span></span></span>
<span class="line"><span> const setField = (field, value) =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   dispatch({ type: &#39;SET\\_FIELD&#39;, field, value });</span></span>
<span class="line"><span></span></span>
<span class="line"><span> };</span></span>
<span class="line"><span></span></span>
<span class="line"><span> const setErrors = (errors) =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   dispatch({ type: &#39;SET\\_ERRORS&#39;, errors });</span></span>
<span class="line"><span></span></span>
<span class="line"><span> };</span></span>
<span class="line"><span></span></span>
<span class="line"><span> const resetForm = () =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   dispatch({</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     type: &#39;RESET\\_FORM&#39;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     initialState: {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>       values: initialValues,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>       errors: {},</span></span>
<span class="line"><span></span></span>
<span class="line"><span>       loading: false</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   });</span></span>
<span class="line"><span></span></span>
<span class="line"><span> };</span></span>
<span class="line"><span></span></span>
<span class="line"><span> return {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   ...state,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   setField,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   setErrors,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   resetForm</span></span>
<span class="line"><span></span></span>
<span class="line"><span> };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="与-context-结合的全局状态管理" tabindex="-1">与 Context 结合的全局状态管理 <a class="header-anchor" href="#与-context-结合的全局状态管理" aria-label="Permalink to &quot;与 Context 结合的全局状态管理&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 轻量级状态管理解决方案</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const AppStateContext = createContext();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const appReducer = (state, action) =&gt; {</span></span>
<span class="line"><span></span></span>
<span class="line"><span> switch (action.type) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   case &#39;SET\\_USER&#39;:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     return { ...state, user: action.user };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   case &#39;SET\\_THEME&#39;:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     return { ...state, theme: action.theme };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   case &#39;ADD\\_NOTIFICATION&#39;:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     return {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>       ...state,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>       notifications:[...state.notifications, action.notification]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   default:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     return state;</span></span>
<span class="line"><span></span></span>
<span class="line"><span> }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export function AppProvider({ children }) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span> const[state, dispatch] = useReducer(appReducer, {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   user: null,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   theme: &#39;light&#39;,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   notifications:[]</span></span>
<span class="line"><span></span></span>
<span class="line"><span> });</span></span>
<span class="line"><span></span></span>
<span class="line"><span> return (</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;AppStateContext.Provider value={{ state, dispatch }}&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>     {children}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;/AppStateContext.Provider&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span> );</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="总结-hook-选择的工程化思考" tabindex="-1">总结：Hook 选择的工程化思考 <a class="header-anchor" href="#总结-hook-选择的工程化思考" aria-label="Permalink to &quot;总结：Hook 选择的工程化思考&quot;">​</a></h2><p>经过深度剖析这 7 个核心 Hook，我们可以总结出一套 Hook 选择的决策树：</p><ul><li><p>简单状态 → useState</p></li><li><p>副作用处理 → useEffect（谨慎使用依赖数组）</p></li><li><p>跨组件通信 → useContext（合理拆分 Context）</p></li><li><p>昂贵计算缓存 → useMemo（确保真的昂贵）</p></li><li><p>函数引用稳定 → useCallback（配合 memo 使用）</p></li><li><p>DOM 引用 / 可变值 → useRef（不触发重渲染）</p></li><li><p>复杂状态逻辑 → useReducer（状态机思维）</p></li></ul><p>记住，技术选择的核心不是炫技，而是解决实际问题。这 7 个 Hook 已经能够覆盖 95% 的实际开发场景，掌握它们的原理和最佳实践，比追求那些花哨的自定义 Hook 更有价值。</p><p>在下一篇文章中，我们将深入探讨如何基于这些核心 Hook 构建高质量的自定义 Hook。关注我，不错过每一个深度技术解析！</p><p>你觉得哪个 Hook 最容易被误用？在评论区分享你的踩坑经历！</p><blockquote><p>（注：文档部分内容可能由 AI 生成）</p></blockquote>`,76)])])}const g=n(l,[["render",i]]);export{h as __pageData,g as default};

---
# 在 Frontmatter 中定义一些元数据
title: 关于我
description: 前端开发工程师的个人介绍
---

<script setup>
import { ref, onMounted } from 'vue'

// 可以在这里添加一些交互逻辑
const skills = ref([
  { name: 'Vue.js', level: 90 },
  { name: 'React', level: 85 },
  { name: 'JavaScript', level: 95 },
  { name: 'TypeScript', level: 80 },
  { name: 'CSS3', level: 90 },
  { name: 'Node.js', level: 75 }
])
</script>

<style scoped>
/* 主容器样式 */
.about-container {
  min-height: 100vh;
  min-width: 50vw;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

/* 背景动画元素 */
.about-container::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: float 20s infinite linear;
  z-index: 0;
}

@keyframes float {
  0% { transform: translate(0, 0) rotate(0deg); }
  100% { transform: translate(-50px, -50px) rotate(360deg); }
}

/* 内容区域 */
.content-wrapper {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
}

/* 头部信息样式 */
.hero-section {
  text-align: center;
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  margin-bottom: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.3);
  margin: 0 auto 2rem;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.name {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.5rem;
  font-weight: 700;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  animation: slideInUp 1s ease-out;
}

.title {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  font-weight: 300;
}

/* 社交链接 */
.social-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
}

.social-link {
  display: inline-flex;
  align-items: center;
  padding: 0.8rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.social-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* 内容区域网格 */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 3rem;
}

@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

/* 卡片样式 */
.card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.card h2 {
  color: white;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  text-align: center;
}

/* 技能条样式 */
.skill-item {
  margin-bottom: 1.5rem;
}

.skill-header {
  display: flex;
  justify-content: between;
  margin-bottom: 0.5rem;
}

.skill-name {
  color: white;
  font-weight: 500;
}

.skill-percent {
  color: rgba(255, 255, 255, 0.8);
}

.skill-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
  border-radius: 4px;
  transition: width 1s ease-in-out;
}

/* 动画类 */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in {
  animation: slideInUp 0.8s ease-out;
}
</style>

<div class="about-container">
  <div class="content-wrapper">
    <!-- 头部信息 -->
    <section class="hero-section">
      <div class="avatar">
        <!-- 这里可以放头像图片 -->
        <img src="/avatar.jpg" alt="头像" style="width: 100px; height: 100px;border-radius: 50%;">
        <!-- 👨‍💻 -->
      </div>
      <h1 class="name">小马_xiaoen</h1>
      <p class="title">前端开发工程师 | 技术爱好者</p>
      <p style="color: rgba(255, 255, 255, 0.8); font-size: 1.2rem; line-height: 1.6; max-width: 600px; margin: 0 auto;">
        热爱前端技术，专注于创造优雅、高效的Web体验。<br>
        致力于将创意转化为代码，让技术与艺术完美融合。
      </p>
      <div class="social-links">
        <a href="https://github.com/yourusername" class="social-link" target="_blank">
          📘 GitHub
        </a>
        <a href="https://juejin.cn/user/yourid" class="social-link" target="_blank">
          📝 掘金
        </a>
        <a href="mailto:your-email@example.com" class="social-link">
          📧 邮箱
        </a>
      </div>
    </section>
    <!-- 内容区域 -->
    <div class="content-grid">
      <!-- 左侧：关于我 -->
      <section class="card animate-slide-in">
        <h2>🎯 关于我</h2>
        <div style="color: rgba(255, 255, 255, 0.9); line-height: 1.8;">
          <p>嗨！我是一名充满激情的前端开发者，拥有 <strong>5年+</strong> 的前端开发经验。</p>
          <p>我热衷于：</p>
          <ul>
            <li>探索最新的前端技术和框架</li>
            <li>构建用户友好的交互界面</li>
            <li>优化Web性能和使用体验</li>
            <li>分享技术知识和学习心得</li>
          </ul>
          <p>相信代码能够改变世界，致力于用技术创造更美好的数字体验。</p>
        </div>
      </section>
      <!-- 右侧：技术栈 -->
      <section class="card animate-slide-in">
        <h2>🛠️ 技术栈</h2>
        <div class="skills-container">
          <div v-for="skill in skills" :key="skill.name" class="skill-item">
            <div class="skill-header">
              <span class="skill-name">{{ skill.name }}</span>
              <span class="skill-percent">{{ skill.level }}%</span>
            </div>
            <div class="skill-bar">
              <div class="skill-progress" :style="{ width: skill.level + '%' }"></div>
            </div>
          </div>
        </div>
      </section>
      <!-- 底部：经历/项目 -->
      <section class="card animate-slide-in" style="grid-column: 1 / -1;">
        <h2>🚀 经历与项目</h2>
        <div style="color: rgba(255, 255, 255, 0.9);">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
            <div>
              <h3 style="color: #4ecdc4; margin-bottom: 0.5rem;">工作经历</h3>
              <ul>
                <li>某互联网公司 - 高级前端工程师 (2020-至今)</li>
                <li>某科技公司 - 前端开发工程师 (2018-2020)</li>
              </ul>
            </div>
            <div>
              <h3 style="color: #4ecdc4; margin-bottom: 0.5rem;">开源项目</h3>
              <ul>
                <li>Vue3 Admin Template - 基于Vue3的管理后台模板</li>
                <li>React Component Library - 可复用的React组件库</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</div>
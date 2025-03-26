# Vue Auth Frontend with Mock API

**⚠️ 项目定位**  
一个提供基础用户认证（登录/注册）前端实现的 Vue3 项目，附带模拟接口。  
适用于需要 **快速验证认证流程** 或 **临时解决冷门需求** 的场景，**不建议直接用于生产环境**。

```text
为什么存在这个项目？
- 当你需要测试一个依赖用户系统的原型时
- 当你的临时项目需要一个"能用就行"的认证界面时
- 当你不想为一次性需求配置完整认证服务时
```

## 技术栈
- 前端：Vue 3 + Vite + Pinia
- 接口：Mock Service Worker (MSW) 模拟
- UI：原生HTML/CSS (无UI框架依赖)

## 快速使用
```bash
# 安装依赖
npm install

# 启动开发服务器（含mock接口）
npm run dev
```

## 接口说明
模拟以下 RESTful 接口：
- `POST /api/login` - 模拟登录（返回JWT）
- `POST /api/register` - 模拟注册
- `GET /api/user` - 获取当前用户信息

```javascript
// 示例请求
await fetch('/api/login', {
  method: 'POST',
  body: JSON.stringify({ username: 'demo', password: 'demo' })
})
```

## 设计原则
1. **最小化实现** - 只保留核心认证逻辑
2. **零第三方依赖** - 方便移植到任何项目
3. **显式妥协** - 已知安全性和扩展性不足，但够用于临时场景

## 何时不该使用
❌ 需要生产级安全的系统  
❌ 需要SSO/OAuth等高级功能  
❌ 长期维护的项目

## 协议
MIT - 你可以随意使用，但**建议 fork 后按需改造**而非直接依赖

---

这个 README 的特点：
1. 开篇明确项目边界和适用场景
2. 强调"临时解决方案"的定位
3. 用符号视觉化区分注意事项
4. 包含明确的"何时不该使用"警告
5. 保持接口文档的实用性

需要调整任何部分可以告诉我，我可以帮你优化特定章节。

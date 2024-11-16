// src/components/auth/LoginForm.vue
<template>
  <div class="auth-form">
    <h2>登录</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>账号:</label>
        <input v-model="form.username" type="text" required>
      </div>

      <div class="form-group">
        <label>密码:</label>
        <input v-model="form.password" type="password" required>
      </div>

      <button type="submit">登录</button>

      <div class="form-links">
        <a @click="$emit('switch-mode', 'forgot')">忘记密码?</a>
        <a @click="$emit('switch-mode', 'register')">注册账号</a>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { auth } from '@/api/auth'
import tokenUtils from '@/utils/token'

export default {
  emits: ['switch-mode'],
  setup() {
    const form = ref({
      username: '',
      password: ''
    })

    const handleSubmit = async () => {
      try {
        const { data } = await auth.login(form.value)
        tokenUtils.setToken(data.token)
        alert('登录成功!')
      } catch (error) {
        alert(error.response?.data?.message || '登录失败')
      }
    }

    return {
      form,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
}

.auth-form {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-links {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}

.form-links a {
  color: #2196F3;
  cursor: pointer;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #1976D2;
}
</style>

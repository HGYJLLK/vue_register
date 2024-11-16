// src/components/RegisterForm.vue
<template>
  <div class="register-form">
    <h2>注册</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>账号:</label>
        <input
          v-model="form.username"
          type="text"
          required
        >
      </div>

      <div class="form-group">
        <label>密码:</label>
        <input
          v-model="form.password"
          type="password"
          required
        >
      </div>

      <div class="form-group">
        <label>确认密码:</label>
        <input
          v-model="form.confirmPassword"
          type="password"
          required
        >
      </div>

      <div class="form-group">
        <label>密保问题:</label>
        <input
          v-model="form.security_question"
          type="text"
          required
        >
      </div>

      <div class="form-group">
        <label>密保答案:</label>
        <input
          v-model="form.security_answer"
          type="text"
          required
        >
      </div>

      <button type="submit">注册</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'

export default {
  setup() {
    const form = ref({
      username: '',
      password: '',
      confirmPassword: '',
      security_question: '',
      security_answer: ''
    })

    const handleSubmit = async () => {
      if (form.value.password !== form.value.confirmPassword) {
        alert('两次密码输入不一致!')
        return
      }

      try {
        const response = await axios.post('http://localhost:5000/register', {
          username: form.value.username,
          password: form.value.password,
          security_question: form.value.security_question,
          security_answer: form.value.security_answer
        })

        alert('注册成功!')
        // 可以在这里添加路由跳转到登录页面
      } catch (error) {
        alert(error.response?.data?.message || '注册失败')
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
.register-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>

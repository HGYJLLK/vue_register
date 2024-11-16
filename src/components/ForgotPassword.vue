<template>
  <div class="auth-form">
    <h2>找回密码</h2>
    <div v-if="!securityVerified">
      <form @submit.prevent="verifySecurityQuestion">
        <div class="form-group">
          <label>账号:</label>
          <input 
            v-model="form.username" 
            type="text" 
            required
            @input="getSecurityQuestion"
          >
        </div>
        
        <div class="form-group" v-if="securityQuestion">
          <label>密保问题:</label>
          <div class="security-question">{{ securityQuestion }}</div>
        </div>
        
        <div class="form-group" v-if="securityQuestion">
          <label>密保答案:</label>
          <input 
            v-model="form.security_answer" 
            type="text" 
            required
          >
          <button type="submit" style="margin-top: 10px;">验证</button>
        </div>
      </form>
    </div>
    
    <div v-else>
      <form @submit.prevent="resetPassword">
        <div class="form-group">
          <label>新密码:</label>
          <input 
            v-model="form.new_password" 
            type="password" 
            required
          >
        </div>
        
        <div class="form-group">
          <label>确认新密码:</label>  
          <input 
            v-model="form.confirm_password" 
            type="password" 
            required
          >
        </div>
        
        <button type="submit">重置密码</button>
      </form>
    </div>
    
    <div class="form-links">
      <a @click="$emit('switch-mode', 'login')">返回登录</a>  
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { auth } from '@/api/auth'

export default {
  emits: ['switch-mode'],
  
  setup(props, { emit }) {
    const securityVerified = ref(false)
    const securityQuestion = ref('')
    const form = ref({
      username: '',
      security_answer: '',
      new_password: '',
      confirm_password: ''
    })

    // 获取密保问题
    const getSecurityQuestion = async () => {
      if (form.value.username) {
        try {
          const response = await auth.verifySecurityQuestion({
            username: form.value.username
            // 不传security_answer,后端会返回密保问题
          })
          securityQuestion.value = response.data.security_question
        } catch (error) {
          console.error('获取密保问题失败:', error)
        }
      }
    }

    // 验证密保答案
    const verifySecurityQuestion = async () => {
      try {
        const response = await auth.verifySecurityQuestion({
          username: form.value.username,
          security_answer: form.value.security_answer
        })
        if (response.data.verified) {
          securityVerified.value = true 
        }
      } catch (error) {
        alert(error.response?.data?.message || '验证失败')
      }
    }

    const resetPassword = async () => {
      if (form.value.new_password !== form.value.confirm_password) {
        alert('两次密码输入不一致!')
        return
      }

      try {
        await auth.resetPassword({
          username: form.value.username,
          new_password: form.value.new_password
        })
        alert('密码重置成功!')
        emit('switch-mode', 'login')
      } catch (error) {
        console.error('重置密码失败:', error)
        alert(error.response?.data?.message || '重置密码失败')
      }
    }

    return {
      form,
      securityQuestion,
      securityVerified,
      getSecurityQuestion,
      verifySecurityQuestion,
      resetPassword
    }
  }
}
</script>

<style scoped>
.auth-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.security-question {
  padding: 8px;
  background-color: #f5f5f5;
  border-radius: 4px;
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

.form-links {
  margin-top: 15px;
  text-align: center;
}

.form-links a {
  color: #4CAF50;
  cursor: pointer;
}
</style>
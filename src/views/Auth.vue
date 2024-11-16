// src/views/Auth.vue
<template>
  <div class="auth-container">
    <LoginForm
      v-if="currentMode === 'login'"
      @switch-mode="switchMode"
    />
    <RegisterForm
      v-if="currentMode === 'register'"
      @switch-mode="switchMode"
    />
    <ForgotPassword
      v-if="currentMode === 'forgot'"
      @switch-mode="switchMode"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'
import ForgotPassword from '@/components/ForgotPassword.vue'

export default {
  name: 'Auth',
  components: {
    LoginForm,
    RegisterForm,
    ForgotPassword
  },
  setup() {
    const currentMode = ref('login')

    const switchMode = (mode) => {
      currentMode.value = mode
    }

    return {
      currentMode,
      switchMode
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
  padding: 20px;
  background-color: #f5f5f5;
}

:deep(.auth-form) {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

:deep(.form-group) {
  margin-bottom: 15px;
}

:deep(.form-group label) {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

:deep(.form-group input) {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

:deep(.form-links) {
  margin-top: 15px;
  text-align: center;
}

:deep(.form-links a) {
  color: #2196F3;
  cursor: pointer;
  margin: 0 10px;
}

:deep(button) {
  width: 100%;
  padding: 10px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

:deep(button:hover) {
  background-color: #1976D2;
}

:deep(h2) {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}
</style>

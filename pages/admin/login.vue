<template>
  <div class="login-wrapper">
    <div class="login-background">
      <div class="circle c1"></div>
      <div class="circle c2"></div>
    </div>
    
    <div class="login-card">
      <div class="login-header">
        <a href="/" class="back-link">← Halaman Utama</a>
        <h1 class="login-title">ADMIN PANEL</h1>
        <p class="login-subtitle">Masuk untuk mengelola portofolio & blog</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div v-if="errorMessage" class="alert error">
          <span>{{ errorMessage }}</span>
        </div>
        
        <div class="form-group">
          <label for="username">Username</label>
          <input 
            type="text" 
            id="username" 
            v-model="username" 
            placeholder="Masukkan username" 
            required 
            :disabled="loading"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            placeholder="Masukkan password" 
            required 
            :disabled="loading"
          />
        </div>

        <button type="submit" class="btn-login" :disabled="loading">
          <span v-if="loading">Menghubungkan...</span>
          <span v-else>Masuk Sekarang</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''
  
  try {
    const response = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        username: username.value,
        password: password.value
      }
    })
    
    if (response.success) {
      // Redirect to admin dashboard
      navigateTo('/admin/dashboard')
    }
  } catch (error) {
    errorMessage.value = error.data?.statusMessage || 'Username atau password salah.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1e201e; /* Match main site body */
  position: relative;
  overflow: hidden;
  font-family: 'Outfit', sans-serif;
  padding: 2rem;
}

.login-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.25;
}

.c1 {
  width: 400px;
  height: 400px;
  background-color: #e5a93c; /* Gold */
  top: -100px;
  right: -50px;
}

.c2 {
  width: 500px;
  height: 500px;
  background-color: #2e4f3b; /* Forest Green */
  bottom: -150px;
  left: -100px;
}

.login-card {
  width: 100%;
  max-width: 450px;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 24px;
  padding: 3rem 2.5rem;
  z-index: 2;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

.login-header {
  margin-bottom: 2.5rem;
  text-align: center;
}

.back-link {
  display: inline-block;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  transition: color 0.3s;
}

.back-link:hover {
  color: #e5a93c;
}

.login-title {
  font-size: 2.2rem;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.login-subtitle {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.5);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.alert {
  padding: 1rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
}

.alert.error {
  background-color: rgba(220, 53, 69, 0.15);
  border: 1px solid rgba(220, 53, 69, 0.3);
  color: #ff6b6b;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.03em;
}

.form-group input {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 0.9rem 1.2rem;
  color: #ffffff;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #e5a93c;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 10px rgba(229, 169, 60, 0.15);
}

.btn-login {
  background: #e5a93c;
  color: #1e201e;
  border: none;
  border-radius: 50px;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.btn-login:hover:not(:disabled) {
  background: #c68d27;
  transform: translateY(-2px);
}

.btn-login:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>

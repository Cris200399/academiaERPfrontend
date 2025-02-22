<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <div class="brand">
          <h1>Somos Campeones</h1>
        </div>
        <h2>Iniciar sesión</h2>
        <form @submit.prevent="login">
          <div class="input-group">
            <label for="email">Email</label>
            <input
                id="email"
                type="email"
                v-model="email"
                placeholder="ejemplo@dominio.com"
                required
            />
          </div>

          <div class="input-group">
            <label for="password">Contraseña</label>
            <input
                id="password"
                type="password"
                v-model="password"
                placeholder="Tu contraseña"
                required
            />
            <div class="forgot-password">
              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>
          </div>

          <button type="submit" class="login-btn">
            <span>Ingresar</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                    d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8z"/>
            </svg>
          </button>
        </form>
        <div v-if="errorMessage" class="error-container">
          <p class="error">{{ errorMessage }}</p>
        </div>
        <div class="register">
          <p>¿No tienes cuenta? <a href="#">Regístrate</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {loginService} from "@/services/authService";
import {useUserStore} from "@/stores/userStore";

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();
const userStore = useUserStore();

const login = async () => {
  try {
    const user = await loginService({email: email.value, password: password.value});

    if (!user) {
      errorMessage.value = 'Error al obtener la información del usuario.';
      return;
    }

    userStore.user = user; // Guarda la info del usuario en Pinia
    console.log(user);
    await router.push('/'); // Redirige a la página principal
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Credenciales incorrectas';
  }
};
</script>


<style scoped>
.login-page {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg?cs=srgb&dl=pexels-felixmittermeier-956999.jpg&fm=jpg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  font-family: 'Inter', sans-serif;
}

.login-container {
  width: 100%;
  max-width: 420px;
  padding: 1rem;
}

.login-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.brand {
  text-align: center;
  margin-bottom: 2rem;
}

.brand h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(90deg, #4776E6, #8E54E9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.brand p {
  margin-top: 0.25rem;
  color: #666;
  font-size: 0.9rem;
}

h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
}

.input-group {
  margin-bottom: 1.25rem;
  position: relative;
}

label {
  display: block;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s;
  background: rgba(255, 255, 255, 0.8);
}

input:focus {
  outline: none;
  border-color: #8E54E9;
  box-shadow: 0 0 0 3px rgba(142, 84, 233, 0.2);
}

input::placeholder {
  color: #aaa;
}

.forgot-password {
  text-align: right;
  margin-top: 0.5rem;
}

.forgot-password a {
  color: #8E54E9;
  font-size: 0.75rem;
  text-decoration: none;
}

.forgot-password a:hover {
  text-decoration: underline;
}

.login-btn {
  width: 100%;
  padding: 0.875rem;
  background: linear-gradient(90deg, #4776E6, #8E54E9);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(71, 118, 230, 0.3);
}

.login-btn:active {
  transform: translateY(0);
}

.error-container {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: rgba(255, 0, 0, 0.1);
  border-radius: 8px;
  border-left: 4px solid #ff3b30;
}

.error {
  color: #d63031;
  font-size: 0.875rem;
  margin: 0;
}

.register {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: #666;
}

.register a {
  color: #8E54E9;
  font-weight: 600;
  text-decoration: none;
}

.register a:hover {
  text-decoration: underline;
}

@media (max-width: 640px) {
  .login-card {
    padding: 1.5rem;
  }

  .brand h1 {
    font-size: 1.75rem;
  }

  h2 {
    font-size: 1.25rem;
    margin-bottom: 1.25rem;
  }

  .login-btn {
    padding: 0.75rem;
  }
}
</style>
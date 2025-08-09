<template>
  <div class="MainContent">
    <div class="login-container">
      <h1 style="font-size: 4ch; font-weight: 600">Login</h1>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            class="login-input"
            id="username"
            v-model="username"
            type="text"
            placeholder="Enter your username"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            class="login-input"
            id="password"
            v-model="password"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <button class="signin-button" type="submit">Sign-in</button>
      </form>
      <div class="login-container" style="margin-top: 20px">
        <p>
          <strong>Test Credentials:</strong>
          <br />
          Username: <code>emilys</code>
          <br />
          Password: <code>emilyspass</code>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { login } from "../api/login";
import "./LoginPage.scss";

const router = useRouter();
const username = ref<string>("emilys");
const password = ref<string>("emilyspass");

async function handleSubmit() {
  try {
    const data = await login({
      username: username.value,
      password: password.value,
    });
    console.log("✅ Login Success", data);
    router.push("/dashboard");

    // TODO: navigate to dashboard or store token
  } catch (error: any) {
    toast.error(error?.message || "Login failed ❌");
    console.error("❌ Login Failed", error);
    // TODO: show toast notification
  }
}
</script>

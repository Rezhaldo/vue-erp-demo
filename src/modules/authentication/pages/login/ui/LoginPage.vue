<template>
  <div class="MainContent">
    <div class="login-container">
      <h1>Login</h1>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">Username</label>
          <input
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
            id="password"
            v-model="password"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit">Sign-in</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { toast } from "vue3-toastify";
import { login } from "../api/login";
import "./LoginPage.scss";

const username = ref<string>("");
const password = ref<string>("");

async function handleSubmit() {
  try {
    const data = await login({
      username: username.value,
      password: password.value,
    });
    console.log("✅ Login Success", data);
    // TODO: navigate to dashboard or store token
  } catch (error: any) {
    toast.error(error?.message || "Login failed ❌");
    console.error("❌ Login Failed", error);
    // TODO: show toast notification
  }
}
</script>

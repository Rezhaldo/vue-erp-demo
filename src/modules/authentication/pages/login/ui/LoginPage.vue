<template>
  <div class="login-container">
    <h1>Login</h1>

    <form @submit.prevent>
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

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import "./LoginPage.scss"; // Import external SCSS

const username = ref<string>("");
const password = ref<string>("");
</script>

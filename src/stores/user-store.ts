import type { Userinfo } from "@/modules/authentication/pages/login/model/user-info-model";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(localStorage.getItem("auth_token"));
  const refreshToken = ref<string | null>(
    localStorage.getItem("refresh_token")
  );
  const user = ref<Userinfo | null>(null);

  const storedUser = localStorage.getItem("user_info");
  if (storedUser && storedUser !== "undefined") {
    try {
      user.value = JSON.parse(storedUser);
    } catch (error) {
      console.error("Error parsing user data from localStorage", error);
      user.value = null;
    }
  }

  const login = ({
    accessToken,
    refreshToken: newRefreshToken,
    user: userData,
  }: {
    accessToken: string;
    refreshToken: string;
    user: Userinfo;
  }) => {
    token.value = accessToken;
    refreshToken.value = newRefreshToken;
    user.value = userData;

    localStorage.setItem("auth_token", accessToken);
    localStorage.setItem("refresh_token", newRefreshToken);
    localStorage.setItem("user_info", JSON.stringify(userData));
  };

  const logout = () => {
    token.value = null;
    refreshToken.value = null;
    user.value = null;

    localStorage.removeItem("auth_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_info");
  };

  return {
    token,
    refreshToken,
    user,
    login,
    logout,
  };
});

import { APIClient } from "@shared/api";
import { onMounted, ref } from "vue";
import type { userData } from "../model/user-info-model";

async function getUsersInfo(param?: string): Promise<userData> {
  const res = await APIClient.get(`/users${param ? `?${param}` : ""}`);

  if (res.error) {
    return { users: [], total: 0 };
  }

  return res.data;
}

export function useGetUsersInfo() {
  const usersInfo = ref<userData>({ users: [], total: 0 });
  const isLoading = ref(true);
  const error = ref<string | null>(null);

  const fetchUsersInfo = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const res = await getUsersInfo();
      usersInfo.value = {
        users: res.users || [],
        total: res.total || 0,
      };
      console.log("Fetched usersInfo:", res);
    } catch (err: any) {
      error.value = err.message || "Failed to fetch users info";
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(fetchUsersInfo);

  return { usersInfo, isLoading, error, refetch: fetchUsersInfo };
}

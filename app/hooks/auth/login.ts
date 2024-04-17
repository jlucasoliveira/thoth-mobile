import { useMutation } from "@tanstack/react-query";
import { axios } from "@/libs/axios";
import type { MutationConfig, UseResult } from "@/libs/react-query";
import { useUserStore } from "@/stores/user";
import { storage } from "@/utils/storage";

export type LoginCredentialsDTO = {
  username: string;
  password: string;
};

export type AccessModel = {
  access_token: string;
};

async function loginWithUsernameAndPassword(payload: LoginCredentialsDTO): Promise<AccessModel> {
  const { data } = await axios.post<AccessModel>("/auth/login", payload);
  return data;
}

type UseLogin = {
  config?: MutationConfig<typeof loginWithUsernameAndPassword>;
};

function useLogin({ config }: UseLogin = {}): UseResult<LoginCredentialsDTO, AccessModel> {
  const { setToken } = useUserStore();

  return useMutation({
    ...config,
    mutationKey: ["login"],
    mutationFn: loginWithUsernameAndPassword,
    onSuccess: async (data) => {
      setToken(data.access_token);
      await storage.setItem("token", data.access_token);
    },
  });
}

export { loginWithUsernameAndPassword, useLogin };

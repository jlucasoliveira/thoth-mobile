import { useMutation } from "@tanstack/react-query";
import { axios } from "@/libs/axios";
import type { MutationConfig, UseResult } from "@/libs/react-query";
import type { BaseEntity } from "@/config/base-entity";

type TokenPayload = {
  token: string;
  os?: string;
  device?: string;
};

type TokenEntity = TokenPayload & Pick<BaseEntity, "id">;

async function updateOrCreateToken(payload: TokenPayload): Promise<TokenEntity> {
  const { data } = await axios.post<TokenEntity>(`/tokens`, payload);
  return data;
}

type UseUpdateOrCreateToken = {
  config?: MutationConfig<typeof updateOrCreateToken>;
};

function useUpdateOrCreateToken({ config }: UseUpdateOrCreateToken = {}): UseResult<
  TokenPayload,
  TokenEntity
> {
  return useMutation({
    ...config,
    mutationFn: updateOrCreateToken,
    mutationKey: ["representative-partial-update"],
  });
}

export { updateOrCreateToken, useUpdateOrCreateToken };

import { useQuery } from "@tanstack/react-query";
import type { UserEntity } from "@/types";
import { axios } from "@/libs/axios";
import type { ExtractFnReturnType, QueryConfig, UseQueryResult } from "@/libs/react-query";

async function getProfile(): Promise<UserEntity> {
  const { data } = await axios.get<UserEntity>("/auth/profile");
  return data;
}

type QueryFnType = typeof getProfile;

type UseProfile = {
  config?: QueryConfig<QueryFnType>;
};

function useProfile({ config }: UseProfile = {}): UseQueryResult<UserEntity> {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["get-profile"],
    queryFn: getProfile,
    ...config,
  });
}

export { getProfile, useProfile };

import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

const fetchUser = async () => {
  const { data } = await api.get("/profile");
  return data;
};

export const useUser = () => {
  return useQuery({ queryKey: ["user"], queryFn: fetchUser });
};

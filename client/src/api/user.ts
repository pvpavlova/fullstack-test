import { api } from "./index";

export const updateProfile = async (userData: {
  name: string;
  bio: string;
}) => {
  const { data } = await api.put("/profile", userData);
  return data;
};
export const uploadAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append("avatar", file);
  const { data } = await api.post("/profile/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

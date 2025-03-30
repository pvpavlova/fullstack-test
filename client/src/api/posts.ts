import { api } from "./index"; 

export const fetchPosts = async (page: number, limit: number) => {
  const { data } = await api.get("/posts", {
    params: { page, limit },
  });
  return data;
};

export const fetchUserProfile = async () => {
  const { data } = await api.get("/user/profile");
  return data;
};

export const uploadPostImages = async (files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));

  const { data } = await api.post("/posts/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

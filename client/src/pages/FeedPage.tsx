import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Box, Container, Typography, Button } from "@mui/material";
import { useState } from "react";
import { api } from "../api";
import Post from "../components/Post";
import { PostForm } from "../components/PostForm";
import { UserProfile } from "../components/UserProfile";
import { fetchPosts, fetchUserProfile } from "../api/posts";  

const FeedPage = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc");

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUserProfile,  
  });

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts", page, sortOrder],
    queryFn: () => fetchPosts(page, 10),
    keepPreviousData: true,
  });

  const createMutation = useMutation({
    mutationFn: (postData: { text: string; images: string[] }) => api.post("/posts", postData),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/posts/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  const updateProfileMutation = useMutation({
    mutationFn: (updatedData: { bio: string; avatar: string }) => api.put("/user/profile", updatedData),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
  });

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleSortChange = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  if (isLoading || isLoadingUser) return <Typography>Загрузка...</Typography>;

  return (
    <Container maxWidth="sm">
      {user && <UserProfile user={user} onUpdate={updateProfileMutation.mutate} />}
      <PostForm onSubmit={(postData) => createMutation.mutate(postData)} />
      <Button variant="outlined" onClick={handleSortChange}>
        Сортировать по {sortOrder === "asc" ? "старым" : "новым"}
      </Button>
      {posts?.map((post) => (
        <Post key={post.id} {...post} onDelete={() => deleteMutation.mutate(post.id)} />
      ))}
      <Button variant="outlined" onClick={handleLoadMore} sx={{ mt: 2 }}>
        Загрузить ещё
      </Button>
    </Container>
  );
};

export default FeedPage;

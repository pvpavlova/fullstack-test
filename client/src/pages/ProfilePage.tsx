import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useUser } from "../hooks/useUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/user";
import { useDropzone } from "react-dropzone";
import { uploadAvatar } from "../api/user";

const ProfilePage = () => {
  const { data: user, isLoading } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setIsEditing(false);
    },
  });
  const mutationAvatar = useMutation({
    mutationFn: uploadAvatar,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
  });

  const onDrop = (acceptedFiles: File[]) => {
    mutationAvatar.mutate(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  if (isLoading) return <Typography>Загрузка...</Typography>;

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        mt={4}
      >
        <Avatar
          {...getRootProps()}
          sx={{ width: 100, height: 100, cursor: "pointer" }}
        >
          <input {...getInputProps()} />
          <img src={user?.avatar} alt="avatar" />
        </Avatar>
        ;
        {isEditing ? (
          <>
            <TextField
              label="Имя"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <TextField
              label="О себе"
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              multiline
              rows={3}
            />
            <TextField label="Email" defaultValue={user?.email} fullWidth />
            <Button
              variant="contained"
              onClick={() => mutation.mutate(formData)}
            >
              Сохранить
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h5">{user?.name}</Typography>
            <Typography variant="body1">{user?.email}</Typography>
            <Typography variant="body2">{user?.bio}</Typography>
            <Button variant="outlined" onClick={() => setIsEditing(true)}>
              Редактировать профиль
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};

export default ProfilePage;

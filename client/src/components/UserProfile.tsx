import { Box, Button, Typography, TextField, Avatar } from "@mui/material";
import { useState } from "react";

interface UserProfileProps {
  user: {
    avatar: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    bio: string;
    email: string;
    phone: string;
  };
  onUpdate: (updatedData: { bio: string; avatar: string }) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newBio, setNewBio] = useState(user.bio);
  const [newAvatar, setNewAvatar] = useState(user.avatar);

  const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBio(e.target.value);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        setNewAvatar(URL.createObjectURL(file));
      }
    }
  };

  const handleSave = () => {
    onUpdate({ bio: newBio, avatar: newAvatar });
    setIsEditing(false);
  };

  return (
    <Box sx={{ mb: 4, textAlign: "center" }}>
      <Avatar
        sx={{ width: 100, height: 100, margin: "auto" }}
        src={newAvatar}
        alt="User Avatar"
        onClick={() => document.getElementById("avatar-upload")?.click()}
      />
      <input
        id="avatar-upload"
        type="file"
        style={{ display: "none" }}
        onChange={handleAvatarChange}
      />
      <Typography variant="h6">{user.firstName} {user.lastName}</Typography>
      <Typography variant="body2">{user.birthDate}</Typography>
      <Typography variant="body2">{user.email}</Typography>
      <Typography variant="body2">{user.phone}</Typography>

      {isEditing ? (
        <Box mt={2}>
          <TextField
            label="О себе"
            multiline
            rows={4}
            value={newBio}
            onChange={handleBioChange}
            fullWidth
          />
          <Box mt={2}>
            <Button variant="contained" onClick={handleSave}>Сохранить</Button>
          </Box>
        </Box>
      ) : (
        <Typography variant="body2" sx={{ mt: 2 }}>
          {user.bio}
        </Typography>
      )}

      <Box mt={2}>
        <Button variant="outlined" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Отменить" : "Редактировать профиль"}
        </Button>
      </Box>
    </Box>
  );
};

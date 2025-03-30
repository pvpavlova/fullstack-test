import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";

interface PostProps {
  id: string;
  text: string;
  images: string[];
  createdAt: string;
  onDelete: (id: string) => void;
}

const Post = ({ id, text, images, createdAt, onDelete }: PostProps) => {
  return (
    <Card sx={{ mb: 2 }}>
      {images.length > 0 && (
        <CardMedia component="img" height="200" image={images[0]} alt="Фото" />
      )}
      <CardContent>
        <Typography variant="body1">{text}</Typography>
        <Typography variant="caption" color="text.secondary">
          {new Date(createdAt).toLocaleDateString()}
        </Typography>
        <Box display="flex" justifyContent="flex-end">
          <Button size="small" color="error" onClick={() => onDelete(id)}>Удалить</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Post;

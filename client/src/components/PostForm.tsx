import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { uploadPostImages } from "../api/posts";

interface PostFormProps {
  onSubmit: (postData: { text: string; images: string[] }) => void;
}

export const PostForm: React.FC<PostFormProps> = ({ onSubmit }) => {
  const [text, setText] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setSelectedFiles(acceptedFiles);
      setPreviewUrls(acceptedFiles.map((file) => URL.createObjectURL(file)));
    },
    accept: { "image/*": [] },
  });


  const handleSubmit = async () => {
    let imageUrls: string[] = [];

    if (selectedFiles.length > 0) {
      const uploadedImages = await uploadPostImages(selectedFiles);
      imageUrls = uploadedImages.map((img) => img.url);
    }

    onSubmit({ text, images: imageUrls });
    setText("");
    setSelectedFiles([]);
    setPreviewUrls([]);
  };

  return (
    <Box sx={{ p: 2, border: "1px solid #ddd", borderRadius: 2, mb: 2 }}>
      <TextField
        label="Напишите что-нибудь..."
        fullWidth
        multiline
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Box {...getRootProps()} sx={{ border: "1px dashed gray", p: 2, textAlign: "center", mb: 2 }}>
        <input {...getInputProps()} />
        <Typography>Перетащите файлы или кликните для загрузки</Typography>
      </Box>

      <Box display="flex" gap={1} mb={2}>
        {previewUrls.map((url, index) => (
          <img key={index} src={url} alt="preview" width={80} height={80} />
        ))}
      </Box>

      <Button variant="contained" onClick={handleSubmit} disabled={!text && selectedFiles.length === 0}>
        Опубликовать
      </Button>
    </Box>
  );
};

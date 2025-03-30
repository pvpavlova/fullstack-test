import {
  Controller,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { PostsService } from "./posts.service";
import { Post } from "./post.entity";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";
import { join } from "path";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post("upload")
  @UseInterceptors(
    FileInterceptor("images", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
          const filename = `${uuidv4()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    })
  )
  async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    const filePaths = files.map((file) => join("uploads", file.filename));
    return { filePaths };
  }
}

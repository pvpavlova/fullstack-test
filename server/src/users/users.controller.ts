import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { UpdateUserDto } from "../common/dto/update-user.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Get(":id")
  async findOne(@Param("id") id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Put(":id")
  async update(
    @Param("id") id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Put(":id/avatar")
  @UseInterceptors(
    FileInterceptor("avatar", {
      storage: diskStorage({
        destination: "./uploads/avatars",
        filename: (req, file, cb) => {
          const filename = `${uuidv4()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    })
  )
  async updateAvatar(
    @Param("id") id: number,
    @UploadedFile() file: Express.Multer.File
  ): Promise<User> {
    const avatarPath = join("uploads", "avatars", file.filename);
    return this.usersService.updateAvatar(id, avatarPath);
  }
}

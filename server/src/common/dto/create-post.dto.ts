import { IsString, IsArray, IsOptional } from "class-validator";

export class CreatePostDto {
  @IsString()
  text: string;

  @IsArray()
  @IsOptional()
  images?: string[];
}

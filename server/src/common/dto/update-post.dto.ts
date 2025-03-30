import { IsString, IsArray, IsOptional } from "class-validator";

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  text?: string;

  @IsArray()
  @IsOptional()
  images?: string[];
}

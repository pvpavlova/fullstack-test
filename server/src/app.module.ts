import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { PostsModule } from "./posts/posts.module";
import { AuthModule } from "./auth/auth.module";
import { User } from "./users/user.entity";
import { Post } from "./posts/post.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost", 
      port: 5432,
      username: "postgres",
      password: "111992", 
      database: "social_media",
      entities: [User, Post],
      synchronize: true, 
    }),
    UsersModule,
    PostsModule,
    AuthModule,
  ],
})
export class AppModule {}

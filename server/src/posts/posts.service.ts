import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "./post.entity";
import { CreatePostDto } from "../common/dto/create-post.dto";
import { UpdatePostDto } from "../common/dto/update-post.dto";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>
  ) {}

  async findAll(
    page: number,
    limit: number,
    sortOrder: "ASC" | "DESC"
  ): Promise<Post[]> {
    return this.postsRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        createdAt: sortOrder,
      },
    });
  }

  
  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) {
      throw new Error('Post not found');
    }
    return post;
  }
  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = this.postsRepository.create(createPostDto);
    return this.postsRepository.save(post);
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    await this.postsRepository.update(id, updatePostDto);
    const updatedPost = await this.postsRepository.findOne({ where: { id } });
    if (!updatedPost) {
      throw new Error('Post not found');
    }
    return updatedPost;
  }


  async remove(id: number): Promise<void> {
    await this.postsRepository.delete(id);
  }
}

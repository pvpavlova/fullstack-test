import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDto } from "../common/dto/create-user.dto";
import { UpdateUserDto } from "../common/dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(id, updateUserDto);
    return this.usersRepository.findOne(id);
  }

  async updateAvatar(id: number, avatarPath: string): Promise<User> {
    await this.usersRepository.update(id, { avatar: avatarPath });
    return this.usersRepository.findOne(id);
  }
}

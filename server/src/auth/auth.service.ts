import { Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(loginDto: LoginDto): Promise<User> {
    const user = await this.usersService.findByUsername(loginDto.username);
    if (!user || user.password !== loginDto.password) {
      throw new Error('Invalid credentials');
    }
    return user;
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const user = new User();
    user.username = registerDto.username;
    user.password = registerDto.password;
    return await this.usersService.create(user);
  }
}

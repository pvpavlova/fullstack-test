import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from '../users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = new User(); // Преобразуем DTO в сущность User
    user.username = loginDto.username;
    user.password = loginDto.password;
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = new User(); // Преобразуем DTO в сущность User
    user.username = registerDto.username;
    user.email = registerDto.email;
    user.password = registerDto.password;
    return this.authService.register(user);
  }
}

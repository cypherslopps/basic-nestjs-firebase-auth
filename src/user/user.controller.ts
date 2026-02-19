import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  registerUser(@Body() registerUserDTo: RegisterUserDto) {
    return this.userService.registerUser(registerUserDTo);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  login(@Body() loginDto: LoginDto) {
    return this.userService.loginUser(loginDto);
  }

  @Post('refresh-auth')
  refreshAuth(@Query('refreshToken') refreshToken: string) {
    return this.userService.refreshAuthToken(refreshToken);
  }

  @Get('all')
  @UseGuards(
    AuthGuard,
  ) /* This decorator intercepts all requests and applys AuthGuard to it */
  @ApiBearerAuth() /* For Swagger - Allows user to paste bearer token to the API route */
  findAll() {
    return this.userService.findAll();
  }
}

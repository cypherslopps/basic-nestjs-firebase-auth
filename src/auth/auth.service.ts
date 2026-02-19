import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login-user.dto';
import { UserService } from 'src/user/user.service';
import axios from 'axios';
import { SignInWithPasswordResponse } from './interfaces/signin-password-response.interface';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async loginUser(
    payload: LoginDto,
  ): Promise<Partial<SignInWithPasswordResponse> | undefined> {
    try {
      const credential = await this.signInWithEmailAndPassword(payload);

      if (!credential?.idToken) {
        throw new BadRequestException('Invalid credentials');
      }

      const { idToken, refreshToken, expiresIn } = credential;
      return {
        idToken,
        refreshToken,
        expiresIn,
      };
    } catch (error) {
      console.error('Login error:', error);
      throw new BadRequestException('Authentication failed');
    }
  }

  private async signInWithEmailAndPassword(
    payload: LoginDto,
  ): Promise<SignInWithPasswordResponse | undefined> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`;
    const response = await this.sendPostRequest(url, {
      ...payload,
      returnSecureToken: true,
    });
    if (!response) return undefined;
    return response;
  }

  private async sendPostRequest(
    url: string,
    data: any,
  ): Promise<SignInWithPasswordResponse> {
    try {
      const response = await axios.post(url, data, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data as SignInWithPasswordResponse;
    } catch (error) {
      console.error('Error in sendPostRequest:', error);
      throw error;
    }
  }
}

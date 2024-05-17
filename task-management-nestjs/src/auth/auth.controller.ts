import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import {
  SignInAuthCredentialsDto,
  SignUpAuthCredentialsDto,
} from './dto/auth-credentials.dto';
import { User } from './user.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(
    @Body() signUpAuthCredentialsDto: SignUpAuthCredentialsDto,
  ): Promise<User> {
    return this.authService.signup(signUpAuthCredentialsDto);
  }

  @Post('signin')
  signin(
    @Body() signInAuthCredentialsDto: SignInAuthCredentialsDto,
  ): Promise<string> {
    return this.authService.signin(signInAuthCredentialsDto);
  }
}

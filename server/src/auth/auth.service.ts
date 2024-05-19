import {
  SignInAuthCredentialsDto,
  SignUpAuthCredentialsDto,
} from './dto/auth-credentials.dto';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { InService } from 'src/in/in.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private inService: InService,
  ) {}

  async signup(
    signUpAuthCredentialsDto: SignUpAuthCredentialsDto,
  ): Promise<User> {
    try {
      const { username, password, email, linkedinUrl } =
        signUpAuthCredentialsDto;

      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await this.userModel.create({
        username,
        email,
        password: hashedPassword,
        linkedinUrl,
      });
      this.inService.scrapeData(linkedinUrl, email);

      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('email already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signin(
    signInAuthCredentialsDto: SignInAuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = signInAuthCredentialsDto;
    const user = await this.userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Check You Credentials Again');
    }
  }
}

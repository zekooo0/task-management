import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUrl,
  Matches,
  MinLength,
} from 'class-validator';

export class SignUpAuthCredentialsDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message:
      'Your Password must Has minimum 8 characters in length, At least one uppercase English letter, At least one lowercase English letter, At least one digit, At least one special character, ',
  })
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsUrl()
  @Matches(/^https:\/\/www.linkedin.com\/in\//, {
    message: 'linkedinUrl must start with "https://www.linkedin.com/in/"',
  })
  linkedinUrl: string;
}

export class SignInAuthCredentialsDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

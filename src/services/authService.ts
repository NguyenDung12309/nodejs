import { User } from '@/schemas/userSchema';
import { reqRegisterDto } from '../dto/request/auth';
import { databaseService } from './databaseService';
import { hashString } from '@/helper/crypto';
import { signToken } from '@/helper/jwt';
import { TokenTypes } from '@/enums/user';

class AuthService {
  private signRefreshToken(userId: string) {
    return signToken({
      payload: {
        type_token: TokenTypes.RefreshToken,
        data: {
          userId,
        },
      },
      options: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
      },
    });
  }
  private signAccessToken(userId: string) {
    return signToken({
      payload: {
        type_token: TokenTypes.AccessToken,
        data: {
          userId,
        },
      },
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
      },
    });
  }

  async register(payload: reqRegisterDto) {
    const data = new User({
      ...payload,
      password: hashString(payload.password),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await databaseService.users.insertOne(data);

    const userId = result.insertedId.toString();

    const [accessToken, refreshToken] = await Promise.all([this.signAccessToken(userId), this.signRefreshToken(userId)]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async checkEmailExists(email: string, { message }: { message: any }) {
    try {
      const isExistEmail = await databaseService.users.findOne({ email });

      if (isExistEmail) {
        return message({
          external: 'email exist',
        });
      }

      return true;
    } catch (error) {
      return message({
        external: 'Server error',
      });
    }
  }
}

export const authService = new AuthService();

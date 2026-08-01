import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async login(username?: string, pass?: string) {
    if (!username || !pass) {
      throw new BadRequestException('Vui lòng nhập Tên tài khoản và Mật khẩu Admin');
    }

    const admin = await this.db.getAdmin();

    const reqUser = username.trim().toLowerCase();
    const reqPass = pass.trim();

    const dbUser = (admin.username || 'admin').trim().toLowerCase();
    const dbPass = (admin.passwordHash || 'admin123').trim();

    if (reqUser === dbUser && reqPass === dbPass) {
      const payload = { username: admin.username, role: 'admin' };
      return {
        accessToken: this.jwtService.sign(payload),
        user: { username: admin.username, role: 'admin' },
      };
    }

    throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu Admin');
  }

  logout() {
    return { success: true, message: 'Đã đăng xuất thành công' };
  }
}

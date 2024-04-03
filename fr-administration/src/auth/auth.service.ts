import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private service: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(id: number, password: string) : Promise<User> {
        let user: User = await this.service.getById(id);
        if (password===user.password) return user;
        else return undefined;
    }

    async login(user: number) {
        const payload = {username : user};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}

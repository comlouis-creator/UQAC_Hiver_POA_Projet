import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import {UserInput} from './user.input';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor(
        private service: UsersService
    ){}

    @ApiTags('getter')
    @Get('all')
    @ApiCreatedResponse({
        description: 'The three first letters of the latin alphabet'
    })
    alphabet(): string[] {
        return['a', 'b', 'c'];
    }

    @ApiTags('getter')
    @Get()
    @ApiCreatedResponse({
        description: 'All the users'
    })
    getAll(): Promise<User[]> {
        return this.service.getAll();
    }

    @ApiTags('getter')
    @Get(':id')
    @ApiCreatedResponse({
        description: 'The user the user designated by the id'
    })
    getById(@Param() parameter): Promise<User> {
        return this.service.getById(parameter.id);
    }

    @ApiTags('setter')
    @Put(':id')
    @ApiCreatedResponse({
        description: 'The modified user if it has been successfully modified'
    })
    modifyUser(@Param() parameter, @Body() input): Promise<User> {
        return this.service.modifyUser(parameter.id, input.firstname, input.lastname, input.age);
    }

    @ApiTags('suppression')
    @Delete(':id')
    @ApiCreatedResponse({
        description: 'A boolean that indicate if the user has been deleted'
    })
    eraseUser(@Param() parameter): Promise<Boolean> {
        return this.service.eraseUser(parameter.id);
    }

    @ApiTags('create')
    @Post()
    @ApiCreatedResponse({
        description: 'The user if it has been successfully created'
    })
    create(@Body() input: UserInput): Promise<User> {
        return this.service.create(input.firstname, input.lastname, input.age);
    }

}

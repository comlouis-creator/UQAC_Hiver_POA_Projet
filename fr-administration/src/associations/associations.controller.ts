import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { Association } from './associations.entity';
import { AssociationsService } from './associations.service';

@ApiTags('associations')
@Controller('associations')
export class AssociationsController {

    constructor(
        private service: AssociationsService
    ){}

    @ApiTags('getter')
    @Get()
    @ApiCreatedResponse({
        description: 'All the associations'
    })
    getAll(): Promise<Association[]> {
        return this.service.retrieve();
    }

    @ApiTags('getter')
    @Get(':id')
    @ApiCreatedResponse({
        description: 'The association designated by the id'
    })
    getById(@Param() parameter): Promise<Association> {
        return this.service.getById(parameter.id);
    }

    @ApiTags('getter')
    @Get(':id/members')
    @ApiCreatedResponse({
        description: 'The members of the association designated by the id'
    })
    getMembers(@Param() parameter): Promise<User[]> {
        return this.service.getMembers(parameter.id);
    }

    @ApiTags('setter')
    @Put(':id')
    @ApiCreatedResponse({
        description: 'The modified association'
    })
    modifyAssociation(@Param() parameter, @Body() input): Promise<Association> {
        return this.service.modifyAssociation(parameter.id, input.idUsers, input.name);
    }

    @ApiTags('suppression')
    @Delete(':id')
    @ApiCreatedResponse({
        description: 'A boolean that indicate if the association has been removed'
    })
    eraseAssociation(@Param() parameter): Promise<Boolean> {
        return this.service.eraseAssociation(parameter.id);
    }

    @ApiTags('create')
    @Post()
    @ApiCreatedResponse({
        description: 'The association that has been created'
    })
    create(@Body() input: any): Promise<Association> {
        return this.service.create(input.name, input.idUsers);
    }

}


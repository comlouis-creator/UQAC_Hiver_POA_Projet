import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Association } from './associations.entity';

@Injectable()
export class AssociationsService {

    private nombreAssociation: number;

    constructor(
        @InjectRepository(Association)
        private repository: Repository<Association>,
        private service: UsersService
    ) {
        this.nombreAssociation = 1;
    }

    async retrieve(): Promise<Association[]> {
        return await this.repository.find({});
    }

    async getById(idToFind: number): Promise<Association> {
        let association = await this.repository.findOne({where: {id: idToFind,},});
        if(association === undefined) throw new HttpException(`Could not find an association with the id ${idToFind}`, HttpStatus.NOT_FOUND);
        else return association;
    }

    async modifyAssociation(id: number, idUsers: number[], name: string): Promise<Association> {
        let associations = await this.getById(id);
        if (associations === undefined) throw new HttpException(`Could not find an association with the id ${id}`, HttpStatus.NOT_FOUND);
        else {
            associations.name = name;
            if (idUsers.length >= 1) {
                associations.users = [];
                for (let i=0 ; i<idUsers.length ; i++){
                    associations[i].users.push(await this.service.getById(idUsers[i]));
                }
            }
            return this.repository.save(associations);
        }
    }

    async eraseAssociation(id:number): Promise<boolean> {
        let association = await this.getById(id);
        let deletion = await this.repository.delete(association);
        return deletion!==undefined;
    }

    async create(name: string, idUsers: number[]) {
        let idToCreate: number = this.nombreAssociation;
        let users: User[] = [];
        for (let i=0 ; i<idUsers.length ; i++){
            let user = await this.service.getById(idUsers[i]);
            users.push(user);
        }
        const asso = this.repository.create({id: idToCreate, users: users, name: name})
        this.nombreAssociation++;
        return this.repository.save(asso);
    }

    async getMembers(id: number): Promise<User[]> {
        let association = await this.getById(id);
        if (association === null)
            throw new HttpException(`Could not find an association with the id ${id}`, HttpStatus.NOT_FOUND);
        else
            return association.users;
    }
}

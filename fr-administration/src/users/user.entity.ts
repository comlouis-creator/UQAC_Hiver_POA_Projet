import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    lastname: string;

    @Column()
    firstname: string;

    @Column()
    age: number;

    @Column()
    password: string;
}

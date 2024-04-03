import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { AssociationsController } from './associations.controller';
import { Association } from './associations.entity';
import { AssociationsService } from './associations.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Association])],
  providers: [AssociationsService],
  controllers: [AssociationsController],
  exports: [AssociationsService]
})
export class AssociationsModule {}


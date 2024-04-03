import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {AssociationsModule} from "../associations/associations.module";
import { EventsService } from './events.service';
import * as process from 'process';

@Module({
  imports:[
  ClientsModule.register([{
    name:'EVENT_NOTIF_SERVICE',
    transport: Transport.RMQ,
    options: {
      urls: ["amqp://rabbitmq:5672"],
      queue: 'my-queue',
      queueOptions: { durable: true },
    },
  }
  ]),
  AssociationsModule],
  controllers: [EventsController],
  providers: [EventsService]
})
export class EventsModule {}
import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
    constructor(
       private eventservice: EventsService
    ){}
    @Get("")
    async home(): Promise<Boolean> {
        return this.eventservice.home();
    }

}

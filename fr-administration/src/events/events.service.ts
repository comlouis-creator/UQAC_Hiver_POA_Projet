import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class EventsService {
    constructor(
        @Inject('EVENT_NOTIF_SERVICE') private client: ClientProxy
    ){}
    async home(): Promise<Boolean> {
        const pattern = { cmd: 'msg'};
        const payload = 'mail test';
        this.client.emit(pattern, payload);
        return true;
    }
}

import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('/messages')
export class MessagesController {

    constructor(public messagesService: MessagesService){
        // // DONT DO THIS IN REAL APP USE DEPENDENCY INJECTION
        // this.messagesService = new MessagesService();
        this.messagesService = messagesService;
    }

    @Get()
    listMessager() {
        return this.messagesService.findAll();
    }

    @Post()
    createMessage(@Body() body: CreateMessageDto) {
        return this.messagesService.create(body.content);
    }

    @Get('/:id')
    async getMessage(@Param('id') id: string) {
        const message = await this.messagesService.findOne(id);
        if(!message){
            return new NotFoundException('message not found');
        }
        return message;
    }
}

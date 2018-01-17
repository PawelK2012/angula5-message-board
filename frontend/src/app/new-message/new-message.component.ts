import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../services/messages.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit {

    constructor(private messagesService: MessagesService, private auth: AuthService) {}

    message = {
        owner: this.auth.name,
        text: ''
    };

    post() {
        this.messagesService.postMessage(this.message);
    }

  ngOnInit() {}

}

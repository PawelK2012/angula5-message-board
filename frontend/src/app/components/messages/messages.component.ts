import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../../services/messages.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private messagesService: MessagesService, private route: ActivatedRoute) { }
  // called once componnnent is done initialising
  /// and after the constructor gets called
  ngOnInit() {
    var name = this.route.snapshot.params.name;
    this.messagesService.getMessages(name);
    this.messagesService.getUser().subscribe();
    // this.messagesService.messages.subscribe(messages => {
    //   this.messages = messages;
    // });
  }
}

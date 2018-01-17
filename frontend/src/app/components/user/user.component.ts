import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  model = {
    firstName: '',
    lastName: ''
  };

  constructor(private messagesService: MessagesService) { }

  ngOnInit() {
    this.messagesService.getUser().subscribe(res => {
      this.model.firstName = res.firstName;
      this.model.lastName = res.lastName;
    });
  }

  post() {
    this.messagesService.saveUser(this.model).subscribe();
  }

}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Rx';
import { AuthService } from '../services/auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MessagesService {
  BASE_URL = 'http://localhost:63145/api';
  private messageStore = [];
  private messageSubject = new Subject();
  messages = this.messageSubject.asObservable();
  constructor(private http: Http, public snackBar: MatSnackBar, private auth: AuthService) {
    this.getMessages(null);
  }
  getMessages(user) {
    user = (user) ? '/' + user : '';
    this.http.get(this.BASE_URL + '/messages' + user).subscribe(response => {
      this.messageStore = response.json();
      this.messageSubject.next(this.messageStore);
    }, error => {
      this.hendleErrors('Unable to get messages');
    });
  }
  async postMessage(message) {
    try {
      var response = await this.http.post(this.BASE_URL + '/messages', message).toPromise();
      this.messageStore.push(response.json());
      this.messageSubject.next(this.messageStore);
    } catch (error) {
      this.hendleErrors('Unable to post message');
    }
  }

  getUser() {
    return this.http.get(this.BASE_URL + '/users/me', this.auth.tokenHeader).map(res => res.json());
  }

  saveUser(userData) {
    return this.http.post(this.BASE_URL + '/users/me', userData, this.auth.tokenHeader).map(res => res.json());
  }

  private hendleErrors(error) {
    this.snackBar.open(error, 'close', { duration: 2000 });
  }

}

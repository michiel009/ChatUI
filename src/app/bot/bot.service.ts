import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom, Observable} from 'rxjs';
import {Message} from '../types';

@Injectable({
  providedIn: 'root',
})
export class BotService {
  http = inject(HttpClient);

  sendLine(text: string): Promise<Message> {

    return lastValueFrom(this.http.post<Message>('http://localhost:8081/talk', text));
  }

  getHistory(): Promise<Message[]> {

    const addCall = this.http.get<Message[]>('http://localhost:8081/history');

    return lastValueFrom(addCall);
  }
}

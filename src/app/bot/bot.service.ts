import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BotService {
  http = inject(HttpClient);

  sendLine(text: string): Promise<string> {

    const addCall = this.http.post('http://localhost:8081/talk', text, {responseType: 'text'});

    return lastValueFrom(addCall);
  }
}

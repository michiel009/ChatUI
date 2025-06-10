import {Component, input} from '@angular/core';
import {Message, Sender} from '../../types';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-chat-message',
  imports: [MatIconModule],
  templateUrl: './chat-message.html',
  styleUrl: './chat-message.scss'
})
export class ChatMessage {
  message = input.required<Message>();
  protected readonly Sender = Sender;
}

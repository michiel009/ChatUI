import {Component, inject} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {ChatMessage} from '../../components/chat-message/chat-message';
import {ChatInput} from '../../components/chat-input/chat-input';
import {BotStore} from '../../bot/bot.store';

@Component({
  selector: 'app-chat-page',
  providers: [],
  imports: [
    MatIconModule,
    MatProgressBarModule, ChatMessage, ChatInput
  ],
  templateUrl: './chat-page.html',
  styleUrl: './chat-page.scss'
})
export class ChatPage {
  readonly botStore = inject(BotStore);

  protected send(textVal: string) {
    this.botStore.send(textVal);
  }
}

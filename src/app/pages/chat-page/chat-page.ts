import {AfterViewChecked, Component, computed, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
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
export class ChatPage implements OnInit, AfterViewChecked {


  readonly botStore = inject(BotStore);
  @ViewChild('messages', {static: true})
  inboxChat?: ElementRef<HTMLDivElement>;

  image = computed<string>(() => {
    const withImages = this.botStore.messages().filter(a => a.image != null)
    if (withImages.length == 0)
      return ""
    return "url(" + withImages.at(withImages.length - 1)?.image + ")";
  })

  protected send(textVal: string) {
    this.botStore.send(textVal);
  }

  ngOnInit() {
    this.updateScroll();
  }

  ngAfterViewChecked() {
    this.updateScroll();
  }


  updateScroll(): void {
    if (this.inboxChat?.nativeElement) {
      this.inboxChat.nativeElement.scrollTop =
        this.inboxChat.nativeElement.scrollHeight;
    }
  }


}

import {Component, input, output} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {event} from '@ngrx/signals/events';

@Component({
  selector: 'app-chat-input',
  imports: [ReactiveFormsModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './chat-input.html',
  styleUrl: './chat-input.scss'
})
export class ChatInput {

  disabled = input(false);
  messageOutput = output<string>();
  textInput = new FormControl('');



  sendClick(event: any) {
    if (this.disabled())
      return;
    this.send();
  }

  sendEnter(event: any) {
    event.preventDefault();
    if (this.disabled())
      return;
    this.send();
  }

  send() {
    let textVal = this.textInput.value;
    if (textVal) {
      this.messageOutput.emit(textVal);
    }
    this.textInput.setValue('');
  }
}

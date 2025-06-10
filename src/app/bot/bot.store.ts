import {Message, Sender} from '../types';
import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {BotService} from './bot.service';
import {inject} from '@angular/core';

type BotState = {
  messages: Message[],
  isLoading: boolean,
}

const initialState: BotState = {
  isLoading: false,
  messages: [],
}

export const BotStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withMethods((store, botService=inject(BotService)) => ({
    send(textVal: string): void {
      patchState(store, (state) => ({
        ...state,
        isLoading: true,
      }))

      if (textVal) {
        patchState(store, (state) => ({
          ...state,
          messages: state.messages.concat({
            sender: Sender.client,
            text: textVal
          })
        }))

        botService
          .sendLine(textVal)
          .then(data => {
            patchState(store, (state) => ({
              ...state,
              messages: state.messages.concat({
                sender: Sender.server,
                text: data
              })
            }))

          }).catch(error => {
          patchState(store, (state) => ({
            ...state,
            messages: state.messages.concat({
              sender: Sender.server,
              text: error
            })
          }))
        }).finally(() => {
          patchState(store, (state) => ({
            ...state,
            isLoading: false,
          }))
        })
      }
    }
  }))
);

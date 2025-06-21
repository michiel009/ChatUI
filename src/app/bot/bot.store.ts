import {Message, Sender} from '../types';
import {getState, patchState, signalStore, withHooks, withMethods, withState} from '@ngrx/signals';
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
  withHooks((store) => {
    const botService = inject(BotService);
    return {
      onInit() {
        botService.getHistory().then(history => {
          patchState(store, (state) => ({
            ...state,
            messages: history
          }))
        })

      }
    }
  }),
  withMethods((store, botService = inject(BotService)) => ({
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

        let res = ""
        let lastMsg: Message = {
          sender: Sender.server,
          text: res + "..."
        }

        patchState(store, (state) =>
          ({
            ...state,
            messages: state.messages.concat(lastMsg)
          }))

        const botMsgIndex = getState(store).messages.length - 1

        botService
          .sendLine(textVal).then(message => {
            res += message.text
            lastMsg.text = res
            lastMsg.image = message.image
            lastMsg.prompt = message.prompt
            patchState(store, (state) => ({
                ...state,
                messages: state.messages.map((a, index) => {
                    if (index === botMsgIndex) {
                      return lastMsg

                    } else {
                      return a
                    }

                  }
                )
              }
            ))

          }
        ).catch(error => {
          lastMsg.text = error.message;
          patchState(store, (state) => ({
              ...state,
              messages: state.messages.map((a, index) => {
                  if (index === botMsgIndex) {
                    return lastMsg

                  } else {
                    return a
                  }

                }
              )
            }
          ))
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

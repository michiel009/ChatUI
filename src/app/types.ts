export enum Sender {
  client, server
}

export type Message = {
  sender: Sender,
  text: string,
}

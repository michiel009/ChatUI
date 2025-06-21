export enum Sender {
  client, server
}

export type Message = {
  sender: Sender,
  text: string,
  image?: string,
  prompt?: string
}

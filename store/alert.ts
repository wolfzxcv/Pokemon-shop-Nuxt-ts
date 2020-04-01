import {
  Module,
  VuexModule,
  Mutation,
  Action
} from 'vuex-module-decorators'
import { IMessage } from 'models/alert'

@Module({ name: 'alert', namespaced: true, stateFactory: true })
export default class Alert extends VuexModule {
  messages: IMessage[] = []

  @Mutation
  setMessage({ message, status, timestamp }: IMessage) {
    if (message) {
      this.messages.push({ message, status, timestamp })
    }
  }

  @Mutation
  setRemoveMessage(idx: number) {
    this.messages.splice(idx, 1)
  }

  @Mutation
  setRemoveMessageWithTiming(timestamp: number) {
    this.messages.forEach((item: IMessage, i: number) => {
      if (item.timestamp === timestamp) {
        this.messages.splice(i, 1)
      }
    })
  }

  @Action
  pushMessage({ message, status = 'success' }: IMessage) {
    const timestamp = Math.floor(new Date().getTime() / 1000)
    this.setMessage({ message, status, timestamp })
    this.removeMessageWithTiming(timestamp)
    console.log('alert/pushMessage')
  }

  @Action
  removeMessage(idx: number) {
    this.setRemoveMessage(idx)
    console.log('alert/removeMessage')
  }

  @Action
  removeMessageWithTiming(timestamp: number) {
    setTimeout(() => {
      this.setRemoveMessageWithTiming(timestamp)
    }, 5000)
  }
}

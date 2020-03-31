import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({ name: 'loading', namespaced: true, stateFactory: true })
export default class Loading extends VuexModule {
  isLoading: boolean = false

  @Mutation
  setLoading(status: boolean) {
    this.isLoading = status
  }
}

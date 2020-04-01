import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import { IPagination } from 'models/pagination'

@Module({ name: 'pagination', namespaced: true, stateFactory: true })
export default class Pagination extends VuexModule {
  pagination: IPagination = {
    total_pages: 0,
    current_page: 0,
    has_pre: false,
    has_next: false,
    category: null
  }

  @Mutation
  setPagination(data: IPagination) {
    this.pagination = data
  }
}

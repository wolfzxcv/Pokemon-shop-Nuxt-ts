import axios from 'axios'
import { Module, VuexModule, Action } from 'vuex-module-decorators'
import { ICommonRes } from 'models/admin'
import { signin, signinRes } from 'models/auth'
import { alertModule } from './index'

@Module({ name: 'auth', namespaced: true, stateFactory: true })
export default class Auth extends VuexModule {
  @Action
  async signin({ loginData, useRouter }: signin) {
    const res = await axios.post<signinRes>(
      `${process.env.VUE_APP_PATH}/admin/signin`,
      loginData
    )
    const msg = res.data.message
    console.log('auth/signin', msg)
    if (res.data.success) {
      useRouter.push('/admin/product')
      alertModule.pushMessage({ message: msg })
    }
  }

  @Action
  async signout(useRouter: any) {
    const res = await axios.post<ICommonRes>(
      `${process.env.VUE_APP_PATH}/logout`
    )
    const msg = res.data.message
    console.log('auth/signout', msg)
    if (res.data.success) {
      useRouter.push('/login')
      alertModule.pushMessage({ message: msg, status: 'danger' })
    }
  }
}

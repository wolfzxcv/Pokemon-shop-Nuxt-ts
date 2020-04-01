import axios from 'axios'

export default async ({ route, redirect }: middlewareProps) => {
  if (route.meta[0].requireAuth) {
    console.log('this page require auth')
    const api = `${process.env.VUE_APP_PATH}/api/user/check`
    const response = await axios.post<res>(api)
    console.log('check if login', response.data.success)
    if (!response.data.success) {
      return redirect('/login')
    }
  }
}

type res = {
  success: boolean
  message?: string
}

interface middlewareProps {
  route: route
  redirect: Function
}

type route = {
  // name: string
  meta: any
  // length: number
  // path: string
  // hash: string
  // query: any
  // params: any
  // fullPath: string
  // matched: any
}

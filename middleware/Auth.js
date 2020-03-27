import axios from 'axios'
export default async ({ route, redirect }) => {
  if (route.meta[0].requiresAuth) {
    const api = `${process.env.VUE_APP_PATH}/api/user/check`

    // if don't use async await, it won't wait until api call finish
    const response = await axios.post(api)
    console.log('check if login', response.data.success)
    if (!response.data.success) {
      console.log('Please sign in first')
      return redirect('/login')
    }
  }
}

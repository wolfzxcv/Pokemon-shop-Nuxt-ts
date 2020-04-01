export type signin = { loginData: loginData; useRouter: any }
export type loginData = { username: string; password: string }

export type signinRes = {
  success: boolean
  message: string
  uid: string
}

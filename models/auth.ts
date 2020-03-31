export type signin = { loginData: loginData; useRouter: any }
type loginData = { username: string; password: string }

export type signinRes = {
  success: boolean
  message: string
  uid: string
}

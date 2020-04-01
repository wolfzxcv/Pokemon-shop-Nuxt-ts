export interface ICart {
  carts: carts[]
  total: number
  final_total: number
}

export interface IOrder {
  create_at: number
  id: string
  is_paid: boolean
  message: string
  payment_method?: string
  products: products[]
  total: number
  user: user
}

export type addToCart = { id: string; qty: number }

export type placeOrder = { formInfo: IFormInfo; useRouter: any }

export type routeIdnRouter = { routeId: string; useRouter: any }

type carts = {
  final_total: number
  id: string
  product: product
  product_id: string
  qty: number
  coupon?: coupon
  coupon_code?: string
  total: number
}

type products = { id: string; product_id: string; qty: string }

type user = {
  address: string
  email: string
  name: string
  tel: string
}

type product = {
  category: string
  content: string
  description: string
  id: string
  imageUrl: string
  is_enabled: number
  num: number
  origin_price: string
  price: string
  title: string
  unit: string
}

type coupon = {
  code: string
  due_date: number
  id: string
  is_enabled: number
  percent: number
  title: string
}

export interface IFormInfo {
  user: user
  message: string
}

export type getCartRes = {
  success: boolean
  data: ICart
  messages: string[]
}

export type addToCartRes = {
  success: boolean
  message: string
  data: carts
}

export type addCouponCodeRes = {
  success: boolean
  message: string
  data?: object
}

export type placeOrderRes = {
  success: boolean
  message: string
  total?: number
  create_at?: number
  orderId?: string
}

export type getCheckoutInfoRes = { success: boolean; order: IOrder }

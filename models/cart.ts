interface Response<T> {
  success: boolean
  data?: T
  order?: T
  messages?: string | string[]
}
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
  payment_method: string
  products: products[]
  total: number
  user: user
}

interface carts {
  final_total: number
  id: string
  product: product
  product_id: string
  qty: number
  coupon_code?: string
  total: number
}

interface product {
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

// eslint-disable-next-line
const check_carts_api: Response<ICart> = {
  success: true,
  data: {
    carts: [
      {
        final_total: 1500,
        id: '-M3d-evkQpRatnmCT1QY',
        product: {
          category: '火系',
          content: '我要代替火星來懲罰你!',
          description: '燃燒吧~燃燒吧~火鳥!!!',
          id: '-M0W52jLQV45BeU6vhh8',
          imageUrl: 'https://....',
          is_enabled: 1,
          num: 16,
          origin_price: '2000',
          price: '1500',
          title: '小火龍',
          unit: '隻'
        },
        product_id: '-M0W52jLQV45BeU6vhh8',
        qty: 1,
        total: 1500
      }
    ],
    total: 1500,
    final_total: 1500
  },
  messages: []
}

interface products {
  id: string
  product_id: string
  qty: string
}

interface user {
  address: string
  email: string
  name: string
  tel: string
}

// eslint-disable-next-line
const check_order_: Response<IOrder> = {
  success: true,
  order: {
    create_at: 1523539834,
    id: '-L9u2EUkQSoEmW7QzGLF',
    is_paid: false,
    message: '這是留言',
    payment_method: 'credit_card',
    products: [
      {
        id: 'L8nBrq8Ym4ARI1Kog4t',
        product_id: '-L8moRfPlDZZ2e-1ritQ',
        qty: '3'
      }
    ],
    total: 100,
    user: {
      address: 'kaohsiung',
      email: 'test@gmail.com',
      name: 'test',
      tel: '0912346768'
    }
  }
}

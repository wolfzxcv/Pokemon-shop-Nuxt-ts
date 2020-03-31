export type getProductsRes = {
  success: boolean
  products: IProduct[]
}

export type getProductRes = {
  success: boolean
  product: IProduct
}

export type getProduct = { routeId: string; useRouter: any }

export interface IProduct {
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

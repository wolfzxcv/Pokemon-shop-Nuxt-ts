import { IOrder } from 'models/cart'
import { IPagination } from 'models/pagination'
import { IProduct } from 'models/product'

export interface ICommonRes {
  success: boolean
  message: string
}

export interface ICoupon {
  code: string
  due_date: string
  id: string
  is_enabled: number
  percent: string
  title: string
}

export interface IAdminOrders extends IOrder {
  paid_date: number
  num: number
}

export type getCouponsRes = {
  success: boolean
  coupons: ICoupon[]
  pagination: IPagination
  messages: string[]
}

export type getOrdersRes = {
  success: boolean
  orders: IAdminOrders[]
  pagination: IPagination
  messages: string[]
}

export type adminGetProductsRes = {
  success: boolean
  products: IProduct[]
  pagination: IPagination
  messages: string[]
}

export type uploadFileRes = {
  success: boolean
  imageUrl?: string
  message?: string | msgObj
}

type msgObj = {
  code: string
  field: string
  storageErrors: []
}

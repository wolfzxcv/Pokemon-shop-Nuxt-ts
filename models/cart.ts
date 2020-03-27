export interface ICart {
  carts: carts[]
}

export interface IOrder {
  user: object
}

interface carts {
  product_id: string
  qty: number
  coupon_code: string
  id: string
  total: number
  final_total: number
  product: product
}

interface product {
  category: string
  content: string
  description: string
  id: string
  imageUrl: string
  is_enabled: number
  num: number
  origin_price: number
  price: number
  title: string
  unit: string
}

interface Response<T>{
  success: boolean
  data: T
  ?message: string
}

const check_carts:Response<ICart> = {
     success : true,
     data : {
         carts : [
          {
             coupon : {
                 code : "testCode",
                 due_date : 6547658,
                 id : "-L9uIs5EfPibJpwwTMhN",
                 is_enabled : 1,
                 percent : 60,
                 title : "超級特惠價格"
            },
             id : "-LATwKkmvteWHjkmtp6m",
             product : {
                 category : "衣服3",
                 content : "這是內容",
                 description : "Sit down please 名設計師設計",
                id : "-L9tH8jxVb2Ka_DYPwng",
                 imageUrl : "test.testtest",
                 is_enabled : 1,
                 num : 1,
                 origin_price : 500,
                 price : 600,
                 title : "[賣]動物園造型衣服3",
                 unit : "個"
            },
             product_id : "-L9tH8jxVb2Ka_DYPwng",
             qty : 2
          } 
        ],
         total : 3600,
         final_total : 2160
    },
     messages : []
  }
 
export interface Order {
    clientId: string
    date: Date
    sellerId: string
    products: {
         productId: string
         weight: number
         name: string
         price: number
    }[]
}
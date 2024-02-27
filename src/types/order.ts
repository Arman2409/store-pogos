export interface Order {
    clientId: string
    date: Date
    products: {
         productId: string
         quantity: number
    }[]
}
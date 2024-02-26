export interface Product {
    name: string
    price: string
}

export interface User {
    email: string
    name: string
}

export interface Order {
    userId: string
    date: Date
    products: {
         productId: string
         quantity: number
    }[]
}
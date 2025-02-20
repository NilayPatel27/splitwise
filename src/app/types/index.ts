// types/index.ts
export interface Person {
    id: string
    name: string
}

export interface PurchaseItem {
    id: string
    name: string
    price: number
    taxable?: boolean
    discount?: number
}

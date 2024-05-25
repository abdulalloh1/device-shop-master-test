export type ProductType = {
    "model": string
    "releaseYear": string
    "category": number | null
    "price": string
    "createdAt": string | Date
    "isVisible": boolean
    "description": string
    "image": string
    "id"?: number
}

export type CategoryType = {
    "id": number
    "name": string
}
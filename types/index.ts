import { Prisma, Product } from "@prisma/client";
import { z } from "zod";

export type OrderItem = Pick<Product, 'id' | 'name' | 'price'> & {
    quantity: number,
    subtotal: number
}


export const OrderIdSchema = z.object({
    orderId: z.string()
        .transform((value) => parseInt(value))
        .refine(value => value > 0, { message: "Number Error" })
})

// Payload Automatic
export type OrderWithProducts = Prisma.OrderGetPayload<{
    include: { orderProducts: { include: { product: true } } }
}>


export type ProductWithCategory = Prisma.ProductGetPayload<{
    include: { category: true }
}>

export const SearchSchema = z.object({
    search: z.string()
        .trim()
        .min(1, { message: 'Input search cannot be empty' }),
});

export const ProductSchema = z.object({
    name: z.string()
        .trim()
        .min(1, { message: "Product's name cannot be empty" }),
    price: z.string()
        .trim()
        .transform((value) => parseFloat(value))
        .refine((value) => value > 0, { message: 'Invalid price' })
        .or(z.number().min(1, { message: "Product's price is mandatory" })),
    categoryId: z.string()
        .trim()
        .transform((value) => parseInt(value))
        .refine((value) => value > 0, { message: "Product's category is mandatory" })
        .or(z.number().min(1, { message: "Product's category is mandatory" })),
    image: z.string().min(1, { message: "Produc'ts image is mandatory" })
})
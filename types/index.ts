import { Prisma, Product } from "@prisma/client";
import { z } from "zod";

export type OrderItem = Pick<Product, 'id' | 'name' | 'price'> & {
    quantity: number,
    subtotal: number
}

// Contruct
export type OrderWithProducts = Prisma.OrderGetPayload<{
    include: { orderProducts: { include: { product: true } } }
}>

export const OrderIdSchema = z.object({
    orderId: z.string()
        .transform((value) => parseInt(value))
        .refine(value => value > 0, { message: "Number Error" })
})
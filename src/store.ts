import { OrderItem } from '@/types';
import { Product } from '@prisma/client';
import { create } from 'zustand';

interface Store {
    order: OrderItem[]
    addToOrder: (product: Product) => void
}

export const useStore = create<Store>((set) => ({
    order: [],
    addToOrder: (product) => {
        // destructuring para remover atributos
        const { categoryId, image, ...data } = product;

        set((state) => ({
            order: [...state.order, {
                ...data,
                quantity: 1,
                subtotal: 1 * product.price
            }]
        }
        ));
    }
}));
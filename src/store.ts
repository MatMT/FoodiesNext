import { OrderItem } from '@/types';
import { Product } from '@prisma/client';
import { create } from 'zustand';

interface Store {
    order: OrderItem[]
    addToOrder: (product: Product) => void,
    increaseQuantity: (id: Product['id']) => void,
    decreaseQuantity: (id: Product['id']) => void,
    removeFromOrder: (id: Product['id']) => void,
    clearOrder: () => void;
}

export const useStore = create<Store>((set, get) => ({
    order: [],
    addToOrder: (product) => {
        // destructuring para remover atributos
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { categoryId, image, ...data } = product;
        let order: OrderItem[] = [];

        // `some` devuelve `true` si al menos un producto en la lista tiene el mismo `id` que el producto actual.
        if (get().order.some(item => item.id == product.id)) {

            order = get().order.map(item =>
                item.id === product.id
                    ? {
                        ...item, // Copia las propiedades existentes del producto.
                        quantity: item.quantity + 1,
                        subtotal: item.price * (item.quantity + 1)
                    }
                    : item // Si no es el producto buscado, lo retorna sin cambios.
            );
        } else {
            order = [
                ...get().order, // Copia todos los productos existentes en el pedido.
                {
                    ...data, // Copia las propiedades del nuevo producto.
                    quantity: 1,
                    subtotal: 1 * product.price
                }
            ];
        }

        set(() => ({
            order
        }));
    },
    increaseQuantity: (id) => {
        set((state) => ({
            order: state.order.map(item =>
                item.id === id
                    ? {
                        ...item, // Copia las propiedades existentes del producto.
                        quantity: item.quantity + 1,
                        subtotal: item.price * (item.quantity + 1)
                    }
                    : item // Si no es el producto buscado, lo retorna sin cambios.
            )
        }))
    },
    decreaseQuantity: (id) => {
        const order = get().order.map(item => item.id === id ?
            {
                ...item,
                quantity: item.quantity - 1,
                subtotal: item.price * (item.price - 1)
            }
            : item
        );

        set(() => ({
            order
        }));
    },
    removeFromOrder: (id) => {
        set((state) => ({
            // Filter retorna todos los items con id diferente
            order: state.order.filter(item => item.id !== id)
        }))
    },
    clearOrder: () => {
        set(() => ({
            order: []
        }))
    }
}));
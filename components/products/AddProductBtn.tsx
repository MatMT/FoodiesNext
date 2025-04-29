"use client";

import { useStore } from "@/src/store";
import { Product } from "@prisma/client";

type AddProductBtnProps = {
  product: Product;
};

export default function AddProductBtn({ product }: AddProductBtnProps) {
  const store = useStore((state) => state.addToOrder);

  return (
    <button
      onClick={() => store(product)}
      type="button"
      className="bg-indigo-600 text-white font-bold py-2 px-4 rounded w-full text-xl uppercase cursor-pointer mt-5 hover:bg-indigo-700 transition duration-200"
    >
      Add
    </button>
  );
}

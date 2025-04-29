"use client";
import { useStore } from "@/src/store";
import ProductDetails from "./ProductDetails";

export default function OrderSummary() {
  const order = useStore((state) => state.order);

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-center font-black text-4xl">My Order</h1>

      {order.length === 0 ? (
        <p className="text-gray-500 text-xl font-bold text-center mt-5">
          The shop car is empty
        </p>
      ) : (
        <div className="mt-5">
          {order.map((item) => (
            <ProductDetails key={item.id} item={item} />
          ))}
        </div>
      )}
    </aside>
  );
}
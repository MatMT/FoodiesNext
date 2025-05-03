"use client";
import { useStore } from "@/src/store";
import ProductDetails from "./ProductDetails";
import { useMemo } from "react";
import { formatCurrency } from "@/src/utils";

export default function OrderSummary() {
  const order = useStore((state) => state.order);
  
  const total = useMemo(
    () =>
      // Use reduce to iterate over the order array and calculate the total
      order.reduce(
        (total, item) => total + (item.quantity * item.price),   // Add the product of quantity and price of each item to the total
        0 // Initial value of the total is 0
      ),
    [order] // Recalculate only when the order array changes
  );

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

          <p className="text-2xl mt-20 text-center">
            Total amount: {""}
            <span className="font-bold">{formatCurrency(total)}</span>
          </p>
        </div>
      )}
    </aside>
  );
}

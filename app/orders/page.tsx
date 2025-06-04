"use client";
import LatestOrderItem from "@/components/order/LatestOrderItem";
import Logo from "@/components/ui/Logo";
import { OrderWithProducts } from "@/types";
import useSWR from "swr";

export default function OrdersPage() {
  const url = "/orders/api";
  const fetcher = () =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data);
  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 10000,
    revalidateOnFocus: false,
  });

  if (isLoading) return <p>"Loading..."</p>;

  if (data)
    return (
      <>
        <h1 className="text-center mt-20 text-6xl font-black">Ready orders</h1>

        <Logo />

        {data.length ? (
          <div className="grid grid-cols-1 gap-5 max-w-5xl mx-auto mt-10">
            {data.map((order) => 
              <LatestOrderItem key={order.id} order={order} />
            )}
          </div>
        ) : (
          <p className="text-center my-10 font-bold text-xl">
            No orders ready yet! :(
          </p>
        )}
      </>
    );
}

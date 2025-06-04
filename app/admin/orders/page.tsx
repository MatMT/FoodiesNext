"use client";
import OrderCard from "@/components/admin/OrderCard";
import Heading from "@/components/order/Heading";
import { OrderWithProducts } from "@/types";
import useSWR from "swr";

export default function page() {
  const url = "/admin/orders/api";
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
        <Heading>Check your received orders</Heading>

        {data.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
            {data.map((order, i) => (
              <OrderCard key={i} order={order} />
            ))}
          </div>
        ) : (
          <p className="text-center font-semibold text-gray-600 text-2xl">
            There are no pendings orders
          </p>
        )}
      </>
    );
}

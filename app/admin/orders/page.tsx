import OrderCard from "@/components/admin/OrderCard";
import Heading from "@/components/order/Heading";
import { prisma } from "@/src/lib/prisma";

async function getPendingOrder() {
  const orders = prisma.order.findMany({
    where: {
      status: false,
    },
    include: {
      orderProducts: {
        include: { product: true },
      },
    },
  });

  return orders;
}

export default async function page() {
  const orders = await getPendingOrder();

  return (
    <>
      <Heading>Check your received orders</Heading>

      {orders.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
          {orders.map((order, i) => (
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

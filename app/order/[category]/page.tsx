import { prisma } from "@/src/lib/prisma";
import ProductCard from "@/components/products/ProductCard";
import Heading from "@/components/order/Heading";

async function getProducts(category: string) {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category,
      },
    },
  });

  return products;
}

export default async function OrderPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const resolvedParams = await params;
  const products = await getProducts(resolvedParams.category);

  return (
    <>
      <Heading>Chose your product and add it to your order</Heading>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 items-start ">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

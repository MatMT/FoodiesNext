import Heading from "@/components/order/Heading";
import { prisma } from "@/src/lib/prisma";
import ProductTable from "@/components/products/ProductTable";
import ProductsPagination from "@/components/products/ProductsPagination";
import { redirect } from "next/navigation";
import Link from "next/link";
import ProductSearchForm from "@/components/products/ProductSearchForm";

async function productCount() {
  return prisma.product.count();
}

async function getProducts(page: number = 1, pageSize: number) {
  const skip = (page - 1) * pageSize;
  return prisma.product.findMany({
    skip,
    take: pageSize,
    include: {
      category: true,
    },
  });
}

export default async function page({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const page = +searchParams.page || 1;
  const pageSize = 10;

  if (page < 1) redirect(`/admin/products`);

  const productsData = getProducts(page, pageSize);
  const productCountData = productCount();
  const [products, totalProducts] = await Promise.all([
    productsData,
    productCountData,
  ]);

  const totalPages = Math.ceil(totalProducts / pageSize);

  if (page > totalPages) redirect(`/admin/products`);
  return (
    <>
      <Heading>Manage your cafe products</Heading>

      <div className="flex flex-col px-2 gap-6 text-center">
        <Link
          href="/admin/products/new"
          className="max-w-full md:max-w-[15rem] uppercase px-4 py-2 bg-amber-400 rounded-sm font-bold hover:bg-amber-500 focus:outline-none focus:ring-2 focus:black text-black focus:ring-offset-2"
        >
          Crear Producto
        </Link>

        <ProductSearchForm />
      </div>

      <div className="px-2 sm:px-4 lg:px-6 mt-10">
        <div className="mt-8 flow-root ">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <ProductTable products={products} />

            <ProductsPagination page={page} totalPages={totalPages} />
          </div>
        </div>
      </div>
    </>
  );
}

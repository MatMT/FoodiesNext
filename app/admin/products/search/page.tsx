import Heading from "@/components/order/Heading";
import { prisma } from "@/src/lib/prisma";
import { products } from "../../../../prisma/data/products";
import ProductTable from "@/components/products/ProductTable";
import ProductSearchForm from "@/components/products/ProductSearchForm";
import Link from "next/link";

async function getProductsWith(searchTerm: string) {
  return await prisma.product.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: "insensitive",
      },
    },
    include: {
      category: true,
    },
  });
}

export default async function page({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const search = searchParams.search || "";
  const products = await getProductsWith(search);

  return (
    <div>
      <Heading>Search results - {search}</Heading>

      <div className="flex flex-col px-2 gap-6 text-center">
        <Link
          href="/admin/products"
          className="max-w-full md:max-w-[15rem] uppercase px-4 py-2 bg-amber-400 rounded-sm font-bold hover:bg-amber-500 focus:outline-none focus:ring-2 focus:black text-black focus:ring-offset-2"
        >
          Volver
        </Link>

        <ProductSearchForm />
      </div>

      <div className="px-2 sm:px-4 lg:px-6 mt-10">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            {/* {products.length ? ( */}
            <ProductTable products={products} />
            {/* ) : ( */}
            {/* <p>Hello World!</p> */}
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

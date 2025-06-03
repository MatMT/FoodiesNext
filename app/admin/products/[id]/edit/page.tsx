import Heading from "@/components/order/Heading";
import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getProductById(id: number) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    notFound();
  }

  return product;
}

export default async function EditProductsPage({
  params,
}: {
  params: { id: string };
}) {
  const productId = params.id || 0;
  const product = await getProductById(+productId);

  return (
    <>
      <Heading>Editing - {product?.name}</Heading>

      <Link
        href="/admin/products"
        className="max-w-full md:max-w-[15rem] uppercase px-4 py-2 bg-amber-400 rounded-sm font-bold hover:bg-amber-500 focus:outline-none focus:ring-2 focus:black text-black focus:ring-offset-2"
      >
        Volver
      </Link>

      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>
    </>
  );
}

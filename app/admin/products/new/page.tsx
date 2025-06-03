import Heading from "@/components/order/Heading";
import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";
import Link from "next/link";

export default function page() {
  return (
    <>
      <Heading>Create a new Product</Heading>

      <Link
        href="/admin/products"
        className="max-w-full md:max-w-[15rem] uppercase px-4 py-2 bg-amber-400 rounded-sm font-bold hover:bg-amber-500 focus:outline-none focus:ring-2 focus:black text-black focus:ring-offset-2"
      >
        Volver
      </Link>

      <AddProductForm>
        <ProductForm />
      </AddProductForm>
    </>
  );
}

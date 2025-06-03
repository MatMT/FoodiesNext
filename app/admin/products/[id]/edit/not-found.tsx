import Heading from "@/components/order/Heading";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center">
      <Heading>Product Not Found</Heading>
      <Link href="/admin/products"
      className="bg-amber-400 text-black px-10 py-3 text-xl text-center font-bold cursor-pointer lg:w-auto w-full"
      >Back to products</Link>
    </div>
  );
}

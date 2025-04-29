import {Product} from "@prisma/client";
import {formatCurrency} from "@/src/utils";
import Image from "next/image";
import AddProductBtn from "./AddProductBtn";

type ProductCardProps = {
    product: Product
}

export default function ProductCard({product} : ProductCardProps) {
    return (
        <div className="border border-gray-200 bg-white">

            <div className="relative w-full h-full aspect-[1/1]">
            <Image
                fill={true}
                src={`/products/${product.image}.jpg`}
                alt={`Image of ${product.name}`}
                />
            </div>

            <div className="p-5">
                <h3 className="text-2xl font-bold">{product.name}</h3>
                <p className="mt-5 font-black text-4xl text-amber-500">
                    {formatCurrency(product.price)}
                </p>

                {/* Se convierte el boton a elemento de cliente */}
                <AddProductBtn product={product} />
            </div>

        </div>
    );
};
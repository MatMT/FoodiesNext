import {prisma} from "@/src/lib/prisma";
import ProductCard from "@/components/products/ProductCard";

async function getProducts(category: string) {
    const products = await prisma.product.findMany({
        where: {
            category: {
                slug: category
            }
        }
    });

    return products;
}

export default async function OrderPage({params} : {params: {category: string}}) {

    const products = await getProducts(params.category);

    return (
        <>
            <h1 className="text-3xl my-10 font-bold uppercase text-center">
                Chose your product and add it to your order
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-start ">

                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))
                }

            </div>
        </>
    );
};
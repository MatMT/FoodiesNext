import { prisma } from "@/src/lib/prisma";
import ImageUpload from "./ImageUpload";
import { Product } from "@prisma/client";

async function getCategories() {
  return await prisma.category.findMany();
}

interface ProductFormProps {
  product?: Product;
}

export default async function ProductForm({ product }: ProductFormProps) {
  const categories = await getCategories();
  return (
    <>
      {" "}
      <div className="space-y-2">
        <label className="font-bold text-slate-800 ml-1 block" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          placeholder="Product's name"
          name="name"
          className="block bg-white w-full px-4 py-2 text-sm border border-gray-300 rounded-md "
          defaultValue={product?.name}
        />
      </div>
      <div className="space-y-2">
        <label className="font-bold text-slate-800 ml-1 block" htmlFor="price">
          Price
        </label>
        <input
          type="number"
          placeholder="0.00"
          min={0}
          max={100}
          step={0.01}
          name="price"
          className="block bg-white w-full px-4 py-2 text-sm border border-gray-300 rounded-md "
          defaultValue={product?.price}
        />
      </div>
      <div className="space-y-2">
        <label
          className="font-bold ml-1 text-slate-800  block"
          htmlFor="categoryId"
        >
          Category
        </label>
        <select
          className="block bg-white w-full px-4 py-2 text-sm border border-gray-300 rounded-md"
          name="categoryId"
          defaultValue={product ? product.image : ""}
        >
          <option disabled value="">
            -- Select ---
          </option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <ImageUpload image={product?.image} />
      </div>
    </>
  );
}

import { prisma } from "@/src/lib/prisma";
import ImageUpload from "./ImageUpload";

async function getCategories() {
  return await prisma.category.findMany();
}

export default async function ProductForm() {
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
          defaultValue=""
        >
          <option disabled value="" >
            -- Select ---
          </option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <ImageUpload />
      </div>
    </>
  );
}

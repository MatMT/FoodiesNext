"use client";

import { updateProduct } from "@/actions/update-product-action";
import { prisma } from "@/src/lib/prisma";
import { ProductSchema } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function EditProductForm({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const params = useParams();
  const id = +params.id!;

  const handleCreateForm = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      price: formData.get("price"),
      categoryId: formData.get("categoryId"),
      image: formData.get("image"),
    };

    const result = ProductSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });

      return;
    }

    const response = await updateProduct(result.data, id);
    if (response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message);
      });

      return;
    }
    
    router.push("/admin/products");
    toast.success("Product updated successfully!");
  };

  return (
    <div className="bg-white mt-10 px-5 pt-10 pb-5 rounded-md shadow-md max-w-3xl mx-auto">
      <form
        action={handleCreateForm}
        className="flex items-center justify-between mb-4"
      >
        <div className="w-full space-y-4">
          {children}

          <button
            type="submit"
            className="w-full px-4 mt-5 py-2 bg-indigo-600 font-bold text-white rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:black"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}

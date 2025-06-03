"use client";
import { SearchSchema } from "@/types";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ProductSearchForm() {
  const router = useRouter();

  const handleSearchForm = (formData: FormData) => {
    const data = {
      search: formData.get("search"),
    };
    const result = SearchSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });

      return;
    }

    router.push(`/admin/products/search?search=${result.data.search}`);
  };

  return (
    <form
      action={handleSearchForm}
      className="flex items-center justify-between mb-4"
    >
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search product..."
          name="search"
          className="block bg-white w-full px-4 py-2 text-sm border border-gray-300 rounded-md "
        />
      </div>
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-amber-400 font-bold text-black rounded-md hover:bg-amber-500 focus:outline-none focus:ring-2 focus:black"
      >
        Search
      </button>
    </form>
  );
}

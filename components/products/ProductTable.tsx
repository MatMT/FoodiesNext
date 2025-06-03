import { ProductWithCategory } from "@/types";
import Link from "next/link";

type ProductTableProps = {
  products: ProductWithCategory[];
};

export default function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-white p-5 ">
      <table className="min-w-full divide-y divide-gray-300 ">
        <thead>
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
            >
              Product
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Price
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Category
            </th>
            {products.length > 0 && (
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                <span className="sr-only">Actions</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.length ? (
            products.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-100 transition-colors"
              >
                <td className="py-4 font-medium text-gray-700">{item.name}</td>
                <td className="px-4 py-4 text-gray-600">
                  ${item.price.toFixed(2)}
                </td>
                <td className="px-4 py-4 text-gray-600">
                  {item.category.name}
                </td>
                <td className="px-4 py-4">
                  <Link
                  href={`products/${item.id}/edit`}
                  className="text-blue-600 hover:underline font-semibold">
                    Editar
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={3}
                className="p-4 font-semibold text-gray-600 text-center"
              >
                There are no products registered
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

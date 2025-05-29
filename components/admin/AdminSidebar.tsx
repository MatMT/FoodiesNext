import Link from "next/link";
import Logo from "../ui/Logo";
import AdminRoute from "./AdminRoute";
const adminNavigation = [
  { url: "/admin/orders", text: "Orders", blank: false },
  { url: "/admin/products", text: "Products", blank: false },
  { url: "/order/cafe", text: "Cafe", blank: true },
];

export default function AdminSidebar() {
  return (
    <>
      <Logo />
      <div className="space-y-3 ">
        <p className="mt-10 uppercase font-bold text-sm text-gray-600 text-center">
          Navegación
        </p>
        <nav className="flex flex-col">
          {adminNavigation &&
            adminNavigation.map((link, i) => <AdminRoute key={i} link={link} />)
            }
        </nav>
      </div>
    </>
  );
}

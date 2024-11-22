import { auth } from "@/server/auth";
import { BarChart, Package, PenSquare, Settings, Truck } from "lucide-react";
import Link from "next/link";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  const userLinks = [
    { label: "Orders", path: "/dashboard/orders", icon: <Truck size={16} /> },
    { label: "Settings", path: "/dashboard/settings", icon: <Settings size={16} /> },
  ] as const;

  const adminLinks =
    session?.user.role === "admin"
      ? [
          { label: "Analitics", path: "/dashboard/analitics", icon: <BarChart size={16} /> },
          { label: "Create", path: "/dashboard/add-products", icon: <PenSquare size={16} /> },
          { label: "Products", path: "/dashboard/products", icon: <Package size={16} /> },
        ]
      : [];

  const allLinks = [...adminLinks, ...userLinks];

  return (
    <div>
      <nav className="py-2 overflow-auto">
        <ul className="flex gap-6">
          {allLinks.map((link) => (
            <li>
              <Link href={link.path}>
                {link.icon} {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {children}
    </div>
  );
}

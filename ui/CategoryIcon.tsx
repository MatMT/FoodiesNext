import React from 'react'
import {Category} from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type CategoryIconProps = {
    category: Category
}

export default function CategoryIcon({category} : CategoryIconProps) {
  return (
    <Link
        className={`flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b hover:bg-gray-50 cursor-pointer transition-colors duration-200 ease-in-out`}
        href={`/order/${category.slug}`}
    >
        <div className="w-16 h-16 relative">
        <Image
            fill={true}
            src={`/icon_${category.slug}.svg`} alt={`Category Image`} />
        </div>

        <p className="text-xl font-bold">{category.name}</p>
    </Link>
  )
}

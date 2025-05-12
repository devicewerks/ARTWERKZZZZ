"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart/cart-provider"
import { formatPrice } from "@/lib/utils"

interface ProductCardProps {
  product: {
    id: string
    name: string
    artist: string
    type: string
    price: number
    image: string
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  return (
    <div className="flex-shrink-0 w-[250px] sm:w-[300px]">
      <Link href={`/artwork/${product.id}`} className="group">
        <div className="relative h-[250px] sm:h-[300px] w-full overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <h3 className="mt-4 text-lg sm:text-xl font-medium text-center text-[#1d1d1f]">{product.name}</h3>
        <p className="text-center text-sm text-[#86868b]">By {product.artist}</p>
        <p className="text-center text-[#86868b]">{formatPrice(product.price)}</p>
      </Link>

      <div className="mt-4 flex justify-center">
        <Button
          onClick={() => addItem(product)}
          className="rounded-full bg-[#0071e3] px-6 py-2 text-sm font-medium text-white hover:bg-[#0077ED]"
        >
          Add to Bag
        </Button>
      </div>
    </div>
  )
}

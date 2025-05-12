"use client"

import { useCart, type CartItem } from "@/components/cart/cart-provider"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Plus, Minus, ShoppingBag } from "lucide-react"
import Image from "next/image"
import { formatPrice } from "@/lib/utils"

export function CartDrawer() {
  const { items, totalPrice, isCartOpen, toggleCart, updateQuantity, removeItem, clearCart } = useCart()

  if (!isCartOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div className="absolute inset-0" onClick={toggleCart} aria-hidden="true" />

      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl animate-in slide-in-from-right">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h2 className="text-lg font-medium">Shopping Bag ({items.length})</h2>
            <Button variant="ghost" size="icon" onClick={toggleCart} aria-label="Close">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {items.length > 0 ? (
            <>
              <ScrollArea className="flex-1 px-4 py-4">
                <div className="space-y-4">
                  {items.map((item) => (
                    <CartItemCard key={item.id} item={item} updateQuantity={updateQuantity} removeItem={removeItem} />
                  ))}
                </div>
              </ScrollArea>

              <div className="border-t p-4">
                <div className="flex justify-between py-2">
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <span className="text-sm font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-muted-foreground">Shipping</span>
                  <span className="text-sm font-medium">Calculated at checkout</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm font-medium">Total</span>
                  <span className="text-sm font-medium">{formatPrice(totalPrice)}</span>
                </div>

                <div className="mt-4 space-y-2">
                  <Button className="w-full rounded-full bg-[#0071e3] hover:bg-[#0077ED]">Checkout</Button>
                  <Button variant="outline" className="w-full rounded-full" onClick={clearCart}>
                    Clear Cart
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center p-4">
              <ShoppingBag className="h-16 w-16 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Your bag is empty</h3>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                Looks like you haven't added anything to your bag yet.
              </p>
              <Button className="mt-8 rounded-full bg-[#0071e3] hover:bg-[#0077ED]" onClick={toggleCart}>
                Continue Shopping
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function CartItemCard({
  item,
  updateQuantity,
  removeItem,
}: {
  item: CartItem
  updateQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
}) {
  return (
    <div className="flex gap-4">
      <div className="relative h-20 w-20 overflow-hidden rounded-md bg-muted">
        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <h4 className="text-sm font-medium">{item.name}</h4>
            <p className="text-xs text-muted-foreground">By {item.artist}</p>
            <p className="text-xs text-muted-foreground">{item.type}</p>
          </div>
          <p className="text-sm font-medium">{formatPrice(item.price)}</p>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 rounded-full"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="text-sm w-6 text-center">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 rounded-full"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground"
            onClick={() => removeItem(item.id)}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  )
}

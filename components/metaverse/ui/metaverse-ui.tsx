"use client"

import { useState, useEffect } from "react"
import { useThree } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import { useCart } from "@/components/cart/cart-provider"
import { formatPrice } from "@/lib/utils"
import { ShoppingBag, Headphones, Info, Volume2, VolumeX } from "lucide-react"

export function MetaverseUI() {
  const { cartCount, totalPrice, toggleCart } = useCart()
  const [showInfo, setShowInfo] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const { camera } = useThree()

  // Toggle background audio
  useEffect(() => {
    let audio

    if (audioEnabled) {
      try {
        audio = new Audio("/sounds/ambient.mp3")
        audio.volume = 0.2
        audio.loop = true
        audio.play().catch((e) => console.error("Audio playback failed:", e))
      } catch (e) {
        console.error("Audio playback failed:", e)
      }
    }

    return () => {
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }
    }
  }, [audioEnabled])

  return (
    <Html fullscreen>
      <div className="pointer-events-none fixed inset-0">
        {/* Fixed UI elements */}
        <div className="absolute top-5 right-5 flex gap-2 pointer-events-auto">
          <button
            className="bg-black/40 backdrop-blur-md text-white p-2 rounded-full hover:bg-black/60 transition-all"
            onClick={() => setShowInfo(!showInfo)}
          >
            <Info className="w-5 h-5" />
          </button>
          <button
            className="bg-black/40 backdrop-blur-md text-white p-2 rounded-full hover:bg-black/60 transition-all"
            onClick={() => setAudioEnabled(!audioEnabled)}
          >
            {audioEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>

        {/* Cart button */}
        <div className="absolute bottom-5 right-5 pointer-events-auto">
          <button
            className="bg-[#a78fff] text-white flex items-center gap-2 py-2 px-4 rounded-full hover:bg-[#8a66ff] transition-all shadow-lg"
            onClick={toggleCart}
          >
            <ShoppingBag className="w-5 h-5" />
            <span>
              {cartCount} {cartCount === 1 ? "item" : "items"}
            </span>
            <span className="font-semibold">{formatPrice(totalPrice)}</span>
          </button>
        </div>

        {/* Audio guide note */}
        <div className="absolute bottom-5 left-5 pointer-events-auto flex items-center gap-2 bg-black/40 backdrop-blur-md text-white py-2 px-3 rounded-full">
          <Headphones className="w-4 h-4" />
          <span className="text-xs">Interactive Audio Guide</span>
        </div>

        {/* Info popup */}
        {showInfo && (
          <div className="absolute top-16 right-5 w-64 bg-black/70 backdrop-blur-md text-white p-4 rounded-lg pointer-events-auto">
            <h3 className="font-semibold mb-2">ARTWERKZZZZ Gallery Controls</h3>
            <ul className="text-sm space-y-2">
              <li>
                • <span className="text-purple-300">WASD</span> - Move around
              </li>
              <li>
                • <span className="text-purple-300">Mouse</span> - Look around
              </li>
              <li>
                • <span className="text-purple-300">Left Click</span> - Interact with artwork
              </li>
              <li>
                • <span className="text-purple-300">Space</span> - Jump (where allowed)
              </li>
              <li>
                • <span className="text-purple-300">E</span> - Interact with guides
              </li>
            </ul>
            <div className="mt-2 text-xs text-gray-300">
              For the best experience, use headphones and explore the gallery at your own pace.
            </div>
            <button
              className="mt-3 w-full bg-[#a78fff] hover:bg-[#8a66ff] text-white py-1 rounded-md text-sm transition-all"
              onClick={() => setShowInfo(false)}
            >
              Close
            </button>
          </div>
        )}

        {/* Crosshair */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-1 h-1 rounded-full bg-white/30"></div>
        </div>
      </div>
    </Html>
  )
}

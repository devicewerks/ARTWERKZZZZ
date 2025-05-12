"use client"

import { Button } from "@/components/ui/button"
import { X, Gamepad2, Smartphone, Laptop, Headset } from "lucide-react"

export function MetaverseInfo({ onClose }) {
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Welcome to ARTWERKZZZZ Metaverse</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-4">
          <p>
            Explore our virtual art gallery in an immersive 3D environment. View artworks up close, learn about the
            artists, and make purchases directly in the metaverse.
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Laptop className="h-5 w-5 mt-0.5 flex-shrink-0 text-[#0071e3]" />
              <div>
                <h3 className="font-medium">Desktop Controls</h3>
                <p className="text-sm text-gray-600">
                  Use W, A, S, D keys to move. Click and drag to look around. Click on artworks to view details.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Smartphone className="h-5 w-5 mt-0.5 flex-shrink-0 text-[#0071e3]" />
              <div>
                <h3 className="font-medium">Mobile Controls</h3>
                <p className="text-sm text-gray-600">
                  Swipe to look around. Use the on-screen joystick to move. Tap on artworks to view details.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Headset className="h-5 w-5 mt-0.5 flex-shrink-0 text-[#0071e3]" />
              <div>
                <h3 className="font-medium">VR Mode</h3>
                <p className="text-sm text-gray-600">
                  For the full experience, use a VR headset. Click the VR button to enter immersive mode. Use
                  controllers to navigate and interact.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Gamepad2 className="h-5 w-5 mt-0.5 flex-shrink-0 text-[#0071e3]" />
              <div>
                <h3 className="font-medium">Tips</h3>
                <p className="text-sm text-gray-600">
                  Click the controls button in the bottom left for a quick reference. You can add artworks to your cart
                  directly from the metaverse.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Button className="w-full rounded-full bg-[#0071e3] hover:bg-[#0077ED]" onClick={onClose}>
              Enter the Metaverse
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

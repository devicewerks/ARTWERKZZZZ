"use client"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface MetaverseInfoProps {
  onClose: () => void
}

export function MetaverseInfo({ onClose }: MetaverseInfoProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Welcome to the Metaverse Gallery</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-medium mb-2">Navigation Controls:</h3>
            <ul className="space-y-1 text-gray-600">
              <li>
                • <strong>Mouse:</strong> Look around the gallery
              </li>
              <li>
                • <strong>Scroll:</strong> Zoom in and out
              </li>
              <li>
                • <strong>Click:</strong> Interact with artworks
              </li>
              <li>
                • <strong>Drag:</strong> Rotate the view
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-2">Features:</h3>
            <ul className="space-y-1 text-gray-600">
              <li>• Click artworks to view details and purchase</li>
              <li>• Explore the floating citadel structures</li>
              <li>• Interact with the AI gallery guide</li>
              <li>• Experience immersive 3D art viewing</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-2">VR Support:</h3>
            <p className="text-gray-600">
              For the best experience, use a VR headset if available. The gallery supports WebXR for immersive viewing.
            </p>
          </div>
        </div>

        <Button onClick={onClose} className="w-full mt-6 rounded-full bg-[#0071e3] hover:bg-[#0077ED]">
          Start Exploring
        </Button>
      </div>
    </div>
  )
}

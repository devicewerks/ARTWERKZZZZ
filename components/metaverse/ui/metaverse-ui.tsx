"use client"

import { Html } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Home, Info } from "lucide-react"

export function MetaverseUI() {
  return (
    <Html fullscreen>
      <div className="fixed bottom-4 left-4 flex flex-col gap-2 z-10">
        <Button
          size="sm"
          variant="outline"
          className="bg-black/50 text-white border-white/20 hover:bg-white/10"
          onClick={() => (window.location.href = "/")}
        >
          <Home className="h-4 w-4 mr-2" />
          Exit VR
        </Button>
        <Button size="sm" variant="outline" className="bg-black/50 text-white border-white/20 hover:bg-white/10">
          <Info className="h-4 w-4 mr-2" />
          Help
        </Button>
      </div>

      <div className="fixed top-4 right-4 z-10">
        <div className="bg-black/50 text-white p-3 rounded-lg backdrop-blur-sm">
          <p className="text-sm">Use mouse to look around</p>
          <p className="text-sm">Scroll to zoom</p>
          <p className="text-sm">Click artworks to interact</p>
        </div>
      </div>
    </Html>
  )
}

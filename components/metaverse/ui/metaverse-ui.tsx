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
    </Html>
  )
}

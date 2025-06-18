"use client"

import { Button } from "@/components/ui/button"
import { RotateCcw, ZoomIn, Move, Eye } from "lucide-react"

export function MetaverseControls() {
  return (
    <div className="fixed bottom-4 right-4 z-10 flex flex-col gap-2">
      <div className="bg-black/50 backdrop-blur-md rounded-lg p-2 text-white">
        <div className="grid grid-cols-2 gap-2">
          <Button size="sm" variant="ghost" className="text-white hover:bg-white/10" title="Reset View">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="text-white hover:bg-white/10" title="Zoom In">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="text-white hover:bg-white/10" title="Move Mode">
            <Move className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="text-white hover:bg-white/10" title="Look Mode">
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

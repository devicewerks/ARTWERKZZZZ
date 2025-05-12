"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, MousePointer, Maximize2, Gamepad2 } from "lucide-react"

export function MetaverseControls() {
  const [showControls, setShowControls] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if on mobile device
    setIsMobile(window.innerWidth < 768)

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="fixed bottom-4 left-4 z-10">
      <Button
        variant="secondary"
        size="icon"
        className="rounded-full bg-black/50 backdrop-blur-md hover:bg-black/70"
        onClick={() => setShowControls(!showControls)}
      >
        <Gamepad2 className="h-5 w-5 text-white" />
      </Button>

      {showControls && (
        <div className="absolute bottom-14 left-0 bg-black/70 backdrop-blur-md p-4 rounded-lg text-white w-64">
          <h3 className="font-medium mb-2">Controls</h3>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center">
                <ArrowUp className="h-4 w-4" />
                <div className="flex">
                  <ArrowLeft className="h-4 w-4" />
                  <ArrowDown className="h-4 w-4" />
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
              <span className="text-xs">Move around</span>
            </div>

            <div className="flex items-center gap-2">
              <MousePointer className="h-4 w-4" />
              <span className="text-xs">Click on artwork to view details</span>
            </div>

            <div className="flex items-center gap-2">
              <Maximize2 className="h-4 w-4" />
              <span className="text-xs">Drag to look around</span>
            </div>

            {isMobile && (
              <div className="mt-2 text-xs">
                For the best experience, use a desktop device with a keyboard and mouse.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Eye, Move3D, RotateCcw, Info, Home } from "lucide-react"
import { useState } from "react"

export function MetaverseControls({ onModeChange, currentMode = "orbit" }) {
  const [showHelp, setShowHelp] = useState(false)

  return (
    <>
      {/* Minimal Control Strip */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 flex items-center gap-3">
          <Button
            size="sm"
            variant="ghost"
            className={`h-8 w-8 p-0 rounded-full transition-all duration-200 ${
              currentMode === "orbit" ? "bg-white/20 text-white" : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
            onClick={() => onModeChange?.("orbit")}
            title="Orbit View"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>

          <div className="w-px h-4 bg-white/20" />

          <Button
            size="sm"
            variant="ghost"
            className={`h-8 w-8 p-0 rounded-full transition-all duration-200 ${
              currentMode === "firstperson"
                ? "bg-white/20 text-white"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
            onClick={() => onModeChange?.("firstperson")}
            title="First Person"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="fixed bottom-6 left-6 z-20 flex flex-col gap-3">
        <Button
          size="sm"
          variant="ghost"
          className="h-10 w-10 p-0 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
          onClick={() => (window.location.href = "/")}
          title="Exit VR"
        >
          <Home className="h-4 w-4" />
        </Button>

        <Button
          size="sm"
          variant="ghost"
          className="h-10 w-10 p-0 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
          onClick={() => setShowHelp(!showHelp)}
          title="Help"
        >
          <Info className="h-4 w-4" />
        </Button>
      </div>

      {/* Subtle Help Overlay */}
      {showHelp && (
        <div className="fixed inset-0 z-30 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setShowHelp(false)} />
          <div className="relative bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-sm">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-white mb-2">Gallery Controls</h3>
              <p className="text-white/60 text-sm">Navigate the metaverse gallery</p>
            </div>

            <div className="space-y-3">
              {currentMode === "firstperson" ? (
                <>
                  <div className="flex items-center gap-3">
                    <Move3D className="h-4 w-4 text-blue-400" />
                    <div>
                      <p className="text-white text-sm font-medium">WASD Keys</p>
                      <p className="text-white/60 text-xs">Move around</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Eye className="h-4 w-4 text-purple-400" />
                    <div>
                      <p className="text-white text-sm font-medium">Mouse</p>
                      <p className="text-white/60 text-xs">Look around (click to lock cursor)</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <RotateCcw className="h-4 w-4 text-blue-400" />
                    <div>
                      <p className="text-white text-sm font-medium">Drag</p>
                      <p className="text-white/60 text-xs">Rotate view</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Move3D className="h-4 w-4 text-purple-400" />
                    <div>
                      <p className="text-white text-sm font-medium">Scroll</p>
                      <p className="text-white/60 text-xs">Zoom in/out</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <Button
              size="sm"
              className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white border-0"
              onClick={() => setShowHelp(false)}
            >
              Got it
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

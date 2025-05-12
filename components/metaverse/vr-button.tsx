"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Headset } from "lucide-react"

export function VRButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-10">
      <div className="relative">
        <Button
          className={`rounded-full bg-[#0071e3] hover:bg-[#0077ED] transition-all duration-300 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            // This would trigger VR mode in a real implementation
            alert("VR mode would start here. Connect your VR headset to continue.")
          }}
        >
          <Headset className="mr-2 h-4 w-4" />
          Enter VR
        </Button>

        {isHovered && (
          <div className="absolute bottom-full mb-2 right-0 bg-black/70 backdrop-blur-md p-2 rounded text-white text-xs w-48">
            Connect your VR headset for the full immersive experience
          </div>
        )}
      </div>
    </div>
  )
}

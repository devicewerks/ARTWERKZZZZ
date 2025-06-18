"use client"

import { Button } from "@/components/ui/button"
import { Headset } from "lucide-react"

export function VRButton() {
  const enterVR = () => {
    // In a real implementation, this would trigger WebXR
    console.log("Entering VR mode...")
  }

  return (
    <div className="fixed top-4 left-4 z-10">
      <Button
        onClick={enterVR}
        className="bg-[#a78fff] hover:bg-[#8a66ff] text-white rounded-full flex items-center gap-2"
      >
        <Headset className="h-4 w-4" />
        Enter VR
      </Button>
    </div>
  )
}

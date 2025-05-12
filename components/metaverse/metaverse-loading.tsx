"use client"

import { useEffect, useState } from "react"

export function MetaverseLoading() {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Initializing metaverse...")

  useEffect(() => {
    const loadingTexts = [
      "Initializing metaverse...",
      "Loading virtual gallery...",
      "Preparing artworks...",
      "Calibrating physics...",
      "Setting up lighting...",
      "Almost ready...",
    ]

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15
        return newProgress > 100 ? 100 : newProgress
      })
    }, 500)

    const textInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loadingTexts.length)
      setLoadingText(loadingTexts[randomIndex])
    }, 1500)

    return () => {
      clearInterval(interval)
      clearInterval(textInterval)
    }
  }, [])

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-white">
      <div className="w-64 h-64 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-40 h-40 border-4 border-[#0071e3]/30 rounded-full animate-pulse" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-32 h-32 border-4 border-[#0071e3]/50 rounded-full animate-spin"
            style={{ animationDuration: "3s" }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-24 h-24 border-4 border-[#0071e3] rounded-full animate-spin"
            style={{ animationDuration: "1.5s" }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-12 w-12 text-white"
          >
            <path d="M12 2a9.96 9.96 0 0 0-7.071 2.929A9.96 9.96 0 0 0 2 12a9.96 9.96 0 0 0 2.929 7.071A9.96 9.96 0 0 0 12 22a9.96 9.96 0 0 0 7.071-2.929A9.96 9.96 0 0 0 22 12a9.96 9.96 0 0 0-2.929-7.071A9.96 9.96 0 0 0 12 2Z" />
            <path d="M12 2v20" />
            <path d="M2 12h20" />
          </svg>
        </div>
      </div>

      <div className="mt-8 w-64">
        <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#0071e3] rounded-full"
            style={{ width: `${progress}%`, transition: "width 0.5s ease-out" }}
          />
        </div>
        <p className="mt-4 text-center text-sm text-gray-400">{loadingText}</p>
        <p className="mt-2 text-center text-xs text-gray-500">{Math.round(progress)}%</p>
      </div>
    </div>
  )
}

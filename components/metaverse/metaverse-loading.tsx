"use client"

export function MetaverseLoading() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="text-center text-white">
        <div className="mb-8">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#a78fff] mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold mb-2">Loading Metaverse Gallery</h2>
          <p className="text-gray-300">Preparing your immersive art experience...</p>
        </div>

        <div className="space-y-2 text-sm text-gray-400">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-[#a78fff] rounded-full animate-pulse"></div>
            <span>Loading 3D environment</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-[#a78fff] rounded-full animate-pulse delay-100"></div>
            <span>Initializing artwork gallery</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-[#a78fff] rounded-full animate-pulse delay-200"></div>
            <span>Setting up interactions</span>
          </div>
        </div>
      </div>
    </div>
  )
}

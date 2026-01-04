import { GlowingEffect } from "@/components/ui/glowing-effect";
// Imports removed as they are no longer used with the new image-based cards

export default function WorkflowSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            The 5-Step Process
          </h2>
        </div>

        <div className="relative">
          {/* Green Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[180px] left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-lime-400 via-emerald-500 to-emerald-600 z-0"></div>
          {/* Vertical connecting line for snake effect could go here, but keeping it simple horizontal for now as getting perfect snake path with SVG is complex dynamically. Using a horizontal flow concept. */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-10 relative z-10">

            {/* Step 1: Connect */}
            <div className="group rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-2xl transition-all duration-300 lg:col-span-2 aspect-[4/3] relative p-1">
              <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-lime-500/20 transition-colors z-20 pointer-events-none"></div>
              <GlowingEffect blur={0} borderWidth={3} spread={120} glow={true} disabled={false} proximity={65} inactiveZone={0.01} />
              <div className="relative z-10 w-full h-full bg-white rounded-[22px] overflow-hidden">
                <img
                  src="/assets/workflow-step1-connect.png"
                  alt="Connect - Scan your website"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Step 2: Extract */}
            <div className="group rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-2xl transition-all duration-300 lg:col-span-2 aspect-[4/3] relative p-1">
              <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-lime-500/20 transition-colors z-20 pointer-events-none"></div>
              <GlowingEffect blur={0} borderWidth={3} spread={120} glow={true} disabled={false} proximity={65} inactiveZone={0.01} />
              <div className="relative z-10 w-full h-full bg-white rounded-[22px] overflow-hidden">
                <img
                  src="/assets/workflow-step2-extract.png"
                  alt="Extract - Find colors & logos"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Step 3: Define */}
            <div className="group rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-2xl transition-all duration-300 lg:col-span-2 aspect-[4/3] relative p-1">
              <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-lime-500/20 transition-colors z-20 pointer-events-none"></div>
              <GlowingEffect blur={0} borderWidth={3} spread={120} glow={true} disabled={false} proximity={65} inactiveZone={0.01} />
              <div className="relative z-10 w-full h-full bg-white rounded-[22px] overflow-hidden">
                <img
                  src="/assets/workflow-step3-define.jpg"
                  alt="Define - Customize your content"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Step 4: Concept (Layout Selection) */}
            <div className="group rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-2xl transition-all duration-300 lg:col-span-2 lg:col-start-2 aspect-[4/3] relative p-1">
              <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-lime-500/20 transition-colors z-20 pointer-events-none"></div>
              <GlowingEffect blur={0} borderWidth={3} spread={120} glow={true} disabled={false} proximity={65} inactiveZone={0.01} />
              <div className="relative z-10 w-full h-full bg-white rounded-[22px] overflow-hidden">
                <img
                  src="/assets/workflow-step4-concept.jpg"
                  alt="Concept - Choose a layout"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Step 5: Publish */}
            <div className="group rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-2xl transition-all duration-300 lg:col-span-2 lg:col-start-4 aspect-[4/3] relative p-1">
              <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-lime-500/20 transition-colors z-20 pointer-events-none"></div>
              <GlowingEffect blur={0} borderWidth={3} spread={120} glow={true} disabled={false} proximity={65} inactiveZone={0.01} />
              <div className="relative z-10 w-full h-full bg-white rounded-[22px] overflow-hidden">
                <img
                  src="/assets/workflow-step5-publish.jpg"
                  alt="Publish - Share your design"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>

          {/* Custom Snake Connector Lines for clean visual link between row 1 and 2 */}
          <div className="hidden lg:block absolute right-[16.5%] top-[50%] w-[2px] h-[100px] bg-gradient-to-b from-emerald-600 to-emerald-400 opacity-20"></div>
          <div className="hidden lg:block absolute right-[16.5%] left-[50%] top-[65%] h-[2px] bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-20"></div>

        </div>

        <div className="mt-16 text-center">
          <button className="bg-lime-500 text-black px-8 py-3 rounded-full font-bold hover:bg-lime-400 transition-colors shadow-lg hover:shadow-lime-500/20">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
}

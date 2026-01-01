import { ArrowRight, Download, Search, Check, Pencil } from 'lucide-react';

export default function WorkflowSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 relative z-10">

            {/* Step 1: Connect */}
            <div className="group bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="mb-2 text-lg font-medium text-gray-500">1. Connect</div>

              {/* Graphic: Browser */}
              <div className="h-40 bg-gray-50 rounded-xl border border-gray-100 mb-6 relative overflow-hidden flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-[200px] bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="h-6 bg-gray-100 border-b border-gray-200 flex items-center gap-1 px-2">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  </div>
                  <div className="p-2 flex items-center gap-2">
                    <div className="flex-1 bg-gray-50 rounded px-2 py-1 text-[10px] text-gray-400 truncate">https://yoursite.com</div>
                    <Search size={12} className="text-gray-400" />
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-lime-400 to-emerald-500 blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 font-medium">Scan your website.</p>
              </div>
            </div>

            {/* Step 2: Extract */}
            <div className="group bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="mb-2 text-lg font-medium text-gray-500">2. Extract</div>

              {/* Graphic: Palette & Shield */}
              <div className="h-40 bg-gray-50 rounded-xl border border-gray-100 mb-6 relative overflow-hidden flex items-center justify-center">
                <div className="relative">
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 w-32">
                    <div className="grid grid-cols-4 gap-2 mb-2">
                      <div className="w-5 h-5 rounded-full bg-blue-500"></div>
                      <div className="w-5 h-5 rounded-full bg-orange-500"></div>
                      <div className="w-5 h-5 rounded-full bg-emerald-500"></div>
                      <div className="w-5 h-5 rounded-full bg-yellow-400"></div>
                    </div>
                    <div className="h-2 w-3/4 bg-gray-100 rounded mb-1"></div>
                    <div className="h-2 w-1/2 bg-gray-100 rounded"></div>
                  </div>
                  <div className="absolute -right-4 -bottom-2 bg-emerald-100 p-2 rounded-lg border border-emerald-200 shadow-sm">
                    <Check size={20} className="text-emerald-600" />
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 font-medium">Find colors & logos.</p>
              </div>
            </div>

            {/* Step 3: Define */}
            <div className="group bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <div className="mb-2 text-lg font-medium text-gray-500">3. Define</div>

              {/* Graphic: Input Field */}
              <div className="h-40 bg-gray-50 rounded-xl border border-gray-100 mb-6 relative overflow-hidden flex items-center justify-center">
                <div className="w-full max-w-[220px] bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                  <div className="text-[10px] text-gray-400 mb-1">Enter your event name</div>
                  <div className="flex justify-between items-center text-gray-900 font-bold text-lg">
                    <span>Summer Sale</span>
                    <Pencil size={14} className="text-gray-400" />
                  </div>
                  <div className="w-[1px] h-5 bg-emerald-500 animate-pulse inline-block ml-0.5 align-middle"></div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 font-medium">Customize your content.</p>
              </div>
            </div>

            {/* Step 4: Concept (Layout Selection) */}
            <div className="group bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-2xl transition-all duration-300 lg:col-start-1 lg:ml-auto md:ml-0">
              {/* Note: In a real snake, this would be row 2. Using offset to align effectively. */}
              <div className="mb-2 text-lg font-medium text-gray-500">4. Concept</div>

              {/* Graphic: Layout Gird */}
              <div className="h-40 bg-gray-50 rounded-xl border border-gray-100 mb-6 relative overflow-hidden flex items-center justify-center">
                <div className="grid grid-cols-2 gap-3">
                  <div className="w-16 h-20 bg-white rounded border border-emerald-200 shadow-sm overflow-hidden relative group-hover:ring-2 ring-emerald-400 transition-all">
                    <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&q=80" className="w-full h-full object-cover" alt="" />
                    <div className="absolute top-1 right-1 bg-emerald-500 w-3 h-3 rounded-full border border-white flex items-center justify-center">
                      <Check size={8} className="text-white" />
                    </div>
                  </div>
                  <div className="w-16 h-20 bg-white rounded border border-gray-200 shadow-sm p-1">
                    <div className="w-full h-10 bg-gray-100 mb-1"></div>
                    <div className="w-3/4 h-2 bg-gray-100"></div>
                  </div>
                  <div className="w-16 h-20 bg-white rounded border border-gray-200 shadow-sm p-1">
                    <div className="w-1/2 h-full bg-gray-100 float-right"></div>
                  </div>
                  <div className="w-16 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded border border-gray-200 shadow-sm"></div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 font-medium">Choose a layout.</p>
              </div>
            </div>

            {/* Step 5: Publish */}
            <div className="group bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-2xl transition-all duration-300 lg:col-start-2 lg:mr-auto">
              <div className="mb-2 text-lg font-medium text-gray-500">5. Publish</div>

              {/* Graphic: Phone Mockup */}
              <div className="h-48 bg-gray-50 rounded-xl border border-gray-100 mb-6 relative overflow-hidden flex items-center justify-center pt-4">
                <div className="w-32 bg-white rounded-t-2xl border-x border-t border-gray-200 shadow-md h-full relative overflow-hidden">
                  <div className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600"></div>
                      <div className="text-[8px] text-gray-500">Instagram</div>
                    </div>
                    <div className="aspect-[4/5] bg-gradient-to-b from-sky-200 to-sky-400 rounded-lg mb-3 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg text-center leading-none">Summer<br />Sale<br /><span className="text-sm">50% Off</span></div>
                    </div>
                    <div className="w-full bg-emerald-500 text-white text-[10px] font-bold py-1.5 rounded text-center">Export</div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 font-medium">Share your design.</p>
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

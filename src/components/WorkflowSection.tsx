import { Link2, Palette, FileText, Lightbulb, Share2 } from 'lucide-react';

const steps = [
  {
    number: 1,
    title: 'Connect',
    description: 'Enter URL, AI scans your website',
    icon: Link2,
    color: 'from-lime-400 to-emerald-500',
  },
  {
    number: 2,
    title: 'Extract',
    description: 'Agents lock in colors, fonts, and logo',
    icon: Palette,
    color: 'from-emerald-400 to-green-500',
  },
  {
    number: 3,
    title: 'Define',
    description: 'Enter product + event name (e.g., "Silk Saree" + "New Year Sale")',
    icon: FileText,
    color: 'from-green-400 to-emerald-600',
  },
  {
    number: 4,
    title: 'Concept',
    description: 'Choose or refine the hook/vibe',
    icon: Lightbulb,
    color: 'from-emerald-500 to-lime-600',
  },
  {
    number: 5,
    title: 'Select & Publish',
    description: 'Choose layout and export final poster',
    icon: Share2,
    color: 'from-lime-500 to-emerald-500',
  },
];

export default function WorkflowSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-orange-50/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/60">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-950 mb-4">
              Agent-Powered Workflow
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Five simple steps from brand analysis to published poster
            </p>
          </div>

        <div className="relative">
          <div className="absolute top-1/3 left-0 right-0 h-1 bg-gradient-to-r from-lime-400 via-emerald-500 to-green-600 transform -translate-y-1/2 hidden lg:block"></div>
          <div className="absolute top-1/3 left-0 right-0 h-1 bg-gradient-to-r from-lime-400 via-emerald-500 to-green-600 transform -translate-y-1/2 hidden lg:block shadow-lg shadow-emerald-500/50"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative group">
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-emerald-100 hover:border-emerald-300 transform hover:-translate-y-2">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="text-white" size={28} />
                    </div>
                    <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold shadow-lg">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold text-emerald-950 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

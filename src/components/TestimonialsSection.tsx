import { Star } from 'lucide-react';

const testimonials = [
    {
        name: "Sarah Chen",
        role: "Marketing Director",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
        content: "Posters Ready has completely transformed how we handle our social media. The speed is incredible!",
        stars: 5
    },
    {
        name: "Michael Ross",
        role: "Event Planner",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
        content: "I used to spend hours on Canva. Now I get professional designs in minutes. Absolute game changer.",
        stars: 5
    },
    {
        name: "Jessica Lee",
        role: "Small Business Owner",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces",
        content: "The quality of the designs is unmatched. It feels like having a dedicated designer on the team.",
        stars: 5
    }
];



export default function TestimonialsSection() {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#f8ecd9] relative">
            {/* Smooth Blend from Workflow Section (Top) */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>

            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                        Trusted by Business Owners & Social Media Managers
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        See how small businesses and marketing professionals create stunning Instagram content with Posters Ready
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-[0_8px_30px_rgb(0,180,0,0.04)] hover:shadow-3xl hover:shadow-lime-500/60 hover:scale-105 transition-all duration-300 flex flex-col items-center text-center group">
                            <div className="relative mb-6">
                                <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-lime-400 to-emerald-500">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-full h-full rounded-full object-cover border-2 border-white"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-1 mb-6">
                                {[...Array(testimonial.stars)].map((_, i) => (
                                    <Star key={i} size={16} className="fill-lime-400 text-lime-400" />
                                ))}
                            </div>

                            <div className="mb-6 relative">
                                {/* Decorative squiggly line suggestion via CSS or SVG if needed, using text for now */}
                                <p className="text-gray-600 leading-relaxed italic font-medium">
                                    "{testimonial.content}"
                                </p>
                            </div>

                            <div className="mt-auto">
                                <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mt-1">{testimonial.role}</p>
                            </div>
                        </div>
                    ))}
                </div>



            </div>

            {/* Smooth Blend to Instagram Section (Bottom) */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
        </section>
    );
}

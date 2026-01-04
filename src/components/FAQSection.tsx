import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Is it hard to use?',
    answer:
      'Not at all. Just enter your website URL and our AI agents do the heavy lifting. The interface is designed for business owners, not designers. If you can send an email, you can create professional posters.',
  },
  {
    question: 'Will it match my industry?',
    answer:
      'Absolutely. Our AI analyzes your existing brand materials and adapts to your industry style, whether you run a restaurant, boutique, consulting firm, or any other business. The system learns from your website and creates content that feels authentically yours.',
  },
  {
    question: 'Is my price locked in?',
    answer:
      'Yes. When you secure early business access at these rates, your price is locked in forever. As we add more features and increase prices for new customers, your monthly rate stays the same as a founding member.',
  },
  {
    question: "What if I'm not a designer?",
    answer:
      "That's exactly who we built this for. No design skills required. Our AI handles color theory, typography, layout, and brand consistency automatically. You focus on your message, we handle making it look professional.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-950 mb-4">
            Common Questions from Business Owners
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/60"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 sm:px-8 py-6 flex items-center justify-between text-left hover:bg-white/50 transition-colors"
              >
                <span className="text-lg sm:text-xl font-semibold text-emerald-950 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`flex-shrink-0 text-emerald-700 transition-transform duration-300 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                  size={24}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 sm:px-8 pb-6 text-gray-700 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Smooth Blend to Next Section (Bottom) */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-emerald-900 to-transparent pointer-events-none z-0"></div>
    </section>
  );
}

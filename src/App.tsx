import { useEffect, useState } from 'react';
import ComparisonSection from './components/ComparisonSection';
import FAQSection from './components/FAQSection';
import FinalCTA from './components/FinalCTA';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import InstagramSection from './components/InstagramSection';
import JoinWaitlistModal from './components/JoinWaitlistModal';
import PricingSection from './components/PricingSection';
import TestimonialsSection from './components/TestimonialsSection';
import WorkflowSection from './components/WorkflowSection';

function App() {
  const [isJoinWaitlistModalOpen, setIsJoinWaitlistModalOpen] = useState(false);

  const handleSecureAccess = () => {
    setIsJoinWaitlistModalOpen(true);
  };

  // Signal to prerender tooling that the page has mounted and rendered.
  useEffect(() => {
    (window as unknown as { __PRERENDER_READY__?: boolean }).__PRERENDER_READY__ = true;
  }, []);

  return (
    <div className="min-h-screen">
      <Header onSecureAccess={handleSecureAccess} />
      <HeroSection onSecureAccess={handleSecureAccess} />
      <WorkflowSection onGetStarted={handleSecureAccess} />
      <TestimonialsSection />
      <InstagramSection />
      <ComparisonSection />
      <PricingSection onSecureAccess={handleSecureAccess} />
      <FAQSection />
      <FinalCTA onSecureAccess={handleSecureAccess} />
      <JoinWaitlistModal
        isOpen={isJoinWaitlistModalOpen}
        onClose={() => setIsJoinWaitlistModalOpen(false)}
      />
    </div>
  );
}

export default App;

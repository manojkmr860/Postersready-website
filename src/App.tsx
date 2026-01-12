import { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import WorkflowSection from './components/WorkflowSection';
import TestimonialsSection from './components/TestimonialsSection';
import InstagramSection from './components/InstagramSection';
import ComparisonSection from './components/ComparisonSection';
import PricingSection from './components/PricingSection';
import FAQSection from './components/FAQSection';
import FinalCTA from './components/FinalCTA';
import JoinWaitlistModal from './components/JoinWaitlistModal';

function App() {
  const [isJoinWaitlistModalOpen, setIsJoinWaitlistModalOpen] = useState(false);

  const handleSecureAccess = () => {
    setIsJoinWaitlistModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Header onSecureAccess={handleSecureAccess} />
      <HeroSection onSecureAccess={handleSecureAccess} />
      <WorkflowSection />
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

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
import SuccessModal from './components/SuccessModal';

function App() {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleSecureAccess = () => {
    setIsSuccessModalOpen(true);
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
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </div>
  );
}

export default App;

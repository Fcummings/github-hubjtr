import React from 'react';
import { CreditCard } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="container mx-auto py-12 sm:py-20 text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 gradient-text">Revolutionize Payments with CLKK</h1>
      <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-gray-300">Instant transactions and settlements for the modern payment experience</p>
      <div className="flex justify-center items-center space-x-4 animate-float">
        <CreditCard size={36} className="text-blue-400" />
        <span className="text-xl sm:text-2xl font-semibold">Tap. Pay. Enjoy.</span>
      </div>
    </section>
  );
};

export default Hero;
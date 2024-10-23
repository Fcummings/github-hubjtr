import React from 'react';
import { Clock, Shield, Smile } from 'lucide-react';

const benefits = [
  {
    icon: <Clock size={32} className="text-blue-400" />,
    title: 'Save Time',
    description: 'No more waiting in long lines or dealing with cash.'
  },
  {
    icon: <Shield size={32} className="text-blue-400" />,
    title: 'Enhanced Security',
    description: 'Secure transactions with advanced encryption technology.'
  },
  {
    icon: <Smile size={32} className="text-blue-400" />,
    title: 'Improved Experience',
    description: 'Focus on the moment, not the finances, during your outings.'
  }
];

const Benefits: React.FC = () => {
  return (
    <section id="benefits" className="container mx-auto py-12 sm:py-20 bg-gray-800">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center gradient-text">Why Choose CLKK?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {benefits.map((benefit, index) => (
          <div key={index} className="text-center p-4">
            <div className="mb-4 flex justify-center">{benefit.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
            <p className="text-gray-300">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits;
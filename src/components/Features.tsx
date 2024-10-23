import React from 'react';
import { Zap, Users, Brain, Shield } from 'lucide-react';

const features = [
  {
    icon: <Zap size={32} className="text-blue-400" />,
    title: 'Instant Payment',
    description: 'Payments in seconds with our tap-and-pay technology.'
  },
  {
    icon: <Users size={32} className="text-blue-400" />,
    title: 'Peer-to-Peer Payments',
    description: 'Send money to friends instantly, split bills effortlessly.'
  },
  {
    icon: <Brain size={32} className="text-blue-400" />,
    title: 'AI Powered Insight',
    description: 'Advanced analytics for informed decisions.'
  },
  {
    icon: <Shield size={32} className="text-blue-400" />,
    title: 'Secure',
    description: 'Bank-grade security.'
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="container mx-auto py-12 sm:py-20">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center gradient-text">Key Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-blue-500/50 transition-shadow duration-300">
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
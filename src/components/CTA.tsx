import React from 'react';
import { Link } from 'react-router-dom';

const CTA: React.FC = () => {
  return (
    <section id="join" className="container mx-auto py-12 sm:py-20 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 gradient-text">Join the Waitlist</h2>
      <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-gray-300">Be the first to experience the future of seamless payments</p>
      <Link
        to="/signup"
        className="bg-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-600 transition-colors inline-block"
      >
        Join Now
      </Link>
    </section>
  );
};

export default CTA;
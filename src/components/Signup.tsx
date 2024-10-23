import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { handleFirebaseError, validateEnvironment } from '../utils/errorHandling';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('individual');
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      validateEnvironment();
    } catch (error) {
      console.error('Environment validation failed:', error);
      navigate('/error');
    }
  }, [navigate]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      setVerificationSent(true);

      const checkVerification = setInterval(async () => {
        try {
          await userCredential.user.reload();
          if (userCredential.user.emailVerified) {
            clearInterval(checkVerification);
            
            await addDoc(collection(db, 'waitlist'), {
              userId: userCredential.user.uid,
              email,
              userType,
              businessName: userType === 'business' ? businessName : null,
              businessType: userType === 'business' ? businessType : null,
              timestamp: new Date(),
              emailVerified: true
            });

            toast.success('Account verified! Welcome to CLKK!');
            navigate('/dashboard');
          }
        } catch (error) {
          clearInterval(checkVerification);
          handleFirebaseError(error);
        }
      }, 3000);

      setTimeout(() => {
        clearInterval(checkVerification);
      }, 300000);

      toast.success('Please check your email for verification link!');
    } catch (error) {
      handleFirebaseError(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (verificationSent) {
    return (
      <div className="container mx-auto px-4 py-12 sm:py-20">
        <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4 gradient-text">Verify Your Email</h2>
          <p className="text-gray-300 mb-4">
            We've sent a verification link to <strong>{email}</strong>
          </p>
          <p className="text-gray-300">
            Please check your email and click the verification link to complete your signup.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:py-20">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center gradient-text">Join the CLKK Waitlist</h2>
      <form onSubmit={handleSignup} className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="userType" className="block mb-2">User Type</label>
          <select
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="individual">Individual</option>
            <option value="business">Business</option>
          </select>
        </div>
        {userType === 'business' && (
          <>
            <div className="mb-4">
              <label htmlFor="businessName" className="block mb-2">Business Name</label>
              <input
                type="text"
                id="businessName"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="businessType" className="block mb-2">Business Type</label>
              <input
                type="text"
                id="businessType"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </>
        )}
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-600 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Signup;
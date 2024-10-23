import { toast } from 'react-hot-toast';

export const handleFirebaseError = (error: any): string => {
  console.error('Firebase error:', error);

  const errorMessages: { [key: string]: string } = {
    'auth/api-key-not-valid': 'Invalid Firebase configuration. Please check your environment variables.',
    'auth/invalid-email': 'Invalid email address.',
    'auth/email-already-in-use': 'This email is already registered.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
    'auth/internal-error': 'An internal error occurred. Please try again.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
  };

  const message = errorMessages[error.code] || error.message || 'An unexpected error occurred';
  toast.error(message);
  return message;
};

export const validateEnvironment = () => {
  const requiredVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID'
  ];

  const missingVars = requiredVars.filter(varName => !import.meta.env[varName]);

  if (missingVars.length > 0) {
    const message = `Missing environment variables: ${missingVars.join(', ')}`;
    toast.error(message);
    throw new Error(message);
  }
};
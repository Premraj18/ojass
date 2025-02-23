import { useState, useEffect } from 'react';

export const useRazorpay = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadRazorpay = async () => {
      if (window.Razorpay) {
        setIsLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => setIsLoaded(true);
      
      document.body.appendChild(script);
    };

    loadRazorpay();
  }, []);

  return isLoaded;
}; 
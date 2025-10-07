'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    // Always show loading animation on every page refresh
    setIsLoading(true);
    setIsFirstLoad(true);
  }, []);

  const completeLoading = () => {
    setIsLoading(false);
    // Don't store in sessionStorage so animation shows every time
  };

  const resetLoading = () => {
    setIsLoading(true);
  };

  const value = {
    isLoading,
    isFirstLoad,
    completeLoading,
    resetLoading,
    setIsLoading
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};
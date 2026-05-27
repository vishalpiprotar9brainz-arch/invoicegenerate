import React, { useState, useEffect, Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Landing/Hero';
import InvoiceForm from './components/InvoiceForm';
import { useInvoice } from './context/InvoiceContext';

// Lazy loaded components for code splitting & performance
const Statistics = lazy(() => import('./components/Landing/Statistics'));
const Features = lazy(() => import('./components/Landing/Features'));
const Footer = lazy(() => import('./components/Landing/Footer'));
const InvoicePreview = lazy(() => import('./components/Preview/InvoicePreview'));
const Privacy = lazy(() => import('./components/Legal/Privacy'));
const Terms = lazy(() => import('./components/Legal/Terms'));
const SEOContent = lazy(() => import('./components/Landing/SEOContent'));
const FAQ = lazy(() => import('./components/Landing/FAQ'));

const LoadingFallback = () => (
  <div className="flex justify-center items-center p-12 w-full h-full no-print">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
  </div>
);

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const { isInvoiceConfirmed } = useInvoice();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#privacy') {
        setCurrentPage('privacy');
        window.scrollTo(0, 0);
      } else if (hash === '#terms') {
        setCurrentPage('terms');
        window.scrollTo(0, 0);
      } else {
        setCurrentPage('home');
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // initial check
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300 font-sans">
      <Header />
      
      <Suspense fallback={<LoadingFallback />}>
        {currentPage === 'privacy' && <Privacy />}
        {currentPage === 'terms' && <Terms />}
      </Suspense>
      
      {currentPage === 'home' && (
        <>
          <Hero />
          
          <Suspense fallback={<LoadingFallback />}>
            <Statistics />
          </Suspense>
          
          <main id="generator-tool" className="flex-1 max-w-[1600px] w-full mx-auto p-4 sm:p-6 lg:p-8 scroll-mt-24 bg-white dark:bg-gray-900 transition-all duration-500">
            <div className="text-center mb-10 no-print">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                {isInvoiceConfirmed ? "Your Invoice is Ready!" : "Create Your Invoice"}
              </h2>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                {isInvoiceConfirmed ? "Review your final document below and download or print it." : "Fill out the details below to see your live preview."}
              </p>
            </div>

            <div className={`flex flex-col ${isInvoiceConfirmed ? 'items-center' : 'lg:flex-row'} gap-8`}>
              {/* Left Side: Form */}
              {!isInvoiceConfirmed && (
                <div className="w-full lg:w-[45%] xl:w-[40%] flex-shrink-0 no-print transition-all duration-300">
                  <InvoiceForm />
                </div>
              )}

              {/* Right Side: Preview */}
              <div className={`w-full transition-all duration-500 flex flex-col gap-4 ${
                isInvoiceConfirmed ? 'max-w-4xl mx-auto' : 'lg:w-[55%] xl:w-[60%]'
              }`}>
                <div className="sticky top-20">
                  <Suspense fallback={<LoadingFallback />}>
                    <InvoicePreview />
                  </Suspense>
                </div>
              </div>
            </div>
          </main>

          <Suspense fallback={<LoadingFallback />}>
            <Features />
            <SEOContent />
            <FAQ />
          </Suspense>
        </>
      )}

      <Suspense fallback={<LoadingFallback />}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;

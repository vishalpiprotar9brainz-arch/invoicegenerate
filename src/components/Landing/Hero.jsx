import React from 'react';
import { ArrowRight, FileCheck2, Printer, LayoutTemplate, ShieldCheck } from 'lucide-react';

export default function Hero() {
  const scrollToGenerator = () => {
    document.getElementById('generator-tool').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-white dark:bg-gray-900 pt-20 pb-16 sm:pt-28 sm:pb-24 lg:pb-32 no-print">
      {/* Background gradients */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary-200 to-primary-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs sm:text-sm font-medium mb-8 border border-primary-100 dark:border-primary-800/50">
          <ShieldCheck size={16} className="shrink-0" />
          <span className="text-center">100% Free & Secure. No Registration Required.</span>
        </div>
        
        <h1 className="max-w-4xl mx-auto text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white lg:text-7xl">
          Free Invoice <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Generator</span>
        </h1>
        
        <h2 className="mt-6 max-w-2xl mx-auto text-base sm:text-lg leading-7 sm:leading-8 text-gray-600 dark:text-gray-300 font-normal px-2">
          Create Professional Invoices Online. Generate, Preview, Print and Download PDF Invoices Instantly. Build your brand with customizable templates.
        </h2>
        
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6 w-full max-w-sm sm:max-w-none mx-auto">
          <button 
            onClick={scrollToGenerator}
            className="w-full sm:w-auto rounded-lg bg-primary-600 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all hover:-translate-y-1 hover:shadow-lg flex items-center justify-center gap-2"
          >
            Create Invoice <ArrowRight size={18} />
          </button>
          <button 
            onClick={scrollToGenerator}
            className="w-full sm:w-auto text-base font-semibold leading-6 text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors px-6 py-4 flex justify-center"
          >
            View Demo <span aria-hidden="true">→</span>
          </button>
        </div>

        {/* Feature Highlights directly below Hero */}
        <div className="mt-16 sm:mt-24 flex justify-center gap-8 flex-wrap">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <LayoutTemplate className="text-primary-500" size={20} />
            <span className="font-medium">Multiple Templates</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <FileCheck2 className="text-primary-500" size={20} />
            <span className="font-medium">Live Preview</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Printer className="text-primary-500" size={20} />
            <span className="font-medium">PDF & Print</span>
          </div>
        </div>
      </div>
    </section>
  );
}

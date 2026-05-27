import React from 'react';

export default function Terms() {
  return (
    <main className="flex-1 max-w-4xl w-full mx-auto p-6 sm:p-12 lg:p-16 my-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">Terms & Conditions</h1>
      
      <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">1. Acceptance of Terms</h2>
        <p>
          By accessing and using Invoice Generator, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">2. Use of Service</h2>
        <p>
          Invoice Generator provides a free tool for generating PDF invoices. The tool is provided "as is" and you agree to use it at your own risk. We do not guarantee that the service will meet your specific requirements or that it will be uninterrupted, timely, or error-free.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">3. Data Responsibility</h2>
        <p>
          Because our service operates entirely within your browser using Local Storage, <strong>you are solely responsible for the retention and backup of your generated invoices.</strong> We are not responsible for any lost data due to browser cache clearing, device failure, or any other reason.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">4. Intellectual Property</h2>
        <p>
          The generated PDF documents belong to you. The design, layout, graphics, and code of the Invoice Generator application itself are protected by copyright and other intellectual property laws.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">5. Disclaimer of Warranties</h2>
        <p>
          We make no representations or warranties of any kind, express or implied, as to the operation of the service or the information, content, or materials included. You expressly agree that your use of this service is at your sole risk.
        </p>
      </div>
    </main>
  );
}

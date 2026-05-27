import React from 'react';

export default function Privacy() {
  return (
    <main className="flex-1 max-w-4xl w-full mx-auto p-6 sm:p-12 lg:p-16 my-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
      
      <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">1. Information We Collect</h2>
        <p>
          At Invoice Generator, privacy is our top priority. Our application operates entirely client-side, meaning within your own web browser. <strong>We do not collect, transmit, or store any of your financial data, invoice details, or personal information on our servers.</strong>
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">2. Local Storage</h2>
        <p>
          To provide a seamless experience, we use your browser's Local Storage to save your invoice progress. This allows you to close the tab and return later without losing your work. This data remains on your device and is never accessed by us or any third parties. You can clear this data at any time by clicking the "Reset" button or clearing your browser cache.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">3. Third-Party Services</h2>
        <p>
          Since we do not process your data on a backend server, we do not share your information with any third-party analytics or advertising networks. The PDF generation is handled entirely on your local machine.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">4. Changes to This Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. Since we do not collect email addresses, we encourage you to review this page periodically for any changes.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">5. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@invoicegenerator.com" className="text-primary-600 hover:underline">support@invoicegenerator.com</a>.
        </p>
      </div>
    </main>
  );
}

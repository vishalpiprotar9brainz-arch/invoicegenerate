import React from 'react';

export default function SEOContent() {
  return (
    <section className="relative py-24 sm:py-32 no-print overflow-hidden">
      {/* Background with Premium Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/80 via-white to-white dark:from-indigo-950/20 dark:via-gray-900 dark:to-gray-900 z-0"></div>
      
      {/* Decorative Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-200 via-transparent to-transparent dark:from-indigo-900/30 pointer-events-none z-0"></div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
        
        {/* Centered Heading & Subheading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-6">
            Create Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-500">Invoices Online</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            Welcome to the ultimate <strong>Free Invoice Generator</strong>. Whether you are a freelancer, a startup, or a growing agency, billing your clients should be fast, secure, and highly professional.
          </p>
        </div>

        {/* Content Container with shadow and rounded corners */}
        <div className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl shadow-indigo-100/40 dark:shadow-none border border-gray-100 dark:border-gray-700 p-8 sm:p-12 lg:p-16">
          <div className="prose prose-lg prose-indigo dark:prose-invert max-w-none">
            
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-lg font-medium">
              Our <strong>Online Invoice Generator</strong> empowers you to build stunning, perfectly formatted invoices directly from your web browser without ever needing to register or pay a subscription fee.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-4">What is an Invoice Generator?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              An <strong>Invoice Maker</strong> is a specialized software tool designed to automate the process of creating billing documents. Instead of wrestling with complicated spreadsheets or outdated word processors, our platform provides a sleek, intuitive interface where you simply fill in the blanks. The system automatically calculates subtotals, taxes, and grand totals, ensuring absolute mathematical accuracy every single time.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-4">How to Create an Invoice</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Generating a professional invoice takes less than 60 seconds. Follow these simple steps:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-600 dark:text-gray-400 mb-8 marker:text-primary-500">
              <li><strong className="text-gray-900 dark:text-gray-200">Add Your Branding:</strong> Upload your company logo and enter your business details.</li>
              <li><strong className="text-gray-900 dark:text-gray-200">Client Information:</strong> Input the name, address, and contact details of the person or company you are billing.</li>
              <li><strong className="text-gray-900 dark:text-gray-200">Itemize Your Services:</strong> Add individual line items for the products or services rendered, adjusting quantities and rates.</li>
              <li><strong className="text-gray-900 dark:text-gray-200">Choose a Template:</strong> Select from our library of <strong>Professional Invoice Templates</strong> to match your brand's aesthetic.</li>
              <li><strong className="text-gray-900 dark:text-gray-200">Download Invoice PDF:</strong> Instantly export a high-resolution, perfectly formatted PDF ready to be emailed or printed.</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-4">Benefits of Online Invoices</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Transitioning to a digital <strong>PDF Invoice Generator</strong> offers massive advantages. It drastically reduces the time spent on administrative tasks, accelerates your payment cycles by looking highly credible to your clients, and eliminates human error in tax and discount calculations. Furthermore, because our tool operates entirely on the client-side, your sensitive financial data remains 100% secure and localized to your device.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-4">Professional Invoice Templates</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              A poorly formatted invoice can delay payments and damage your professional reputation. That's why our <strong>Free Invoice Creator</strong> includes 10 uniquely designed premium templates. From the ultra-sleek "Modern Pro" designed for SaaS companies, to the classic "Executive" layout perfect for legal consulting, we ensure your brand is represented flawlessly. Every template is strictly optimized for A4 <strong>Invoice PDF Download</strong> and native printing.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-4">Why Choose Our Invoice Generator?</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Unlike other platforms that hide essential features behind paywalls or force you to create accounts, we believe that basic business infrastructure should be accessible to everyone. We are committed to providing a frictionless, lightning-fast experience where you can <strong>Create Invoice Online</strong> instantly, safely, and entirely for free.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

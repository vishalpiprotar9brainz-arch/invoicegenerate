import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  const faqs = [
    {
      question: "Is this Invoice Generator free?",
      answer: "Yes, our invoice generator is 100% free to use. There are no hidden fees, no subscriptions, and absolutely no premium paywalls. You have full access to all templates and features."
    },
    {
      question: "Can I download PDF invoices?",
      answer: "Absolutely. Once you have filled out your details, you can instantly download a high-resolution, perfectly formatted PDF invoice that is ready to be emailed to your clients."
    },
    {
      question: "Do I need to register?",
      answer: "No registration is required. You do not need to create an account, provide an email address, or remember a password. You can start generating invoices immediately."
    },
    {
      question: "Can I print invoices?",
      answer: "Yes, our tool is fully optimized for native printing. The user interface will automatically hide itself when you print, ensuring a clean, perfectly sized A4 physical document."
    },
    {
      question: "Can I use it on mobile?",
      answer: "Yes, the invoice generator is fully responsive and optimized for mobile browsers, allowing you to create and send professional invoices directly from your smartphone or tablet."
    },
    {
      question: "Are my invoices secure?",
      answer: "Yes, your data is 100% secure. Our tool operates entirely in your browser. We do not store your invoice data, client information, or financial details on our servers."
    }
  ];

  // Generate FAQ Schema Markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section id="faq-section" className="bg-white dark:bg-gray-900 py-16 sm:py-24 no-print border-y border-gray-200 dark:border-gray-800">
      {/* Inject JSON-LD Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />

      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Everything you need to know about our free invoice maker.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {faqs.slice(0, 3).map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index} 
                  className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden transition-all duration-200 shadow-sm"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 dark:text-white">{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-primary-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  
                  <div 
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {faqs.slice(3, 6).map((faq, idx) => {
              const index = idx + 3;
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index} 
                  className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden transition-all duration-200 shadow-sm"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 dark:text-white">{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 text-primary-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  
                  <div 
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

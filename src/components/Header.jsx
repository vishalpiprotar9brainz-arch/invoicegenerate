import React from 'react';
import { Moon, Sun, Download, Printer, RotateCcw } from 'lucide-react';
import { useInvoice } from '../context/InvoiceContext';
import { generatePDF } from '../utils/generatePDF';

export default function Header() {
  const { darkMode, setDarkMode, resetInvoice, invoice, calculations, isInvoiceConfirmed } = useInvoice();

  const handleDownloadPDF = () => {
    generatePDF('invoice-preview-container', `Invoice-${invoice.details.invoiceNumber}.pdf`);
  };


  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between py-3 lg:py-0 lg:h-16 gap-3 lg:gap-0">
          {/* Logo & Title */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-center lg:justify-start">
            <img 
              src="/logo.png" 
              alt="Invoice Generator" 
              className="h-[32px] md:h-[40px] lg:h-[50px] w-auto object-contain" 
            />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 w-full lg:w-auto pb-1 lg:pb-0">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shrink-0"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {isInvoiceConfirmed && (
              <>
                <div className="hidden sm:block w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1 shrink-0"></div>

                <button
                  onClick={resetInvoice}
                  className="btn-secondary flex gap-2 items-center text-xs sm:text-sm px-3 py-2 shrink-0"
                >
                  <RotateCcw size={16} className="shrink-0" />
                  <span>Reset</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="btn-secondary flex gap-2 items-center text-xs sm:text-sm px-3 py-2 shrink-0"
                >
                  <Printer size={16} className="shrink-0" />
                  <span>Print</span>
                </button>

                <button
                  onClick={handleDownloadPDF}
                  className="btn-primary flex gap-2 items-center text-xs sm:text-sm px-3 py-2 shrink-0"
                >
                  <Download size={16} className="shrink-0" />
                  <span>Download PDF</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

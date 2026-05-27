import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useInvoice } from '../../context/InvoiceContext';
import TemplateSelector from './TemplateSelector';
import ModernTemplate from './Templates/ModernTemplate';
import CorporateTemplate from './Templates/CorporateTemplate';
import MinimalTemplate from './Templates/MinimalTemplate';
import FreelancerTemplate from './Templates/FreelancerTemplate';
import ModernProTemplate from './Templates/ModernProTemplate';
import BusinessEliteTemplate from './Templates/BusinessEliteTemplate';
import StartupTemplate from './Templates/StartupTemplate';
import AgencyTemplate from './Templates/AgencyTemplate';
import ExecutiveTemplate from './Templates/ExecutiveTemplate';
import MinimalCleanTemplate from './Templates/MinimalCleanTemplate';
import { Edit2, CheckCircle, Download, Printer, RotateCcw } from 'lucide-react';
import { generatePDF } from '../../utils/generatePDF';

export default function InvoicePreview() {
  const { invoice, isInvoiceConfirmed, setIsInvoiceConfirmed, resetInvoice } = useInvoice();
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const padding = window.innerWidth < 640 ? 32 : 64; 
        const availableWidth = containerWidth - padding;
        const targetWidth = 794;
        
        if (availableWidth < targetWidth) {
          setScale(availableWidth / targetWidth);
        } else {
          setScale(1);
        }
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // Pagination Configuration
  // We use conservative numbers to guarantee no overflow/cutoff
  const itemsPerPageFirstPage = 12;
  const itemsPerPageSubsequent = 20;

  const pages = useMemo(() => {
    const items = invoice.items;
    if (!items || items.length === 0) return [[]];

    const chunks = [];
    let currentIndex = 0;

    // First page holds fewer items because of full Company/Customer header
    chunks.push(items.slice(currentIndex, currentIndex + itemsPerPageFirstPage));
    currentIndex += itemsPerPageFirstPage;

    // Subsequent pages hold more items
    while (currentIndex < items.length) {
      chunks.push(items.slice(currentIndex, currentIndex + itemsPerPageSubsequent));
      currentIndex += itemsPerPageSubsequent;
    }

    return chunks;
  }, [invoice.items]);

  const renderTemplate = (pageProps) => {
    const { itemsChunk: chunk, isFirstPage, isLastPage } = pageProps;
    switch (invoice.settings.template) {
      case 'modern':
        return <ModernTemplate {...pageProps} />;
      case 'corporate':
        return <CorporateTemplate itemsChunk={chunk} isFirstPage={isFirstPage} isLastPage={isLastPage} />;
      case 'minimal':
        return <MinimalTemplate itemsChunk={chunk} isFirstPage={isFirstPage} isLastPage={isLastPage} />;
      case 'freelancer':
        return <FreelancerTemplate itemsChunk={chunk} isFirstPage={isFirstPage} isLastPage={isLastPage} />;
      case 'modern-pro':
        return <ModernProTemplate itemsChunk={chunk} isFirstPage={isFirstPage} isLastPage={isLastPage} />;
      case 'business-elite':
        return <BusinessEliteTemplate itemsChunk={chunk} isFirstPage={isFirstPage} isLastPage={isLastPage} />;
      case 'startup':
        return <StartupTemplate itemsChunk={chunk} isFirstPage={isFirstPage} isLastPage={isLastPage} />;
      case 'agency':
        return <AgencyTemplate itemsChunk={chunk} isFirstPage={isFirstPage} isLastPage={isLastPage} />;
      case 'executive':
        return <ExecutiveTemplate itemsChunk={chunk} isFirstPage={isFirstPage} isLastPage={isLastPage} />;
      case 'minimal-clean':
        return <MinimalCleanTemplate itemsChunk={chunk} isFirstPage={isFirstPage} isLastPage={isLastPage} />;
      default:
        return <ModernTemplate {...pageProps} />;
    }
  };

  const handleDownloadPDF = () => {
    generatePDF('invoice-preview-container', `Invoice-${invoice.details.invoiceNumber}.pdf`);
  };

  const handlePrint = () => {
    window.print();
  };

  const isFormValid = Boolean(
    invoice.company.name?.trim() && 
    invoice.customer.name?.trim() && 
    invoice.items.some(item => item.description?.trim())
  );

  return (
    <div className="flex flex-col gap-4 print:gap-0">
      <div className="no-print">
        <TemplateSelector />
      </div>
      
      {/* Container holding all rendered pages */}
      <div 
        ref={containerRef}
        className="w-full bg-gray-200 dark:bg-gray-800 rounded-xl flex flex-col items-center gap-8 p-4 sm:p-8 overflow-hidden shadow-inner relative"
      >
        <div 
          id="invoice-preview-container"
          className="flex flex-col items-center gap-8"
        >
          {pages.map((itemsChunk, index) => {
            const isFirstPage = index === 0;
            const isLastPage = index === pages.length - 1;
            const pageNumber = index + 1;
            const totalPages = pages.length;

            return (
              <div 
                key={`page-wrapper-${pageNumber}`}
                style={{ 
                  width: `${794 * scale}px`, 
                  height: `${1123 * scale}px`,
                  position: 'relative'
                }}
                className="flex-shrink-0 transition-all duration-300"
              >
                <div 
                  className="invoice-page bg-white shadow-xl origin-top-left overflow-hidden absolute top-0 left-0"
                  style={{ 
                    width: '794px',
                    minHeight: '1123px',
                    transform: `scale(${scale})`
                  }}
                >
                  {renderTemplate({ itemsChunk, isFirstPage, isLastPage, pageNumber, totalPages })}
                  
                  {/* Optional page number footer for multi-page documents */}
                  {totalPages > 1 && (
                    <div className="absolute bottom-8 left-0 right-0 text-center text-xs text-gray-400 font-sans">
                      Page {pageNumber} of {totalPages}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating/Sticky Action Bar for Review Workflow */}
        <div className="sticky bottom-4 z-10 no-print w-full max-w-[794px]">
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 p-4 transition-all duration-300">
            {!isInvoiceConfirmed ? (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => {
                    const formElement = document.getElementById('generator-tool');
                    if (formElement) {
                      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3"
                >
                  <Edit2 size={20} className="shrink-0" />
                  <span className="font-semibold">Edit Invoice</span>
                </button>
                <button
                  onClick={() => {
                    setIsInvoiceConfirmed(true);
                    const previewElement = document.getElementById('generator-tool');
                    if (previewElement) {
                      previewElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  disabled={!isFormValid}
                  className={`btn-primary w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 ${
                    !isFormValid ? 'opacity-50 cursor-not-allowed hover:bg-primary-600' : ''
                  }`}
                  title={!isFormValid ? "Please fill in Company Name, Customer Name, and at least one Item to proceed." : ""}
                >
                  <CheckCircle size={20} className="shrink-0" />
                  <span className="font-bold text-lg">Done</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:flex sm:flex-row sm:flex-wrap items-center justify-center gap-2 sm:gap-4 w-full">
                <button
                  onClick={() => setIsInvoiceConfirmed(false)}
                  className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-sm"
                >
                  <Edit2 size={16} className="shrink-0" />
                  <span className="font-semibold">Edit</span>
                </button>
                <button
                  onClick={resetInvoice}
                  className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-sm"
                >
                  <RotateCcw size={16} className="shrink-0" />
                  <span className="font-semibold">Reset</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-sm col-span-2 sm:col-span-1"
                >
                  <Printer size={16} className="shrink-0" />
                  <span className="font-semibold">Print</span>
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2 text-sm shadow-lg shadow-primary-500/30 col-span-2 sm:col-span-1"
                >
                  <Download size={18} className="shrink-0" />
                  <span className="font-bold">Download PDF</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

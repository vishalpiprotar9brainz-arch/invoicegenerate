import React from 'react';
import CompanySection from './InvoiceForm/CompanySection';
import CustomerSection from './InvoiceForm/CustomerSection';
import InvoiceDetailsSection from './InvoiceForm/InvoiceDetailsSection';
import ItemsTable from './InvoiceForm/ItemsTable';
import SummarySection from './InvoiceForm/SummarySection';
import ExtraDetailsSection from './InvoiceForm/ExtraDetailsSection';
import { Download, Printer } from 'lucide-react';
import { useInvoice } from '../context/InvoiceContext';
import { generatePDF } from '../utils/generatePDF';

export default function InvoiceForm() {
  const { invoice } = useInvoice();

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
    <div className="flex flex-col gap-6">
      <div className="card flex flex-col gap-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4">
          Invoice Details
        </h2>
        
        <CompanySection />
        <CustomerSection />
        <InvoiceDetailsSection />
      </div>

      <div className="card">
        <ItemsTable />
      </div>

      <div className="card flex flex-col gap-8">
        <SummarySection />
        <ExtraDetailsSection />
      </div>

      {/* Bottom Action Bar */}
      <div className="mt-2 flex flex-col sm:flex-row flex-wrap gap-4 justify-end no-print">
        <button
          onClick={() => {
            const previewElement = document.getElementById('invoice-preview-container');
            if (previewElement) {
              previewElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          className="btn-primary flex gap-2 items-center justify-center py-3 px-6 text-base w-full sm:w-auto shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
          <span className="font-medium">Review Invoice</span>
        </button>
      </div>
    </div>
  );
}

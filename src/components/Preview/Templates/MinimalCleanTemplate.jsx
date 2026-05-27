import React from 'react';
import { useInvoice } from '../../../context/InvoiceContext';

export default function MinimalCleanTemplate({ itemsChunk, isFirstPage, isLastPage }) {
  const { invoice, calculations } = useInvoice();
  const { company, customer, details, summary, extra } = invoice;

  return (
    <div className="bg-white text-gray-800 w-full h-full p-12 font-sans font-light">
      <div className="h-full flex flex-col">
        
        {/* Header */}
        <div className={`flex justify-between items-end ${isFirstPage ? 'mb-16' : 'mb-8'}`}>
          <div>
            <h1 className="text-4xl font-light tracking-wide text-gray-900 mb-1">INVOICE</h1>
            <p className="text-sm text-gray-500 font-medium">{details.invoiceNumber}</p>
          </div>
          <div className="text-right">
            {company.logo && isFirstPage ? (
              <img src={company.logo} alt="Logo" className="max-h-12 object-contain mb-3 ml-auto" />
            ) : isFirstPage && company.name ? (
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{company.name}</h2>
            ) : null}
            {isFirstPage && (
              <div className="text-sm text-gray-500 mt-2 space-y-1 text-right flex flex-col items-end">
                {company.email && <p><span className="font-bold text-gray-400 mr-2">Email:</span> {company.email}</p>}
                {company.website && <p><span className="font-bold text-gray-400 mr-2">Website:</span> {company.website}</p>}
                {company.phone && <p><span className="font-bold text-gray-400 mr-2">Phone:</span> {company.phone}</p>}
                {company.address && <p className="whitespace-pre-wrap flex justify-end"><span className="font-bold text-gray-400 mr-2 shrink-0">Address:</span> <span className="text-right">{company.address}</span></p>}
                {company.taxNumber && <p><span className="font-bold text-gray-400 mr-2">Tax ID:</span> {company.taxNumber}</p>}
              </div>
            )}
          </div>
        </div>

        {isFirstPage && (
          <div className="flex justify-between mb-16">
            <div className="w-[60%]">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-3 font-medium">Bill To</p>
              <div className="flex flex-wrap mt-2 -mx-2">
                <h3 className="w-full sm:w-1/2 px-2 pb-2 text-sm font-medium text-gray-900 flex items-center"><span className="text-sm font-bold text-gray-400 mr-2 uppercase tracking-widest">Name:</span> {customer.name || 'Client Name'}</h3>
                {customer.company && <p className="w-full sm:w-1/2 px-2 pb-2 text-sm text-gray-600"><span className="text-xs font-bold text-gray-400 mr-2 uppercase tracking-widest">Company:</span> {customer.company}</p>}
                {customer.address && <p className="w-full sm:w-1/2 px-2 pb-2 text-sm text-gray-500 whitespace-pre-wrap flex"><span className="text-xs font-bold text-gray-400 mr-2 uppercase tracking-widest shrink-0 mt-1">Address:</span> <span>{customer.address}</span></p>}
                {customer.email && <p className="w-full sm:w-1/2 px-2 pb-2 text-sm text-gray-600"><span className="text-xs font-bold text-gray-400 mr-2 uppercase tracking-widest">Email:</span> {customer.email}</p>}
                {customer.phone && <p className="w-full sm:w-1/2 px-2 pb-2 text-sm text-gray-600"><span className="text-xs font-bold text-gray-400 mr-2 uppercase tracking-widest">Phone:</span> {customer.phone}</p>}
                {customer.taxNumber && <p className="w-full sm:w-1/2 px-2 pb-2 text-sm text-gray-600"><span className="text-xs font-bold text-gray-400 mr-2 uppercase tracking-widest">Tax ID:</span> {customer.taxNumber}</p>}
              </div>
            </div>
            
            <div className="w-1/3 text-right">
              <div className="mb-4">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-medium">Issue Date</p>
                <p className="text-sm text-gray-900">{details.invoiceDate}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1 font-medium">Due Date</p>
                <p className="text-sm text-gray-900">{details.dueDate}</p>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="flex-1">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-1 text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="py-3 px-1 text-xs font-medium text-gray-500 uppercase tracking-wider text-center w-24">Qty</th>
                <th className="py-3 px-1 text-xs font-medium text-gray-500 uppercase tracking-wider text-right w-28">Price</th>
                <th className="py-3 px-1 text-xs font-medium text-gray-500 uppercase tracking-wider text-right w-32">Amount</th>
              </tr>
            </thead>
            <tbody>
              {itemsChunk.map((item) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="py-4 px-1 text-sm text-gray-800">{item.description || '-'}</td>
                  <td className="py-4 px-1 text-sm text-gray-500 text-center">{item.quantity}</td>
                  <td className="py-4 px-1 text-sm text-gray-500 text-right">{Number(item.unitPrice).toFixed(2)}</td>
                  <td className="py-4 px-1 text-sm text-gray-900 text-right font-medium">{Number(item.amount).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {isLastPage && (
          <div className="mt-12 flex justify-between items-start gap-12">
            <div className="w-[50%]">
              {extra.notes && (
                <div className="mb-6">
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-2 font-medium">Notes</p>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{extra.notes}</p>
                </div>
              )}
              {extra.terms && (
                <div className="mb-6">
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-2 font-medium">Terms</p>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{extra.terms}</p>
                </div>
              )}
              {(extra.signature || extra.signatoryName) && (
                <div className="mt-8">
                  {extra.signature ? (
                    <img src={extra.signature} alt="Signature" className="max-h-16 object-contain mb-2" />
                  ) : (
                    <div className="mb-2">
                      <p className="text-2xl text-gray-800 font-serif italic">{extra.signatoryName}</p>
                    </div>
                  )}
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest border-t border-gray-200 pt-1 w-40">Authorized Signatory</p>
                </div>
              )}
            </div>
            
            <div className="w-[40%]">
              <div className="space-y-3 pt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-900">{details.currency} {calculations.subtotal.toFixed(2)}</span>
                </div>
                {calculations.taxTotal > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tax</span>
                    <span className="text-gray-900">{details.currency} {calculations.taxTotal.toFixed(2)}</span>
                  </div>
                )}
                {summary.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Discount</span>
                    <span className="text-gray-900">-{details.currency} {Number(summary.discount).toFixed(2)}</span>
                  </div>
                )}
                {summary.shipping > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className="text-gray-900">{details.currency} {Number(summary.shipping).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-4 mt-2 border-t border-gray-900">
                  <span className="text-base text-gray-900 font-medium">Total</span>
                  <span className="text-2xl font-medium text-gray-900">{details.currency} {calculations.grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

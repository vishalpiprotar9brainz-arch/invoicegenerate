import React from 'react';
import { useInvoice } from '../../../context/InvoiceContext';

export default function ExecutiveTemplate({ itemsChunk, isFirstPage, isLastPage }) {
  const { invoice, calculations } = useInvoice();
  const { company, customer, details, summary, extra } = invoice;

  return (
    <div className="bg-white text-gray-900 w-full h-full p-12 font-serif">
      <div className="h-full flex flex-col border border-gray-300 p-2 relative">
        <div className="h-full border border-gray-300 flex flex-col p-8">
          
          {/* Header */}
          <div className={`flex flex-col items-center justify-center text-center ${isFirstPage ? 'mb-12' : 'mb-6'} border-b border-gray-300 pb-8`}>
            {company.logo && isFirstPage ? (
              <img src={company.logo} alt="Logo" className="max-h-20 object-contain mb-4" />
            ) : isFirstPage && company.name ? (
              <h1 className="text-3xl font-bold uppercase tracking-widest mb-2">{company.name}</h1>
            ) : null}
            {isFirstPage && (
              <div className="text-sm text-gray-600 flex gap-4 justify-center mt-2">
                {company.address && <span><span className="font-bold text-gray-800 mr-1">Address:</span> {company.address.split('\n').join(', ')}</span>}
              </div>
            )}
            {isFirstPage && (
              <div className="text-sm text-gray-600 flex gap-4 justify-center mt-1">
                {company.phone && <span><span className="font-bold text-gray-800 mr-1">Phone:</span> {company.phone}</span>}
                {company.email && <span><span className="font-bold text-gray-800 mr-1">Email:</span> {company.email}</span>}
                {company.website && <span><span className="font-bold text-gray-800 mr-1">Website:</span> {company.website}</span>}
                {company.taxNumber && <span><span className="font-bold text-gray-800 mr-1">Tax ID:</span> {company.taxNumber}</span>}
              </div>
            )}
            <div className="mt-8">
              <h2 className="text-2xl font-bold tracking-[0.3em] text-gray-800">INVOICE</h2>
            </div>
          </div>

          {isFirstPage && (
            <div className="flex justify-between mb-12 gap-4">
              <div className="w-[60%]">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 border-b border-gray-200 pb-1">Billed To</p>
                <div className="flex flex-wrap mt-2 -mx-2">
                  <h3 className="w-full sm:w-1/2 px-2 pb-2 text-sm font-bold text-gray-900 flex items-center"><span className="text-sm font-bold text-gray-500 mr-2 uppercase tracking-widest">Name:</span> {customer.name || 'Customer Name'}</h3>
                  {customer.company && <p className="w-full sm:w-1/2 px-2 pb-2 text-sm font-medium text-gray-800"><span className="font-bold text-gray-500 mr-2 uppercase tracking-widest text-xs">Company:</span> {customer.company}</p>}
                  {customer.address && <p className="w-full sm:w-1/2 px-2 pb-2 text-sm text-gray-600 whitespace-pre-wrap flex"><span className="font-bold text-gray-500 mr-2 uppercase tracking-widest text-xs shrink-0 mt-1">Address:</span> <span>{customer.address}</span></p>}
                  {customer.email && <p className="w-full sm:w-1/2 px-2 pb-2 text-sm text-gray-800"><span className="font-bold text-gray-500 mr-2 uppercase tracking-widest text-xs">Email:</span> {customer.email}</p>}
                  {customer.phone && <p className="w-full sm:w-1/2 px-2 pb-2 text-sm text-gray-800"><span className="font-bold text-gray-500 mr-2 uppercase tracking-widest text-xs">Phone:</span> {customer.phone}</p>}
                  {customer.taxNumber && <p className="w-full sm:w-1/2 px-2 pb-2 text-sm text-gray-800"><span className="font-bold text-gray-500 mr-2 uppercase tracking-widest text-xs">Tax ID:</span> {customer.taxNumber}</p>}
                </div>
              </div>
              
              <div className="w-[35%]">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 border-b border-gray-200 pb-1">Invoice Details</p>
                <div className="flex flex-wrap text-sm -mx-2">
                  <span className="w-1/2 px-2 pb-2 text-gray-600 font-medium">Invoice No:</span>
                  <span className="w-1/2 px-2 pb-2 font-bold text-gray-900 text-right">{details.invoiceNumber}</span>
                  <span className="w-1/2 px-2 pb-2 text-gray-600 font-medium">Date:</span>
                  <span className="w-1/2 px-2 pb-2 font-bold text-gray-900 text-right">{details.invoiceDate}</span>
                  <span className="w-1/2 px-2 pb-2 text-gray-600 font-medium">Due Date:</span>
                  <span className="w-1/2 px-2 pb-2 font-bold text-gray-900 text-right">{details.dueDate}</span>
                </div>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="flex-1">
            <table className="w-full text-left">
              <thead>
                <tr className="border-y border-gray-300 bg-gray-50">
                  <th className="py-2 px-2 text-xs font-bold text-gray-800 uppercase tracking-widest">Description</th>
                  <th className="py-2 px-2 text-xs font-bold text-gray-800 uppercase tracking-widest text-center w-20">Qty</th>
                  <th className="py-2 px-2 text-xs font-bold text-gray-800 uppercase tracking-widest text-right w-28">Rate</th>
                  <th className="py-2 px-2 text-xs font-bold text-gray-800 uppercase tracking-widest text-right w-32">Amount</th>
                </tr>
              </thead>
              <tbody>
                {itemsChunk.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td className="py-3 px-2 text-sm text-gray-800">{item.description || '-'}</td>
                    <td className="py-3 px-2 text-sm text-gray-600 text-center">{item.quantity}</td>
                    <td className="py-3 px-2 text-sm text-gray-600 text-right">{Number(item.unitPrice).toFixed(2)}</td>
                    <td className="py-3 px-2 text-sm text-gray-900 text-right">{Number(item.amount).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          {isLastPage && (
            <div className="mt-8 pt-8 border-t border-gray-300 flex justify-between items-start gap-12">
              <div className="w-[50%]">
                {extra.notes && (
                  <div className="mb-4">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 border-b border-gray-200 pb-1 inline-block">Notes</p>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap mt-1">{extra.notes}</p>
                  </div>
                )}
                {extra.terms && (
                  <div className="mb-6">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1 border-b border-gray-200 pb-1 inline-block">Terms</p>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap mt-1">{extra.terms}</p>
                  </div>
                )}
                {(extra.signature || extra.signatoryName) && (
                  <div className="mt-8 text-center w-48">
                    {extra.signature ? (
                      <img src={extra.signature} alt="Signature" className="max-h-16 object-contain mb-1 mx-auto" />
                    ) : (
                      <div className="mb-2">
                        <p className="text-2xl text-gray-800 font-serif italic">{extra.signatoryName}</p>
                      </div>
                    )}
                    <div className="border-t border-gray-400 pt-1 mt-2">
                      <p className="text-xs text-gray-500 uppercase tracking-widest">Authorized Signature</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="w-[45%]">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm py-1">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">{details.currency} {calculations.subtotal.toFixed(2)}</span>
                  </div>
                  {calculations.taxTotal > 0 && (
                    <div className="flex justify-between text-sm py-1">
                      <span className="text-gray-600">Tax</span>
                      <span className="text-gray-900">{details.currency} {calculations.taxTotal.toFixed(2)}</span>
                    </div>
                  )}
                  {summary.discount > 0 && (
                    <div className="flex justify-between text-sm py-1">
                      <span className="text-gray-600">Discount</span>
                      <span className="text-gray-900">-{details.currency} {Number(summary.discount).toFixed(2)}</span>
                    </div>
                  )}
                  {summary.shipping > 0 && (
                    <div className="flex justify-between text-sm py-1 border-b border-gray-200 pb-2">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-gray-900">{details.currency} {Number(summary.shipping).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm font-bold uppercase tracking-widest text-gray-900">Total Due</span>
                    <span className="text-xl font-bold text-gray-900">{details.currency} {calculations.grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

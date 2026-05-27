import React from 'react';
import { useInvoice } from '../../../context/InvoiceContext';

export default function FreelancerTemplate({ itemsChunk, isFirstPage, isLastPage }) {
  const { invoice, calculations } = useInvoice();
  const { company, customer, details, summary, extra } = invoice;

  return (
    <div className="bg-orange-50 text-gray-800 w-full h-full p-10 font-sans">
      <div className="bg-white rounded-3xl p-10 shadow-sm h-full flex flex-col">
        
        {/* Header */}
        <div className={`flex justify-between items-center ${isFirstPage ? 'mb-12' : 'mb-6'}`}>
          <div className="flex items-center gap-4">
            {company.logo && isFirstPage ? (
              <img src={company.logo} alt="Company Logo" className="h-16 max-w-[200px] object-contain rounded-md shadow-sm bg-white" />
            ) : isFirstPage && company.name ? (
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{company.name}</h1>
            ) : null}
            {isFirstPage && (
              <p className="text-sm text-gray-500 border-l-2 border-orange-200 pl-4 mt-1">Freelance Invoice</p>
            )}
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-black text-orange-500 mb-1">#{details.invoiceNumber}</h2>
            <p className="text-sm font-medium text-gray-500">Date: {details.invoiceDate}</p>
          </div>
        </div>

        {isFirstPage && (
          <div className="flex justify-between gap-6 mb-12">
            <div className="w-1/2 bg-orange-50/50 p-6 rounded-2xl">
              <p className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-2">Billed To</p>
              <div className="flex flex-wrap mt-2 -mx-2">
                <p className="w-full sm:w-1/2 px-2 pb-2 text-sm font-bold text-gray-800"><span className="font-semibold text-orange-400/80 mr-1">Name:</span> {customer.name || 'Client Name'}</p>
                {customer.company && <p className="w-full sm:w-1/2 px-2 pb-2 text-sm text-gray-600 font-medium"><span className="font-semibold text-orange-400/80 mr-1">Company:</span> {customer.company}</p>}
                {customer.address && <p className="w-full sm:w-1/2 px-2 pb-2 text-sm text-gray-600 whitespace-pre-wrap flex"><span className="font-semibold text-orange-400/80 mr-1 shrink-0">Address:</span> <span>{customer.address}</span></p>}
                {customer.email && <p className="w-full sm:w-1/2 px-2 pb-2 text-sm text-gray-600"><span className="font-semibold text-orange-400/80 mr-1">Email:</span> {customer.email}</p>}
              </div>
            </div>

            <div className="w-1/2 bg-orange-50/50 p-6 rounded-2xl flex flex-col justify-center">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500 font-medium">Invoice Date:</span>
                <span className="text-sm font-bold text-gray-800">{details.invoiceDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 font-medium">Due Date:</span>
                <span className="text-sm font-bold text-gray-800">{details.dueDate}</span>
              </div>
            </div>
          </div>
        )}

        {/* Services Table */}
        <div className="flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-orange-100">
                <th className="py-3 text-sm font-bold text-gray-600 uppercase">Service Description</th>
                <th className="py-3 text-sm font-bold text-gray-600 uppercase text-center">Hours/Qty</th>
                <th className="py-3 text-sm font-bold text-gray-600 uppercase text-right">Rate</th>
                <th className="py-3 text-sm font-bold text-gray-600 uppercase text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {itemsChunk.map((item) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="py-4 text-sm font-medium text-gray-800">{item.description || '-'}</td>
                  <td className="py-4 text-sm text-gray-600 text-center">{item.quantity}</td>
                  <td className="py-4 text-sm text-gray-600 text-right">{Number(item.unitPrice).toFixed(2)}</td>
                  <td className="py-4 text-sm font-bold text-gray-800 text-right">{Number(item.amount).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {isLastPage && (
          <div className="mt-auto pt-8 flex justify-between items-start gap-8">
            <div className="w-[50%]">
              {extra.notes && (
                <div className="mb-4">
                  <p className="text-sm font-bold text-gray-800 mb-1">Notes</p>
                  <p className="text-sm text-gray-500 whitespace-pre-wrap">{extra.notes}</p>
                </div>
              )}
              {extra.terms && (
                <div className="mb-6">
                  <p className="text-sm font-bold text-gray-800 mb-1">Payment Terms</p>
                  <p className="text-sm text-gray-500 whitespace-pre-wrap">{extra.terms}</p>
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
                  <div className="w-40 border-t-2 border-gray-200 mt-2 pt-1">
                    <p className="text-xs text-gray-400 font-medium text-center uppercase tracking-widest">Authorized Signature</p>
                  </div>
                </div>
              )}
            </div>

            <div className="w-[45%] bg-orange-50/50 p-6 rounded-2xl">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Subtotal:</span>
                  <span className="text-gray-800 font-bold">{details.currency} {calculations.subtotal.toFixed(2)}</span>
                </div>
                {calculations.taxTotal > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-medium">Tax:</span>
                    <span className="text-gray-800 font-bold">{details.currency} {calculations.taxTotal.toFixed(2)}</span>
                  </div>
                )}
                {summary.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-medium">Discount:</span>
                    <span className="text-gray-800 font-bold">-{details.currency} {Number(summary.discount).toFixed(2)}</span>
                  </div>
                )}
                {summary.shipping > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-medium">Shipping:</span>
                    <span className="text-gray-800 font-bold">{details.currency} {Number(summary.shipping).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-4 mt-2 border-t-2 border-orange-100">
                  <span className="text-base font-bold text-gray-800">Grand Total:</span>
                  <span className="text-2xl font-black text-orange-500">{details.currency} {calculations.grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

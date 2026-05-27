import React from 'react';
import { useInvoice } from '../../../context/InvoiceContext';

export default function MinimalTemplate({ itemsChunk, isFirstPage, isLastPage }) {
  const { invoice, calculations } = useInvoice();
  const { company, customer, details, summary, extra } = invoice;

  return (
    <div className="bg-white text-gray-800 w-full h-full p-12 font-sans flex flex-col">
      <div className="flex flex-col gap-12 flex-1">
        
        {/* Header section */}
        <div className={`flex justify-between items-end ${!isFirstPage ? 'mb-4' : ''}`}>
          <div>
            <h1 className="text-4xl font-light text-gray-900 tracking-wide mb-2">Invoice</h1>
            <p className="text-gray-500">{details.invoiceNumber}</p>
          </div>
          <div className="text-right">
            {company.logo && isFirstPage ? (
              <img src={company.logo} alt="Company Logo" className="max-h-16 max-w-[150px] object-contain ml-auto" />
            ) : isFirstPage && company.name ? (
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 ml-auto">{company.name}</h2>
            ) : null}
          </div>
        </div>

        {isFirstPage && (
          <div className="flex flex-wrap -mx-4 mb-12">
            <div className="w-[25%] px-4">
              <p className="text-xs text-gray-400 mb-1">From</p>
              <div className="text-sm font-medium flex flex-col gap-1">
                <p><span className="font-bold text-gray-400 mr-1">Name:</span> <span className="text-gray-800">{company.name}</span></p>
                {company.email && <p><span className="font-bold text-gray-400 mr-1">Email:</span> <span className="text-gray-800">{company.email}</span></p>}
                {company.phone && <p><span className="font-bold text-gray-400 mr-1">Phone:</span> <span className="text-gray-800">{company.phone}</span></p>}
              </div>
            </div>
            <div className="w-[50%] px-4">
              <p className="text-xs text-gray-400 mb-1">To</p>
              <div className="text-sm font-medium flex flex-wrap mt-1 -mx-2">
                <p className="w-full sm:w-1/2 px-2 pb-2"><span className="font-bold text-gray-400 mr-1">Name:</span> <span className="text-gray-800">{customer.name || 'Customer'}</span></p>
                {customer.company && <p className="w-full sm:w-1/2 px-2 pb-2"><span className="font-bold text-gray-400 mr-1">Company:</span> <span className="text-gray-800">{customer.company}</span></p>}
                {customer.email && <p className="w-full sm:w-1/2 px-2 pb-2"><span className="font-bold text-gray-400 mr-1">Email:</span> <span className="text-gray-800">{customer.email}</span></p>}
              </div>
            </div>
            <div className="w-[25%] px-4 text-right">
              <div className="mb-4">
                <p className="text-xs text-gray-400 mb-1">Date</p>
                <p className="text-sm font-medium">{details.invoiceDate}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Due Date</p>
                <p className="text-sm font-medium">{details.dueDate}</p>
              </div>
            </div>
          </div>
        )}

        {/* Minimal Items Table */}
        <div className="flex-1">
          <div className="flex gap-4 border-b border-gray-200 pb-2 text-xs text-gray-400">
            <div className="w-[50%]">DESCRIPTION</div>
            <div className="w-[16.66%] text-center">QTY</div>
            <div className="w-[16.66%] text-right">PRICE</div>
            <div className="w-[16.66%] text-right">TOTAL</div>
          </div>
          <div className="mt-4 space-y-4">
            {itemsChunk.map((item) => (
              <div key={item.id} className="flex gap-4 text-sm">
                <div className="w-[50%] text-gray-800">{item.description || '-'}</div>
                <div className="w-[16.66%] text-gray-600 text-center">{item.quantity}</div>
                <div className="w-[16.66%] text-gray-600 text-right">{Number(item.unitPrice).toFixed(2)}</div>
                <div className="w-[16.66%] font-medium text-gray-900 text-right">{Number(item.amount).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Totals & Footer */}
        {isLastPage && (
          <div className="mt-auto">
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <div className="w-[300px] flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>{calculations.subtotal.toFixed(2)}</span>
                </div>
                {Number(summary.discount) > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Discount</span>
                    <span className="text-red-500">-{Number(summary.discount).toFixed(2)}</span>
                  </div>
                )}
                {calculations.taxTotal > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tax</span>
                    <span>{calculations.taxTotal.toFixed(2)}</span>
                  </div>
                )}
                {Number(summary.shipping) > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shipping</span>
                    <span>{Number(summary.shipping).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
                  <span className="font-medium text-lg">Total</span>
                  <span className="font-medium text-lg">{details.currency} {calculations.grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {isLastPage && details.notes && (
              <div className="mt-8 pt-8 border-t border-gray-200 flex justify-between gap-8 text-sm text-gray-500">
                <div className="w-1/2">
                  <p className="text-xs text-gray-400 mb-1">Notes</p>
                  <p>{details.notes}</p>
                </div>
              </div>
            )}
            {(extra.signature || extra.signatoryName) && (
              <div className="mt-8 pt-8 border-t border-gray-200 flex gap-8 text-sm text-gray-500">
                <div className="w-1/2">
                  {extra.notes && <p className="mb-4">{extra.notes}</p>}
                  {extra.terms && <p>{extra.terms}</p>}
                </div>
                <div className="text-right flex flex-col items-end">
                    {extra.signature ? (
                      <img src={extra.signature} alt="Signature" className="max-h-16 object-contain mb-2 opacity-80" />
                    ) : (
                      <div className="mb-2">
                        <p className="text-2xl text-gray-800 font-serif italic pr-2">{extra.signatoryName}</p>
                      </div>
                    )}
                    <p className="text-xs uppercase tracking-widest border-t border-gray-300 pt-1 w-48 text-center">Authorized Signature</p>
                  </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

import React from 'react';

export default function Statistics() {
  const stats = [
    { id: 1, name: 'Invoices Generated', value: '10,000+' },
    { id: 2, name: 'Countries Supported', value: '100+' },
    { id: 3, name: 'Free', value: '100%' },
    { id: 4, name: 'Available', value: '24/7' },
  ];

  return (
    <section className="bg-blue-50 dark:bg-sky-900/20 py-16 sm:py-24 border-y border-blue-100 dark:border-gray-800 no-print">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-gray-600 dark:text-gray-400">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

import React from 'react';
import { Zap, Briefcase, Lock, UserX } from 'lucide-react';

export default function Features() {
  const features = [
    {
      id: 'feature-live-preview',
      name: 'Live Preview',
      description: 'See exactly what your invoice looks like in real-time as you type. No more guessing.',
      icon: Zap,
    },
    {
      id: 'feature-pdf-export',
      name: 'PDF Export',
      description: 'Generate stunning, high-resolution PDF documents that make your business look highly credible.',
      icon: Briefcase,
    },
    {
      id: 'feature-secure',
      name: '100% Secure',
      description: 'All data is processed completely locally in your browser. We never see or store your financial data.',
      icon: Lock,
    },
    {
      id: 'feature-no-registration',
      name: 'No Registration Required',
      description: 'Start immediately. No emails, no passwords, no paywalls, and absolutely no hidden fees.',
      icon: UserX,
    },
  ];

  return (
    <section className="bg-white dark:bg-gray-900 py-24 sm:py-32 no-print">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Why Choose Us</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Everything you need to bill clients.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            We built this tool to remove the friction from getting paid. Enjoy a seamless experience completely free of charge.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} id={feature.id} className="relative pl-16 scroll-mt-24 transition-all hover:translate-x-1 duration-300">
                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 shadow-sm">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

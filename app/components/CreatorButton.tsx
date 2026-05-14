'use client';

import { useState } from 'react';

export default function CreatorButton() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
        aria-label="Mostrar creador"
        title="Creador"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 10v6" />
          <path d="M12 7h.01" />
        </svg>
      </button>
      {visible ? (
        <div className="absolute bottom-12 left-1/2 z-20 w-64 -translate-x-1/2 rounded-lg border border-blue-100 bg-white p-4 text-center shadow-lg">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">Creador</p>
          <p className="mt-2 text-sm font-semibold text-gray-900">Erick Aguilar</p>
          <a href="mailto:eduaguilar619@gmail.com" className="mt-1 block text-sm font-medium text-blue-700 hover:text-blue-800">
            eduaguilar619@gmail.com
          </a>
        </div>
      ) : null}
    </div>
  );
}

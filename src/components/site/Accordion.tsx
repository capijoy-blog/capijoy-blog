"use client";

import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import type { ReactNode } from 'react';

type Props = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export default function Accordion({ title, children, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-2xl border border-cj-border bg-cj-surface">
      <button
        type="button"
        onClick={() => setOpen(current => !current)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-cj-text"
        aria-expanded={open}
      >
        {title}
        <FiChevronDown
          aria-hidden
          className={`text-lg transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
      >
        <div className="overflow-hidden px-4 pb-4 text-sm leading-relaxed text-cj-textMuted">{children}</div>
      </div>
    </div>
  );
}

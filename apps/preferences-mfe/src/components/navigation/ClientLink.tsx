'use client';

import Link from 'next/link';
import type { LinkProps } from 'next/link';
import type { FC, ReactNode } from 'react';

interface ClientLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
}

export const ClientLink: FC<ClientLinkProps> = ({ children, className, ...props }) => {
  return (
    <Link {...props} className={className}>
      {children}
    </Link>
  );
}; 
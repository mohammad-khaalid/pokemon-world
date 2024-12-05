import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

interface BreadcrumbProps {
  items: Array<{
    label: string;
    href: string;
  }>;
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="mb-6 flex items-center space-x-1 text-sm text-muted-foreground">
      <Link
        href="/"
        className="flex items-center hover:text-foreground"
      >
        <Home className="mr-1 h-4 w-4" />
        Home
      </Link>
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center">
          <ChevronRight className="h-4 w-4" />
          <Link
            href={item.href}
            className={`ml-1 hover:text-foreground ${
              index === items.length - 1 ? 'text-foreground' : ''
            }`}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}
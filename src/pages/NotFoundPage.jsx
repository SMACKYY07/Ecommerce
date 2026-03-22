import { Compass } from 'lucide-react';
import { EmptyState } from '../components/ui/EmptyState';

export function NotFoundPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <EmptyState
        icon={Compass}
        title="That page is outside the current storefront map"
        description="The route could not be found, but the rest of the premium storefront is still fully available."
        actionLabel="Return home"
        actionTo="/"
      />
    </section>
  );
}

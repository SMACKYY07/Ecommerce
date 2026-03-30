import { Compass } from 'lucide-react';
import { EmptyState } from '../components/ui/EmptyState';

export function NotFoundPage() {
  return (
    <div className="container" style={{paddingTop: 'var(--s-24)', paddingBottom: 'var(--s-24)'}}>
      <EmptyState
        icon={Compass}
        title="That page is outside the current storefront map"
        description="The route could not be found, but the rest of the premium storefront is still fully available."
        actionLabel="Return home"
        actionTo="/"
      />
    </div>
  );
}

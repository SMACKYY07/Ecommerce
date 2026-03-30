import { Button } from './Button';

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionTo,
}) {
  return (
    <div className="empty-state">
      {Icon && (
        <div className="empty-state-icon">
          <Icon size={24} />
        </div>
      )}
      <h2 className="empty-state-title">{title}</h2>
      <p className="empty-state-desc">
        {description}
      </p>
      {actionLabel && actionTo && (
        <Button to={actionTo} variant="primary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

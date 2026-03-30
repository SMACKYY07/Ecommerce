import { Minus, Plus } from 'lucide-react';

export function QuantityStepper({ value, onChange, min = 1 }) {
  return (
    <div className="stepper">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="stepper-btn"
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <Minus size={16} />
      </button>
      <span className="stepper-value">{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="stepper-btn"
        aria-label="Increase quantity"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}

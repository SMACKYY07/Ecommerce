import { CreditCard, ShieldCheck, Truck } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderSummary } from '../components/commerce/OrderSummary';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { Input } from '../components/ui/Input';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Textarea } from '../components/ui/Textarea';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { useToast } from '../hooks/useToast';
import { validateCheckout } from '../utils/validation';

const paymentOptions = [
  {
    value: 'card',
    label: 'Credit or debit card',
    description: 'A polished card entry state with inline validation.',
    icon: CreditCard,
  },
  {
    value: 'express',
    label: 'Express checkout',
    description: 'Mock wallet-style payment for a fast UI-only flow.',
    icon: ShieldCheck,
  },
  {
    value: 'delivery',
    label: 'Pay on delivery',
    description: 'Keep the payment step simple for the demo storefront.',
    icon: Truck,
  },
];

function createInitialCheckoutValues(user) {
  return {
    email: user?.email || '',
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    notes: '',
    paymentMethod: 'card',
    cardName: user?.name || '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  };
}

export function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, subtotal, shipping, tax, total, clearCart } = useCart();
  const { pushToast } = useToast();
  const [placingOrder, setPlacingOrder] = useState(false);
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState(() => createInitialCheckoutValues(user));

  function updateField(name, value) {
    setFormValues((currentValues) => ({ ...currentValues, [name]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateCheckout(formValues);

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setPlacingOrder(true);

    window.setTimeout(() => {
      clearCart();
      pushToast({
        title: 'Order placed',
        description: 'Checkout is frontend-only, but the full purchase flow is complete.',
        tone: 'success',
      });
      setPlacingOrder(false);
      navigate('/');
    }, 850);
  }

  if (!items.length) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <EmptyState
          icon={Truck}
          title="Checkout is waiting for cart items"
          description="Add products first, then come back to test the address form and payment options."
          actionLabel="Return to products"
          actionTo="/products"
        />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <SectionHeading
        eyebrow="Secure checkout"
        title="Delivery, payment, and order summary in one responsive flow"
        description="Checkout is protected by auth, but remains fully mocked for this frontend-only storefront."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form
          onSubmit={handleSubmit}
          className="grid gap-8 rounded-[2rem] border border-black/5 bg-white/80 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/5"
        >
          <div className="grid gap-5">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-600 dark:text-emerald-300">
              Contact
            </p>
            <Input
              label="Email"
              type="email"
              value={formValues.email}
              onChange={(event) => updateField('email', event.target.value)}
              error={errors.email}
            />
          </div>

          <div className="grid gap-5">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-600 dark:text-emerald-300">
              Shipping address
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                label="First name"
                value={formValues.firstName}
                onChange={(event) => updateField('firstName', event.target.value)}
                error={errors.firstName}
              />
              <Input
                label="Last name"
                value={formValues.lastName}
                onChange={(event) => updateField('lastName', event.target.value)}
                error={errors.lastName}
              />
            </div>
            <Input
              label="Address"
              value={formValues.address}
              onChange={(event) => updateField('address', event.target.value)}
              error={errors.address}
            />
            <Input
              label="Apartment, suite, or company"
              value={formValues.apartment}
              onChange={(event) => updateField('apartment', event.target.value)}
            />
            <div className="grid gap-5 sm:grid-cols-3">
              <Input
                label="City"
                value={formValues.city}
                onChange={(event) => updateField('city', event.target.value)}
                error={errors.city}
              />
              <Input
                label="State"
                value={formValues.state}
                onChange={(event) => updateField('state', event.target.value)}
                error={errors.state}
              />
              <Input
                label="ZIP code"
                value={formValues.zipCode}
                onChange={(event) => updateField('zipCode', event.target.value)}
                error={errors.zipCode}
              />
            </div>
            <Textarea
              label="Delivery notes"
              value={formValues.notes}
              onChange={(event) => updateField('notes', event.target.value)}
              placeholder="Optional directions or gate code"
            />
          </div>

          <div className="grid gap-5">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-600 dark:text-emerald-300">
              Payment
            </p>
            <div className="grid gap-4">
              {paymentOptions.map((option) => {
                const Icon = option.icon;
                const isActive = formValues.paymentMethod === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateField('paymentMethod', option.value)}
                    className={`rounded-[1.5rem] border p-4 text-left transition ${
                      isActive
                        ? 'border-emerald-500 bg-emerald-500/10'
                        : 'border-black/8 bg-white/60 hover:border-emerald-500 dark:border-white/10 dark:bg-white/5'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black/5 text-slate-700 dark:bg-white/5 dark:text-slate-200">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold">{option.label}</p>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {formValues.paymentMethod === 'card' ? (
              <div className="grid gap-5 rounded-[1.75rem] border border-black/5 bg-black/[0.03] p-5 dark:border-white/10 dark:bg-white/5">
                <Input
                  label="Name on card"
                  value={formValues.cardName}
                  onChange={(event) => updateField('cardName', event.target.value)}
                  error={errors.cardName}
                />
                <Input
                  label="Card number"
                  value={formValues.cardNumber}
                  onChange={(event) => updateField('cardNumber', event.target.value)}
                  error={errors.cardNumber}
                  placeholder="1234 5678 9012 3456"
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    label="Expiry"
                    value={formValues.expiry}
                    onChange={(event) => updateField('expiry', event.target.value)}
                    error={errors.expiry}
                    placeholder="MM / YY"
                  />
                  <Input
                    label="CVC"
                    value={formValues.cvc}
                    onChange={(event) => updateField('cvc', event.target.value)}
                    error={errors.cvc}
                    placeholder="123"
                  />
                </div>
              </div>
            ) : null}
          </div>

          <Button type="submit" loading={placingOrder} className="w-full">
            {placingOrder ? 'Placing order' : 'Place order'}
          </Button>
        </form>

        <div className="lg:sticky lg:top-28 lg:h-fit">
          <OrderSummary
            items={items}
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
          />
        </div>
      </div>
    </section>
  );
}

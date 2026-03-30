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
    <div className="container" style={{paddingTop: 'var(--s-16)', paddingBottom: 'var(--s-24)'}}>
      <SectionHeading
        eyebrow="Secure checkout"
        title="Delivery, payment, and order summary"
        description="Checkout is protected by auth, but remains fully mocked for this frontend-only storefront."
      />

      <div className="cart-layout" style={{marginTop: 'var(--s-10)'}}>
        <form onSubmit={handleSubmit} className="checkout-form">
          <div>
            <p className="checkout-section-title">Contact</p>
            <Input
              label="Email"
              type="email"
              value={formValues.email}
              onChange={(event) => updateField('email', event.target.value)}
              error={errors.email}
            />
          </div>

          <div>
            <p className="checkout-section-title">Shipping address</p>
            <div className="grid grid-2 gap-5">
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
            <div style={{marginTop: 'var(--s-5)'}}>
              <Input
                label="Address"
                value={formValues.address}
                onChange={(event) => updateField('address', event.target.value)}
                error={errors.address}
              />
            </div>
            <div style={{marginTop: 'var(--s-5)'}}>
              <Input
                label="Apartment, suite, or company"
                value={formValues.apartment}
                onChange={(event) => updateField('apartment', event.target.value)}
              />
            </div>
            <div className="grid grid-3 gap-5" style={{marginTop: 'var(--s-5)'}}>
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
            <div style={{marginTop: 'var(--s-5)'}}>
              <Textarea
                label="Delivery notes"
                value={formValues.notes}
                onChange={(event) => updateField('notes', event.target.value)}
                placeholder="Optional directions or gate code"
              />
            </div>
          </div>

          <div>
            <p className="checkout-section-title">Payment</p>
            <div className="payment-options-grid">
              {paymentOptions.map((option) => {
                const Icon = option.icon;
                const isActive = formValues.paymentMethod === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateField('paymentMethod', option.value)}
                    className={`payment-option ${isActive ? 'active' : ''}`}
                  >
                    <div className="payment-option-icon">
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="payment-option-label">{option.label}</p>
                      <p className="payment-option-desc">{option.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {formValues.paymentMethod === 'card' && (
              <div className="card-form">
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
                <div className="grid grid-2 gap-5">
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
            )}
          </div>

          <Button type="submit" variant="primary" loading={placingOrder} style={{width: '100%', marginTop: 'var(--s-4)'}}>
            {placingOrder ? 'Placing order' : 'Place order'}
          </Button>
        </form>

        <div style={{position: 'sticky', top: '8rem', height: 'fit-content'}}>
          <OrderSummary
            items={items}
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
          />
        </div>
      </div>
    </div>
  );
}

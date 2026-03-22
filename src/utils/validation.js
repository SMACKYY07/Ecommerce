export function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

export function validateLogin(values) {
  const errors = {};

  if (!values.email?.trim()) {
    errors.email = 'Email is required.';
  } else if (!isValidEmail(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!values.password?.trim()) {
    errors.password = 'Password is required.';
  } else if (values.password.trim().length < 8) {
    errors.password = 'Use at least 8 characters.';
  }

  return errors;
}

export function validateSignup(values) {
  const errors = validateLogin(values);

  if (!values.name?.trim()) {
    errors.name = 'Full name is required.';
  }

  return errors;
}

export function validateCheckout(values) {
  const errors = {};

  ['email', 'firstName', 'lastName', 'address', 'city', 'state', 'zipCode'].forEach((field) => {
    if (!values[field]?.trim()) {
      errors[field] = 'Required.';
    }
  });

  if (values.email && !isValidEmail(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (values.paymentMethod === 'card') {
    ['cardName', 'cardNumber', 'expiry', 'cvc'].forEach((field) => {
      if (!values[field]?.trim()) {
        errors[field] = 'Required.';
      }
    });
  }

  return errors;
}

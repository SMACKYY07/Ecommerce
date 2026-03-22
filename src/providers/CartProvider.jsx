import { useLocalStorageState } from '../hooks/useLocalStorageState';
import { STORAGE_KEYS } from '../utils/storage';
import { buildCartLineId } from '../utils/cart';
import { CartContext } from './contexts';

function createCartLine(product, variantSelection, quantity) {
  return {
    lineId: buildCartLineId(product.slug, variantSelection),
    productId: product.id,
    slug: product.slug,
    name: product.name,
    category: product.category,
    image: product.images[0],
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    quantity,
    variantSelection,
  };
}

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorageState(STORAGE_KEYS.cart, []);

  function addItem(product, variantSelection, quantity = 1) {
    const lineId = buildCartLineId(product.slug, variantSelection);

    setItems((currentItems) => {
      const existingLine = currentItems.find((item) => item.lineId === lineId);

      if (existingLine) {
        return currentItems.map((item) =>
          item.lineId === lineId ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }

      return [...currentItems, createCartLine(product, variantSelection, quantity)];
    });
  }

  function updateQty(lineId, quantity) {
    if (quantity <= 0) {
      removeItem(lineId);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) => (item.lineId === lineId ? { ...item, quantity } : item)),
    );
  }

  function removeItem(lineId) {
    setItems((currentItems) => currentItems.filter((item) => item.lineId !== lineId));
  }

  function clearCart() {
    setItems([]);
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.quantity * item.price, 0);
  const compareAtSubtotal = items.reduce(
    (total, item) => total + item.quantity * (item.compareAtPrice || item.price),
    0,
  );
  const shipping = itemCount === 0 ? 0 : subtotal >= 300 ? 0 : 18;
  const tax = itemCount === 0 ? 0 : Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        compareAtSubtotal,
        shipping,
        tax,
        total,
        addItem,
        updateQty,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

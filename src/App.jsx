import { useState } from 'react';
import CartItem from './components/CartItem';
import Navbar from './components/Navbar';
import ProductPage from './pages/ProductPage';
import { useCart } from './context/CartContext';

const Toast = ({ toast }) => {
  if (!toast) {
    return null;
  }

  const variantClass = toast.type === 'error' ? 'bg-rose-600' : 'bg-emerald-600';

  return (
    <div className={`fixed bottom-5 right-5 z-50 rounded-lg px-4 py-3 text-white shadow-soft ${variantClass}`}>
      {toast.message}
    </div>
  );
};

const App = () => {
  const { cartItems, cartValue, checkout } = useCart();
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    window.setTimeout(() => setToast(null), 2200);
  };

  const handleCheckout = () => {
    const result = checkout();
    if (!result.success) {
      showToast(result.message, 'error');
      return;
    }

    alert(result.message);
    showToast(result.message, 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto grid max-w-7xl gap-8 px-4 py-6 lg:grid-cols-[1fr_360px]">
        <ProductPage onAction={showToast} />

        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-4 shadow-soft lg:sticky lg:top-24">
          <h2 className="text-lg font-semibold">Your Cart</h2>

          {cartItems.length === 0 ? (
            <p className="mt-4 rounded-lg bg-slate-100 p-4 text-sm text-slate-500">Your cart is empty.</p>
          ) : (
            <>
              <div className="mt-4 space-y-3">
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} onAction={showToast} />
                ))}
              </div>

              <div className="mt-5 border-t border-slate-200 pt-4">
                <div className="flex items-center justify-between text-base font-semibold">
                  <span>Total</span>
                  <span>${cartValue.toFixed(2)}</span>
                </div>

                <button
                  type="button"
                  onClick={handleCheckout}
                  className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white hover:bg-indigo-700"
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </aside>
      </main>

      <Toast toast={toast} />
    </div>
  );
};

export default App;

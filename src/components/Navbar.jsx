import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <h1 className="text-xl font-bold text-slate-900">NovaCart</h1>

        <div className="relative rounded-full bg-slate-100 p-2" aria-label="Cart items">
          <span className="text-xl">🛒</span>
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1 text-xs font-semibold text-white">
            {totalItems}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

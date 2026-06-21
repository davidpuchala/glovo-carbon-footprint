import { useApp } from '../state/AppContext';

interface Props {
  title: string;
  left?: React.ReactNode;
  showCart?: boolean;
  onLeft?: () => void;
}

export default function Header({ title, left, showCart, onLeft }: Props) {
  const { cartCount, goTo } = useApp();
  return (
    <div className="glovo-header">
      <button
        className="icon-btn"
        onClick={onLeft}
        aria-label="back"
        style={{ visibility: left ? 'visible' : 'hidden' }}
      >{left ?? '≡'}</button>
      <div className="brand">{title}</div>
      {showCart ? (
        <button
          className="icon-btn"
          onClick={() => goTo('cart')}
          aria-label="cart"
        >
          🛒
          {cartCount > 0 && <span className="cart-pip">{cartCount}</span>}
        </button>
      ) : <span className="icon-btn" style={{ visibility: 'hidden' }}>·</span>}
    </div>
  );
}

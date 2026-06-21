import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import EcoBadge from '../components/EcoBadge';
import { MENU } from '../data/menu';
import { useApp } from '../state/AppContext';

export default function RestaurantScreen() {
  const {
    activeRestaurant, awarenessMode, addToCart, cartCount, goTo, pushToast,
  } = useApp();
  const items = MENU.filter((m) => m.restaurant === activeRestaurant);

  return (
    <>
      <Header title={activeRestaurant} left="←" onLeft={() => goTo('home')} showCart />
      <main className="screen-body">
        <div className="hero">
          <h2>{activeRestaurant}</h2>
          <p>Open · Free delivery on €15+</p>
        </div>

        {awarenessMode !== 'Off' && (
          <p className="section-sub" style={{ marginTop: 8 }}>
            🌱 Items show their eco-impact — tap any item to see details.
          </p>
        )}

        <div className="section-title">Menu</div>

        {items.map((it) => (
          <div className="card" key={it.itemId}>
            <div className="row">
              <div className="emoji">{it.emoji}</div>
              <div className="info">
                <div className="name">{it.itemName}</div>
                <div className="desc">{it.description}</div>
                <div className="meta">
                  <span className="price">€{it.priceEur.toFixed(2)}</span>
                  <EcoBadge co2eKg={it.co2eKg} mode={awarenessMode} />
                </div>
              </div>
              <button
                className="add-btn"
                onClick={() => {
                  addToCart(it.itemId);
                  pushToast('🛒', `Added ${it.itemName}`);
                }}
                aria-label={`Add ${it.itemName}`}
              >＋</button>
            </div>
          </div>
        ))}

        {cartCount > 0 && (
          <button
            className="cta-primary"
            onClick={() => goTo('cart')}
          >
            View cart · {cartCount} item{cartCount !== 1 ? 's' : ''}
          </button>
        )}
      </main>
      <BottomNav active="home" />
    </>
  );
}

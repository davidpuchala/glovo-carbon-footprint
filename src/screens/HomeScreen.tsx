import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { useApp } from '../state/AppContext';

export default function HomeScreen() {
  const { setActiveRestaurant, goTo, awarenessMode } = useApp();
  const open = (name: string) => {
    setActiveRestaurant(name);
    goTo('restaurant');
  };

  return (
    <>
      <Header title="Glovo" left="📍" showCart />
      <main className="screen-body">
        <div className="hero">
          <h2>Hungry, David?</h2>
          <p>Order in minutes — delivered by bike 🛵</p>
        </div>

        <div className="section-title">Featured near you</div>

        <button className="card card-button" onClick={() => open('Burger Lab')}>
          <div className="row">
            <div className="emoji">🍔</div>
            <div className="info">
              <div className="name">Burger Lab</div>
              <div className="desc">American · 25-35 min · ⭐ 4.7</div>
              <div className="meta">
                {awarenessMode !== 'Off' && (
                  <span className="eco-badge eco-med">🌿 Mixed footprint</span>
                )}
                <span className="price">From €5.50</span>
              </div>
            </div>
            <div className="chev">›</div>
          </div>
        </button>

        <button className="card card-button" onClick={() => open('Napoli Pizza')}>
          <div className="row">
            <div className="emoji">🍕</div>
            <div className="info">
              <div className="name">Napoli Pizza</div>
              <div className="desc">Italian · 20-30 min · ⭐ 4.6</div>
              <div className="meta">
                {awarenessMode !== 'Off' && (
                  <span className="eco-badge eco-low">🌱 Low footprint</span>
                )}
                <span className="price">From €10.50</span>
              </div>
            </div>
            <div className="chev">›</div>
          </div>
        </button>

        <button className="card card-button" onClick={() => open('Sushi Daily')}>
          <div className="row">
            <div className="emoji">🍣</div>
            <div className="info">
              <div className="name">Sushi Daily</div>
              <div className="desc">Japanese · 30-40 min · ⭐ 4.5</div>
              <div className="meta">
                {awarenessMode !== 'Off' && (
                  <span className="eco-badge eco-med">🌿 Mixed</span>
                )}
                <span className="price">From €9.50</span>
              </div>
            </div>
            <div className="chev">›</div>
          </div>
        </button>

        <button className="card card-button" onClick={() => open('Glovo Market')}>
          <div className="row">
            <div className="emoji">🛒</div>
            <div className="info">
              <div className="name">Glovo Market</div>
              <div className="desc">Groceries · 15-20 min</div>
              <div className="meta">
                {awarenessMode !== 'Off' && (
                  <span className="eco-badge eco-med">🌿 Mixed</span>
                )}
                <span className="price">Wide range</span>
              </div>
            </div>
            <div className="chev">›</div>
          </div>
        </button>
      </main>
      <BottomNav active="home" />
    </>
  );
}

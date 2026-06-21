import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import {
  DELIVERY_BIKE_KG, equivalentPhrase, impactBand,
} from '../lib/footprint';
import { useApp } from '../state/AppContext';

export default function SuccessScreen() {
  const {
    lastOrder, awarenessMode, revealCarbon, setRevealCarbon,
    goTo, clearCart, setLastOrder,
  } = useApp();

  if (!lastOrder) {
    return (
      <>
        <Header title="Order placed" />
        <main className="screen-body">
          <button className="cta-primary" onClick={() => goTo('home')}>
            Back to home
          </button>
        </main>
        <BottomNav active="home" />
      </>
    );
  }

  const band = impactBand(lastOrder.total);

  return (
    <>
      <Header title="Order placed" />
      <main className="screen-body">
        <div className="success-hero">
          <div className="ring">🛵</div>
          <h1>Order placed!</h1>
          <p>Estimated arrival · 25 min</p>
        </div>

        <div className="totals">
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Receipt</div>
          {lastOrder.items.map((r, i) => (
            <div className="line" key={i}>
              <span>{r.emoji} {r.name}</span>
              <span>€{r.priceEur.toFixed(2)}</span>
            </div>
          ))}
          <div className="line total">
            <span>Paid</span>
            <span>€{(lastOrder.subtotalEur + 1.99).toFixed(2)}</span>
          </div>
        </div>

        {awarenessMode !== 'Off' && !revealCarbon && (
          <div className="reveal">
            <div className="head">🌱 Carbon impact tracked</div>
            We've added this order to your monthly footprint. Tap below if you'd
            like to see the breakdown.
            <button
              className="cta-secondary"
              style={{ marginTop: 10 }}
              onClick={() => setRevealCarbon(true)}
            >Show carbon impact</button>
          </div>
        )}

        {awarenessMode !== 'Off' && revealCarbon && (
          <div className="reveal" style={{ borderColor: band.color }}>
            <div className="head">
              {band.leaf} {band.label} impact · {lastOrder.total.toFixed(2)} kg CO₂e
            </div>
            {equivalentPhrase(lastOrder.total)} · (includes{' '}
            {DELIVERY_BIKE_KG.toFixed(2)} kg for bike delivery)
          </div>
        )}

        <button
          className="cta-primary"
          onClick={() => {
            clearCart();
            setLastOrder(null);
            goTo('home');
          }}
        >Done</button>
        <button className="cta-secondary" onClick={() => goTo('carbon')}>
          View carbon dashboard
        </button>
      </main>
      <BottomNav active="home" />
    </>
  );
}

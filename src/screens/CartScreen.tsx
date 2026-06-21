import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import EcoBadge from '../components/EcoBadge';
import {
  bestSwap, getItem, impactBand, itemCo2e, orderBreakdown,
} from '../lib/footprint';
import { DELIVERY_VEHICLES, DELIVERY_BY_ID } from '../data/delivery';
import { useApp } from '../state/AppContext';

export default function CartScreen() {
  const {
    cart, cartCount, cartItemIds, addToCart, removeFromCart,
    awarenessMode, deliveryVehicleId, setDeliveryVehicle, pushToast,
    goTo, setLastOrder, setRevealCarbon,
  } = useApp();

  if (cartCount === 0) {
    return (
      <>
        <Header title="Your cart" left="←" onLeft={() => goTo('restaurant')} />
        <main className="screen-body" style={{ textAlign: 'center', paddingTop: 60 }}>
          <div style={{ fontSize: 48 }}>🛒</div>
          <p style={{ color: '#6B6B6B' }}>Your cart is empty.</p>
          <button className="cta-primary" onClick={() => goTo('restaurant')}>
            ← Browse menu
          </button>
        </main>
        <BottomNav active="home" />
      </>
    );
  }

  const breakdown = orderBreakdown(cartItemIds, deliveryVehicleId);
  const swap = bestSwap(breakdown.items);
  const totalBand = impactBand(breakdown.total);
  const vehicle = DELIVERY_BY_ID[deliveryVehicleId];

  const pickVehicle = (id: typeof deliveryVehicleId) => {
    setDeliveryVehicle(id);
    const v = DELIVERY_BY_ID[id];
    if (id === 'scooter') return; // fastest option, no eco nudge
    pushToast(v.emoji, `${v.label} delivery · ${v.tagline.toLowerCase()}`);
  };

  return (
    <>
      <Header title="Your cart" left="←" onLeft={() => goTo('restaurant')} />
      <main className="screen-body">
        <div className="section-title">Items</div>

        {Object.entries(cart).map(([iid, qty]) => {
          const it = getItem(iid)!;
          const lineCo2e = itemCo2e(iid) * qty;
          return (
            <div className="card" key={iid}>
              <div className="row">
                <div className="emoji">{it.emoji}</div>
                <div className="info">
                  <div className="name">{qty} × {it.itemName}</div>
                  <div className="desc">€{(it.priceEur * qty).toFixed(2)}</div>
                  <div className="meta">
                    <EcoBadge co2eKg={it.co2eKg} mode={awarenessMode} />
                    {awarenessMode === 'Detailed' && (
                      <span className="meta-side">{lineCo2e.toFixed(2)} kg CO₂e</span>
                    )}
                  </div>
                </div>
                <div className="qty-controls">
                  <button onClick={() => removeFromCart(iid)} aria-label="decrease">−</button>
                  <span>{qty}</span>
                  <button onClick={() => addToCart(iid)} aria-label="increase">＋</button>
                </div>
              </div>
            </div>
          );
        })}

        {swap && awarenessMode !== 'Off' && (
          <div className="nudge">
            <div className="label">💡 Eco tip — totally optional</div>
            <b>Try {swap.toName}</b> instead of {swap.fromName} and save about{' '}
            <b>{swap.savingKg} kg CO₂e</b>. {swap.tip}
          </div>
        )}

        <div className="section-title">Delivery method</div>
        <div className="veh-grid">
          {DELIVERY_VEHICLES.map((v) => {
            const band = impactBand(v.co2eKg);
            const selected = v.id === deliveryVehicleId;
            return (
              <button
                key={v.id}
                className={`veh-card ${selected ? 'selected' : ''}`}
                onClick={() => pickVehicle(v.id)}
                aria-pressed={selected}
              >
                <span className="veh-emoji">{v.emoji}</span>
                <span className="veh-name">{v.label}</span>
                <span className="veh-eta">{v.etaMin} min</span>
                <span className={`veh-co2 ${band.cls}`}>
                  {awarenessMode === 'Detailed'
                    ? `${band.leaf} ${v.co2eKg.toFixed(2)} kg`
                    : awarenessMode === 'Light'
                      ? `${band.leaf} ${band.label}`
                      : band.leaf}
                </span>
              </button>
            );
          })}
        </div>

        <div className="totals">
          <div className="line">
            <span>Items subtotal</span>
            <span>€{breakdown.subtotalEur.toFixed(2)}</span>
          </div>
          <div className="line">
            <span>Delivery</span>
            <span>€1.99</span>
          </div>
          <div className="line total">
            <span>Order total</span>
            <span>€{(breakdown.subtotalEur + 1.99).toFixed(2)}</span>
          </div>

          {awarenessMode !== 'Off' && (
            <div className="line muted">
              <span>{vehicle.emoji} {vehicle.label} delivery</span>
              <span>{breakdown.delivery.toFixed(2)} kg CO₂e</span>
            </div>
          )}
          {awarenessMode === 'Detailed' && (
            <div className="line total">
              <span>Total CO₂e</span>
              <span>{breakdown.total.toFixed(2)} kg</span>
            </div>
          )}
          {awarenessMode === 'Light' && (
            <div className="line total">
              <span>Eco impact</span>
              <span>{totalBand.leaf} {totalBand.label}</span>
            </div>
          )}
        </div>

        <button
          className="cta-primary"
          onClick={() => {
            setLastOrder(breakdown);
            setRevealCarbon(false);
            goTo('success');
          }}
        >Place order</button>
        <button className="cta-secondary" onClick={() => goTo('restaurant')}>
          ← Add more items
        </button>
      </main>
      <BottomNav active="home" />
    </>
  );
}

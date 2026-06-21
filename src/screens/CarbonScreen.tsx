import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { ORDERS } from '../data/orders';
import { equivalentPhrase, getItem, impactBand, itemCo2e } from '../lib/footprint';
import { useApp } from '../state/AppContext';

const PLANT_FRIENDLY = new Set(['Plant', 'Salad', 'Sides']);

export default function CarbonScreen() {
  const { goTo } = useApp();

  const total = round2(ORDERS.reduce((s, o) => s + o.co2eKg, 0));
  const avg = round2(total / ORDERS.length);
  const lastMonth = total * 1.18;
  const deltaPct = ((total - lastMonth) / lastMonth) * 100; // negative = improvement

  // Per-category aggregation across all orders
  const byCat = new Map<string, number>();
  for (const o of ORDERS) {
    for (const iid of o.itemIds) {
      const it = getItem(iid);
      if (!it) continue;
      byCat.set(it.category, (byCat.get(it.category) ?? 0) + itemCo2e(iid));
    }
  }
  const sortedCats = Array.from(byCat.entries()).sort((a, b) => b[1] - a[1]);
  const maxCat = sortedCats[0]?.[1] ?? 1;

  // Plant-based wins
  const veggieOrders = ORDERS.filter((o) =>
    o.itemIds.some((iid) => {
      const it = getItem(iid);
      return it && PLANT_FRIENDLY.has(it.category);
    }),
  ).length;

  const recent = [...ORDERS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);

  return (
    <>
      <Header title="Carbon footprint" left="←" onLeft={() => goTo('account')} />
      <main className="screen-body">
        <div className="hero">
          <h2>{total.toFixed(1)} kg CO₂e</h2>
          <p>
            April 2026 · {ORDERS.length} orders ·{' '}
            {deltaPct < 0 ? '↓' : '↑'} {Math.abs(deltaPct).toFixed(0)}% vs March
          </p>
        </div>

        <div className="kpi-grid">
          <div className="kpi"><div className="v">{avg.toFixed(2)} kg</div>
            <div className="l">Avg per order</div></div>
          <div className="kpi delta-good">
            <div className="v">−{Math.abs(deltaPct).toFixed(0)}%</div>
            <div className="l">vs last month</div></div>
          <div className="kpi"><div className="v">{ORDERS.length}</div>
            <div className="l">Orders this month</div></div>
          <div className="kpi"><div className="v">
            {equivalentPhrase(total).split('≈').pop()?.trim()}
          </div><div className="l">Equivalent</div></div>
        </div>

        <div className="section-title">What's driving it?</div>
        {sortedCats.map(([cat, v]) => (
          <div className="bar-row" key={cat}>
            <div className="lbl">{cat}</div>
            <div className="bar"><span style={{ width: `${(v / maxCat) * 100}%` }} /></div>
            <div className="v">{v.toFixed(1)} kg</div>
          </div>
        ))}

        <div className="section-title">Recent orders</div>
        {recent.map((o) => {
          const band = impactBand(o.co2eKg);
          const dt = new Date(o.date).toLocaleDateString('en-GB', {
            weekday: 'short', day: '2-digit', month: 'short',
          });
          return (
            <div className="card" key={o.orderId}>
              <div className="row">
                <div className="emoji">📦</div>
                <div className="info">
                  <div className="name">{o.restaurant}</div>
                  <div className="desc">{dt} · €{o.totalEur.toFixed(2)}</div>
                  <div className="meta">
                    <span className={`eco-badge ${band.cls}`}>
                      {band.leaf} {o.co2eKg.toFixed(2)} kg
                    </span>
                    <span className="meta-side">view ›</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="nudge">
          <div className="label">🌱 Wins this month</div>
          You picked plant-based options on <b>{veggieOrders}</b> orders. Every
          veggie main saves roughly <b>2.5 kg CO₂e</b> vs a beef equivalent.
        </div>

        <button className="cta-secondary" onClick={() => goTo('awareness')}>
          ⚙ Awareness settings
        </button>
        <button className="cta-secondary" onClick={() => goTo('account')}>
          ← Back to account
        </button>
      </main>
      <BottomNav active="account" />
    </>
  );
}

function round2(n: number) { return Math.round(n * 100) / 100; }

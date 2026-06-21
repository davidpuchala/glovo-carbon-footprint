import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { useApp } from '../state/AppContext';
import type { Screen } from '../types';

interface SettingRow {
  icon: string;
  label: string;
  destination?: Screen;
  highlight?: boolean;
}

const ROWS: SettingRow[] = [
  { icon: '📦', label: 'Orders' },
  { icon: '💳', label: 'Payment methods' },
  { icon: '📍', label: 'Addresses' },
  { icon: '🌱', label: 'Carbon footprint', destination: 'carbon', highlight: true },
  { icon: '🔔', label: 'Notifications' },
  { icon: '🔒', label: 'Privacy & data' },
];

export default function AccountScreen() {
  const { goTo } = useApp();

  return (
    <>
      <Header title="Account" />
      <main className="screen-body">
        <div className="hero">
          <h2>David Puchala</h2>
          <p>davidpprg@gmail.com · Glovo Prime member</p>
        </div>

        <div className="section-title">Settings</div>

        {ROWS.map((r) => (
          <button
            key={r.label}
            className={`settings-row${r.destination ? '' : ' disabled'}${r.highlight ? ' highlight' : ''}`}
            onClick={() => r.destination && goTo(r.destination)}
            disabled={!r.destination}
          >
            <span className="icon">{r.icon}</span>
            <span className="label">{r.label}</span>
            {r.highlight && <span className="new-pill">NEW</span>}
            <span className="chev">›</span>
          </button>
        ))}
      </main>
      <BottomNav active="account" />
    </>
  );
}

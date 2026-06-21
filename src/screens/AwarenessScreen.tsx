import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { useApp } from '../state/AppContext';
import type { AwarenessMode } from '../types';

const OPTIONS: Array<{ key: AwarenessMode; icon: string; desc: string }> = [
  { key: 'Off',      icon: '⬜',
    desc: 'No carbon info during ordering. Footprint still tracked here.' },
  { key: 'Light',    icon: '🌱',
    desc: 'Small color-coded leaf icons on items. No numbers in your face.' },
  { key: 'Detailed', icon: '📊',
    desc: 'Show kg CO₂e on every item, swap suggestions, full receipt.' },
];

export default function AwarenessScreen() {
  const { awarenessMode, setAwarenessMode, goTo, pushToast } = useApp();

  return (
    <>
      <Header title="Carbon awareness" left="←" onLeft={() => goTo('carbon')} />
      <main className="screen-body">
        <div className="hero">
          <h2>How much do you want to see?</h2>
          <p>
            Some people find detailed numbers stressful. Pick the level that
            helps you, not guilts you.
          </p>
        </div>

        {OPTIONS.map(({ key, icon, desc }) => {
          const active = key === awarenessMode;
          return (
            <button
              key={key}
              className={`card card-button${active ? ' selected' : ''}`}
              onClick={() => {
                if (!active) {
                  setAwarenessMode(key);
                  pushToast(icon, `Awareness set to ${key}`);
                }
              }}
            >
              <div className="row">
                <div className="emoji">{icon}</div>
                <div className="info">
                  <div className="name">
                    {key} {active && <span className="active-tick">✓</span>}
                  </div>
                  <div className="desc">{desc}</div>
                </div>
              </div>
            </button>
          );
        })}

        <div className="nudge">
          <div className="label">💛 Why we offer this</div>
          Showing a footprint can backfire — some users just stop using the app.
          We'd rather you stay informed at <i>your</i> chosen level than feel
          blamed every time you order dinner.
        </div>

        <button className="cta-secondary" onClick={() => goTo('carbon')}>
          ← Back to dashboard
        </button>
      </main>
      <BottomNav active="account" />
    </>
  );
}

import { useApp } from '../state/AppContext';
import type { Screen } from '../types';

interface NavItem { key: string; icon: string; label: string; target?: Screen; }

const ITEMS: NavItem[] = [
  { key: 'home',    icon: '🏠', label: 'Home',    target: 'home' },
  { key: 'orders',  icon: '📦', label: 'Orders' },
  { key: 'explore', icon: '🔍', label: 'Explore' },
  { key: 'account', icon: '👤', label: 'Account', target: 'account' },
];

export default function BottomNav({ active }: { active: 'home' | 'account' }) {
  const { goTo } = useApp();
  return (
    <nav className="bottom-nav">
      {ITEMS.map((it) => (
        <button
          key={it.key}
          className={`nav-item${it.key === active ? ' active' : ''}`}
          onClick={() => it.target && goTo(it.target)}
          disabled={!it.target}
        >
          <span className="ic">{it.icon}</span>
          <span>{it.label}</span>
        </button>
      ))}
    </nav>
  );
}

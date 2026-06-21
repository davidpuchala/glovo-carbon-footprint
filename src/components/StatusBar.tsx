export default function StatusBar() {
  return (
    <div className="phone-status">
      <span>9:41</span>
      <span className="icons">
        <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="0.6"/><rect x="4" y="5" width="3" height="6" rx="0.6"/><rect x="8" y="3" width="3" height="8" rx="0.6"/><rect x="12" y="0" width="3" height="11" rx="0.6"/></svg>
        <svg width="14" height="11" viewBox="0 0 14 11" fill="currentColor"><path d="M7 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/><path d="M2.5 5.5a6 6 0 019 0M.5 3.2a9 9 0 0113 0" stroke="currentColor" strokeWidth="1" fill="none"/></svg>
        <svg width="24" height="11" viewBox="0 0 24 11" fill="none"><rect x="0.5" y="0.5" width="20" height="10" rx="2.5" stroke="currentColor"/><rect x="2" y="2" width="16" height="7" rx="1" fill="currentColor"/><rect x="21" y="3.5" width="2" height="4" rx="0.5" fill="currentColor"/></svg>
      </span>
    </div>
  );
}

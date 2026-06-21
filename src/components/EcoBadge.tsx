import { impactBand } from '../lib/footprint';
import type { AwarenessMode } from '../types';

interface Props {
  co2eKg: number;
  mode: AwarenessMode;
}

export default function EcoBadge({ co2eKg, mode }: Props) {
  if (mode === 'Off') return null;
  const { label, leaf, cls } = impactBand(co2eKg);
  const text = mode === 'Light' ? label : `${co2eKg.toFixed(2)} kg`;
  return (
    <span className={`eco-badge ${cls}`}>
      {leaf} {text}
    </span>
  );
}

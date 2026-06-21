import type {
  AwarenessMode, BandResult, DeliveryVehicleId, MenuItem,
  OrderBreakdown, OrderLine, SwapSuggestion,
} from '../types';
import { MENU_BY_ID } from '../data/menu';
import { DEFAULT_VEHICLE_ID, DELIVERY_BY_ID } from '../data/delivery';

// Concrete, same-restaurant swaps: cart item id -> greener replacement id.
// Savings are computed from the two products' real footprints, not estimates.
const ITEM_SWAPS: Record<string, string> = {
  b1: 'b2',  // Classic Beef Burger  -> Veggie Garden Burger
  b3: 'b2',  // Crispy Chicken Wrap  -> Veggie Garden Burger
  p2: 'p3',  // Pepperoni            -> Vegana
  s1: 's2',  // Salmon Nigiri        -> Veggie Roll
  s3: 's2',  // Tuna Sashimi         -> Veggie Roll
  g3: 'g5',  // Aged Cheddar         -> Tofu Block
};

export function getItem(itemId: string): MenuItem | undefined {
  return MENU_BY_ID[itemId];
}

export function itemCo2e(itemId: string): number {
  const it = getItem(itemId);
  return it ? it.co2eKg : 0;
}

export function orderBreakdown(
  itemIds: string[],
  vehicleId: DeliveryVehicleId = DEFAULT_VEHICLE_ID,
): OrderBreakdown {
  const items: OrderLine[] = [];
  for (const iid of itemIds) {
    const it = getItem(iid);
    if (!it) continue;
    items.push({
      itemId:   iid,
      name:     it.itemName,
      emoji:    it.emoji,
      priceEur: it.priceEur,
      category: it.category,
      co2eKg:   it.co2eKg,
    });
  }
  const itemsTotal = round2(items.reduce((s, r) => s + r.co2eKg, 0));
  const delivery = DELIVERY_BY_ID[vehicleId].co2eKg;
  return {
    items,
    itemsTotal,
    delivery,
    total:             round2(itemsTotal + delivery),
    subtotalEur:       round2(items.reduce((s, r) => s + r.priceEur, 0)),
    deliveryVehicleId: vehicleId,
  };
}

export function impactBand(co2eKg: number): BandResult {
  if (co2eKg < 0.4)  return { label: 'Low',  leaf: '🌱', color: '#22c55e', cls: 'eco-low'  };
  if (co2eKg < 1.5)  return { label: 'Med',  leaf: '🌿', color: '#f59e0b', cls: 'eco-med'  };
  return                    { label: 'High', leaf: '🍂', color: '#ef4444', cls: 'eco-high' };
}

export function bestSwap(items: OrderLine[]): SwapSuggestion | null {
  const candidates = items.filter((r) => ITEM_SWAPS[r.itemId]);
  if (!candidates.length) return null;
  const target = candidates.reduce((a, b) => (a.co2eKg >= b.co2eKg ? a : b));
  const toItem = MENU_BY_ID[ITEM_SWAPS[target.itemId]];
  if (!toItem) return null;
  const savingKg = round2(target.co2eKg - toItem.co2eKg);
  if (savingKg <= 0) return null;
  const pct = Math.round((savingKg / target.co2eKg) * 100);
  return {
    fromItemId: target.itemId,
    fromName:   target.name,
    toItem,
    savingKg,
    tip: `A ${toItem.itemName} cuts about ${pct}% of this item’s footprint.`,
  };
}

export function equivalentPhrase(co2eKg: number): string {
  // 1 km driven ≈ 0.17 kg; 1 phone charge ≈ 0.005 kg; 1 tree ≈ 22 kg/year.
  const km = co2eKg / 0.17;
  if (co2eKg < 0.5) {
    const charges = co2eKg / 0.005;
    return `≈ ${charges.toFixed(0)} smartphone charges`;
  }
  if (co2eKg < 5) return `≈ ${km.toFixed(1)} km driven in a car`;
  const days = (co2eKg / 22) * 365;
  return `≈ ${km.toFixed(0)} km driven · ${days.toFixed(0)} tree-days to absorb`;
}

export function formatCo2e(co2eKg: number, mode: AwarenessMode): string {
  if (mode === 'Off') return '';
  const { leaf, label } = impactBand(co2eKg);
  return mode === 'Light' ? `${leaf} ${label}` : `${leaf} ${co2eKg.toFixed(2)} kg`;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

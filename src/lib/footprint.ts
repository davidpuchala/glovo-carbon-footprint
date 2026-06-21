import type {
  AwarenessMode, BandResult, ItemCategory, MenuItem,
  OrderBreakdown, OrderLine, SwapSuggestion,
} from '../types';
import { MENU_BY_ID } from '../data/menu';

export const DELIVERY_BIKE_KG = 0.45;

interface Swap {
  swapTo: string;
  savingPct: number;
  tip: string;
}

const ITEM_SWAPS: Partial<Record<ItemCategory, Swap>> = {
  Beef:    { swapTo: 'Veggie Garden Burger', savingPct: 0.84,
             tip: 'A veggie patty here saves ~84% of this item’s footprint.' },
  Chicken: { swapTo: 'Veggie alternative',   savingPct: 0.55,
             tip: 'Swapping chicken for a plant option saves ~55%.' },
  Pizza:   { swapTo: 'Margherita / Vegana',  savingPct: 0.55,
             tip: 'A veggie pizza saves ~55% vs meat-topped.' },
  Sushi:   { swapTo: 'Veggie Roll',          savingPct: 0.65,
             tip: 'Veggie rolls have ~65% lower footprint than fish.' },
  Grocery: { swapTo: 'Plant-based',          savingPct: 0.50,
             tip: 'Plant-based dairy alternatives roughly halve footprint.' },
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
  includeDelivery = true,
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
  const delivery = includeDelivery ? DELIVERY_BIKE_KG : 0;
  return {
    items,
    itemsTotal,
    delivery,
    total:       round2(itemsTotal + delivery),
    subtotalEur: round2(items.reduce((s, r) => s + r.priceEur, 0)),
  };
}

export function impactBand(co2eKg: number): BandResult {
  if (co2eKg < 0.4)  return { label: 'Low',  leaf: '🌱', color: '#22c55e', cls: 'eco-low'  };
  if (co2eKg < 1.5)  return { label: 'Med',  leaf: '🌿', color: '#f59e0b', cls: 'eco-med'  };
  return                    { label: 'High', leaf: '🍂', color: '#ef4444', cls: 'eco-high' };
}

export function bestSwap(items: OrderLine[]): SwapSuggestion | null {
  const candidates = items.filter((r) => ITEM_SWAPS[r.category]);
  if (!candidates.length) return null;
  const target = candidates.reduce((a, b) => (a.co2eKg >= b.co2eKg ? a : b));
  const swap = ITEM_SWAPS[target.category]!;
  return {
    fromName: target.name,
    toName:   swap.swapTo,
    savingKg: round2(target.co2eKg * swap.savingPct),
    tip:      swap.tip,
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

export type ItemCategory =
  | 'Beef' | 'Chicken' | 'Plant' | 'Sides' | 'Salad'
  | 'Drink' | 'Pizza' | 'Sushi' | 'Grocery';

export interface MenuItem {
  itemId: string;
  restaurant: string;
  itemName: string;
  emoji: string;
  description: string;
  priceEur: number;
  category: ItemCategory;
  co2eKg: number;
}

export interface Order {
  orderId: number;
  date: string;        // ISO yyyy-mm-dd
  restaurant: string;
  itemIds: string[];
  totalEur: number;
  co2eKg: number;
}

export interface OrderLine {
  itemId: string;
  name: string;
  emoji: string;
  priceEur: number;
  category: ItemCategory;
  co2eKg: number;
}

export interface OrderBreakdown {
  items: OrderLine[];
  itemsTotal: number;
  delivery: number;
  total: number;
  subtotalEur: number;
  deliveryVehicleId: DeliveryVehicleId;
}

export type DeliveryVehicleId = 'bicycle' | 'ebike' | 'scooter';

export interface DeliveryVehicle {
  id: DeliveryVehicleId;
  label: string;
  emoji: string;
  co2eKg: number;     // delivery-leg footprint
  etaMin: number;     // estimated arrival
  tagline: string;    // short descriptor, e.g. 'Zero emissions'
}

export type AwarenessMode = 'Off' | 'Light' | 'Detailed';

export type Screen =
  | 'home' | 'restaurant' | 'cart' | 'success'
  | 'account' | 'carbon' | 'awareness';

export interface BandResult {
  label: 'Low' | 'Med' | 'High';
  leaf: string;
  color: string;
  cls: string;
}

export interface SwapSuggestion {
  fromName: string;
  toName: string;
  savingKg: number;
  tip: string;
}

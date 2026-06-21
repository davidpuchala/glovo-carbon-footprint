import type { DeliveryVehicle, DeliveryVehicleId } from '../types';

// Delivery-leg footprints (illustrative, per short urban delivery):
//  · bicycle  — pedal-powered, zero operational emissions
//  · e-bike   — electricity for charging only, very low
//  · scooter  — petrol moped, the app's previous fixed 0.45 kg baseline
export const DELIVERY_VEHICLES: DeliveryVehicle[] = [
  { id: 'bicycle', label: 'Bicycle', emoji: '🚲', co2eKg: 0.0,  etaMin: 37, tagline: 'Zero emissions' },
  { id: 'ebike',   label: 'E-bike',  emoji: '⚡', co2eKg: 0.05, etaMin: 27, tagline: 'Low carbon'     },
  { id: 'scooter', label: 'Scooter', emoji: '🛵', co2eKg: 0.45, etaMin: 25, tagline: 'Fastest'        },
];

export const DELIVERY_BY_ID = Object.fromEntries(
  DELIVERY_VEHICLES.map((v) => [v.id, v]),
) as Record<DeliveryVehicleId, DeliveryVehicle>;

export const DEFAULT_VEHICLE_ID: DeliveryVehicleId = 'bicycle';

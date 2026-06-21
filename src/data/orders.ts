import type { Order } from '../types';

export const ORDERS: Order[] = [
  { orderId: 1001, date: '2026-04-03', restaurant: 'Burger Lab',
    itemIds: ['b1','b4','b6'], totalEur: 15.90, co2eKg: 4.48 },
  { orderId: 1002, date: '2026-04-06', restaurant: 'Sushi Daily',
    itemIds: ['s1','s2'], totalEur: 23.40, co2eKg: 1.50 },
  { orderId: 1003, date: '2026-04-08', restaurant: 'Napoli Pizza',
    itemIds: ['p2','b6'], totalEur: 14.70, co2eKg: 2.43 },
  { orderId: 1004, date: '2026-04-11', restaurant: 'Glovo Market',
    itemIds: ['g1','g2','g3','g4'], totalEur: 10.65, co2eKg: 5.85 },
  { orderId: 1005, date: '2026-04-14', restaurant: 'Burger Lab',
    itemIds: ['b3','b4','b7'], totalEur: 14.90, co2eKg: 1.95 },
  { orderId: 1006, date: '2026-04-18', restaurant: 'Napoli Pizza',
    itemIds: ['p1','b6'], totalEur: 12.70, co2eKg: 1.48 },
  { orderId: 1007, date: '2026-04-22', restaurant: 'Burger Lab',
    itemIds: ['b1','b4','b6'], totalEur: 15.90, co2eKg: 4.48 },
  { orderId: 1008, date: '2026-04-25', restaurant: 'Sushi Daily',
    itemIds: ['s2','s3'], totalEur: 24.00, co2eKg: 1.95 },
  { orderId: 1009, date: '2026-04-28', restaurant: 'Burger Lab',
    itemIds: ['b2','b5','b7'], totalEur: 16.80, co2eKg: 1.40 },
  { orderId: 1010, date: '2026-04-30', restaurant: 'Glovo Market',
    itemIds: ['g5','g4','g2'], totalEur: 7.50, co2eKg: 1.80 },
];

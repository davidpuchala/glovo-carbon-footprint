import {
  createContext, useCallback, useContext, useMemo, useState,
  type ReactNode,
} from 'react';
import type {
  AwarenessMode, DeliveryVehicleId, OrderBreakdown, Screen,
} from '../types';
import { DEFAULT_VEHICLE_ID } from '../data/delivery';

type Cart = Record<string, number>;
interface Toast { id: number; icon: string; text: string; }

interface AppState {
  screen: Screen;
  goTo: (s: Screen) => void;

  cart: Cart;
  cartCount: number;
  cartItemIds: string[];      // qty-expanded
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;

  awarenessMode: AwarenessMode;
  setAwarenessMode: (m: AwarenessMode) => void;

  deliveryVehicleId: DeliveryVehicleId;
  setDeliveryVehicle: (id: DeliveryVehicleId) => void;

  activeRestaurant: string;
  setActiveRestaurant: (r: string) => void;

  lastOrder: OrderBreakdown | null;
  setLastOrder: (o: OrderBreakdown | null) => void;

  revealCarbon: boolean;
  setRevealCarbon: (b: boolean) => void;

  toasts: Toast[];
  pushToast: (icon: string, text: string) => void;
}

const Ctx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<Screen>('home');
  const [cart, setCart] = useState<Cart>({});
  const [awarenessMode, setAwarenessMode] = useState<AwarenessMode>('Light');
  const [deliveryVehicleId, setDeliveryVehicle] =
    useState<DeliveryVehicleId>(DEFAULT_VEHICLE_ID);
  const [activeRestaurant, setActiveRestaurant] = useState('Burger Lab');
  const [lastOrder, setLastOrder] = useState<OrderBreakdown | null>(null);
  const [revealCarbon, setRevealCarbon] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const goTo = useCallback((s: Screen) => {
    setScreen(s);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const addToCart = useCallback((id: string) => {
    setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  }, []);
  const removeFromCart = useCallback((id: string) => {
    setCart((c) => {
      const next = { ...c, [id]: (c[id] ?? 0) - 1 };
      if (next[id] <= 0) delete next[id];
      return next;
    });
  }, []);
  const clearCart = useCallback(() => setCart({}), []);

  const pushToast = useCallback((icon: string, text: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, icon, text }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 1800);
  }, []);

  const cartCount = useMemo(
    () => Object.values(cart).reduce((s, n) => s + n, 0), [cart],
  );
  const cartItemIds = useMemo(() => {
    const out: string[] = [];
    for (const [id, q] of Object.entries(cart))
      for (let i = 0; i < q; i++) out.push(id);
    return out;
  }, [cart]);

  const value: AppState = {
    screen, goTo,
    cart, cartCount, cartItemIds, addToCart, removeFromCart, clearCart,
    awarenessMode, setAwarenessMode,
    deliveryVehicleId, setDeliveryVehicle,
    activeRestaurant, setActiveRestaurant,
    lastOrder, setLastOrder,
    revealCarbon, setRevealCarbon,
    toasts, pushToast,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp(): AppState {
  const v = useContext(Ctx);
  if (!v) throw new Error('useApp must be used inside <AppProvider>');
  return v;
}

import { useApp } from '../state/AppContext';
import StatusBar from './StatusBar';
import HomeScreen from '../screens/HomeScreen';
import RestaurantScreen from '../screens/RestaurantScreen';
import CartScreen from '../screens/CartScreen';
import SuccessScreen from '../screens/SuccessScreen';
import AccountScreen from '../screens/AccountScreen';
import CarbonScreen from '../screens/CarbonScreen';
import AwarenessScreen from '../screens/AwarenessScreen';

const SCREENS = {
  home: HomeScreen,
  restaurant: RestaurantScreen,
  cart: CartScreen,
  success: SuccessScreen,
  account: AccountScreen,
  carbon: CarbonScreen,
  awareness: AwarenessScreen,
};

export default function Phone() {
  const { screen, toasts } = useApp();
  const Current = SCREENS[screen];
  return (
    <div className="phone-frame">
      <StatusBar />
      <Current />
      <div className="toast-stack">
        {toasts.map((t) => (
          <div key={t.id} className="toast">
            <span className="toast-icon">{t.icon}</span>
            <span>{t.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

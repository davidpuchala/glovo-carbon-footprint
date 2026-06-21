import { AppProvider } from './state/AppContext';
import Phone from './components/Phone';

export default function App() {
  return (
    <AppProvider>
      <div className="wallpaper">
        <Phone />
        <p className="footer-note">
          Mock-up · Glovo Carbon Footprint prototype · React port
        </p>
      </div>
    </AppProvider>
  );
}

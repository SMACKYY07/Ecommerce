import { AppProviders } from './app/AppProviders';
import { AppRouter } from './app/router';
import { ToastViewport } from './components/feedback/ToastViewport';

export default function App() {
  return (
    <AppProviders>
      <AppRouter />
      <ToastViewport />
    </AppProviders>
  );
}

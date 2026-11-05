import { registerRootComponent } from 'expo';
import App from './App';

if (typeof document !== 'undefined') {
  document.title = 'CV FEBRIAN';
}

registerRootComponent(App);

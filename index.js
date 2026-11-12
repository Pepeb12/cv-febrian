import { registerRootComponent } from 'expo';
import App from './app/index';

if (typeof document !== 'undefined') {
  document.title = 'CV FEBRIAN';
}

registerRootComponent(App);

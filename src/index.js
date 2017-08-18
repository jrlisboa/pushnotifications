import ReactDOM from 'react-dom';
import App from './components/app';
import injectTpEventPlugin from 'react-tap-event-plugin';
import registerServiceWorker from './registerServiceWorker';

injectTpEventPlugin();

ReactDOM.render(App, document.getElementById('root'));
registerServiceWorker();

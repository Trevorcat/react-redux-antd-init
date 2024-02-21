import CRouter from './routes';
import Index from './pages/index/index';
import './App.css';
import './assets/style/public.less';

function App() {
  // initialize the pages' router
  return <Index routers={<CRouter />} />;
}

export default App;
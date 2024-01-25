import { useStore } from '.';
import './App.css';
import Button from './Button';
import Some from './Some';

function App() {
  const count = useStore((store) => store.count)
  return (
    <div className="App">
      <h1>{ count }</h1>
      <Button />
      <Some />
    </div>
  );
}

export default App;

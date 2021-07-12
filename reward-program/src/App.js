
import './App.css';
import AccountList from './screens/AccountList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Reward Program
      </header>
      <div className="dynamic-content">
        <AccountList />
      </div>
    </div>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';

import routes from '~/routes';

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        {routes.map(({ path, Component }, index) => <Route path={path} element={<Component />} key={index} />)}
      </Routes>
    </div>
  );
}

export default App;

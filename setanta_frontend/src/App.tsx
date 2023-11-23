import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import MainPage from './components/MainPage';



const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" Component={LoginForm} />
        <Route path="/" Component={MainPage} />
      </Routes>
    </Router>
  );
};


export default App;

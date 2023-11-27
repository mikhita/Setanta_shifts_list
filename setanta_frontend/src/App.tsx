import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import MainPage from './components/MainPage';
import RegistrationForm from './components/RegistrationForm';



const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login/*" Component={LoginForm} />
        <Route path="/" Component={MainPage} />
        <Route path="/registration" element={<RegistrationForm />} />
      </Routes>
    </Router>
  );
};


export default App;

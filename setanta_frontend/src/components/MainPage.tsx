import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";



const MainPage = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/login");
  };
  return (
    <div>
      main page
      <Button onClick={handleSubmit}>exit</Button>
    </div>
  );
};

export default MainPage;

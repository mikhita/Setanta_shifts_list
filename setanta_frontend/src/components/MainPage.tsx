import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DataTable from "./DataTable";



const MainPage = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/login");
  };
  return (
    <div>
      <DataTable/>
      <Button onClick={handleSubmit}>exit</Button>
    </div>
  );
};

export default MainPage;

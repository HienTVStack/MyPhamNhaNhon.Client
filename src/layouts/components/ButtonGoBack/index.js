import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function GoBack() {
    const navigation = useNavigate();
    return <Button onClick={() => navigation(-1)}>GO BACK</Button>;
}

export default GoBack;

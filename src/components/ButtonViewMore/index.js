import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

function ViewMore({ title = "Xem thêm", url, ...props }) {
    return (
        <Grid container justifyContent={"center"} mt={4} mb={4}>
            <Button variant="contained" component={Link} to={url}>
                {title}
            </Button>
        </Grid>
    );
}

export default ViewMore;

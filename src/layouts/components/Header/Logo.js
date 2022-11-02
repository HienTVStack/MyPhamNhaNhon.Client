import { Box } from "@mui/material";
import images from "../../../assets/images";
import Image from "../../../components/Image";
import { Link } from "react-router-dom";

function Logo({ matches, ...props }) {
    return (
        <Box component={Link} to="/" width={matches ? "190px" : "317px"} height={matches ? "54px" : "90px"}>
            <Image src={images.logo} alt={"Tiệm mỹ phẩm tân thời (logo)"} />
        </Box>
    );
}

export default Logo;

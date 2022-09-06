import { Container, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Fragment, useState } from "react";
import NoCart from "./NoCart";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CartItem from "./CartItem";

function Cart() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const [quantityCart, setQuantityCart] = useState(0);

    const [value, setValue] = useState("recents");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container sx={{ marginTop: matches ? "180px" : "200px" }}>
            {quantityCart > 0 ? (
                <NoCart />
            ) : (
                <Fragment>
                    <CartItem />
                    <BottomNavigation
                        sx={{
                            width: 500,
                            position: "fixed",
                            bottom: 0,
                            left: 0,
                        }}
                        value={value}
                        onChange={handleChange}
                    >
                        <BottomNavigationAction
                            label="Recents"
                            value="recents"
                            icon={<RestoreIcon />}
                        />
                        <BottomNavigationAction
                            label="Favorites"
                            value="favorites"
                            icon={<FavoriteIcon />}
                        />
                        <BottomNavigationAction
                            label="Nearby"
                            value="nearby"
                            icon={<LocationOnIcon />}
                        />
                        <BottomNavigationAction
                            label="Folder"
                            value="folder"
                            icon={<FolderIcon />}
                        />
                    </BottomNavigation>
                </Fragment>
            )}
        </Container>
    );
}

export default Cart;

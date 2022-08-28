// Material UI
import {
    Stack,
    IconButton,
    Badge,
    useTheme,
    Button,
    Menu,
    MenuItem,
    Fade,
} from "@mui/material";
// Material icons
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// React router dom
import { Link } from "react-router-dom";
import { Fragment, useState } from "react";

function HeaderAction({ matches }) {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleOpenMenu = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Stack direction={"row"} alignItems={"center"}>
            <Stack>
                {matches ? (
                    <Fragment>
                        <IconButton
                            mr={2}
                            sx={{ color: theme.palette.primary.contrastText }}
                            onClick={handleOpenMenu}
                        >
                            <PersonIcon />
                            <ArrowDropDownIcon />
                        </IconButton>
                        <Menu
                            open={open}
                            anchorEl={anchorEl}
                            TransitionComponent={Fade}
                            onClose={handleClose}
                        >
                            <MenuItem>ĐĂNG NHẬP</MenuItem>
                            <MenuItem>ĐĂNG KÝ</MenuItem>
                        </Menu>
                    </Fragment>
                ) : (
                    <Button
                        mr={2}
                        component={Link}
                        to={"/login"}
                        sx={{
                            color: theme.palette.primary.contrastText,
                            fontWeight: "400",
                            "&:hover": {
                                color: theme.palette.secondary.main,
                            },
                        }}
                    >
                        ĐĂNG NHẬP
                    </Button>
                )}
            </Stack>
            <Badge badgeContent={4} color={"error"}>
                <IconButton
                    sx={{ color: theme.palette.primary.contrastText }}
                    children={<ShoppingCartIcon />}
                />
            </Badge>
        </Stack>
    );
}

export default HeaderAction;
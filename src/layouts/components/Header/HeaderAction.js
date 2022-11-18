// Material UI
import { Stack, IconButton, Badge, useTheme, Button, Menu, MenuItem, Fade } from "@mui/material";
// Material icons
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// React router dom
import { Link, useLocation } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

function HeaderAction({ matches }) {
    const user = useSelector((state) => state.data.user);
    const theme = useTheme();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        setAnchorEl(null);
    }, [location.pathname]);

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
                        <IconButton mr={2} sx={{ color: theme.palette.primary.contrastText }} onClick={handleOpenMenu}>
                            <PersonIcon />
                            <ArrowDropDownIcon />
                        </IconButton>
                        <Menu open={open} anchorEl={anchorEl} TransitionComponent={Fade} onClose={handleClose}>
                            {user ? (
                                <MenuItem component={Link} to={"/tai-khoan"}>
                                    {user.fullName}
                                </MenuItem>
                            ) : (
                                <>
                                    <MenuItem component={Link} to={"/dang-nhap"}>
                                        ĐĂNG NHẬP
                                    </MenuItem>
                                    <MenuItem component={Link} to={"/dang-ky"}>
                                        ĐĂNG KÝ
                                    </MenuItem>
                                </>
                            )}
                        </Menu>
                    </Fragment>
                ) : (
                    <Button
                        mr={2}
                        component={Link}
                        to={user ? "/tai-khoan" : "/dang-nhap"}
                        sx={{
                            color: theme.palette.primary.contrastText,
                            fontWeight: "400",
                            "&:hover": {
                                color: theme.palette.secondary.main,
                            },
                        }}
                    >
                        {!!user ? `Hi, ${user.fullName}` : "ĐĂNG NHẬP"}
                    </Button>
                )}
            </Stack>
            <Badge badgeContent={user?.carts?.length || 0} color={"error"}>
                <IconButton component={Link} to={"/gio-hang"} sx={{ color: theme.palette.primary.contrastText }} children={<ShoppingCartIcon />} />
            </Badge>
        </Stack>
    );
}

export default HeaderAction;

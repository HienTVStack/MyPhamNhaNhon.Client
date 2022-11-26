import { Avatar, Button, Grid, Paper, Stack, TextField } from "@mui/material";

function General({ avatar, fullName, email, phone, address }) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
                <Paper elevation={2} sx={{ padding: "80px 24px" }}>
                    <Stack alignItems={"center"} justifyContent={"center"} spacing={4}>
                        <Avatar src={avatar} alt="" sx={{ width: 126, height: 126 }} />
                        <Button variant="outlined">Thay đổi</Button>
                    </Stack>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={8}>
                <Paper elevation={2} sx={{ padding: 2 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField fullWidth defaultValue={fullName} placeholder="Họ và tên" name={"fullName"} id={"fullName"} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField fullWidth disabled defaultValue={email} placeholder="Email" name={"email"} id={"email"} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField fullWidth defaultValue={phone} placeholder="Số điện thoại" name={"phone"} id={"phone"} />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField fullWidth defaultValue={address} placeholder="Địa chỉ" name={"address"} id={"address"} />
                        </Grid>
                    </Grid>

                    <Grid container mt={4}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Stack alignItems={"center"}>
                                <Button variant="contained">Lưu thay đổi</Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default General;

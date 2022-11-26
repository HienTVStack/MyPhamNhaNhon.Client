import { Button, Paper, Stack, TextField } from "@mui/material";

function ChangePassword() {
    return (
        <Paper elevation={2} sx={{ padding: 2 }}>
            <Stack spacing={2}>
                <TextField
                    fullWidth
                    margin="normal"
                    name="oldPassword"
                    id={"oldPassword"}
                    placeholder={"Mật khẩu hiện tại"}
                    label={"Mật khẩu hiện tại"}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    name="newPassword"
                    id={"newPassword"}
                    helperText={"Mật khẩu ít nhất 8+ kí tự"}
                    placeholder={"Mật khẩu mới"}
                    label={"Mật khẩu mới"}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    name="confirmPassword"
                    id={"confirmPassword"}
                    placeholder={"Xác nhận mật khẩu"}
                    label={"Xác nhận mật khẩu"}
                />
                <Button variant="contained" size="large" sx={{ maxWidth: 200 }}>
                    Lưu thay đổi
                </Button>
            </Stack>
        </Paper>
    );
}

export default ChangePassword;

import { Container, Grid } from "@mui/material";
// Component
import Image from "../Image";

function Slogan() {
    return (
        <Container sx={{ mt: 1, mb: 1 }}>
            <Grid container maxWidth={"lg"}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Image
                        src={
                            "https://lh3.googleusercontent.com/ZZ_jpC_Tjolm3-OsBFdSGllB5UDY1htCfzlT66Qj2LrWNGS3DUiWS4D0kejZy57XLE69JbCIC7X9V1lENeIWProMcf8B_y6erDpOduNMOeb4HCuQ69mOHswifwPXaG0SHNvJFea4Gg=w2400"
                        }
                        alt="slogan"
                        sx={{ objectFit: "cover" }}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}

export default Slogan;

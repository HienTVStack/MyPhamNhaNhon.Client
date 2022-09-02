import { Box } from "@mui/material";

const IMGS = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png",
    "https://pbs.twimg.com/media/EfTZlEnWAAMn1lX.png",
    "https://icons.iconarchive.com/icons/designbolts/credit-card-payment/256/American-Express-icon.png",
    "https://icons-for-free.com/iconfiles/png/512/cash+checkout+discover+network+online+shopping+payment+method-1320191225548835050.png",
];

function Footer() {
    return (
        <Box
            sx={{
                backgroundColor: "#ECECEC",
                height: "70px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {IMGS.map((img, index) => (
                <img
                    src={img}
                    key={index}
                    alt={index}
                    heigh="40px"
                    width="60px"
                    style={{ padding: "8px" }}
                />
            ))}
        </Box>
    );
}

export default Footer;

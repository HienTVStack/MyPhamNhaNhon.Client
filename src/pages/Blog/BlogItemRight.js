import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

function BlogItemRight() {
  return (
    <div>
      <h4 color='#757575'>Các đề xuất gợi ý</h4>
      <Box display={"block"} padding='10px'>
        <Box
          borderRadius={"15px"}
          alignItems='center'
          color='#333'
          border={"1px solid red"}
          width='250px'
          sx={{
            margin: "8px 0",
          }}
        >
          <Typography type='tag' align='center'>
            Font-end / Mobile app
          </Typography>
        </Box>
        <Box
          borderRadius={"15px"}
          alignItems='center'
          color='#333'
          border={"1px solid red"}
          width='250px'
          sx={{
            margin: "8px 0",
          }}
        >
          <Typography type='tag' align='center'>
            Back-end / Devops
          </Typography>
        </Box>
        <Box
          borderRadius={"15px"}
          alignItems='center'
          color='#333'
          border={"1px solid red"}
          width='250px'
          sx={{
            margin: "8px 0",
          }}
        >
          <Typography type='tag' align='center'>
            UI / UX / Design
          </Typography>
        </Box>
        <Box
          borderRadius={"15px"}
          alignItems='center'
          color='#333'
          border={"1px solid red"}
          width='250px'
          sx={{
            margin: "8px 0",
          }}
        >
          <Typography type='tag' align='center'>
            Others
          </Typography>
        </Box>
      </Box>
      <Box alignItems={"center"}>
        <img
          src='https://files.fullstack.edu.vn/f8-prod/banners/26/63dc61f2a061e.png'
          height={200}
          width={"250"}
          alt=''
        />
      </Box>
    </div>
  );
}

export default BlogItemRight;

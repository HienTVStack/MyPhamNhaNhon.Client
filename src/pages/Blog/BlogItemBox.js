import React from "react";
import { Box } from "@mui/system";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { fDateTime } from "../../utils/formatTime";

function BlogItemBox(props) {
  const { blog } = props;
  return (
    <div
      style={{
        border: "1px solid gray",
        borderRadius: "20px",
        alignItems: "center",
        padding: "15px",
        marginBottom: "10px",
      }}
    >
      <Box
        display={"flex"}
        alignItems='center'
        marginBottom={"20"}
        paddingBottom={"20"}
      >
        <div
          className='left'
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
          }}
        >
          <img
            src='https://cdn-icons-png.flaticon.com/512/2202/2202112.png'
            alt=''
            width={"50"}
            height={35}
            // sx={{
            //   margin: "20px",
            // }}
          />
          <div className='text'>Ngo Quang Hung</div>
        </div>

        <div className='right' style={{ padding: "0 8px" }}>
          <TurnedInNotIcon />
          <MoreHorizIcon />
        </div>
      </Box>
      <Box>
        <div className='name1' style={{ display: "flex" }}>
          <div className='left1' style={{ flex: "1" }}>
            <h3>{blog.title}</h3>
            <div className='detail'>
              <div
                style={{ height: "65px", overflow: "hidden" }}
                variant='body2'
                dangerouslySetInnerHTML={{
                  __html: `${blog.description}`,
                }}
              ></div>
            </div>
            <div style={{ display: "flex" }}>
              {blog?.tags?.map((item) => (
                <p
                  typeof='tag'
                  style={{
                    marginRight: "25px",
                    background: "white",
                    borderRadius: "18px",
                  }}
                >
                  #{item.name}
                </p>
              ))}

              <p style={{ marginRight: "25px" }}>{fDateTime(blog.createdAt)}</p>

              {/* <p style={{ display: "list-item" }}>12 phút</p> */}
            </div>
          </div>
          <div className='right1' style={{ alignItems: "center" }}>
            <img
              src={blog.image}
              alt=''
              width={"200"}
              height={"150"}
              style={{ borderRadius: "20px", objectFit: "cover" }}
            />
          </div>
        </div>
        {/* <div className='contentright'>
          <img
            src='https://files.fullstack.edu.vn/f8-prod/blog_posts/6782/6412fd42b7052.jpg'
            alt=''
            width={"180"}
            height={"120"}
          />
        </div> */}
      </Box>
    </div>
  );
}

export default BlogItemBox;

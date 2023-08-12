import { Avatar, Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import { chatcontext } from "../../context/ChatContext";

const UserListItem = ({ user ,handleFunction}) => {


  const itemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    bgcolor: "#E8E8E8",
    cursor: "pointer",
    padding: "10px",
    borderRadius: "7px",
    my: "5px",
    "&:hover": {
      backgroundColor: "#38B2Ac",
      color: "#fff",
    },
    transition: "all 0.3s",
  };
  return (
    <>
      <Box onClick={handleFunction}  sx={itemStyle}>
        <Avatar sx={{ mr: "5px" }} alt="Remy Sharp" src={user?.pic} />
        <Box>
          <Typography component="div">{user?.name}</Typography>
          <Typography sx={{ fontWeight: "bold" }} component="span">
            Email:{" "}
          </Typography>
          <span>{user.email}</span>
        </Box>
      </Box>
    </>
  );
};

export default UserListItem;

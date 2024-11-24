import { Button, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "../contect/themProvider";

function NoChat({context}) {
  const theme = useTheme();
  const themeVal =  localStorage.getItem("theme") ||  0 ;


  return <div style={{display: 'flex', flexDirection:'column', alignItems:'center', justifyContent: 'center', height: '100%'}}>
    <Typography variant="h3" sx={{ fontFamily: "Pacifico", mb: ".6rem"}}>VartaLaap</Typography>
    <Typography sx={{textAlign:'center', width: '60%'}}>Use "VartaLaap" to chat with your friends and get real-time replies.</Typography>
    <Button onClick={() => context.setIsSidebar(p => !p)} sx={{color: theme[themeVal]?.main, display: {xs: 'block', sm: 'block', md:'none', lg: 'none'}, textDecoration: 'underline'}}>Start</Button>
  </div>;
}

export default NoChat;

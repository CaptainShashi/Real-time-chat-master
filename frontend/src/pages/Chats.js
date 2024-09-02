import React, { useState } from 'react';
import { ChatState } from '../Context/ChatProvider';
import { Box } from "@chakra-ui/react";
import SideDrawer from '../components/miscallenous/SideDrawer';
import ChatBox from '../components/miscallenous/ChatBox';
import MyChats from '../components/miscallenous/MyChats';
const Chats = () => {
  const { user } = ChatState();
  const [fetchAgain,setFetchAgain]=useState(false)
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box display="flex"
      justifyContent={"space-between"}
      width={"100%"}
      height={"94vh"}
      padding={"10px"}
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </Box>
    </div>
  );
};

export default Chats;

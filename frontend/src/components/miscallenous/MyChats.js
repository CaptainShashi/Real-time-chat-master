import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from "./ChatLoading"
import { getSender } from '../../config/ChatLogics';
import GroupChatModal from './GroupChatModal';


const MyChats = ({fetchAgain}) => {
  const[loggedUser,setLoggedUser]=useState();
const{selectedChat,setSelectedChat,user,chats,setChats}= ChatState();

const toast=useToast();
   const fetchChats= async()=>{
try{
const config={
  headers:{
    Authorization: `Bearer ${user.token}`,
  },
};
const {data}= await axios.get("/api/chat",config)

setChats(data);
}catch(error){
 toast({
        title:"ERROR OCCURED",
        description:"Failed to load CHATS",
        status:"error",
        duration:5000,
        isClosable:true,
        position:"bottom-left" 
      })
}
}
useEffect(()=>{
  setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
fetchChats();},[fetchAgain])
  return (
    
      <Box 
      display={{base:selectedChat?"none":"flex",md:"flex"}}
      flexDir={"column"}
      alignItems={"center"}
      p={3}
      bg={'orange.200'}
      w={{base:"100%",md:"30%"}}
      borderRadius={"lg"}
      borderWidth={"1.5px"}
      >
       <Box
       fontSize={{base:"26px",md:"30px"}}
       fontFamily={"Works sans"}
       display={"flex"}
       w="100%"
       justifyContent={"space-between"}
        alignItems={"center"}
        color={'black'}
     
       >MY CHATS
       <GroupChatModal><Button
           display={"flex"}
           fontSize={{base:"16px", md:"10px",lg:"16px"}}
           rightIcon={<AddIcon/>}
           >NEW GROUP CHAT</Button></GroupChatModal>
       
        </Box> 
        <Box display={"flex"} 
        flexDir={"column"}
        p={3}
        bg={'orange.100'}
        w="100%"
        h="100%"
        borderRadius={"lg"}
        overflowY={"hidden"}
        >
          {chats?(<Stack overflowY={"scroll"}>
              {chats.map((chat)=>(<Box
              onClick={()=>setSelectedChat(chat)}
              cursor={"pointer"}
              bg={selectedChat===chat?"#38B2AC":"white"}
              _hover={{backgroundColor:" #f95d9b"}}
              px={3}
              py={2}
              borderRadius={"lg"}
              key={chat._id}
              >
                  <Text>
                  {!chat.isGroupChat?getSender(loggedUser,chat.users):chat.chatName}

                  </Text>

              </Box>
              
              
              ))}



          </Stack>):( <ChatLoading/>  )}

        </Box>
      </Box>
    
  )
}

export default MyChats

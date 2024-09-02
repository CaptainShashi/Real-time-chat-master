import React, { useState } from 'react'
import { Box, Tooltip, Button, Text, Menu, MenuButton, MenuList, Avatar, MenuItem, MenuDivider, DrawerBody, Input, useToast, Spinner } from '@chakra-ui/react'
import { ChatState } from '../../Context/ChatProvider'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import ProfileModel from './ProfileModel'
import { useHistory } from 'react-router-dom'
import {
  Drawer,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/hooks'
import axios from 'axios'
import ChatLoading from './ChatLoading'
import NotificationBadge, { Effect } from 'react-notification-badge'
import UserListItem from '../UserAvatar/UserListItem'
import { getSender } from '../../config/ChatLogics'
const SideDrawer = () => {
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const history = useHistory()
  const { user,setSelectedChat,chats,setChats ,notification,setNotification} = ChatState()

  const logouthandler = () => {
    localStorage.removeItem('userInfo')
    history.push('/')
  }


  const toast=useToast();
const handleSearch=async ()=>{
if(!search){
    toast({
        title:"PLEASE ENTER SOMETHING IN SEARCH",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"top-left"
      })
      return;
}
try{
    setLoading(true);
    const config={
        headers:{
            Authorization:`Bearer ${user.token}`,
        },

    };
    const {data}= await axios.get(`/api/user?search=${search}`,config);
setLoading(false);
setSearchResults(data);
}catch(error){
     toast({
        title:"ERROR OCCURED",
        description:"Failed to load Search Results",
        status:"error",
        duration:5000,
        isClosable:true,
        position:"top-left"
      })
      return;
}



}
const accessChat= async (userId)=>{
try {
    setLoadingChat(true);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.post('/api/chat', { userId }, config);

    if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

    setSelectedChat(data);
    setLoading(false);
    onClose();
  } catch (error) {
    toast({
      title: "ERROR FETCHING THE CHAT",
      description: error.message,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom-left",
    });
  return ;} finally {
    setLoadingChat(false); // Set loadingChat to false regardless of success or error
  }

}


  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg={'white'}
        w="100%"
        p="0px 10px 0px 10px"
        borderWidth="2.5px"
      >
        <Tooltip label="Search User to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i class="fas fa-search"></i>
            <Text display={{ base: 'none', md: 'flex' }} px="2.5">
              SEARCH USER
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="W" fontWeight="600">
          REAL TIME CHAT
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}
           
            
            > < NotificationBadge 
            
            count={notification.length}
            effect={Effect.SCALE}
            />
              <BellIcon fontSize="xl" m={1} />
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map(notif=>(
                <MenuItem key={notif._id} onClick={()=>{
                  setSelectedChat(notif.chat);
                  setNotification(notification.filter((n)=>n!==notif))
                }}>
                  {notif.chat.isGroupChat?`NEW MESSAGE IN ${notif.chat.chatName}`:`NEW MESSAGE FROM ${getSender(user,notif.chat.users)}`}
                </MenuItem>
              ))}

            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic} />
            </MenuButton>
            <MenuList>
              <ProfileModel user={user}>
                <MenuItem>MY PROFILE</MenuItem>
              </ProfileModel>

              <MenuDivider />
              <MenuItem onClick={logouthandler}>LOGOUT</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement='left'onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">SEARCH USERS</DrawerHeader>
          <DrawerBody>
            <Box display={"flex"} pb={2}>
              <Input placeholder='Search by email or name'
              mr={2}
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              />  
            <Button 
            onClick={handleSearch}
            >GO
            </Button>
                </Box>
                {loading?(<ChatLoading/>):(
                
                searchResults?.map((user) =>(
                        <UserListItem
                        key={user._id}
                        user={user}
                        handleFunction={()=>accessChat(user._id)}
                        />

                ))
                
                )}
                
                {loadingChat&&<Spinner ml={"auto"} display={"flex"}/>}
                </DrawerBody>
        </DrawerContent>
        
      </Drawer>
    </>
  )
}

export default SideDrawer;

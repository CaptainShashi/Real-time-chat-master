import React, { useState } from 'react'
import axios from 'axios'
import { Box, FormControl, Input, useDisclosure, useToast } from '@chakra-ui/react'
import { IconButton,Modal,ModalBody,ModalCloseButton,ModalContent,Button,ModalFooter,ModalOverlay,ModalHeader, Image, Text } from '@chakra-ui/react'
import { ChatState } from '../../Context/ChatProvider'
import { Spinner } from '@chakra-ui/react'
import UserListItem from '../UserAvatar/UserListItem'
import UserBadgeItem from '../UserAvatar/UserBadgeItem'

const GroupChatModal = ({children}) => {
     const { isOpen, onOpen, onClose } = useDisclosure()
        const[groupChatName,setGroupChatName] =useState()
        const[selectedUsers,setSelectedUsers]=useState([])
        const[search,setSearch]=useState("")
        const[searchResult,setSearchResult]=useState([])
        const[loading,setLoading]=useState(false)

        const toast=useToast()
        const handleSearch= async (query)=>{
            setSearch(query)
            if(!query){
                return
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
setSearchResult(data);
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
        const handleSubmit= async()=>{
            if(!groupChatName||!selectedUsers){ 
              toast({
        title:"PLEASE FILL ALL DETAILS",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"top-left"
      })
      return;

            }
            try{

                 const config={
        headers:{
            Authorization:`Bearer ${user.token}`
        },
      }
         const {data}= await axios.post("/api/chat/group",{
          name:groupChatName,
          users:JSON.stringify(selectedUsers.map((u)=>u._id))

         },config);
         setChats([data,...chats])
         onClose();
          toast({
        title:"New Group Created",
        status:"success",
        duration:5000,
        isClosable:true,
        position:"top"
      })
    }



            catch(error){      toast({
        title:"PLEASE FILL ALL DETAILS",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"botttom"
      })}



        }
        const handleDelete=(delUser)=>{
          setSelectedUsers(
            selectedUsers.filter((sel)=>sel._id!==delUser._id)
          )
        }
        const handleGroup=(userToAdd)=>{

            if(selectedUsers.includes(userToAdd)){
                 toast({
        title:"USER ALREADY EXISTS",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"top"
      })
      return;

            }
setSelectedUsers([...selectedUsers,userToAdd])
        }
        const{user,chats,setChats}= ChatState()
  return (
    <>
        <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
          fontSize={"30px"}
          fontFamily={"Work sans"}
          display={"flex"}
          justifyContent={"center"}
          >CREATE GRP CHAT</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDir={"column"}
          alignItems={"center"}>
            <FormControl>

            <Input placeholder='Chat Name' mb={2.5}
            onChange={(e)=>setGroupChatName(e.target.value)}
            />

            </FormControl>
            <FormControl>

            <Input placeholder='ADD USERS' mb={1}
            onChange={(e)=>handleSearch(e.target.value)}
            />

            </FormControl>

                      <Box w={"100%"} display={"flex"} flexWrap={"wrap"}>
                          {selectedUsers.map((u)=>(
                        <UserBadgeItem
                         key={user._id}
                         user={u}
                         handleFunction={()=>handleDelete(u)}/>))}
                      </Box>

            {loading?<Spinner ml={"auto"} display={"flex"}/>:(
                searchResult?.slice(0,4).map((user)=>(
                    <UserListItem key={user._id} user={user} handleFunction={()=>handleGroup(user)}/>
                ))
            )}

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' onClick={handleSubmit}>
          create group chat
            </Button>
           
          </ModalFooter>
        </ModalContent>
      </Modal>
    
    </>
  )
}

export default GroupChatModal

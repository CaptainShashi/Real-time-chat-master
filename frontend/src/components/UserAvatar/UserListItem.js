import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Avatar, Box, Text } from '@chakra-ui/react';
import { color } from 'framer-motion';

const UserListItem = ({user,handleFunction}) => {

return ( <Box
onClick={handleFunction}
cursor={"pointer"}
bg="#E8E8E8"
_hover={{
    background:"#38B2AC",
    color:"white"
}}
w="100%"
display={"flex"}
color={"black"}
px={3}
py={.5}
mb={2}
borderRadius={"lg"}
>
<Avatar
mr={2}
size="sm"
cursor={"pointer"}
name={user.name}
src={user.pic}
/>
<Box>
<Text>{user.name}</Text>
<Text fontSize={"xs"}>{user.email}</Text>
</Box>

</Box>)
}

export default UserListItem

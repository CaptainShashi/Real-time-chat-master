import React, { useEffect } from 'react'
import {Container,Box,Text,Tab,TabList,TabPanels,TabPanel,Tabs} from '@chakra-ui/react'
import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
const Home = () => {

/*const history=useHistory();
useEffect(()=>{
  const user=JSON.parse(localStorage.getItem("userInfo"))
if(user) history.push("/chats");

},[history]);*/



  return (
    <Container maxW='xl'centerContent>
      <Box
      d='flex'
      justifyContent="center"
      padding={3}
      bg={"white"}
      w="100%"
      m="35px 0 15px 0"
      borderRadius="20px"
      borderWidth="1px"
      
      textAlign="center" >
        <Text fontSize="4xl" fontFamily={"w"} fontWeight="600">REAL TIME CHAT</Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs variant='soft-rounded' >
  <TabList mb="1em">
    <Tab width="50%">Login</Tab>
    <Tab width="50%">Sign Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      {<Login/>}
    </TabPanel>
    <TabPanel>
      {<Signup/>}
    </TabPanel>
  </TabPanels>
</Tabs>
      </Box>
    </Container>
  )
  }

export default Home

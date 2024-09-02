import React,{useState} from 'react'
import {VStack,Text,FormControl,FormLabel,Input,InputGroup,InputRightElement,Button, useToast} from "@chakra-ui/react";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import axios from 'axios'


const Login = () => {
     const [show,setShow]=useState(false);
   const[loading,setLoading]=useState();
    const[email,setEmail]=useState();
    const[password,setPassword]=useState();
    const toast=useToast();
const history=useHistory();
    const handleClick=()=>setShow(!show);
    
    const submitHandler= async()=> {
        setLoading(true);
        if(!email||!password){
             toast({
            title:"PLEASE FILL ALL THE INFORMATION!",
            status:"warning",
            duration:5000,
            isClosable:true,
            position:"bottom",

            });
            setLoading(false);
          
            return;
        }
   
   try {
 const config={
    headers:{
        "Content-type":"application/json",
    },
 };
 const{data}= await axios.post(
        "/api/user/login",
        {email,password},
        config


 );
    toast({
            title:"LOGIN SUCCESSFUL",
            status:"success",
            duration:5000,
            isClosable:true,
            position:"top",

            });
            localStorage.setItem("userInfo",JSON.stringify(data));
            setLoading(false);
            history.push("/chats");

   }catch(error){
     toast({
            title:"ERROR!",

            status:"errort",
            duration:5000,
            isClosable:true,
            position:"bottom",

            });
            setLoading(false);
   }
   
   
   
    };
  return (
    
    <VStack spacing='5px'>
     
     <FormControl id="email" isRequired>
        <FormLabel>
            EMAIL
        </FormLabel>
    <Input
    placeholder='ENTER YOUR EMAIL'
    onChange={(e)=>setEmail(e.target.value)}
    
    />
     </FormControl>
     <FormControl id="password" isRequired>
        <FormLabel>
            PASSWORD
        </FormLabel>
        <InputGroup
        ><Input
    type={show?"text":"password"}
    placeholder='ENTER YOUR PASSWORD'
    onChange={(e)=>setPassword(e.target.value)}/>
    <InputRightElement width="4rem">
        <Button h="2rem" size={"sm"} onClick={handleClick}>
            {show?"Hide":"Show"}
        </Button>
    </InputRightElement>
    
    
    
    </InputGroup>
    
     </FormControl>

     <Button 
     colorScheme='blue'
     width={"100%"}
     style={{marginTop:15}}
     onClick={submitHandler}
    isLoading={loading} >
        LOGIN
     </Button>
   <Text fontWeight={"800"} color={"red"}> Don't have an account? Sign Up </Text>
    </VStack>
  )
}

export default Login

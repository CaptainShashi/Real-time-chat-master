import React ,{ useState}from 'react'
import {VStack,FormControl,FormLabel,Input,InputGroup,InputRightElement,Button, useToast} from "@chakra-ui/react";
import axios from 'axios'
import {useHistory} from 'react-router-dom'



const Signup = () => {
    const[show,setShow]=useState(false);
    const[showw,setShoww]=useState(false);
    const[name,setName]=useState();
    const[email,setEmail]=useState();
    const[password,setPassword]=useState();
    const[confirmpassword,setConfirmpassword]=useState();
    const[pic,setPic]=useState();
    const[loading,setLoading]=useState(false);
    const toast=useToast();
    const history=useHistory();


const handleClick2=()=>setShoww(!showw);

    const handleClick=()=>setShow(!show);
    const postDetails=(pics)=>
    {setLoading(true);
        if(pics===undefined){
            toast({
            title:"PLEASE SELECT VALID IMAGE!",
            status:"warning",
            duration:5000,
            isClosable:true,
            position:"bottom",

            });
            return;
        }

        if(pics.type==="image/png"||pics.type==="image/jpg"||pics.type==="image/jpeg"){
                const data= new FormData();
                data.append("file",pics);
                data.append("upload_preset","REAL TIME CHAT");
                data.append("cloud_name","pavankalyan787");
                fetch("https://api.cloudinary.com/v1_1/pavankalyan787/image/upload",{
                    method:"post",
                    body :  data,
                })
                .then((res)=>res.json())
                .then((data)=>{
                    setPic(data.url.toString());
                   
                    setLoading(false);
                })
                .catch((err)=>{
                    console.log(err);
                    setLoading(false);
                })
        }else{
            toast({
            title:"PLEASE SELECT IMAGE!",
            status:"warning",
            duration:5000,
            isClosable:true,
            position:"bottom",

            });
            setLoading(false);
            return;
        }

 };
    const submitHandler= async ()=>
    { setLoading(true);
        if(!name||!email||!password||!confirmpassword){
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
        if(password!==confirmpassword){
            toast({
            title:"ENTER THE SAME PASSWORD!",
            status:"warning",
            duration:5000,
            isClosable:true,
            position:"bottom",

            });
            setLoading(false);
            return;
        }
try{

    const config={
        headers:{
            "Content-type":"application/json",
        },
    };
    const{ data} = await axios.post("/api/user",{name,email,password,pic},config);

    toast({
            title:"REGISTRATION SUCCESFUL",
            status:"success",
            duration:5000,
            isClosable:true,
            position:"top",

            });
            
localStorage.setItem("userInfo",JSON.stringify(data));
setLoading(false);
history.push('/chats');

} catch (error) {
    toast({
            title:"ERROR!",
            description:error.response.data.message,
            status:"error",
            duration:5000,
            isClosable:true,
            position:"bottom",

            });
            setLoading(false);
            
}
    };
  return (
    <VStack spacing='5px'>
     <FormControl id="first-name" isRequired>
        <FormLabel>
            NAME
        </FormLabel>
    <Input
    placeholder='ENTER YOUR NAME'
    onChange={(e)=>setName(e.target.value)}
    
    />
     </FormControl>
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

 <FormControl id="Confirm password" isRequired>
        <FormLabel>
            CONFIRM PASSWORD
        </FormLabel>
        <InputGroup
        ><Input
    type={showw?"text":"password"}
    placeholder='COFIRM YOUR PASSWORD'
    onChange={(e)=>setConfirmpassword(e.target.value)}/>
    <InputRightElement width="4rem">
        <Button h="2rem" size={"sm"} onClick={handleClick2}>
            {showw?"Hide":"Show"}
        </Button>
    </InputRightElement>
    
    
    
    </InputGroup>
    
     </FormControl>

 <FormControl id="pic" isRequired>
        <FormLabel>
          UPLOAD YOUR PICTURE
        </FormLabel>
    <Input
   type='file'
   p={1.5}
   accept="image/*"
    onChange={(e)=>postDetails(e.target.files[0])}
    
    />
     </FormControl>
     <Button 
     colorScheme='blue'
     width={"100%"}
     style={{marginTop:15}}
     onClick={submitHandler}
     isLoading={loading}
     >
        SIGN UP
     </Button>
     
    </VStack>
  )
}

export default Signup

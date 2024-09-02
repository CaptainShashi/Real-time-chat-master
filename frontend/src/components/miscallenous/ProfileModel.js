import React from 'react'
import { IconButton, useDisclosure,Modal,ModalBody,ModalCloseButton,ModalContent,Button,ModalFooter,ModalOverlay,ModalHeader, Image, Text } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'

const ProfileModel = ({user,children}) => {

const { isOpen, onOpen, onClose } = useDisclosure()


    
  return ( <>
  {children?(<span onClick={onOpen}>{children}</span>
  ):(<IconButton display={{base:"flex"}} icon={<ViewIcon/>} onClick={onOpen}/>)}
  
  
      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent backgroundColor={"grey"}>
          <ModalHeader
          fontSize={"30px"}
          fontFamily={"Work sans"}
          display={"flex"}
          justifyContent={"center"}
          color={"lightgrey"}
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
           display={"flex"}
           flexDirection={"column"}
           alignItems={"center"}
           justifyContent={"space-between"}>
            <Image
            borderRadius={"full"}
            boxSize={"300px"}
            src={user.pic}
            alt={user.name}
            />
            <Text color={"white"}>{user.email}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
     
          </ModalFooter>
        </ModalContent>
      </Modal>
  
   </>)
}

export default ProfileModel

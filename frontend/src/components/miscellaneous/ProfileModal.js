import { ViewIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          d={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
          bg="gray.100"
          color="gray.600"
          borderRadius="full"
          _hover={{ bg: "gray.200" }}
          _focus={{ outline: "none" }}
        />
      )}
      <Modal size={"lg"} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="lg">
          <ModalHeader
            fontSize="2xl"
            fontFamily="gilroy"
            fontWeight="bold"
            textAlign="center"
            pt={6}
            pb={4}
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6} textAlign="center">
            <Image
              borderRadius="full"
              boxSize="150px"
              src={"https://avatar.iran.liara.run/public"}
              alt={user.name}
              margin="auto"
            />
            <Text mt={4} fontSize="xl" fontFamily="gilroy">
              Email: {user.email}
            </Text>
          </ModalBody>
          <ModalFooter justifyContent="center" pb={6}>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onClose}
              _hover={{ bg: "blue.500" }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;

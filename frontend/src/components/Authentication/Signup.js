import React, { useState } from "react";
import {
  VStack,
  FormControl,
  Input,
  FormLabel,
  InputGroup,
  InputRightElement,
  Button,
  IconButton,
  Heading,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();
  const { colorMode } = useColorMode();

  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation checks
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please fill in all fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
        },
        config
      );

      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="8" p="8" maxW="400px" mx="auto">
      <Heading
        as="h1"
        size="xl"
        textAlign="center"
        color={colorMode === "dark" ? "white" : "black"}
        fontFamily={"gilroy"}
      >
        Create an Account
      </Heading>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <VStack spacing="4">
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              bg={colorMode === "dark" ? "gray.800" : "white"}
              color={colorMode === "dark" ? "white" : "black"}
              _placeholder={{
                color: colorMode === "dark" ? "gray.400" : "gray.600",
              }}
              borderColor={colorMode === "dark" ? "gray.600" : "gray.300"}
              _focus={{
                borderColor: colorMode === "dark" ? "blue.500" : "blue.400",
              }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg={colorMode === "dark" ? "gray.800" : "white"}
              color={colorMode === "dark" ? "white" : "black"}
              _placeholder={{
                color: colorMode === "dark" ? "gray.400" : "gray.600",
              }}
              borderColor={colorMode === "dark" ? "gray.600" : "gray.300"}
              _focus={{
                borderColor: colorMode === "dark" ? "blue.500" : "blue.400",
              }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                bg={colorMode === "dark" ? "gray.800" : "white"}
                color={colorMode === "dark" ? "white" : "black"}
                _placeholder={{
                  color: colorMode === "dark" ? "gray.400" : "gray.600",
                }}
                borderColor={colorMode === "dark" ? "gray.600" : "gray.300"}
                _focus={{
                  borderColor: colorMode === "dark" ? "blue.500" : "blue.400",
                }}
              />
              <InputRightElement>
                <IconButton
                  variant="ghost"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  icon={
                    showPassword ? (
                      <i className="fas fa-eye-slash"></i>
                    ) : (
                      <i className="fas fa-eye"></i>
                    )
                  }
                  onClick={handleShowPassword}
                  color={colorMode === "dark" ? "white" : "gray.500"}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                bg={colorMode === "dark" ? "gray.800" : "white"}
                color={colorMode === "dark" ? "white" : "black"}
                _placeholder={{
                  color: colorMode === "dark" ? "gray.400" : "gray.600",
                }}
                borderColor={colorMode === "dark" ? "gray.600" : "gray.300"}
                _focus={{
                  borderColor: colorMode === "dark" ? "blue.500" : "blue.400",
                }}
              />
              <InputRightElement>
                <IconButton
                  variant="ghost"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  icon={
                    showPassword ? (
                      <i className="fas fa-eye-slash"></i>
                    ) : (
                      <i className="fas fa-eye"></i>
                    )
                  }
                  onClick={handleShowPassword}
                  color={colorMode === "dark" ? "white" : "gray.500"}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={loading}
            loadingText="Signing up..."
            width="100%"
            _hover={{ bg: colorMode === "dark" ? "blue.600" : "blue.500" }}
          >
            Sign Up
          </Button>
        </VStack>
      </form>
    </VStack>
  );
};

export default Signup;

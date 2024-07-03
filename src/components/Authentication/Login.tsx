import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  ChakraProvider,
  VStack,
  Grid,
  theme,
  Flex,
  Heading,
  IconButton,
  InputGroup,
  InputRightElement,
  AbsoluteCenter,
  Divider,
  HStack,
  Text,
} from "@chakra-ui/react";
import { AuthContext, AuthContextType } from "./AuthContext";
import NavBar from "../Authentication/NavBar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Icon } from "@chakra-ui/react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { RiFlag2Line } from "react-icons/ri"; // Import icon for country flag
import FormContainer from "./formContainer";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { _mainColor, _secTxtColor } from "../Main/Colors";

const schema = z.object({
  username: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password is not Valid" }).max(50),
});

type signUpData = z.infer<typeof schema>;

const Login = () => {
  const authContext = useContext<AuthContextType | undefined>(AuthContext);
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  if (!authContext) {
    return null;
  }

  const { login, isAdmin } = authContext;

  const inputBorder = {
    border: "1px solid",
    color: "black", // Ensure text color is black
    height: "50px",
    _placeholder: { color: "gray.400" }, // Placeholder color
    _focus: {
      borderColor: "blue.400", // Change border color on focus
      zIndex: 1,
    },
  };
  const labelStyle = {
    position: "absolute",
    top: "-13px",
    left: "10px",
    background: "white",
    paddingLeft: "5px",
    paddingRight: "5px",
    zIndex: 2,
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<signUpData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: signUpData) {
    try {
      await login(data.username, data.password);
      const isAdmin = localStorage.getItem("isAdmin") === "true";

      navigate(isAdmin ? "/dashboard" : "/");
    } catch (err) {
      console.error("Login error:", err);
    }
  }

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <FormContainer>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex
                direction="column"
                gap="1rem"
                maxWidth="400px"
                alignSelf={"center"}
              >
                <Box mb="1rem">
                  <NavBar />
                </Box>
                <Box textAlign="left">
                  <Heading fontSize="22px" mb="20px">
                    Welocme Back
                  </Heading>
                </Box>
                <FormControl mb="24px">
                  <FormLabel sx={labelStyle}>Email or Phone Number</FormLabel>
                  <Input
                    {...register("username")}
                    type="text"
                    id="username"
                    sx={inputBorder}
                  />
                </FormControl>
                <FormControl mb="24px">
                  <FormLabel sx={labelStyle}>Password</FormLabel>
                  <InputGroup size="md">
                    <Input
                      {...register("password")}
                      id="password"
                      type={show ? "text" : "password"}
                      sx={inputBorder}
                    />
                    <InputRightElement width="4.5rem" height="100%">
                      <IconButton
                        icon={show ? <FiEyeOff /> : <FiEye />}
                        aria-label={show ? "Hide" : "Show"}
                        onClick={handleClick}
                        variant="ghost"
                      />
                    </InputRightElement>
                  </InputGroup>
                  {errors.password && (
                    <Text color="red.500" fontSize={16} align={"left"}>
                      {errors.password.message}
                    </Text>
                  )}
                </FormControl>
                <Text fontSize="sm" textAlign="left" mt="-20px">
                  <RouterLink
                    to="/ForgetPassword"
                    style={{
                      fontWeight: "semibold",
                      textAlign: "left",
                      textDecoration: "underline",
                      paddingLeft: "10px",
                    }}
                  >
                    Forget Password?
                  </RouterLink>
                </Text>
                <Button
                  type="submit"
                  color={_secTxtColor}
                  bg={_mainColor}
                  size="lg"
                  fontSize="md"
                >
                  Login
                </Button>
                <Box position="relative" padding="0.5rem">
                  <Divider color="grey" border="1px" />
                  <AbsoluteCenter bg="white" px="4" fontSize={"16px"}>
                    Or
                  </AbsoluteCenter>
                </Box>
                <Box>
                  <HStack justify="center" gap="1rem">
                    <Icon as={FaFacebook} boxSize="30px" color="blue.500" />
                    <Icon as={FaApple} boxSize="30px" color="" />
                    <Icon as={FcGoogle} boxSize="30px" color="blue.500" />
                  </HStack>
                </Box>
                <Box>
                  <HStack justify="center" gap="">
                    <Text paddingRight="5px" fontSize={"16px"}>
                      Already a Member?
                    </Text>
                    <RouterLink
                      to="/SignIn"
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        textAlign: "left",
                        borderColor: "currentColor",
                      }}
                    >
                      Sign In
                    </RouterLink>
                  </HStack>
                </Box>
              </Flex>
            </form>
          </FormContainer>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};

export default Login;

import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Flex,
  useToast,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiEyeOff, FiEye } from "react-icons/fi";
import apiClient from "../../services/api-client";
import { useNavigate } from "react-router-dom";
import { RiFlag2Line } from "react-icons/ri";
import { _mainColor, _secTxtColor } from "../Main/Colors";

const schema = z.object({
  name: z.string(),
  email: z.string().email({ message: "Invalid email address" }),
  mobile: z.string().min(10),
  password: z
    .string()
    .min(6, { message: "Enter Min password 6 characters at least" })
    .max(50),
});

type signUpData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  refreshUsers: () => void;
}

const AddUserModal: React.FC<Props> = ({ isOpen, onClose, refreshUsers }) => {
  const navigate = useNavigate();
  const toast = useToast();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<signUpData>({ resolver: zodResolver(schema) });
  const countries = [
    { name: "United States", code: "US", flag: FiEye },
    { name: "United Kingdom", code: "GB", flag: RiFlag2Line },
    { name: "Canada", code: "CA", flag: RiFlag2Line },
  ];
  const handleShowPassword = () => setShowPassword(!showPassword);

  const handleAddUser = async (data: signUpData) => {
    try {
      const res = await apiClient.post("signUp/", { ...data, language: "E" });
      const token = res.data.token;

      localStorage.setItem("authToken", token);
      console.log(res.data.status);
      refreshUsers();
      toast({
        description: "User has been successfully added.",
        position: "top",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (err: any) {
      console.log(err.response?.data?.status || "Unknown error occurred");
      toast({
        title: "Error",
        position: "top",
        description:
          err.response?.data?.status || "An error occurred while adding user.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(handleAddUser)}>
            <FormControl mb="24px">
              <FormLabel>Name</FormLabel>
              <Input {...register("name")} type="text" h={12} />
            </FormControl>
            <FormControl mb="24px">
              <FormLabel>Email</FormLabel>
              <Input {...register("email")} type="email" h={12} />
            </FormControl>
            <FormControl mb="24px" display="flex">
              <InputGroup>
                <Select
                  placeholder="Select Country"
                  height="50px"
                  width="40%"
                  mr="0.4rem"
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      <Flex alignItems="center">
                        <Icon size="2rem" as={FiEyeOff} mr="0.5rem" />{" "}
                        {country.name}
                      </Flex>
                    </option>
                  ))}
                </Select>
                <Input
                  {...register("mobile")}
                  id="mobile"
                  type="number"
                  placeholder="Phone Number"
                  width="70vw"
                  h={12}
                ></Input>
              </InputGroup>
            </FormControl>
            <FormControl mb="24px">
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  h={12}
                />
                <InputRightElement width="4.5rem">
                  <Icon
                    as={showPassword ? FiEye : FiEyeOff}
                    onClick={handleShowPassword}
                    cursor="pointer"
                    color="gray.500"
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Flex justifyContent="center">
              <Button
                type="submit"
                bg={_mainColor}
                color={_secTxtColor}
                _hover={{ color: _mainColor, bg: "gray.100" }}
              >
                Add User
              </Button>
            </Flex>
          </form>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddUserModal;

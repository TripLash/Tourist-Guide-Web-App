import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Center,
  Button,
  Flex,
  Select,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import { Server_Url } from "../Main/root";
import { FaEllipsisV, FaPlus } from "react-icons/fa";
import { User } from "./Types/User";
import axios from "axios";
import { AuthContext } from "../Authentication/AuthContext";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BsArrowRightCircleFill } from "react-icons/bs";

import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { _mainColor, _mainTxtColor, _secTxtColor } from "../Main/Colors";
import AddUserModal from "./AddUserModal";
import { CiMenuKebab } from "react-icons/ci";

const AllUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage] = useState<number>(8);
  const [filterTypes, setFilterTypes] = useState<string>("All");
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!authContext || !authContext.token) {
        console.error("Auth context or token is not available");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`${Server_Url}/api/get-all-users`, {
          headers: { Authorization: `Bearer ${authContext.token}` },
        });
        console.log(response.data.status);
        setUsers(response.data.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [authContext]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const toast = useToast();

  const filteredUsers =
    filterTypes === "All"
      ? users
      : users.filter((user) => user.user_types.includes(filterTypes));

  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const deleteUser = async (userId: string) => {
    if (!authContext || !authContext.token) {
      console.error("Auth context or token is not available");
      return;
    }
    try {
      await axios.delete(`${Server_Url}/api/delete-user/${userId}`, {
        headers: { Authorization: `Bearer ${authContext.token}` },
      });
      setUsers(users.filter((user) => user._id !== userId));
      toast({
        description: " user has been successfully deleted.",
        position: "top",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      console.log(`User with ${userId}  deleted successfully`);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const showUser = (userId: string) => {
    navigate(`/user/${userId}`);
  };

  const promoteToAdmin = async (userId: string) => {
    if (!authContext || !authContext.token) {
      setLoading(false);
      return;
    }
    try {
      await axios.patch(
        `${Server_Url}/api/add-admin/${userId}`,
        {},
        {
          headers: { Authorization: `Bearer ${authContext.token}` },
        }
      );
      toast({
        description: " user has been successfully promoted to admin.",
        position: "top",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      refreshUsers();
    } catch (error) {
      console.error("failed promote to admin");
    }
  };

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }
  const refreshUsers = async () => {
    if (!authContext || !authContext.token) return;
    try {
      const response = await axios.get(`${Server_Url}/api/get-all-users`, {
        headers: { Authorization: `Bearer ${authContext.token}` },
      });
      setUsers(response.data.data.users);
      console.log("Users refreshed");
    } catch (error) {
      console.error("Error refreshing users:", error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Box>
        <Box
          display={"flex"}
          mb={4}
          alignItems={{ base: "stretch", md: "center" }}
        >
          <InputGroup flex="1" mr={{ base: 0, md: 3 }}>
            <InputLeftElement
              pointerEvents="none"
              children={<BsSearch color="gray.200" />}
              mt={1}
            />
            <Input
              borderRadius={8}
              width={"50%"}
              py={5}
              placeholder="Search by ID or name"
            />
          </InputGroup>
          <Button
            leftIcon={<FaPlus size={"12px"} />}
            bgColor={_mainColor}
            color={_secTxtColor}
            _hover={{ bg: "gray.100", color: _mainColor }}
            onClick={() => setIsModalOpen(true)}
          >
            Add
          </Button>
        </Box>

        <Box
          overflowX="auto"
          maxH="calc(95vh - 150px)"
          border="1px solid #EEF5FF"
          borderRadius="xl"
          boxShadow="sm"
        >
          <Table variant="simple" size="sm">
            <Thead bg="gray.50">
              <Tr>
                <Th
                  position="sticky"
                  top={0}
                  zIndex={2}
                  color={"rgb(102, 112, 133)"}
                  fontSize={"13px"}
                ></Th>
                <Th
                  position="sticky"
                  top={0}
                  zIndex={2}
                  color={"rgb(102, 112, 133)"}
                  fontSize={"13px"}
                >
                  # Users
                </Th>
                <Th
                  position="sticky"
                  top={0}
                  zIndex={2}
                  color={"rgb(102, 112, 133)"}
                  fontSize={"13px"}
                >
                  Name
                </Th>
                <Th
                  position="sticky"
                  top={0}
                  zIndex={2}
                  color={"rgb(102, 112, 133)"}
                  fontSize={"13px"}
                >
                  Email
                </Th>
                <Th
                  position="sticky"
                  top={0}
                  zIndex={2}
                  color={"rgb(102, 112, 133)"}
                  fontSize={"13px"}
                >
                  Mobile
                </Th>
                <Th position="sticky" top={0} zIndex={2}>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                      variant="ghost"
                      color={"rgb(102, 112, 133)"}
                      fontSize={"13px"}
                      fontWeight={"32px"}
                    >
                      User Types
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => setFilterTypes("All")}>
                        All
                      </MenuItem>
                      <MenuItem onClick={() => setFilterTypes("guide")}>
                        Guide
                      </MenuItem>
                      <MenuItem onClick={() => setFilterTypes("admin")}>
                        Admin
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Th>
                <Th
                  position="sticky"
                  top={0}
                  zIndex={2}
                  color={"rgb(102, 112, 133)"}
                  fontSize={"13px"}
                >
                  Language
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentUsers.map((user, index) => (
                <Tr
                  key={user._id}
                  sx={{
                    "& > td": { paddingY: "15px" },
                    bg: "white",
                  }}
                  margin={"20px"}
                  // onClick={() => showUser(user._id)}
                  _hover={{ bg: "gray.100", cursor: "pointer" }}
                >
                  <Td>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        icon={<CiMenuKebab />}
                        variant="outline"
                        border={"none"}
                      />
                      <MenuList minWidth="120px">
                        <MenuItem onClick={() => showUser(user._id)}>
                          Show
                        </MenuItem>
                        <MenuItem onClick={() => deleteUser(user._id)}>
                          Delete
                        </MenuItem>
                        <MenuItem onClick={() => promoteToAdmin(user._id)}>
                          Promote as Admin
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                  <Td>{indexOfFirstUser + index + 1}</Td>
                  <Td>{`${user.firstname} ${user.lastname}`}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.mobile}</Td>
                  <Td>
                    {/* {user.user_types.join(", ")} */}
                    <Flex>
                      {user.user_types.map((type, index) => (
                        <Badge
                          key={index}
                          p={2}
                          colorScheme={
                            type === "admin"
                              ? "red"
                              : type === "client"
                              ? "blue"
                              : type === "guide"
                              ? "green"
                              : "gray"
                          }
                          mr={index !== user.user_types.length - 1 ? 2 : 0}
                        >
                          {type}
                        </Badge>
                      ))}
                    </Flex>
                  </Td>
                  <Td>{user.language}</Td>
                  {/* <Td>{new Date(user.createdAt).toLocaleDateString()}</Td>
                <Td>{new Date(user.updatedAt).toLocaleDateString()}</Td> */}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        <Flex mt={4} justifyContent="space-between" alignItems="center">
          <Button
            onClick={() => paginate(currentPage - 1)}
            isDisabled={currentPage === 1}
          >
            <BsFillArrowLeftCircleFill color={_mainColor} />
          </Button>
          <Select
            value={currentPage}
            onChange={(e) => paginate(Number(e.target.value))}
            width="auto"
            variant="filled"
          >
            {Array.from(
              { length: Math.ceil(users.length / usersPerPage) },
              (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              )
            )}
          </Select>
          <Button
            onClick={() => paginate(currentPage + 1)}
            isDisabled={
              currentPage === Math.ceil(filteredUsers.length / usersPerPage)
            }
          >
            <BsArrowRightCircleFill color={_mainColor} />
          </Button>
        </Flex>
      </Box>
      <AddUserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        refreshUsers={refreshUsers}
      />
    </>
  );
};

export default AllUsers;

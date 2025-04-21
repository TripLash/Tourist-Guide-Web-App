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
  Text,
} from "@chakra-ui/react";
import { Server_Url } from "../Main/root";
import { FaEllipsisV } from "react-icons/fa";
import { User } from "./Types/User";
import axios from "axios";
import { AuthContext } from "../Authentication/AuthContext";

const AllAdmins = () => {
  const [uadmins, setAdmins] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [adminsPerPage] = useState<number>(7);
  const [filterTypes, setFilterTypes] = useState<string>("All");
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchAdmins = async () => {
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
        setAdmins(response.data.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, [authContext]);

  const indexOfLastUser = currentPage * adminsPerPage;
  const indexOfFirstUser = indexOfLastUser - adminsPerPage;

  const filteredUsers =
    filterTypes === "All"
      ? uadmins
      : uadmins.filter((admin) => admin.user_types.includes(filterTypes));

  const currentAdmins = filteredUsers
    .filter((admin) => admin.user_types.includes("admin"))
    .slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const deleteAdmin = async (adminId: string) => {
    if (!authContext || !authContext.token) {
      console.error("Auth context or token is not available");
      return;
    }
    try {
      await axios.delete(`${Server_Url}/api/delete-user/${adminId}`, {
        headers: { Authorization: `Bearer ${authContext.token}` },
      });
      setAdmins(uadmins.filter((admin) => admin._id !== adminId));
      console.log(`Admin with ${adminId}  deleted successfully`);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const showAdmin = (adminId: string) => {};

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box>
      <Box overflowX="auto" maxH="calc(95vh - 150px)">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th position="sticky" top={0} zIndex={2} bg={"white"}></Th>
              <Th position="sticky" top={0} zIndex={2} bg={"white"}>
                # Users
              </Th>

              <Th position="sticky" top={0} zIndex={2} bg={"white"}>
                Name
              </Th>
              <Th position="sticky" top={0} zIndex={2} bg={"white"}>
                Email
              </Th>
              <Th position="sticky" top={0} zIndex={2} bg={"white"}>
                Mobile
              </Th>
              <Th position="sticky" top={0} zIndex={2} bg={"white"}>
                Language
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentAdmins.map((admin, index) => (
              <Tr
                key={admin._id}
                sx={{
                  "& > td": { paddingY: "15px" },
                  // border: "1px solid #E2E8F0",
                  bg: "white",
                }}
                margin={"20px"}
              >
                <Td>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      icon={<FaEllipsisV />}
                      variant="outline"
                    />
                    <MenuList minWidth="120px">
                      <MenuItem onClick={() => showAdmin(admin._id)}>
                        Show
                      </MenuItem>
                      <MenuItem onClick={() => deleteAdmin(admin._id)}>
                        Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
                <Td>{indexOfFirstUser + index + 1}</Td>

                {/* <Td>{user._id}</Td> */}
                <Td>{`${admin.firstname} ${admin.lastname}`}</Td>
                <Td>{admin.email}</Td>
                <Td>{admin.mobile}</Td>
                <Td>{admin.language}</Td>
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
          Previous
        </Button>
        <Select
          value={currentPage}
          onChange={(e) => paginate(Number(e.target.value))}
          width="auto"
          variant="filled"
        >
          {Array.from(
            { length: Math.ceil(uadmins.length / adminsPerPage) },
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
            currentPage === Math.ceil(filteredUsers.length / adminsPerPage)
          }
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default AllAdmins;

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
  Image,
} from "@chakra-ui/react";
import { Server_Url } from "../Main/root";
import { AuthContext } from "../Authentication/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User } from "./Types/User";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { _mainColor } from "../Main/Colors";

type List = {
  _id: string;
  name: string;
  tours: { photos: string[] }[];
  user: User;
};

const AllFavouriteLists: React.FC = () => {
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage] = useState<number>(8);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLists = async () => {
      if (!authContext || !authContext.token) return;
      try {
        const response = await axios.get(`${Server_Url}/api/get-all-lists`, {
          headers: { Authorization: `Bearer ${authContext.token}` },
        });

        if (response.data && Array.isArray(response.data.data.lists)) {
          setLists(response.data.data.lists);
          console.log(response.data.data.lists);
        } else {
          console.error("Unexpected API response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching lists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLists();
  }, [authContext]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentLists = lists.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const showList = (listId: string) => {
    navigate(`/list/${listId}`);
  };

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
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th position="sticky" top={0} zIndex={2} bg={"white"}>
                # Lists
              </Th>
              <Th position="sticky" top={0} zIndex={2} bg={"white"}>
                Name
              </Th>
              <Th position="sticky" top={0} zIndex={2} bg={"white"}>
                # Tours
              </Th>
              <Th position="sticky" top={0} zIndex={2} bg={"white"}>
                User
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentLists.map((list, index) => (
              <Tr
                key={list._id}
                sx={{
                  "& > td": { paddingY: "15px" },
                  bg: "white",
                }}
                onClick={() => showList(list._id)} // Added click handler
                _hover={{ bg: "gray.100", cursor: "pointer" }}
              >
                <Td>{indexOfFirstUser + index + 1}</Td>
                <Td>
                  <Flex alignItems="center">
                    {" "}
                    <Box
                      position="relative"
                      display="inline-block"
                      boxSize="50px"
                      bg={!list.tours.length ? "gray.200" : "transparent"}
                    >
                      {list.tours.length > 0 &&
                        list.tours[0]?.photos?.length > 0 && (
                          <Image
                            src={list.tours[0].photos[0]}
                            borderRadius="sm"
                            objectFit="cover"
                          />
                        )}
                    </Box>
                    <Box ml={3}> {`${list.name} `}</Box>
                  </Flex>
                </Td>
                <Td>{list.tours.length}</Td>
                <Td>{list.user ? list.user.firstname : "Unknown User"}</Td>
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
            { length: Math.ceil(lists.length / usersPerPage) },
            (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            )
          )}
        </Select>
        <Button
          onClick={() => paginate(currentPage + 1)}
          isDisabled={currentPage === Math.ceil(lists.length / usersPerPage)}
        >
          <BsArrowRightCircleFill color={_mainColor} />
        </Button>
      </Flex>
    </Box>
  );
};

export default AllFavouriteLists;

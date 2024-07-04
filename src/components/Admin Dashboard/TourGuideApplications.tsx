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
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { Server_Url } from "../Main/root";
import { User } from "./Types/User";
import axios from "axios";
import { AuthContext } from "../Authentication/AuthContext";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  BsFillArrowLeftCircleFill,
  BsArrowRightCircleFill,
  BsSearch,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { _mainColor } from "../Main/Colors";
import { Tour } from "../Tours/Types/Tour";
import { Guide } from "./Types/Guide";
import { FaChildReaching } from "react-icons/fa6";
import { IoMdMan } from "react-icons/io";
import { PiBabyBold } from "react-icons/pi";
import { guideApplication } from "./Types/GuideApplication";

type StatusType = "pending" | "active" | "upcomming" | "upcoming" | "previous";

const TourGuideApplications: React.FC = () => {
  const [applications, setApplications] = useState<guideApplication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage] = useState<number>(7);
  const [filterTypes, setFilterTypes] = useState<string>("All");
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();
  const statusColors: Record<StatusType, string> = {
    pending: "yellow",
    active: "green",
    upcomming: "blue",
    upcoming: "blue",
    previous: "gray",
  };

  const adultPriceColor = useColorModeValue("blue.500", "blue.200");
  const childPriceColor = useColorModeValue("orange.500", "orange.200");
  const infantPriceColor = useColorModeValue("pink.500", "pink.200");

  useEffect(() => {
    if (!authContext || !authContext.token) {
      console.error("Auth context or token is not available");
      setLoading(false);
      return;
    }

    const allGuideApplications = async () => {
      try {
        const response = await axios.get(
          `${Server_Url}/api/get-all-guides-applications`,
          { headers: { Authorization: `Bearer ${authContext.token}` } }
        );
        setApplications(response.data.guidesApp);
      } catch (error) {
        console.error("error", error);
        toast({
          title: "Error fetching applications.",
          description: "Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    allGuideApplications();
  }, [authContext, toast]);

  const filteredApplications = applications.filter((app) =>
    filterTypes === "All" ? true : app.status === filterTypes
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentApplications = filteredApplications.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <Box>
        <Box
          display="flex"
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
                >
                  # Applications
                </Th>
                <Th
                  position="sticky"
                  top={0}
                  zIndex={2}
                  color={"rgb(102, 112, 133)"}
                  fontSize={"13px"}
                >
                  Tour
                </Th>
                <Th
                  position="sticky"
                  top={0}
                  zIndex={2}
                  color={"rgb(102, 112, 133)"}
                  fontSize={"13px"}
                >
                  User
                </Th>
                <Th
                  position="sticky"
                  top={0}
                  zIndex={2}
                  color={"rgb(102, 112, 133)"}
                  fontSize={"13px"}
                >
                  Guide
                </Th>
                <Th
                  position="sticky"
                  top={0}
                  zIndex={2}
                  color={"rgb(102, 112, 133)"}
                  fontSize={"13px"}
                >
                  #Members
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
                      Status{" "}
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => setFilterTypes("All")}>
                        All
                      </MenuItem>
                      <MenuItem onClick={() => setFilterTypes("active")}>
                        Active
                      </MenuItem>
                      <MenuItem onClick={() => setFilterTypes("upcomming")}>
                        Upcomming
                      </MenuItem>
                      <MenuItem onClick={() => setFilterTypes("pending")}>
                        Pending
                      </MenuItem>
                      <MenuItem onClick={() => setFilterTypes("previous")}>
                        Previous
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
                  Price
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {loading ? (
                <Tr>
                  <Td colSpan={7}>
                    <Center>
                      <Spinner size="lg" />
                    </Center>
                  </Td>
                </Tr>
              ) : (
                currentApplications.map((app, index) => (
                  <Tr
                    key={app._id}
                    sx={{ "& > td": { paddingY: "15px" }, bg: "white" }}
                    onClick={() => navigate(`/guide-application/${app._id}`)}
                    _hover={{ bg: "gray.100", cursor: "pointer" }}
                  >
                    <Td>{indexOfFirstUser + index + 1}</Td>
                    <Td>{`${app.tour?.title}`}</Td>
                    <Td>{`${app.user?.firstname} ${app.user?.lastname}`}</Td>
                    <Td>{`${app.tour_guide}`}</Td>
                    <Td>{app.participants}</Td>
                    <Td>
                      <Badge
                        p={2}
                        colorScheme={statusColors[app.status as StatusType]}
                      >
                        {app.status}
                      </Badge>
                    </Td>
                    <Td>
                      <Text
                        color={adultPriceColor}
                        fontWeight="bold"
                        fontSize="md"
                      >
                        <Flex>
                          <IoMdMan /> {app.adult_price}
                        </Flex>
                      </Text>
                      <Text
                        color={childPriceColor}
                        fontWeight="bold"
                        fontSize="md"
                      >
                        <Flex>
                          <FaChildReaching />
                          {app.child_price}
                        </Flex>
                      </Text>
                      <Text
                        color={infantPriceColor}
                        fontWeight="bold"
                        fontSize="md"
                      >
                        <Flex>
                          <PiBabyBold />
                          {app.infant_price}
                        </Flex>
                      </Text>
                    </Td>
                  </Tr>
                ))
              )}
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
              { length: Math.ceil(filteredApplications.length / usersPerPage) },
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
              currentPage ===
              Math.ceil(filteredApplications.length / usersPerPage)
            }
          >
            <BsArrowRightCircleFill color={_mainColor} />
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default TourGuideApplications;

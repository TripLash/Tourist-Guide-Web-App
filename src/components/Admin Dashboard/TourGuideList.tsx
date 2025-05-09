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
  Tag,
  Icon,
} from "@chakra-ui/react";
import { Server_Url } from "../Main/root";
import { FaEllipsisV } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../Authentication/AuthContext";
import { ChevronDownIcon, StarIcon } from "@chakra-ui/icons";
import { Guide, Language, User } from "./Types/Guide";
import ReactCountryFlag from "react-country-flag";

const TourGuideList = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [guidesPerPage] = useState<number>(7);
  // const [filterTypes, setFilterTypes] = useState<string>("All");
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchGuides = async () => {
      if (!authContext || !authContext.token) {
        console.error("Auth context or token is not available");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`${Server_Url}/api/get-all-guides`, {
          headers: { Authorization: `Bearer ${authContext.token}` },
        });
        const guideData = response.data.data;
        if (Array.isArray(guideData)) {
          const tourGuideDataFormatted = guideData.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (guide: any) => ({
              firstname: guide.user
                ? guide.user.firstname || "Unknown"
                : "Unknown",
              lastname: guide.user ? guide.user.lastname || "" : "",
            })
          );
          console.log(response.data.data);
        } else {
          ("");
        }
        console.log(response.data.status);

        setGuides(response.data.data);
      } catch (error) {
        console.error("Error fetching guides:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, [authContext]);

  const indexOfLastGuide = currentPage * guidesPerPage;
  const indexOfFirstGuide = indexOfLastGuide - guidesPerPage;

  const currentGuides = guides.slice(indexOfFirstGuide, indexOfLastGuide);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const deleteGuide = async (guideId: string) => {
    if (!authContext || !authContext.token) {
      console.error("Auth context or token is not available");
      return;
    }
    try {
      await axios.delete(`${Server_Url}/api/delete-guide/${guideId}`, {
        headers: { Authorization: `Bearer ${authContext.token}` },
      });
      setGuides(guides.filter((guide) => guide._id !== guideId));
      console.log(`Guide with ${guideId}  deleted successfully`);
    } catch (error) {
      console.error("Error deleting guide:", error);
    }
  };

  const showGuide = (userId: string) => {};

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
                # Guides
              </Th>
              <Th position="sticky" top={0} zIndex={2} bg={"white"}>
                Name
              </Th>
              <Th position="sticky" top={0} zIndex={2} bg={"white"}>
                Language
              </Th>
              <Th position="sticky" top={0} zIndex={2} bg={"white"}>
                Address
              </Th>

              <Th position="sticky" top={0} zIndex={2} bg={"white"}>
                Guide In
              </Th>

              <Th position="sticky" top={0} zIndex={2} bg={"white"}>
                Price
              </Th>
              <Th position="sticky" top={0} zIndex={2} bg={"white"}>
                Rate
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentGuides.map((guide, index) => (
              <Tr
                key={guide._id}
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
                      <MenuItem onClick={() => showGuide(guide._id)}>
                        Show
                      </MenuItem>
                      <MenuItem onClick={() => deleteGuide(guide._id)}>
                        Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
                <Td>{indexOfFirstGuide + index + 1}</Td>

                <Td>
                  {guide.user
                    ? `${guide.user.firstname} ${guide.user.lastname}`
                    : "Unknown"}
                </Td>

                <Td>
                  <Flex flexWrap="wrap">
                    {guide.languages.map((lang) => (
                      <Text key={lang._id} mr={2} mb={2}>
                        {lang.name}
                      </Text>
                    ))}
                  </Flex>
                </Td>
                <Td>
                  {guide.city}, {guide.country}
                </Td>
                <Td>{guide.guideIn.join(", ")}</Td>
                <Td>
                  {guide.hourPrice}/hr {guide.dayPrice}/day
                </Td>
                <Td>
                  <Flex alignItems="center">
                    <Text ml={1}>{guide.rate} </Text>
                    <Icon as={StarIcon} color="yellow.400" />
                  </Flex>
                </Td>
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
            { length: Math.ceil(guides.length / guidesPerPage) },
            (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            )
          )}
        </Select>
        <Button
          onClick={() => paginate(currentPage + 1)}
          isDisabled={currentPage === Math.ceil(guides.length / guidesPerPage)}
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default TourGuideList;

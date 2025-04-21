import {
  Badge,
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  Image,
  SimpleGrid,
  Spacer,
  Spinner,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { User } from "./Types/User";
import axios from "axios";
import { Server_Url } from "../Main/root";
import { AuthContext } from "../Authentication/AuthContext";
import { useParams } from "react-router-dom";
import TourList from "./listTours";
import { FaMobile, FaEnvelope } from "react-icons/fa";
import { Tour } from "../Tours/Types/Tour";
import { List } from "../Favourite/Types/List";
const UserDetails = () => {
  const [user, setUser] = useState<User | null>(null);
  const [favList, setFavList] = useState<List[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedList, setSelectedList] = useState<List | null>(null);
  const [selectedTours, setSelectedTours] = useState<Tour[]>([]);
  const [viewingTours, setViewingTours] = useState<boolean>(false);

  const authContext = useContext(AuthContext);
  const { userId } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      if (!authContext || !authContext.token || !userId) {
        console.error("Auth context or token is not available");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `${Server_Url}/api/get-user/${userId}`,
          {
            headers: { Authorization: `Bearer ${authContext.token}` },
          }
        );
        if (response.data) {
          setUser(response.data.user);
        } else {
          console.error("No user data found in response");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [authContext, userId]);

  useEffect(() => {
    const fetchFavList = async () => {
      if (!authContext || !authContext.token || !userId) {
        console.error("Auth context or token is not available");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `${Server_Url}/api/get-all-lists?user=${userId}`,
          {
            headers: { Authorization: `Bearer ${authContext.token}` },
          }
        );
        setFavList(response.data.data.lists);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    if (userId) {
      fetchFavList();
    }
  }, [authContext, userId]);

  const handleListClick = async (list: List) => {
    try {
      if (!authContext || !authContext.token) return;

      const response = await axios.get(
        `${Server_Url}/api/get-list/${list._id}`,
        {
          headers: { Authorization: `Bearer ${authContext.token}` },
        }
      );

      if (response.data.status === "success" && response.data.list) {
        setSelectedList(response.data.list);

        if (Array.isArray(response.data.list.tours)) {
          const tourDetails = await Promise.all(
            response.data.list.tours.map(async (tourId: string) => {
              const tourResponse = await axios.get(
                `${Server_Url}/api/get-tour/${tourId}`
              );
              return tourResponse.data.data;
            })
          );
          setSelectedTours(tourDetails);
          setViewingTours(true);
        } else {
          console.error("Invalid tours data format:", response.data.list.tours);
        }
      } else {
        console.error("Failed to fetch list details:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching list details:", error);
    }
  };

  const handleBack = () => {
    setViewingTours(false);
  };

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }
  if (!user) {
    return (
      <Box p={4} bg={useColorModeValue("gray.100", "gray.800")}>
        <Heading size="md">User Not Found</Heading>
      </Box>
    );
  }

  return (
    <Box p={4} bg={useColorModeValue("gray.100", "gray.800")}>
      <Flex gap={4} mb={4}>
        <Box
          w="300px"
          bg={useColorModeValue("white", "gray.700")}
          rounded="md"
          boxShadow="md"
          p={4}
          pt={8}
        >
          <VStack align="center" gap={4}>
            <Image
              src="https://via.placeholder.com/150"
              alt={user.firstname}
              rounded="full"
              mb={4}
            />
            <Heading size="md">
              {user.firstname} {user.lastname}
            </Heading>
            <Flex align="center">
              <Box as={FaMobile} color="blue.500" mr={2} />
              <Text>{user.mobile}</Text>
            </Flex>
            <Flex align="center">
              <Box as={FaEnvelope} color="green.500" mr={2} />
              <Text>{user.email}</Text>
            </Flex>
          </VStack>
        </Box>
        <Box
          w="800px"
          bg={useColorModeValue("white", "gray.700")}
          rounded="md"
          boxShadow="md"
          p={4}
        >
          <Heading size="md" mb={4}>
            Details
          </Heading>
          <Grid
            templateColumns={{
              base: "1fr",
              md: "1fr 1fr",
            }}
            gap={6}
          >
            <Flex justifyContent="space-between">
              <Text fontSize="lg" fontWeight="600">
                First Name:{" "}
              </Text>
              <Text
                fontSize="lg"
                color={useColorModeValue("gray.800", "whiteAlpha.900")}
              >
                {user.firstname}
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text fontSize="lg" fontWeight="600">
                Last Name:{" "}
              </Text>
              <Text
                fontSize="lg"
                color={useColorModeValue("gray.800", "whiteAlpha.900")}
              >
                {user.lastname}
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text fontSize="lg" fontWeight="600">
                Language:{" "}
              </Text>
              <Text
                fontSize="lg"
                color={useColorModeValue("gray.800", "whiteAlpha.900")}
              >
                {user.language}
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text fontSize="lg" fontWeight="600">
                Types:{" "}
              </Text>
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
            </Flex>
            <Flex justifyContent="space-between">
              <Text fontSize="lg" fontWeight="600">
                ID:{" "}
              </Text>
              <Text
                fontSize="sm"
                color={useColorModeValue("gray.600", "whiteAlpha.700")}
              >
                {user._id}
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text fontSize="lg" fontWeight="600">
                Created At:{" "}
              </Text>
              <Text
                fontSize="sm"
                color={useColorModeValue("gray.600", "whiteAlpha.700")}
              >
                {new Date(user.createdAt).toLocaleDateString()}
              </Text>
            </Flex>
            <Flex justifyContent="space-between">
              <Text fontSize="lg" fontWeight="600">
                Updated At:{" "}
              </Text>
              <Text
                fontSize="sm"
                color={useColorModeValue("gray.00", "whiteAlpha.700")}
              >
                {new Date(user.updatedAt).toLocaleDateString()}
              </Text>
            </Flex>
          </Grid>
        </Box>
      </Flex>
      <Box
        w="full"
        bg={useColorModeValue("white", "gray.700")}
        rounded="md"
        boxShadow="md"
        p={4}
        mt={4}
      >
        <Heading size="md">Favourite Lists</Heading>
        <Flex mt={4} flexWrap="wrap" gap={4}>
          {!viewingTours ? (
            <SimpleGrid
              templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
              gap={6}
            >
              {favList.map((list) => (
                <Box
                  key={list._id}
                  borderWidth="1px"
                  borderRadius="md"
                  overflow="hidden"
                  p={4}
                  boxShadow="sm"
                  _hover={{ boxShadow: "md" }}
                  onClick={() => handleListClick(list)}
                  cursor="pointer"
                >
                  <Box
                    position="relative"
                    display="inline-block"
                    bg={!list.tours.length ? "gray.200" : "transparent"}
                  >
                    {list.tours.length > 0 &&
                      list.tours[0]?.photos?.length > 0 && (
                        <Image
                          src={list.tours[0].photos[0]}
                          // alt={list.name}
                          borderRadius="md"
                          objectFit="cover"
                        />
                      )}
                  </Box>
                  <Heading as="h2" size="md" mb={2}>
                    {list.name}
                  </Heading>
                  <Text>{list.tours.length} tours</Text>
                </Box>
              ))}
            </SimpleGrid>
          ) : (
            selectedList && (
              <TourList
                tours={selectedTours}
                listName={selectedList.name}
                listId={selectedList._id}
                handleBack={handleBack}
              />
            )
          )}
        </Flex>
      </Box>
    </Box>
  );
};
export default UserDetails;

import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Image,
  Flex,
  Spacer,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  useToast,
  Center,
  Spinner,
  list,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { Tour } from "../Tours/Types/Tour";
import { List } from "../Favourite/Types/List";
import axios from "axios";
import { Server_Url } from "../Main/root";
import { AuthContext } from "../Authentication/AuthContext";
import { useParams } from "react-router-dom";

const FavList: React.FC = () => {
  const authContext = useContext(AuthContext);
  const { listId } = useParams<{ listId: string }>();
  const [favList, setFavList] = useState<List | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTours, setSelectedTours] = useState<Tour[]>([]);

  useEffect(() => {
    const fetchFavList = async () => {
      if (!authContext || !authContext.token || !listId) {
        console.error("Auth context or token is not available");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `${Server_Url}/api/get-list/${listId}`,
          {
            headers: { Authorization: `Bearer ${authContext.token}` },
          }
        );
        if (response.data.status === "success" && response.data.list) {
          const { list } = response.data;
          setFavList(list);

          if (Array.isArray(list.tours)) {
            const tourDetails = await Promise.all(
              list.tours.map(async (tourId: string) => {
                const tourResponse = await axios.get(
                  `${Server_Url}/api/get-tour/${tourId}`
                );
                return tourResponse.data.data;
              })
            );
            setSelectedTours(tourDetails);
          } else {
            console.error("Invalid tours data format:", list.tours);
          }
        } else {
          console.error("Failed to fetch list details:", response.data.message);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        setLoading(false);
      }
    };

    fetchFavList();
  }, [authContext, listId]);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!favList) {
    return (
      <Center h="100vh">
        <Heading>No List Found</Heading>
      </Center>
    );
  }

  return (
    <Box>
      <Flex justify="space-between" mb={4}>
        <Heading fontSize="xl" mb={6}>
          {favList.name}
        </Heading>
      </Flex>
      <SimpleGrid
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        gap={6}
      >
        {selectedTours.map((tour: Tour) => (
          <Box
            key={tour._id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
            boxShadow="sm"
            _hover={{ boxShadow: "lg" }}
          >
            <Box position="relative" display="inline-block">
              {tour.photos && tour.photos.length > 0 && (
                <Image
                  src={tour.photos[0]}
                  alt={tour.title}
                  mb={2}
                  borderRadius="md"
                />
              )}
            </Box>
            <Heading as="h3" size="md">
              {tour.title}
            </Heading>

            <Text>
              {tour.city}, {tour.country}
            </Text>
            <Flex mt="2" alignItems="center">
              {[...Array(5)].map((_, index) => (
                <Icon
                  key={index}
                  as={StarIcon}
                  color={
                    index < tour.ratingsAverage ? "yellow.400" : "gray.300"
                  }
                />
              ))}
            </Flex>
            <Text> {tour.adult_price}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default FavList;

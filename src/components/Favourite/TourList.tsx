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
} from "@chakra-ui/react";
import { FaHeart, FaEllipsisV } from "react-icons/fa";
import { StarIcon } from "@chakra-ui/icons";
import { Tour } from "../Tours/Types/Tour";
import axios from "axios";
import { Server_Url } from "../Main/root";
import { AuthContext } from "../Authentication/AuthContext";

interface TourListProps {
  tours: Tour[];
  listName: string;
  listId: string;
  onDeleteList: (listId: string) => void;
}

const TourList: React.FC<TourListProps> = ({
  tours,
  listName,
  listId,
  onDeleteList,
}) => {
  const authContext = useContext(AuthContext);
  const toast = useToast();

  const handleDeleteClick = () => {
    onDeleteList(listId);
  };
  async function handleDeleteTour(tourId: string) {
    try {
      if (!authContext || !authContext.token) return;

      const response = await axios.delete(
        `${Server_Url}/api/delete-list-tour/${listId}`,
        {
          headers: {
            Authorization: `Bearer ${authContext.token}`,
          },
          data: {
            tourId: tourId,
          },
        }
      );
      console.log("Delete Tour Response:", response.data);
      if (response.data.status) {
        toast({
          title: "Tour Deleted",
          position: "top",

          description: `Tour successfully deleted from ${listName} list.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        console.error("Failed to delete tour:", response.data.message);
        toast({
          title: "Error",
          position: "top",

          description: "Failed to delete tour. Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error deleting tour:", error);
      toast({
        title: "Error",
        position: "top",

        description: "Failed to delete tour. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <Box>
      <Flex justify="space-between" mb={4}>
        <Heading fontSize="xl" mb={6}>
          {listName}
        </Heading>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FaEllipsisV />}
            variant="ghost"
            aria-label="Options"
            css={{ position: "relative", right: 0 }}
          />
          <MenuList>
            <MenuItem>Rename list</MenuItem>
            <MenuItem onClick={() => handleDeleteClick()}>Delete list</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <SimpleGrid
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        gap={6}
      >
        {tours.map((tour) => (
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
              <Image
                src={tour.photos[0]}
                alt={tour.title}
                mb={2}
                borderRadius="md"
              />
              <Box position="absolute" top="0" right="0" p="3">
                <IconButton
                  icon={
                    <FaHeart
                      color={!tour.faviorate ? "#FF3232" : "rgba(1, 0, 0, 0.2)"}
                      onClick={() => {
                        if (
                          window.confirm(
                            `Do you want to delete "${tour.title}" from "${listName}" list?`
                          )
                        ) {
                          handleDeleteTour(tour._id);
                        }
                      }}
                    />
                  }
                  aria-label="Favorite"
                  variant="ghost"
                />
              </Box>
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

export default TourList;

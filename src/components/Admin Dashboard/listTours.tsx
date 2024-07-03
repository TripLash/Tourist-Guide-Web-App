import React, { useContext, useState } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Image,
  Flex,
  Spacer,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { FaHeart, FaArrowLeft } from "react-icons/fa";
import { Tour } from "../Tours/Types/Tour";
import axios from "axios";
import { AuthContext } from "../Authentication/AuthContext";
import { Server_Url } from "../Main/root";
import { StarIcon } from "@chakra-ui/icons";

interface TourListProps {
  tours: Tour[];
  listName: string;
  listId: string;
  handleBack: () => void;
}

const TourList: React.FC<TourListProps> = ({
  tours,
  listName,
  listId,
  handleBack,
}) => {
  return (
    <Box>
      <Flex align="center">
        <IconButton
          icon={<FaArrowLeft />}
          aria-label="Back"
          onClick={handleBack}
          variant="ghost"
          mr={2}
        />
        <Heading fontSize="xl">{listName}</Heading>
      </Flex>
      <SimpleGrid
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
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
              {tour.photos && tour.photos.length > 0 && (
                <Image
                  src={tour.photos[0]}
                  alt={tour.title}
                  mb={2}
                  borderRadius="md"
                />
              )}
              {/* <Box position="absolute" top="0" right="0" p="3">
                <IconButton
                  icon={
                    <FaHeart
                      color={!tour.faviorate ? "#FF3232" : "rgba(1, 0, 0, 0.2)"}
                    />
                  }
                  aria-label="Favorite"
                  variant="ghost"
                />
              </Box> */}
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

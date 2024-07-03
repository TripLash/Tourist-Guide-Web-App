import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Text,
  Image,
  Flex,
  Icon,
  IconButton,
  Badge,
  Center,
  Heading,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import React from "react";
import { FaHeart } from "react-icons/fa";
import { Server_Url } from "../Main/root";
import ToursFilters from "../Filter/toursFilters";
import useFavorite from "../Favourite/useFavourite";
import FavoriteModal from "../Favourite/FavouriteModal";
import FavouriteLists from "../Nav Bar/FavouriteLists";
import { AuthContext } from "../Authentication/AuthContext";
import { Tour } from "../Tours/Types/Tour";

const SignedInTourCards = () => {
  const {
    tours,
    setTours,
    handleFavorite,
    isModalOpen,
    closeModal,
    selectedTour,
    handleToggleFavorite,
    setSelectedListId,
    selectedListId,
    setSelectedTour,
    openModal,
  } = useFavorite([]);

  const authContext = useContext(AuthContext);
  useEffect(() => {
    const fetchTours = async () => {
      if (!authContext || !authContext.token) return;
      try {
        const response = await axios.get(
          `${Server_Url}/api/get-all-tours-protect/`,
          {
            headers: { Authorization: `Bearer ${authContext.token}` },
          }
        );
        if (response.data.status === "success") {
          const tourData = response.data.data;

          setTours(tourData);
          console.log(tourData);
        } else {
          console.error("Error fetching tours:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };

    fetchTours();
  }, [authContext, setTours]);

  const handleFavoriteClick = (tour: Tour) => {
    handleFavorite(tour);
  };
  return (
    <>
      <Heading fontSize="xl" mb={6}>
        All Tours
      </Heading>
      <ToursFilters />
      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
        {tours.map((tour) => (
          <>
            <Box
              key={tour._id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              cursor="pointer"
              transition="transform 0.2s"
              _hover={{ transform: "scale(1.05)" }}
            >
              <Box position="relative" display="inline-block">
                <Image
                  src={tour.photos[0]}
                  alt={tour.title}
                  style={{ width: "100%", height: "auto" }}
                />

                <Box position="absolute" top="0" right="0" p="3">
                  <IconButton
                    aria-label="Favorite"
                    icon={
                      <FaHeart
                        color={
                          tour.faviorate ? "#FF3232" : "rgba(0, 0, 0, 0.2)"
                        }
                        size={18}
                      />
                    }
                    borderRadius={32}
                    onClick={() => {
                      console.log("Favorite icon clicked for tour:", tour);

                      handleFavoriteClick(tour);
                    }}
                    bg={"white"}
                  />
                </Box>
                <Box position="absolute" top="0" left="0" p="4" pt={"5"}>
                  <Badge
                    w={"60px"}
                    h={6}
                    p={"3px"}
                    borderRadius={"5px"}
                    fontSize={13}
                    bg={"white"}
                    fontFamily={"sans-serif"}
                  >
                    <Center style={{ textTransform: "none" }}>
                      {tour.tourCategory === "public" ? "Public" : "Private"}
                    </Center>
                  </Badge>
                </Box>
              </Box>
              <Box p="6">
                <Box dir="flex" alignItems="baseline">
                  <Text fontWeight="semibold" fontSize="sm">
                    {tour.title}
                  </Text>
                </Box>
                <Flex mt="2" alignItems="center">
                  <Text fontSize="sm" color="gray.600">
                    {tour.city},{tour.country}
                  </Text>
                </Flex>
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
                <Text mt="2" fontSize="sm">
                  {tour.adult_price}
                </Text>
              </Box>
            </Box>
          </>
        ))}
      </Grid>
      {selectedTour && (
        <FavoriteModal
          isOpen={isModalOpen}
          onClose={closeModal}
          tour={selectedTour}
          onToggleFavorite={handleToggleFavorite}
          setSelectedListId={setSelectedListId}
        />
      )}
    </>
  );
};
export default SignedInTourCards;

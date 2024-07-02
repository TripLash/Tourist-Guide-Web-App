import React, { useEffect, useState } from "react";
import {
  Box,
  Image,
  Text,
  Stack,
  HStack,
  Button,
  Flex,
  Badge,
  useColorModeValue,
  IconButton,
  Collapse,
  Progress,
  list,
} from "@chakra-ui/react";
import apiClient from "../../services/api-client";
import { useLocation } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon, StarIcon } from "@chakra-ui/icons";
import NavBar from "../Nav Bar/NavBar";

const LanguageItem = ({ language, experience }) => {
  const getProficiency = (level) => {
    switch (level.toLowerCase()) {
      case "fluent":
        return 80;
      case "native":
        return 100;
      case "b2":
        return 70;
      case "b1":
        return 40;
      default:
        return 50;
    }
  };

  return (
    <HStack justify="space-between" width="100%">
      <HStack spacing={3}>
        <Text fontWeight="bold">{language}</Text>
      </HStack>
      <Text fontWeight="bold">{experience}</Text>
      <Progress
        value={getProficiency(experience)}
        size="md"
        colorScheme="blue"
        width="40%"
        maxWidth={"290px"}
        borderRadius="md"
      />
    </HStack>
  );
};

const TourGuideInfo = () => {
  const [selectedTourType, setSelectedTourType] = useState<string | null>(null);

  const handleBadgeClick = (type: string) => {
    setSelectedTourType(type);
  };

  const selectedBgColor = useColorModeValue("blue.500", "blue.300");
  const selectedTextColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const location = useLocation();
  const { tourGuide } = location.state || {};
  const [selectedTour, setSelectedTour] = useState<{} | null>(null);

  if (!tourGuide) {
    setSelectedTour(tourGuide);
    return <div>No tour data available</div>;
  }

  console.log(tourGuide);

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      bg={{ base: "white", sm: "grey.100" }}
    >
      <Box
        maxW="1190px"
        width="900%"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="lg"
        p={4}
        bg="white"
      >
        <Box p={4}>
          <Stack spacing={4}>
            <Box>
              <HStack>
                {tourGuide.photo !== "" ? (
                  <Image
                    borderRadius="full"
                    boxSize="5rem"
                    src={tourGuide.photo}
                    alt="Dan Abramov"
                  />
                ) : (
                  <Image
                    borderRadius="full"
                    boxSize="5rem"
                    src="https://bit.ly/dan-abramov"
                    alt="Dan Abramov"
                  />
                )}
                <Text fontSize="3xl" color="black" fontWeight="medium">
                  {tourGuide.firstname} {tourGuide.lastname}
                </Text>
              </HStack>
            </Box>

            <Box borderBottom={"1px"} paddingBottom="1rem">
              <Text fontSize="xl" fontWeight="bold" mb={4}>
                Languages
              </Text>
              <Stack spacing={4}>
                {tourGuide.languages.map((lang, index) => (
                  <LanguageItem
                    key={index}
                    language={lang.name}
                    experience={lang.experience}
                  />
                ))}
              </Stack>
            </Box>

            <Box borderBottom={"1px"} paddingBottom="1rem">
              <Text fontWeight="bold" fontSize="lg">
                What's Included
              </Text>
              {tourGuide.included.map((list) => <Text>{list}</Text>)}
            </Box>
            <Box borderBottom={"1px"} paddingBottom="1rem">
              <Text fontWeight="bold" fontSize="lg">
                Price Details
              </Text>
              <Text> Price per Hour {tourGuide.hourPrice}$ </Text>
              <Text> Price per Day {tourGuide.dayPrice}$ </Text>

            </Box>
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
};

export default TourGuideInfo;

import React from "react";
import {
  Box,
  Image,
  Text,
  Stack,
  HStack,
  Button,
  Flex,
  Badge,
} from "@chakra-ui/react";
import apiClient from "../services/api-client";

interface tourCard {
  id: number;
  title: string;
  photo: string;
  description: string;
  duration: number;
  tourType: string;
}

const Tour = () => {
  apiClient.get("get-all-tours").then((res) => {
    console.log(res.data);
  });
  return (
    <Box
      maxW="lg"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      p={4}
      bg="white"
    >
      <Image
        src="/path/to/your/image.jpg" // You can replace this with the image path
        alt="Pyramids of Giza"
        w="full"
        h={{ base: "200px", md: "300px" }}
        objectFit="cover"
      />

      <Box p={4}>
        <Stack spacing={4}>
          <Box>
            <Text fontWeight="bold" fontSize="xl" isTruncated>
              Full-Day Exploration Of Ancient Wonders: Pyramids, Museum, And
              Bazaar From Cairo
            </Text>
            <Text fontSize="md" color="gray.500">
              Guided By: Johnny Erdman
            </Text>
          </Box>

          <Flex align="center" justify="space-between">
            <Text fontSize="2xl" color="blue.600" fontWeight="bold">
              $205 per person
            </Text>
            <Button colorScheme="blue" variant="solid">
              Check Availability
            </Button>
          </Flex>

          <Text fontSize="sm" color="gray.700">
            Interested in introducing Egypt in depth to the enthusiast tourists
            who love exploring and learning about ancient and modern Egypt, my
            goal is to showcase the real Egypt through ...
          </Text>

          <Box>
            <Text fontWeight="bold" fontSize="lg">
              Tour Duration
            </Text>
            <Text>8 Hours</Text>
          </Box>

          <Box>
            <Text fontWeight="bold" fontSize="lg">
              Tour Type
            </Text>
            <HStack spacing={2}>
              <Badge colorScheme="blue">Bus Tour</Badge>
              <Badge colorScheme="green">Day Trip</Badge>
              <Badge colorScheme="purple">Walking Tour</Badge>
            </HStack>
          </Box>

          <Box>
            <Text fontWeight="bold" fontSize="lg">
              What's Included
            </Text>
            <Text>Transportation, Entry Fees, Guide</Text>
          </Box>

          <Box>
            <Text fontWeight="bold" fontSize="lg">
              What's Excluded
            </Text>
            <Text>Personal Expenses, Souvenirs, Food, Drinks, Snacks</Text>
          </Box>

          <Box>
            <Text fontWeight="bold" fontSize="lg">
              Reviews
            </Text>
            <Stack spacing={3}>
              {Array(3)
                .fill("")
                .map((_, index) => (
                  <Box key={index} p={3} shadow="md" borderWidth="1px">
                    <HStack>
                      <Image
                        borderRadius="full"
                        boxSize="40px"
                        src="/path/to/avatar.jpg"
                        alt="Reviewer"
                      />
                      <Stack spacing={0}>
                        <Text fontWeight="bold">June Quigley</Text>
                        <Text fontSize="sm" color="gray.500">
                          Posted on Aug 19, 2023
                        </Text>
                      </Stack>
                    </HStack>
                    <Text mt={2}>
                      Quod et ea kusto eveniet voluptatem biondictis. natus
                      libero aut.
                    </Text>
                  </Box>
                ))}
              <Button variant="link" colorScheme="blue">
                See all 20 Reviews
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Tour;

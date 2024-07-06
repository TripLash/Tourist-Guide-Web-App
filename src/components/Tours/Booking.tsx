import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { CalendarIcon, TimeIcon } from "@chakra-ui/icons";
import CalenderSearchInput from "../Search Bar/CalenderSearchInput";
import { useNavigate } from "react-router-dom";

const Booking = () => {
    const navigate = useNavigate();
  const handleParticipantsChange = (event) => {
    const selectedOption = event.target.value;
    let newPrice = 63;
    if (selectedOption === "Adult x 2") {
      newPrice = 126;
    } else if (selectedOption === "Adult x 3") {
      newPrice = 189;
    } else if (selectedOption === "Adult x 4") {
      newPrice = 252;
    } else if (selectedOption === "Adult x 5") {
      newPrice = 315;
    } else if (selectedOption === "Adult x 6") {
      newPrice = 378;
    }
    setPrice(newPrice);
  };

  const [price, setPrice] = useState(63);
  return (
    <Box
      padding="4"
      maxWidth="1100px"
      margin="0 auto"
      borderWidth="1px"
      borderRadius="md"
      boxShadow="2xl"
    >
      <VStack spacing="4" align="stretch">
        <Box>
          <Text fontSize="lg" fontWeight="bold">
            Activity Details
          </Text>
          <Flex justify="space-between" mt="2" flexDirection={"column"}>
            <FormControl>
              <FormLabel>
                <CalendarIcon mr="2" />
                Date
              </FormLabel>
              <Input type="text" value="Dec 26, 2023" readOnly border={"1px"} />
            </FormControl>
            <FormControl>
              <FormLabel>Participants</FormLabel>
              <Select border={"1px"} onChange={handleParticipantsChange}>
                <option value="Adult x 1">Adult x 1</option>
                <option value="Adult x 2">Adult x 2</option>
                <option value="Adult x 3">Adult x 3</option>
                <option value="Adult x 4">Adult x 4</option>
                <option value="Adult x 5">Adult x 5</option>
                <option value="Adult x 6">Adult x 6</option>
              </Select>
            </FormControl>
          </Flex>
        </Box>

        <Box>
          <Text fontSize="lg" fontWeight="bold">
            Availability options
          </Text>
          <Box borderWidth="1px" borderRadius="md" padding="4" mt="2">
            <Text>
              Cairo Highlights Tour 2 days 1 night tours to Giza, Saqqara
              pyramids, Egyptian museum & Islamic & Christian Cairo
            </Text>
            <Text mt="2">3 hours</Text>
            <Text>Guide: English</Text>
            <Text>Meet at Cruise Ship Port, Hotel</Text>
            <Divider my="2" />
            <FormControl>
              <FormLabel>
                <TimeIcon mr="2" />
                Starting Time
              </FormLabel>
              <Select border={"1px"}>
                <option>07:00 AM</option>
                <option>08:00 AM</option>
                <option>09:00 AM</option>
                <option>10:00 AM</option>
                <option>11:00 AM</option>
                <option>12:00 AM</option>
              </Select>
            </FormControl>
            <Divider my="2" />
            <HStack justify="space-between">
              <Text>1 Adult x 63$</Text>
              <Text>Total Price ➔ {price}$</Text>
            </HStack>
            <Text mt="2">All Taxes and Fees included</Text>
            <Button
              borderRadius={"200px"}
              colorScheme="blue"
              width="full"
              mt="4"
              onClick={() => navigate("/Payment")}
            >
              Pay
            </Button>
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};

export default Booking;

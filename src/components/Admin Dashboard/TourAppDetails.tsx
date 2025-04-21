import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Spinner,
  Flex,
  Image,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import axios from "axios";
import { Server_Url } from "../Main/root";
import { AuthContext } from "../Authentication/AuthContext";
import { tourApplication } from "./Types/TourApplication";
import { Tour } from "../Tours/Types/Tour";
import { User } from "./Types/User";

const TourAppDetails: React.FC = () => {
  const { appId } = useParams<{ appId: string }>();
  const [application, setApplication] = useState<tourApplication | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const TourAppData = async () => {
      if (!authContext || !authContext.token || !appId) {
        console.error("Authorization token is missing");

        setLoading(false);
        return;
      }

      try {
        const appResponse = await axios.get(
          `${Server_Url}/api/get-application/${appId}`,
          {
            headers: { Authorization: `Bearer ${authContext.token}` },
          }
        );
        setApplication(appResponse.data.app);
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    TourAppData();
  }, [appId, authContext]);

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!application) {
    return (
      <Box textAlign="center" mt={5}>
        <Heading size="md">Application not found</Heading>
      </Box>
    );
  }

  return (
    <Box p={5}>
      <Heading size="lg" mb={4}>
        Application Details
      </Heading>
      <Flex direction={{ base: "column", md: "row" }} mb={5}>
        <Box
          flex="1"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          mb={{ base: 4, md: 0 }}
          mr={{ md: 4 }}
        >
          {application.tour ? (
            <>
              <Image
                src={application.tour.photos?.[0]}
                alt={application.tour.title}
                objectFit="cover"
                width="100%"
                height="200px"
              />
              <Box p={4}>
                <Heading size="md">{application.tour.title}</Heading>
              </Box>
            </>
          ) : (
            <Box p={4}>
              <Heading size="md">Tour not found</Heading>
            </Box>
          )}
        </Box>
        <Box flex="1" borderWidth="1px" borderRadius="lg" p={4}>
          <Heading size="md" mb={4}>
            Application Information
          </Heading>
          <StatGroup>
            <Stat>
              <StatLabel>User</StatLabel>
              {application.user ? (
                <>
                  <StatNumber>
                    {application.user.firstname} {application.user.lastname}
                  </StatNumber>
                  <StatHelpText>{application.user.email}</StatHelpText>
                </>
              ) : (
                <StatNumber>User not found</StatNumber>
              )}
            </Stat>
            <Stat>
              <StatLabel>Members</StatLabel>
              <StatNumber>{application.members}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Total Price</StatLabel>
              <StatNumber>${application.total_price}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Status</StatLabel>
              <Badge colorScheme={useColorModeValue("green", "red")}>
                {application.status}
              </Badge>
            </Stat>
          </StatGroup>
          <StatGroup mt={4}>
            <Stat>
              <StatLabel>Start Date</StatLabel>
              <StatNumber>
                {new Date(application.start_date).toLocaleDateString()}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>End Date</StatLabel>
              <StatNumber>
                {new Date(application.end_date).toLocaleDateString()}
              </StatNumber>
            </Stat>
          </StatGroup>
        </Box>
      </Flex>
      <Box>
        <Heading size="md" mb={2}>
          Additional Information
        </Heading>
        <Text mb={2}>
          <strong>Creation Date:</strong>{" "}
          {new Date(application.creation_date).toLocaleDateString()}
        </Text>
        <Text>
          <strong>Start Time:</strong> {application.start_time}
        </Text>
      </Box>
    </Box>
  );
};

export default TourAppDetails;

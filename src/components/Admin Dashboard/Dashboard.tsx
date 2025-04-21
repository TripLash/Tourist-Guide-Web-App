import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Flex,
  Icon,
} from "@chakra-ui/react";
import {
  FaUsers,
  FaClipboardList,
  FaRegClock,
  FaChartLine,
} from "react-icons/fa";
import { Server_Url } from "../Main/root";
import { AuthContext } from "../Authentication/AuthContext";

const Dashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      if (!authContext || !authContext.token) {
        console.error("Auth context or token is not available");
        return;
      }
      try {
        const response = await axios.get(`${Server_Url}/api/dashboard`, {
          headers: { Authorization: `Bearer ${authContext.token}` },
        });
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching the data", error);
      }
    };

    fetchData();
  }, [authContext]);

  const stats = data
    ? [
        { key: "clients", label: "Clients", icon: FaUsers },
        { key: "admins", label: "Admins", icon: FaUsers },
        { key: "guides", label: "Guides", icon: FaClipboardList },
        { key: "tours", label: "Tours", icon: FaChartLine },
        { key: "private_tours", label: "Private Tours", icon: FaChartLine },
        { key: "user_tours", label: "User Tours", icon: FaUsers },
        { key: "public_tours", label: "Public Tours", icon: FaUsers },
        { key: "applications", label: "Applications", icon: FaClipboardList },
        {
          key: "finishedApplications",
          label: "Finished Applications",
          icon: FaClipboardList,
        },
        {
          key: "activeApplications",
          label: "Active Applications",
          icon: FaClipboardList,
        },
        {
          key: "upcomingApplications",
          label: "Upcoming Applications",
          icon: FaClipboardList,
        },
      ]
    : [];

  const colors = ["#FF5C5C", "#6C63FF", "#33CC99", "#FFC107"];

  return (
    <Box p={5}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5}>
        {stats.map((stat, index) => (
          <Stat
            key={stat.key}
            bg={useColorModeValue("white", "gray.700")}
            color={useColorModeValue("gray.800", "white")}
            p={5}
            borderRadius="md"
            shadow="md"
          >
            <Flex justify="space-between">
              <Box>
                <StatLabel>{stat.label}</StatLabel>
                <StatNumber>{data ? data[stat.key] : "Loading..."}</StatNumber>
              </Box>
              <Icon
                as={stat.icon}
                boxSize={12}
                color={colors[index % colors.length]}
              />
            </Flex>
          </Stat>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;

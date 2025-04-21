import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  VStack,
  Link as ChakraLink,
  Center,
  Flex,
  Image,
  Text,
  Heading,
} from "@chakra-ui/react";
import { Outlet, Link, useLocation } from "react-router-dom";

import logo from "../../assets/logo.png";
import { _mainColor, _mainTxtColor, _secTxtColor } from "../Main/Colors";
import { LuUsers } from "react-icons/lu";
import { RiAdminLine } from "react-icons/ri";
import { LuClipboardList } from "react-icons/lu";
import { PiListHeartLight } from "react-icons/pi";
import { LuLayoutDashboard } from "react-icons/lu";

import AdminNavBar from "./adminNavBar";
import { AuthContext } from "../Authentication/AuthContext";
import apiClient from "../../services/api-client";
import axios from "axios";
import { Server_Url } from "../Main/root";
import { User } from "./Types/User";

const AdminDashboard: React.FC = () => {
  const location = useLocation();
  const authContext = useContext(AuthContext);
  const [profile, setProfile] = useState<User | null>(null);
  if (!authContext) {
    console.log("no Auth context");
    return null;
  }
  const linkStyles = (path: string) => ({
    display: "flex",
    alignItems: "center",
    bg: location.pathname === path ? _mainColor : "",
    color: "white",
    p: 3,
    borderRadius: " md",
    _hover: {
      textDecoration: "none",
    },
  });
  useEffect(() => {
    const getProfile = async () => {
      if (!authContext || !authContext.token) return;
      try {
        const response = await axios.get(`${Server_Url}/api/get-profile/`, {
          headers: { Authorization: `Bearer ${authContext.token}` },
        });
        console.log(response.data.data);
        if (response.data.data) {
          setProfile(response.data.data.user);
        } else {
          console.error("No user data found in response");
        }
      } catch (error) {
        console.error("Error fetching Profile:", error);
      }
    };

    getProfile();
  }, [authContext]);

  return (
    <Box>
      <Grid templateColumns="repeat(4, 1fr)">
        <GridItem colSpan={1}>
          <Box bg={"#304463"} p={3} height="100vh" position="sticky" top="0">
            <Box mb={1}>
              <Link to="/dashboard">
                <Flex align="center">
                  <Image src={logo} boxSize="45px" mr={2} />
                  <Center
                    color={_secTxtColor}
                    fontSize="xl"
                    fontFamily="cursive"
                  >
                    Triplash
                  </Center>
                </Flex>
              </Link>
            </Box>
            <VStack spacing={6} align="stretch" mt={8}>
              <ChakraLink
                as={Link}
                to="/dashboard"
                {...linkStyles("/dashboard")}
              >
                <LuLayoutDashboard
                  style={{ marginRight: "10px", fontSize: "20px" }}
                />
                Dashboard
              </ChakraLink>
              <ChakraLink as={Link} to="/users" {...linkStyles("/users")}>
                <LuUsers style={{ marginRight: "10px", fontSize: "20px" }} />
                All Users
              </ChakraLink>
              {/* <ChakraLink
                as={Link}
                to="/tour-guides"
                {...linkStyles("/tour-guides")}
              >
              <Icon
                  as={FaUserTie}
                  mr={2}
                  style={{ color: _secTxtColor, fontSize: "24px" }}
                />
                All Tour Guides
                </ChakraLink> */}
              <ChakraLink as={Link} to="/admins" {...linkStyles("/admins")}>
                <RiAdminLine
                  style={{ marginRight: "10px", fontSize: "20px" }}
                />
                All Admins
              </ChakraLink>
              <ChakraLink
                as={Link}
                to="/tour-applications"
                {...linkStyles("/tour-applications")}
              >
                <LuClipboardList
                  style={{ marginRight: "10px", fontSize: "20px" }}
                />
                Tour Applications
              </ChakraLink>
              <ChakraLink
                as={Link}
                to="/tour-guide-applications"
                {...linkStyles("/tour-guide-applications")}
              >
                <LuClipboardList
                  style={{ marginRight: "10px", fontSize: "20px" }}
                />
                Tour Guide Applications
              </ChakraLink>
              <ChakraLink
                as={Link}
                to="/favourites"
                {...linkStyles("/favourites")}
              >
                <PiListHeartLight
                  style={{ marginRight: "10px", fontSize: "24px" }}
                />
                All Favourite Lists
              </ChakraLink>
              <ChakraLink as={Link} to="/profile" mt={"200px"}>
                <Box
                  display="flex"
                  alignItems="center"
                  border=" #EEF5FF"
                  borderRadius="xl"
                  boxShadow="md "
                  p={"14px 10px"}
                >
                  <Image
                    src={profile?.photo || "https://via.placeholder.com/40"}
                    alt="Profile Picture"
                    rounded="full"
                    boxSize="50px"
                    mr={2}
                  />
                  <VStack align="flex-start" spacing={0} ml={1}>
                    <Heading size="16px" color={_secTxtColor}>
                      {profile?.firstname} {profile?.lastname}
                    </Heading>
                    <Text color={_secTxtColor} fontSize="sm">
                      {profile?.user_types.join(", ")}
                    </Text>
                  </VStack>
                </Box>
              </ChakraLink>
            </VStack>
          </Box>
        </GridItem>
        <GridItem colSpan={3}>
          <Box borderRadius="md" position="sticky" top="0">
            {/* <ProfileMenu /> */}
            <AdminNavBar />
          </Box>
          <Box bg="white" p={4} borderRadius="md" mt={1}>
            <Outlet />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;

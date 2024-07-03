import React from "react";
import { Box, Flex, Spacer, Image, Center, HStack } from "@chakra-ui/react";

import ProfileMenu from "../Nav Bar/ProfileMenu";

const AdminNavBar: React.FC = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem 2rem"
      color="black"
      boxShadow="sm"
      position="sticky"
      bg="white"
    >
      <Spacer />
      <HStack spacing={8} alignItems="center">
        <ProfileMenu />
      </HStack>
    </Flex>
  );
};

export default AdminNavBar;

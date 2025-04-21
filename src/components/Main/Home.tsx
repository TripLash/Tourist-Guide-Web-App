import { Box, ChakraProvider, Spacer, VStack } from "@chakra-ui/react";
import React from "react";
import SearchBar from "../Search Bar/SearchBar";
import Navi from "./Title-With-Icon";
import NavBar from "../Nav Bar/NavBar";

const Home = () => {
  return (
    <>
      <ChakraProvider>
        {/* <Box bg={"#304463"} height={"400px"} borderRadius={"0px 0px 200px 0"}> */}
        {/* <VStack gap={10}> */}
        {/* <NavBar /> */}

        <SearchBar />
        {/* </VStack> */}
        {/* </Box> */}
        {/* for tour and tour guide navigation */}
        <Navi />
      </ChakraProvider>
    </>
  );
};

export default Home;

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Server_Url } from "../Main/root";
import {
  ChakraProvider,
  theme,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Box,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Image,
} from "@chakra-ui/react";
import { AuthContext } from "../Authentication/AuthContext";
import TourList from "../Favourite/TourList";
import NewListModal from "../Favourite/NewListModal";
import { useNavigate } from "react-router-dom";
import { Tour } from "../Tours/Types/Tour";

import { List } from "../Favourite/Types/List";

const FavouriteLists = () => {
  const [lists, setLists] = useState<List[]>([]);
  const [selectedList, setSelectedList] = useState<List | null>(null);
  const [selectedTours, setSelectedTours] = useState<Tour[]>([]);
  const [favoriteLists, setFavoriteLists] = useState<string[]>([]);

  const [isNewListModalOpen, setIsNewListModalOpen] = useState(false);
  const [newListName, setNewListName] = useState("");

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOpenNewListModal = () => {
    setIsNewListModalOpen(true);
  };

  const handleCloseNewListModal = () => {
    setIsNewListModalOpen(false);
  };

  useEffect(() => {
    const fetchLists = async () => {
      if (!authContext || !authContext.token) return;
      try {
        const response = await axios.get(`${Server_Url}/api/get-user-lists`, {
          headers: { Authorization: `Bearer ${authContext.token}` },
        });

        setFavoriteLists(response.data.data.lists);
        console.log("API response:", response.data);

        if (response.data && Array.isArray(response.data.data.lists)) {
          setLists(response.data.data.lists);
        } else {
          console.error("Unexpected API response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };

    fetchLists();
  }, [authContext]);

  async function handleDeleteList(listId: string): Promise<void> {
    try {
      if (!authContext || !authContext.token) return;

      const response = await axios.delete(
        `${Server_Url}/api/delete-list/${listId}`,
        {
          headers: { Authorization: `Bearer ${authContext.token}` },
        }
      );
      console.log("Delete List Response:", response.data);
      if (response.data.status === "success") {
        setLists((prevLists) =>
          prevLists.filter((list) => list._id !== listId)
        );
      } else {
        console.error("Failed to delete list:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  }

  const handleListClick = async (list: List) => {
    try {
      if (!authContext || !authContext.token) return;

      const response = await axios.get(
        `${Server_Url}/api/get-list/${list._id}`,
        {
          headers: { Authorization: `Bearer ${authContext.token}` },
        }
      );

      if (response.data.status === "success" && response.data.list) {
        setSelectedList(response.data.list);

        if (Array.isArray(response.data.list.tours)) {
          const tourDetails = await Promise.all(
            response.data.list.tours.map(async (tourId: string) => {
              const tourResponse = await axios.get(
                `${Server_Url}/api/get-tour/${tourId}`
              );
              return tourResponse.data.data;
            })
          );
          setSelectedTours(tourDetails);
        } else {
          console.error("Invalid :", response.data.list.tours);
        }
      } else {
        console.error("Failed :", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching list details:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem(
      "favoriteLists",
      JSON.stringify(lists.map((list) => list.name))
    );
  }, [lists]);

  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.xl" py={8}>
        <Flex justify="space-between" mb={4}>
          {!selectedList ? (
            <>
              <Heading fontSize="xl" mb={6}>
                Your Favourite Lists
              </Heading>
              <Button
                onClick={handleOpenNewListModal}
                disabled={
                  !newListName.trim() || !authContext || !authContext.token
                }
              >
                Add New List
              </Button>
            </>
          ) : null}
          <NewListModal
            isOpen={isNewListModalOpen}
            onClose={handleCloseNewListModal}
            onListCreated={(listName: string) => {
              setLists((prevLists) => [
                ...prevLists,
                { _id: "", name: listName, user: "", tours: [], __v: 0 },
              ]);
            }}
          />
        </Flex>
        {!selectedList ? (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
            {lists.map((list) => (
              <Box
                key={list._id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                boxShadow="sm"
                _hover={{ boxShadow: "md" }}
                onClick={() => handleListClick(list)}
                cursor="pointer"
              >
                <Box
                  position="relative"
                  display="inline-block"
                  bg={!list.tours.length ? "gray.200" : "transparent"}
                >
                  {list.tours.length > 0 &&
                    list.tours[0]?.photos?.length > 0 && (
                      <Image
                        src={list.tours[0].photos[0]}
                        // alt={list.name}
                        borderRadius="md"
                        objectFit="cover"
                      />
                    )}
                </Box>
                <Heading as="h2" size="md" mb={2}>
                  {list.name}
                </Heading>
                <Text>{list.tours.length} tours</Text>
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <TourList
            tours={selectedTours}
            listName={selectedList.name}
            listId={selectedList._id}
            // onToggleFavorite={handleToggleFavorite}
            onDeleteList={handleDeleteList}
          />
        )}
      </Container>
    </ChakraProvider>
  );
};

export default FavouriteLists;

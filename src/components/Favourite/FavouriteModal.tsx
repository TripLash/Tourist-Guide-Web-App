import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  Checkbox,
  Box,
  Image,
  Text,
  useDisclosure,
  Button,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import axios from "axios";
import { Server_Url } from "../Main/root";
import { AuthContext } from "../Authentication/AuthContext";
import NewListModal from "./NewListModal";
import { useToast } from "@chakra-ui/react";
import { Tour } from "../Tours/Types/Tour";
import { List } from "./Types/List";

interface FavoriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  tour: Tour | null;
  onToggleFavorite: (tour: Tour, listId: string) => void;
  setSelectedListId: (listId: string | null) => void;
  // handleSelectList: (listId: string) => void;
}

const FavoriteModal: React.FC<FavoriteModalProps> = ({
  isOpen,
  onClose,
  tour,
  onToggleFavorite,
  setSelectedListId,
}) => {
  const [favoriteLists, setFavoriteLists] = useState<List[]>([]);

  const [selectedList, setSelectedList] = useState<string | null>(null);
  const {
    isOpen: isNewListModalOpen,
    onOpen: onOpenNewListModal,
    onClose: onCloseNewListModal,
  } = useDisclosure();
  const authContext = useContext(AuthContext);
  const toast = useToast();

  useEffect(() => {
    const fetchFavoriteLists = async () => {
      if (!authContext || !authContext.token) return;
      try {
        const response = await axios.get(`${Server_Url}/api/get-user-lists`, {
          headers: { Authorization: `Bearer ${authContext.token}` },
        });
        console.log("API response:", response.data);
        const lists = response.data.data.lists;
        setFavoriteLists(lists);
      } catch (error) {
        console.error("Error fetching favorite lists:", error);
      }
    };

    fetchFavoriteLists();
  }, [authContext]);

  const handleFavoriteClick = (listId: string) => {
    if (!tour) return;

    const selectedList = favoriteLists.find((list) => list._id === listId);
    console.log("Selected List:", selectedList);
    console.log("Tour to be checked:", tour);
    const tourId = String(tour._id);
    const tourExistsInList = selectedList
      ? selectedList.tours.some((t) => String(t) === tourId)
      : false;
    console.log(
      `Checking if tour ${tour._id} exists in list ${listId}: ${tourExistsInList}`
    );

    if (!tourExistsInList) {
      onToggleFavorite(tour, listId);
      toast({
        description: `${tour.title} is added successfully to ${selectedList?.name} list .`,
        position: "top",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } else {
      toast({
        description: `${tour.title} already exists in ${selectedList?.name} list .`,
        position: "top",

        status: "info",
        duration: 4000,
        isClosable: true,
      });
      setSelectedListId(listId);
      onClose();
    }
  };

  const handleListCreated = (listName: string) => {
    setFavoriteLists((prev) => [
      ...prev,
      { _id: "new-id", name: listName, tours: [] },
    ]);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box
              cursor="pointer"
              onClick={onClose}
              color="blue.500"
              fontSize="20px"
              fontWeight="bold"
            >
              &times;
            </Box>
            <Text>Select a list</Text>
            <Text
              color="blue.500"
              cursor="pointer"
              onClick={onOpenNewListModal}
              fontSize={"s"}
            >
              New list
            </Text>
          </ModalHeader>
          <ModalBody>
            <VStack spacing={4} align="stretch" overflowY="auto" maxH="300px">
              {favoriteLists.map((list, index) => (
                <HStack key={index} spacing={4} justify="space-between">
                  <HStack spacing={4}>
                    <Box
                      boxSize="40px"
                      bg={!list.tours.length ? "gray.200" : "transparent"}
                    >
                      {list.tours.length > 0 &&
                        list.tours[0]?.photos?.length > 0 && (
                          <Image
                            src={list.tours[0].photos[0]}
                            // alt={list.name}
                            boxSize="40px"
                            objectFit="cover"
                          />
                        )}
                    </Box>
                    <Flex
                      key={list._id}
                      alignItems="center"
                      justifyContent="space-between"
                      p={2}
                      // borderBottom="1px solid #eaeaea"
                      cursor="pointer"
                      _hover={{ backgroundColor: "#f9f9f9" }}
                      onClick={() => handleFavoriteClick(list._id)}
                    >
                      <Text>{list.name}</Text>
                    </Flex>
                  </HStack>
                </HStack>
              ))}
            </VStack>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
      <NewListModal
        isOpen={isNewListModalOpen}
        onClose={onCloseNewListModal}
        onListCreated={handleListCreated}
      />
    </>
  );
};

export default FavoriteModal;

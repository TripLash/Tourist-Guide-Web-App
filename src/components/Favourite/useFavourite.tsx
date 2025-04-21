import { useContext, useState } from "react";
import { Server_Url } from "../Main/root";
import { AuthContext } from "../Authentication/AuthContext";
import axios from "axios";
import { Tour } from "../Tours/Types/Tour";

interface List {
  _id: string;
  name: string;
  // user: string;
  tours: Tour[];
}

const useFavorite = (initialTours: Tour[]) => {
  const [tours, setTours] = useState<Tour[]>(initialTours);
  const [favoriteLists, setFavoriteLists] = useState<List[]>([]);
  const [selectedListId, setSelectedListId] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const authContext = useContext(AuthContext);
  const [selectedList, setSelectedList] = useState<List | null>(null);

  const handleFavorite = async (tour: Tour) => {
    setSelectedTour(tour);
    setIsModalOpen(true);
    console.log("Selected Tour ID:", tour._id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTour(null);
    setSelectedListId(null);
  };

  const handleToggleFavorite = async (tour: Tour, selectedListId: string) => {
    try {
      if (!authContext || !authContext.token || !selectedListId) return;

      const response = await axios.patch(
        `${Server_Url}/api/update-list/${selectedListId}`,
        {
          tourId: tour._id,
        },
        {
          headers: { Authorization: `Bearer ${authContext.token}` },
        }
      );

      if (response.data.status === "success") {
        setFavoriteLists((prevLists) =>
          prevLists.map((list) =>
            list._id === (selectedList ? selectedListId : "")
              ? {
                  ...list,
                  tours: list.tours.some((t) => t._id === tour._id)
                    ? list.tours.filter((t) => t._id !== tour._id)
                    : [...list.tours, tour],
                }
              : list
          )
        );
        closeModal();
        console.log("Selected List ID:", selectedListId);
        console.log("Toggled Tour ID:", tour._id);
      } else {
        console.error("Failed to toggle favorite:", response.data.message);
      }
    } catch (error: any) {
      console.error("Error toggling favorite:", error);
      console.log("Request configuration:", error.config);
    }
  };

  return {
    tours,
    setTours,
    handleFavorite,
    isModalOpen,
    closeModal,
    selectedTour,
    setSelectedTour,
    handleToggleFavorite,
    selectedListId,
    setSelectedListId,
    openModal: () => setIsModalOpen(true),
    favoriteLists,
    setFavoriteLists,
  };
};

export default useFavorite;

import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Image,
  Text,
  Heading,
  useColorModeValue,
  Grid,
  GridItem,
  HStack,
  Flex,
  Badge,
  useToast,
} from "@chakra-ui/react";
import { User } from "./Types/User";
import axios from "axios";
import { Server_Url } from "../Main/root";
import { AuthContext } from "../Authentication/AuthContext";
import { _mainColor, _secTxtColor } from "../Main/Colors";

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const authContext = useContext(AuthContext);
  const toast = useToast();

  useEffect(() => {
    const getProfile = async () => {
      if (!authContext || !authContext.token) return;
      try {
        const response = await axios.get(`${Server_Url}/api/get-profile/`, {
          headers: { Authorization: `Bearer ${authContext.token}` },
        });
        console.log(response.data.data);
        if (response.data.data.user) {
          setProfile(response.data.data.user);
        } else {
          console.error("No user data found in response");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [authContext]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) =>
      prevProfile ? { ...prevProfile, [name]: value } : null
    );
  };

  const handleSave = async () => {
    if (!authContext || !authContext.token || !profile) return;
    try {
      await axios.patch(`${Server_Url}/api/update-profile/`, profile, {
        headers: { Authorization: `Bearer ${authContext.token}` },
      });
      toast({
        description: " Profile updated successfully.",
        position: "top",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error saving updates:", error);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!profile) {
    return <Text>Error loading profile</Text>;
  }

  return (
    <Box p={2} pt={0}>
      <Heading size="lg" mb={4}>
        Profile
      </Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem colSpan={1}>
          <VStack spacing={6}>
            <Image
              borderRadius="full"
              boxSize="150px"
              src={profile?.photo || "https://via.placeholder.com/150"}
              alt={profile?.firstname}
            />
            <Heading size="md">
              {profile.firstname} {profile.lastname}
            </Heading>
            <Flex>
              {profile.user_types &&
                profile.user_types.map((type, index) => (
                  <Badge
                    key={index}
                    p={2}
                    colorScheme={
                      type === "admin"
                        ? "red"
                        : type === "client"
                        ? "blue"
                        : type === "guide"
                        ? "green"
                        : "gray"
                    }
                    mr={index !== profile.user_types.length - 1 ? 2 : 0}
                  >
                    {type}
                  </Badge>
                ))}
            </Flex>
            <HStack spacing={4}>
              <Button
                bg="transparent"
                border={`2px solid ${_mainColor}`}
                color={_mainColor}
                _hover={{
                  color: _secTxtColor,
                  bg: _mainColor,
                }}
              >
                Upload New Photo
              </Button>
            </HStack>
          </VStack>
        </GridItem>
        <GridItem colSpan={2}>
          <VStack spacing={4} align="stretch">
            <Flex justifyContent={"space-between"}>
              <FormControl mr={2}>
                <FormLabel>First Name</FormLabel>
                <Input
                  name="firstname"
                  value={profile.firstname || ""}
                  onChange={handleInputChange}
                  h={12}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input
                  name="lastname"
                  value={profile.lastname || ""}
                  onChange={handleInputChange}
                  h={12}
                />
              </FormControl>
            </Flex>
            <FormControl>
              <FormLabel>Email Address</FormLabel>
              <Input
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                h={12}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input
                name="mobile"
                value={profile.mobile || ""}
                onChange={handleInputChange}
                h={12}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Language</FormLabel>
              <Input
                name="language"
                value={profile.language || ""}
                onChange={handleInputChange}
                h={12}
              />
            </FormControl>
            <Heading size="md">Address</Heading>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Input
                name="country"
                value={profile.country || ""}
                onChange={handleInputChange}
                h={12}
              />
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input
                name="city"
                value={profile.city || ""}
                onChange={handleInputChange}
                h={12}
              />
            </FormControl>

            <Flex justifyContent="center">
              <Button
                bg={_mainColor}
                color={_secTxtColor}
                _hover={{ color: _mainColor, bg: _secTxtColor }}
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </Flex>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Profile;

// import React, { useContext, useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   VStack,
//   Image,
//   Text,
//   Heading,
//   useColorModeValue,
//   Grid,
//   GridItem,
//   HStack,
//   Flex,
//   Badge,
//   useToast,
// } from "@chakra-ui/react";
// import { User } from "./Types/User";
// import axios from "axios";
// import { Server_Url } from "../Main/root";
// import { AuthContext } from "../Authentication/AuthContext";
// import { _mainColor, _secTxtColor } from "../Main/Colors";

// const Profile: React.FC = () => {
//   const [profile, setProfile] = useState<User | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const authContext = useContext(AuthContext);
//   const toast = useToast();
//   const [selectedFile, setSelectedFile] = useState<File | null>(null); // State to hold the selected file

//   useEffect(() => {
//     const getProfile = async () => {
//       if (!authContext || !authContext.token) return;
//       try {
//         const response = await axios.get(`${Server_Url}/api/get-profile/`, {
//           headers: { Authorization: `Bearer ${authContext.token}` },
//         });
//         console.log(response.data.data);
//         if (response.data.data.user) {
//           setProfile(response.data.data.user);
//         } else {
//           console.error("No user data found in response");
//         }
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//         setLoading(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getProfile();
//   }, [authContext]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setProfile((prevProfile) =>
//       prevProfile ? { ...prevProfile, [name]: value } : null
//     );
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setSelectedFile(e.target.files[0]);
//     }
//   };

//   const handleSave = async () => {
//     if (!authContext || !authContext.token || !profile) return;
//     try {
//       const formData = new FormData();
//       if (selectedFile) {
//         formData.append("profilePicture", selectedFile); // Append selected file to FormData
//       }
//       formData.append("firstname", profile.firstname || ""); // Append other profile details
//       formData.append("lastname", profile.lastname || "");
//       formData.append("email", profile.email || "");
//       formData.append("mobile", profile.mobile || "");
//       formData.append("language", profile.language || "");
//       formData.append("country", profile.country || "");
//       formData.append("city", profile.city || "");

//       const response = await axios.patch(
//         `${Server_Url}/api/update-profile/`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${authContext.token}`,
//             "Content-Type": "multipart/form-data", // Ensure correct headers for FormData
//           },
//         }
//       );
//       toast({
//         description: "Profile updated successfully.",
//         position: "top",
//         status: "success",
//         duration: 3000,
//         isClosable: true,
//       });
//       console.log("Profile updated successfully", response.data);

//       // Update local profile state if the API response contains updated data
//       if (response.data.user) {
//         setProfile(response.data.user);
//       }
//     } catch (error) {
//       console.error("Error saving updates:", error);
//     }
//   };

//   if (loading) {
//     return <Text>Loading...</Text>;
//   }

//   if (!profile) {
//     return <Text>Error loading profile</Text>;
//   }

//   return (
//     <Box p={2} pt={0}>
//       <Heading size="lg" mb={4}>
//         Profile
//       </Heading>
//       <Grid templateColumns="repeat(3, 1fr)" gap={6}>
//         <GridItem colSpan={1}>
//           <VStack spacing={6}>
//             <Image
//               borderRadius="full"
//               boxSize="150px"
//               src={
//                 selectedFile
//                   ? URL.createObjectURL(selectedFile)
//                   : profile?.profilePicture || "https://via.placeholder.com/150"
//               }
//               alt={profile?.firstname}
//             />
//             <Heading size="md">
//               {profile.firstname} {profile.lastname}
//             </Heading>
//             <Flex>
//               {profile.user_types &&
//                 profile.user_types.map((type, index) => (
//                   <Badge
//                     key={index}
//                     p={2}
//                     colorScheme={
//                       type === "admin"
//                         ? "red"
//                         : type === "client"
//                         ? "blue"
//                         : type === "guide"
//                         ? "green"
//                         : "gray"
//                     }
//                     mr={index !== profile.user_types.length - 1 ? 2 : 0}
//                   >
//                     {type}
//                   </Badge>
//                 ))}
//             </Flex>
//             <Input type="file" onChange={handleFileChange} />
//           </VStack>
//         </GridItem>
//         <GridItem colSpan={2}>
//           <VStack spacing={4} align="stretch">
//             <Flex justifyContent={"space-between"}>
//               <FormControl mr={2}>
//                 <FormLabel>First Name</FormLabel>
//                 <Input
//                   name="firstname"
//                   value={profile.firstname || ""}
//                   onChange={handleInputChange}
//                   h={12}
//                 />
//               </FormControl>
//               <FormControl>
//                 <FormLabel>Last Name</FormLabel>
//                 <Input
//                   name="lastname"
//                   value={profile.lastname || ""}
//                   onChange={handleInputChange}
//                   h={12}
//                 />
//               </FormControl>
//             </Flex>
//             <FormControl>
//               <FormLabel>Email Address</FormLabel>
//               <Input
//                 name="email"
//                 value={profile.email}
//                 onChange={handleInputChange}
//                 h={12}
//               />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Phone Number</FormLabel>
//               <Input
//                 name="mobile"
//                 value={profile.mobile || ""}
//                 onChange={handleInputChange}
//                 h={12}
//               />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Language</FormLabel>
//               <Input
//                 name="language"
//                 value={profile.language || ""}
//                 onChange={handleInputChange}
//                 h={12}
//               />
//             </FormControl>
//             <Heading size="md">Address</Heading>
//             <FormControl>
//               <FormLabel>Country</FormLabel>
//               <Input
//                 name="country"
//                 value={profile.country || ""}
//                 onChange={handleInputChange}
//                 h={12}
//               />
//             </FormControl>
//             <FormControl>
//               <FormLabel>City</FormLabel>
//               <Input
//                 name="city"
//                 value={profile.city || ""}
//                 onChange={handleInputChange}
//                 h={12}
//               />
//             </FormControl>

//             <Flex justifyContent="center">
//               <Button
//                 bg={_mainColor}
//                 color={_secTxtColor}
//                 _hover={{ color: _mainColor, bg: _secTxtColor }}
//                 onClick={handleSave}
//               >
//                 Save Changes
//               </Button>
//             </Flex>
//           </VStack>
//         </GridItem>
//       </Grid>
//     </Box>
//   );
// };

// export default Profile;

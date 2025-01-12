import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const addUser = async () => {
  try {
    const usersRef = collection(db, "users"); // Reference to the 'users' collection
    const docRef = await addDoc(usersRef, {
      name: "John Doe",
      email: "john.doe@example.com",
    });
    console.log("User added with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

addUser();

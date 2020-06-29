import axios from "axios";
import { auth } from "../firebase/firebase.utils";

// axios.get("http://localhost:5000/api/test").then((response) => {
//   console.log(response.data);
// });

//protected
export const getProtected = async () => {
  if (!auth.currentUser) return;
  const token = await auth.currentUser.getIdToken();

  axios
    .get("http://localhost:5000/api/test/protected", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
    });
};

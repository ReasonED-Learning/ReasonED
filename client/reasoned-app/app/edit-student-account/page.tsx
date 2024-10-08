"use client";
import { useEffect, useState } from "react";
import Footer from "../../components/common/footer";
import LoggedInStudent from "../../components/common/logged-in-student";

// Client-side page to allow students to view their settings
const EditStudentAccount = () => {
  // Define state variables for currentUser and loading
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use useEffect to fetch user data when the component mounts
  useEffect(() => {
    // Define a function to fetch user data
    const fetchUserData = async () => {
      try {
        // Retrieve the JWT token from local storage
        const token = localStorage.getItem("token");

        // Fetch user data from the backend with token included in the headers
        const userDataResponse = await fetch(
          "http://localhost:3001/fetch/user",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Check if response is not ok
        if (!userDataResponse.ok) {
          // Handle error response
          throw new Error("Failed to fetch user data");
        }

        // Parse the JSON response
        const userData = await userDataResponse.json();

        // Log the user data
        console.log("User Data:", userData);

        // Set the user data to the currentUser state
        setCurrentUser(userData);

        // Set loading to false since data has been fetched
        setLoading(false);
      } catch (error) {
        // Log any errors
        console.error("Error fetching user data:", error);

        // Set loading to false to indicate that the data fetching is completed
        setLoading(false);
      }
    };

    // Call the fetchUserData function
    fetchUserData();
  }, []); // Run once on component mount

  // TSX Structure
  return (
    <>
      {/**Navbar */}
      <LoggedInStudent />

      {/**Page Body */}
      <div className="bg-orange h-screen flex justify-center items-center flex-col text-center">
        <div className="font-bold text-white text-xl flex flex-col gap-1/2">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-8">
              <div className="text-center">
                <h2 className="text-lg font-semibold text-purple">
                  {"Update Account"}
                </h2>
              </div>

              <p className="mt-4 text-sm text-purple">
                Note: You cannot change your email address.
              </p>
            </div>

            {/* Box Footer */}
            <div className="bg-gray-200 px-6 py-4">
              {/* Change Username */}
              <div className="flex justify-center mt-2">
                <a
                  href="/change-username"
                  className="text-sm text-purple hover:underline"
                >
                  Change Username
                </a>
              </div>

              {/* Change Password */}
              <div className="flex justify-center">
                <a
                  href="/change-student-password"
                  className="text-sm text-purple hover:underline"
                >
                  Change Password
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/**Footer */}
      <Footer />
    </>
  );
};

export default EditStudentAccount;

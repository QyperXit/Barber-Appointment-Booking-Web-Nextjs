// import { getAuth } from "@clerk/nextjs/server";
// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(req, res) {
//   try {
//     const { userId } = getAuth(req);

//     // Logic to retrieve data based on userId goes here

//     // Example: Accessing user data from a database
//     // Replace this with your actual function call
//     const userData = await fetchUserById(userId); // Assuming you have a function named fetchUserById

//     return res.status(200).json({ userData }); // Return the retrieved data
//     console.log(res)
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }

import React from "react";
import Navbar from "../NavBar";
import torch from "../Img/torch.avif";

export default function Result() {
  const olympicResults = [
    { country: "USA", gold: 39, silver: 41, bronze: 33, total: 113 },
    { country: "China", gold: 38, silver: 32, bronze: 18, total: 88 },
    { country: "Japan", gold: 27, silver: 14, bronze: 17, total: 58 },
    { country: "Nepal", gold: 26, silver: 12, bronze: 19, total: 57 },
    { country: "India", gold: 17, silver: 10, bronze: 15, total: 42 },
    { country: "Maldives", gold: 7, silver: 4, bronze: 7, total: 18},
    { country: "Spain", gold: 6, silver: 4, bronze: 7, total: 17},
    { country: "Italy", gold: 6, silver: 5, bronze: 6, total: 17},
    { country: "Canada", gold: 5, silver: 5, bronze: 5, total: 15},
    { country: "Australia", gold: 5, silver: 5, bronze: 5, total: 15},
    // Add more countries and their respective medal counts
  ];

  return (
    <>
      <Navbar />
      <div className="m-3 flex justify-center">
        <img src={torch} alt="torch" className="w-20" />
        <b className="mt-6 text-3xl">Results</b>
        <img src={torch} alt="torch" className="w-20" />
      </div>
      <hr className=" bg-red-600 h-0.5" />

      <div className="flex justify-center text-center mt-10">
        <table className="table-auto border border-gray-400 w-2/3 mb-5">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-lime-300 border border-gray-400">Country</th>
              <th className="px-4 py-2 bg-yellow-300 border border-gray-400">
                Gold
              </th>
              <th className="px-4 py-2 bg-green-300 border border-gray-400">
                Silver
              </th>
              <th className="px-4 py-2 bg-blue-300 border border-gray-400">
                Bronze
              </th>
              <th className="px-4 py-2 bg-teal-300 border border-gray-400">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {olympicResults.map((result, index) => (
              <tr key={index}>
                <td className="px-4 bg-lime-100 py-2 border border-gray-400">
                  {result.country}
                </td>
                <td className="px-4 py-2 bg-yellow-100 border border-gray-400">
                  {result.gold}
                </td>
                <td className="px-4 py-2 bg-green-100 border border-gray-400">
                  {result.silver}
                </td>
                <td className="px-4 py-2 bg-blue-100 border border-gray-400">
                  {result.bronze}
                </td>
                <td className="px-4 py-2 bg-teal-100 border border-gray-400">
                  {result.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

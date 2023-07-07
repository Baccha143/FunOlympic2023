import React from "react";

export default function Broadcast() {
  const olympicGames = [
    {
      Game: "Football",
      country: "USA VS Oman",
      Date: "2023/07/10",
      Time: "12:45 NST",
      isLive: false,
    },
    {
      Game: "Football",
      country: "Nepal VS India",
      Date: "2023/07/15",
      Time: "12:45 NST",
      isLive: false,
    },
    {
      Game: "Basketball",
      country: "China VS Pakistan",
      Date: "2023/08/01",
      Time: "12:45 NST",
      isLive: false,
    },
    {
      Game: "Volleyball",
      country: "England VS Spain",
      Date: "2023/06/24",
      Time: "12:45 NST",
      isLive: false,
    },
  ];

  return (
    <>
      <div className="mt-8 ml-5">
        <label>
          <b className="text-2xl flex justify-center">Broadcasts:</b>
        </label>
        <div className="p-5 flex justify-center">
          <table className="table-auto border border-gray-400">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-gray-400">Game</th>
                <th className="px-4 py-2 bg-yellow-300 border border-gray-400">
                  Country
                </th>
                <th className="px-4 py-2 bg-green-300 border border-gray-400">
                  Date
                </th>
                <th className="px-4 py-2 bg-blue-300 border border-gray-400">
                  Time
                </th>
                <th className="px-4 py-2 bg-blue-300 border border-gray-400">
                  Live
                </th>
              </tr>
            </thead>
            <tbody>
              {olympicGames.map((game, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border border-gray-400">
                    {game.Game}
                  </td>
                  <td className="px-4 py-2 bg-yellow-100 border border-gray-400">
                    {game.country}
                  </td>
                  <td className="px-4 py-2 bg-green-100 border border-gray-400">
                    {game.Date}
                  </td>
                  <td className="px-4 py-2 bg-blue-100 border border-gray-400">
                    {game.Time}
                  </td>
                  <td className="px-4 py-2 bg-blue-100 border border-gray-400">
                    <button
                      onClick={() => {
                        alert("Broadcast Started Successfully");
                      }}
                      className="bg-blue-300 px-2 py-1 mx-2 rounded-lg hover:bg-red-300"
                    >
                      Start Live
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

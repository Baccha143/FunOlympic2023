import React from "react";
import torch from "../Img/torch.avif";
import Navbar from "../NavBar";
import Comments from "../Comments";

function Live() {
  const olympicGames = [
    {
      Game: "Football",
      country: "USA VS Oman",
      Date: "2023/07/10",
      Time: "12:45 NST",
    },
    {
      Game: "Football",
      country: "Nepal VS India",
      Date: "2023/07/15",
      Time: "12:45 NST",
    },
    {
      Game: "Basketball",
      country: "China VS Pakistan",
      Date: "2023/08/01",
      Time: "12:45 NST",
    },
    {
      Game: "Volleyball",
      country: "England VS Spain",
      Date: "2023/06/24",
      Time: "12:45 NST",
    },
  ];
  return (
    <>
      <Navbar />
      <div className="m-3 flex justify-center">
        <img src={torch} alt="torch" className="w-20" />
        <b className="mt-6 text-3xl">Live Matches</b>
        <img src={torch} alt="torch" className="w-20" />
      </div>
      <hr className=" bg-red-600 h-0.5" />
      <div className="px-36 py-10 flex">
        <iframe
          width="800"
          height="480"
          src="//ok.ru/videoembed/5885624257139"
          frameborder="0"
          title="Football game"
          allow="autoplay"
          allowfullscreen
        ></iframe>
        <Comments />
      </div>
      <hr className=" bg-red-600 h-0.5" />
      <div className="flex flex-col items-center my-10">
        <div className="mb-10">
          <b className="text-3xl">Upcoming Live Matches</b>
        </div>
        <div>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <hr className=" bg-red-600 h-0.5" />

      <div className="px-36 py-10 flex justify-center">
        <div className="text-center mx-2">
          <b className="text-2xl">Swimming</b>
          <iframe
            className="mt-2"
            width="480"
            height="275"
            src="//ok.ru/videoembed/27095140879"
            frameborder="0"
            title="swimming"
            allow="autoplay"
            allowfullscreen
          ></iframe>
        </div>

        <div className="text-center mx-2">
          <b className="text-2xl">Men's Basketball</b>
          <iframe
            className="mt-2"
            width="480"
            height="275"
            src="//ok.ru/videoembed/1594479550067"
            frameborder="0"
            title="basketball"
            allow="autoplay"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      <div className="px-36 flex justify-center mb-5">
        <div className="text-center mx-2">
          <b className="text-2xl">Men's Hockey</b>
          <iframe
            className="mt-2"
            width="480"
            height="275"
            src="//ok.ru/videoembed/2789858806317"
            frameborder="0"
            title="hockey"
            allow="autoplay"
            allowfullscreen
          ></iframe>
        </div>

        <div className="text-center mx-2">
          <b className="text-2xl">Men's Volleyball</b>
          <iframe
            className="mt-2"
            width="480"
            height="275"
            src="//ok.ru/videoembed/5816937417257"
            frameborder="0"
            title="volleyball"
            allow="autoplay"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </>
  );
}

export default Live;

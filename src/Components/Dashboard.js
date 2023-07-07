import React from "react";
import Navbar from "./NavBar";
import logo from "./Img/logo.webp";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="">
        <img src={logo} alt="olympic logo" className="w-full" />
      </div>
      <div className="px-36 py-10 text-center">
        <p className="text-justify text-xl my-2">
          Yokyo, a renowned and innovative country known for its rich culture
          and technological advancements, has been awarded the prestigious
          opportunity to host the Olympic Games in 2023. With its exceptional
          track record of success and commitment to excellence, Yokyo is poised
          to deliver an extraordinary Olympic experience that will captivate the
          world. As the host of the Olympic Games in 2023, Yokyo aims to create
          an unforgettable event that will leave a lasting impact on athletes,
          spectators, and the global community. With meticulous planning,
          state-of-the-art infrastructure, and a deep understanding of the
          Olympic spirit, the city will ensure that the games are executed
          flawlessly, embracing the values of fair competition, unity, and
          friendship. Yokyo's vision for the Olympic Games in 2023 extends
          beyond the sporting events themselves. Recognizing the significance of
          the games as a platform for cultural exchange, the city will showcase
          its unique blend of tradition and modernity, offering a vibrant and
          immersive experience for visitors from around the world. <br />
          <br />
          Furthermore, Yokyo is committed to leaving a positive and lasting
          legacy. Environmental sustainability, social responsibility, and
          economic growth are key priorities. By implementing eco-friendly
          practices, supporting local communities, and fostering economic
          development, the city will ensure that the Olympic Games in 2023 have
          a transformative impact that extends far beyond the sporting arena.
          With the honor of hosting the Olympic Games, Yokyo is prepared to
          demonstrate its expertise, creativity, and unwavering commitment to
          excellence. The city is eager to bring its unique vision to life,
          celebrating the Olympic spirit while leaving a legacy that will
          inspire future generations. The Olympic Games in 2023 will be a
          testament to Yokyo's ability to deliver extraordinary experiences and
          make a meaningful impact on a global scale.
        </p>
      </div>
    </>
  );
}

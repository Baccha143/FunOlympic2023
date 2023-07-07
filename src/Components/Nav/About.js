import React from "react";
import Navbar from "../NavBar";
import torch from "../Img/torch.avif";

function About() {
  return (
    <>
      <Navbar />
      <div className="m-3 flex justify-center">
        <img src={torch} alt="torch" className="w-20" />
        <b className="mt-6 text-3xl">About</b>
        <img src={torch} alt="torch" className="w-20" />
      </div>
      <hr className=" bg-red-600 h-0.5" />

      <div className="px-36 py-10 text-center">
        <p className="text-justify text-xl my-2">
          The Olympic Games are a time when many nations come together to
          celebrate athleticism and mental strength. The International Olympic
          Committee (IOC) aims to promote sport competition and education free
          of any discrimination, “in a spirit of friendship, solidarity and fair
          play.” The Olympics are a time when, supposedly, political feuds are
          set aside. The IOC even promotes the concept of the Olympic truce in
          its charter, a policy which was observed during the ancient Olympics.
          Despite the IOC's goals for international peace during the Games,
          politics have disrupted the Olympic Games throughout its history,
          whether through boycotts, propaganda, or protests. Here are seven
          instances of politics infiltrating the Olympic Games.
          <br /><br />
          The Olympic Games, commonly known as the Olympics, is a prestigious
          international sporting event that takes place every four years. It
          brings together athletes from various countries to compete in a wide
          range of sports disciplines, showcasing their skills, determination,
          and sportsmanship on a global stage. The history of the Olympics can
          be traced back to ancient Greece, where the games were held in Olympia
          from the 8th century BCE to the 4th century CE. The modern Olympic
          Games, as we know them today, were revived in 1896 by Pierre de
          Coubertin, a French educator and historian. The primary objectives of
          the Olympics are to promote unity, peace, and understanding among
          nations through sports. The games aim to transcend political,
          cultural, and social barriers, emphasizing fair play and camaraderie.
          The Olympic motto, "Faster, Higher, Stronger," encourages athletes to
          push their limits and strive for excellence in their respective
          disciplines. The Summer Olympics and Winter Olympics are the two main
          editions of the Olympic Games. The Summer Olympics feature a wide
          range of sports, including athletics, swimming, gymnastics,
          basketball, soccer, and many others. The Winter Olympics focus on
          winter sports such as skiing, ice hockey, figure skating,
          snowboarding, and curling. The International Olympic Committee (IOC)
          is responsible for organizing and overseeing the Olympic Games. The
          host city and country for each edition of the Olympics are selected
          through a bidding process, with cities presenting their plans and
          infrastructure to the IOC for evaluation. The Olympic Games are not
          only a celebration of athleticism but also an opportunity to promote
          cultural exchange and understanding.
          <br /> <br /> The opening and closing ceremonies of the Olympics showcase the
          host country's rich heritage and traditions, providing a platform to
          highlight their culture and artistic performances. Winning an Olympic
          medal is a tremendous achievement for athletes, symbolizing their
          dedication, hard work, and excellence in their respective sports.
          Gold, silver, and bronze medals are awarded to the top three athletes
          or teams in each event, representing the pinnacle of sporting success.
          Beyond the sporting events, the Olympics also have a significant
          impact on the host city and country. They provide an opportunity for
          infrastructure development, economic growth, tourism promotion, and
          global visibility. In summary, the Olympic Games are a monumental
          international sporting event that brings together athletes from around
          the world to compete, inspire, and promote unity. It represents the
          pursuit of athletic excellence, cultural exchange, and the values of
          fair play, friendship, and respect.
        </p>
      </div>
    </>
  );
}

export default About;

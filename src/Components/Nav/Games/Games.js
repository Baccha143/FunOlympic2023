import React from "react";
import Navbar from "../../NavBar";
import torch from "../../Img/torch.avif";

function Games() {
  return (
    <>
      <Navbar />
      <div className="m-3 flex justify-center">
        <img src={torch} alt="torch" className="w-20" />
        <b className="mt-6 text-3xl">Games</b>
        <img src={torch} alt="torch" className="w-20" />
      </div>
      <hr className=" bg-red-600 h-0.5" />

      <div className="px-36 py-10">
        <div className="flex">
          <img
            src="https://www.mpl.live/blog/wp-content/uploads/2022/06/archery-feature-image.jpg"
            alt="Archery"
            className="w-1/2"
          />
          <div className=" p-3 text-justify bg-slate-200">
            <h1 className="text-2xl text-center">
              <b>Archery</b>
            </h1>
            <p>
              Archers at the Olympic Games use recurve bows and compete in the
              discipline of target archery. The competition features individual,
              mixed team and team events. A mixed team consists of two archers,
              one man and one woman, shooting in the same category (with the
              same bow). A team consists of three archers of the same gender
              shooting in the same category (with the same bow). Nations must
              qualify quota places. A maximum of 128 athletes can compete, 64
              men and 64 women. Places are won at world qualifying events and
              continental qualifying events. A small number of places are
              assigned using the universality system, which ensures archery's
              developing countries can participate and the competition field
              remains diverse. Each country can send a maximum of three men and
              three women to the Olympic Games. Archers shoot over a distance of
              70 metres at targets measuring 122 centimetres in diameter, aiming
              to hit a 10-ring measuring just 12.2 centimetres in diameter. The
              qualification phase of the competition, which consists of 72
              arrows shot for total score, seeds the archers for the matchplay
              phase.
            </p>
          </div>
        </div>
        <br />
        <hr className=" bg-black h-0.5" />
        <br />
        <div className="flex">
          <div className="p-3 text-justify bg-slate-200">
            <h1 className="text-2xl text-center">
              <b>Badminton</b>
            </h1>
            <p>
              Badminton had its debut as an official event on the 1992 Summer
              Olympics and has been contested in eight Olympiads. 74 different
              nations have appeared in the Olympic badminton competitions, with
              18 appearing all eight times. It is governed by the Badminton
              World Federation. Badminton at the Summer Olympics. For singles,
              29 competitors are selected. For doubles, 19 pairs are selected.
              The general method of selection is by ranking, though the
              selection process stops once all qualification positions are
              filled. All players or pairs from the top 16 places on that list
              qualify, though each National Olympic Committee can send a maximum
              of three players/pairs. Players and pairs through the 64th place
              on that ranking qualify, with the caveat that each NOC can send
              only two players/pairs from that portion of the list. Players and
              pairs ranked below that only qualify if they are the
              highest-ranked competitor from their nation.
            </p>
          </div>
          <img
            src="https://news.cgtn.com/news/2021-07-22/Team-China-at-Tokyo-2020-Shuttlers-seek-breakthrough-in-badminton-126SfE0AcuI/img/54d2e08c31c846259eb26b01b72f6a69/54d2e08c31c846259eb26b01b72f6a69.png"
            alt="Badminton"
            className="w-1/2"
          />
        </div>
        <br />
        <hr className=" bg-black h-0.5" />
        <br />
        <div className="flex">
          <img
            src="https://mcmscache.epapr.in/post_images/website_350/post_23770756/full.jpg"
            alt="Hockey"
            className="w-1/2"
          />
          <div className="p-3 text-justify bg-slate-200">
            <h1 className="text-2xl text-center">
              <b>Hockey</b>
            </h1>
            <p>
              Field hockey was introduced at the Olympic Games as a men's
              competition at the 1908 Games in London, with six teams, four from
              the United Kingdom of Great Britain and Ireland and other two were
              France and Germany. Quite simply the most prestigious tournament
              in hockey, the Olympics is a huge event for players and fans
              alike. As thousands of athletes arrive to compete in a series of
              sports, 24 of the best men's and women's hockey teams come
              together with just one aim: winning Gold for their country.
            </p>
          </div>
        </div>
        <br />
        <hr className=" bg-black h-0.5" />
        <br />
        <div className="flex">
          <div className=" p-3 text-justify bg-slate-200">
            <h1 className="text-2xl text-center">
              <b>100M Running</b>
            </h1>
            <p>
              The 100-meter race is a highly anticipated sprint event in the
              Olympic Games. Athletes compete to cover the distance in the
              shortest time possible. It has a long history in the Olympics and
              is known for breaking world records. The race requires explosive
              power, speed, and precision, with races often decided by
              milliseconds. The 100m race is open to both men and women and is a
              highlight of the athletics program. Winning the Olympic gold medal
              in the event is a significant achievement and establishes an
              athlete as one of the fastest in the world.
            </p>
          </div>
          <img
            src="https://statathlon.com/wp-content/uploads/2018/03/gty_826741938_92856413.jpg"
            alt="100M race"
            className="w-1/2"
          />
        </div>
        <br />
        <hr className=" bg-black h-0.5" />
        <br />
        <div className="flex">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Depart4x100.jpg"
            alt="Swimming"
            className="w-1/2"
          />
          <div className="p-3 text-justify bg-slate-200">
            <h1 className="text-2xl text-center">
              <b>Swimming</b>
            </h1>
            <p>
              Swimming is a prominent sport in the Olympic Games, featuring
              various events in different swimming styles. Athletes compete in
              pools, aiming to set records and win medals. The sport includes
              individual races of different distances and strokes, as well as
              team relay events. Swimmers participate in heats, semifinals, and
              finals, with the fastest progressing to each stage. Olympic
              swimming has seen the emergence of legendary athletes who have
              achieved remarkable success and set records. It is a highly
              anticipated sport that embodies the values of competition, skill,
              and achievement.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Games;

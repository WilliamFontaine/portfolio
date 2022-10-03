import React from "react";
import { Contact } from "../../components/Contact/Contact";
import { Experiences } from "../../components/Experiences/Experiences";
import { Footer } from "../../components/Footer/Footer";
import { Games } from "../../components/Games/Games";
import { Header } from "../../components/Header/Header";
import { Introduction } from "../../components/Introduction/Introduction";
import { Skills } from "../../components/Skills/Skills";
import { StickyMenu } from "../../components/StickyMenu/StickyMenu";
import { ParallaxBanner } from "react-scroll-parallax";

import "./HomePage.css";

import bg1_first from "../../images/background/first/bg-1.svg";
import bg2_first from "../../images/background/first/bg-2.svg";
import bg3_first from "../../images/background/first/bg-3.svg";
import bg4_first from "../../images/background/first/bg-4.svg";

import bg1_second from "../../images/background/second/bg-1.svg";
import bg2_second from "../../images/background/second/bg-2.svg";

import bg2_fourth from "../../images/background/fourth/bg-2.svg";
import bg3_fourth from "../../images/background/fourth/bg-3.svg";

export function HomePage() {
  return (
    <div className="homePage">
      <ParallaxBanner
        layers={[
          {
            image: bg1_first,
            translateY: [-30, 50],
            shouldAlwaysCompleteAnimation: true,
            expanded: false,
          },
          {
            image: bg2_first,
            translateY: [-25, 40],
            shouldAlwaysCompleteAnimation: true,
            expanded: false,
          },
          {
            image: bg3_first,
            translateY: [-25, 30],
            shouldAlwaysCompleteAnimation: true,
            expanded: false,
          },
          {
            image: bg4_first,
            translateY: [0, 20],
            shouldAlwaysCompleteAnimation: true,
            expanded: false,
          },
        ]}
      >
        <StickyMenu />
        <Header />
        <Introduction />
      </ParallaxBanner>
      <ParallaxBanner
        layers={[
          {
            image: bg2_second,
            translateY: [-20, 20],
            shouldAlwaysCompleteAnimation: true,
            expanded: false,
          },
          {
            image: bg1_second,
            translateY: [0, -50],
            shouldAlwaysCompleteAnimation: true,
            expanded: false,
          },
        ]}
      >
        <Experiences />
        <Skills />
      </ParallaxBanner>

      <Games />

      <ParallaxBanner
        layers={[
          {
            image: bg3_fourth,
            translateY: [-20, 10],
            shouldAlwaysCompleteAnimation: true,
            expanded: true,
          },
          {
            image: bg2_fourth,
            translateY: [-20, -10],
            shouldAlwaysCompleteAnimation: true,
            expanded: true,
          },
        ]}
      >
        <Contact />
        <Footer />
      </ParallaxBanner>
    </div>
  );
}

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

import bg1_first_light from "../../images/background/first/bg-1_light.svg";
import bg1_first_dark from "../../images/background/first/bg-1_dark.svg";
import bg2_first_light from "../../images/background/first/bg-2_light.svg";
import bg2_first_dark from "../../images/background/first/bg-2_dark.svg";
import bg3_first_light from "../../images/background/first/bg-3_light.svg";
import bg3_first_dark from "../../images/background/first/bg-3_dark.svg";
import bg4_first_light from "../../images/background/first/bg-4_light.svg";
import bg4_first_dark from "../../images/background/first/bg-4_dark.svg";

import bg1_second_light from "../../images/background/second/bg-1_light.svg";
import bg1_second_dark from "../../images/background/second/bg-1_dark.svg";
import bg2_second_light from "../../images/background/second/bg-2_light.svg";
import bg2_second_dark from "../../images/background/second/bg-2_dark.svg";

import bg1_fourth_light from "../../images/background/third/bg-1_light.svg";
import bg1_fourth_dark from "../../images/background/third/bg-1_dark.svg";
import bg2_fourth_light from "../../images/background/third/bg-2_light.svg";
import bg2_fourth_dark from "../../images/background/third/bg-2_dark.svg";
import { ThemeConsumerHook } from "../../store/ThemeStore";

export function HomePage() {
  const [{ theme }] = ThemeConsumerHook();

  return (
    <div className="homePage">
      <ParallaxBanner
        layers={[
          {
            image: theme === "light-theme" ? bg1_first_light : bg1_first_dark,
            translateY: [-20, 50],
            shouldAlwaysCompleteAnimation: true,
            expanded: false,
          },
          {
            image: theme === "light-theme" ? bg2_first_light : bg2_first_dark,
            translateY: [-20, 40],
            shouldAlwaysCompleteAnimation: true,
            expanded: false,
          },
          {
            image: theme === "light-theme" ? bg3_first_light : bg3_first_dark,
            translateY: [-30, 20],
            shouldAlwaysCompleteAnimation: true,
            expanded: false,
          },
          {
            image: theme === "light-theme" ? bg4_first_light : bg4_first_dark,
            translateY: [-15, 0],
            shouldAlwaysCompleteAnimation: true,
            expanded: true,
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
            image: theme === "light-theme" ? bg2_second_light : bg2_second_dark,

            translateY: [-20, 20],
            shouldAlwaysCompleteAnimation: true,
            expanded: false,
          },
          {
            image: theme === "light-theme" ? bg1_second_light : bg1_second_dark,
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
            image: theme === "light-theme" ? bg2_fourth_light : bg2_fourth_dark,
            translateY: [-20, 10],
            shouldAlwaysCompleteAnimation: true,
            expanded: true,
          },
          {
            image: theme === "light-theme" ? bg1_fourth_light : bg1_fourth_dark,
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

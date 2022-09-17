import React from "react";
import { Contact } from "../components/Contact/Contact";
import { Experiences } from "../components/Experiences/Experiences";
import { Footer } from "../components/Footer/Footer";
import { Games } from "../components/Games/Games";
import { Header } from "../components/Header/Header";
import { Introduction } from "../components/Introduction/Introduction";
import { Skills } from "../components/Skills/Skills";
import { StickyMenu } from "../components/StickyMenu/StickyMenu";

export function HomePage() {
  return (
    <div className="homePage">
      <Header />
      <Introduction />
      <Experiences />
      <Skills />
      <Games />
      <StickyMenu />
      <Contact />
      <Footer />
    </div>
  );
}

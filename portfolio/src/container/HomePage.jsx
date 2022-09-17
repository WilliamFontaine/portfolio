import React from "react";
import { Contact } from "../components/Contact";
import { Experiences } from "../components/Experiences";
import { Footer } from "../components/Footer";
import { Games } from "../components/Games";
import { Header } from "../components/Header";
import { Introduction } from "../components/Introduction";
import { Skills } from "../components/Skills";
import { StickyMenu } from "../components/StickyMenu";

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

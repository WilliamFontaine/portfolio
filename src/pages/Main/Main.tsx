import Navbar from '../../components/Banner/Navbar';
import Contact from '../../components/Contact/Contact';
import Experience from '../../components/Experience/Experience';
import Banner from '../../components/Header/Banner';
import Projects from '../../components/Projects/Projects';
import Skills from '../../components/Skills/Skills';
import Study from '../../components/Study/Study';

function Main() {
  return (
    <>
      <Navbar />
      <Banner />
      <Experience />
      <Study />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}

export default Main;

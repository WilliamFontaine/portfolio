import { useState } from 'react';
import './Skills.scss';
import { motion } from 'framer-motion';

type Position = {
  x: number;
  y: number;
};

type Positions = {
  [key: string]: Position;
};

function Skills() {
  const skillsList: string[] = [
    'Java',
    'JavaScript',
    'TypeScript',
    'Laravel',
    'Spring',
    'Nodejs',
    'HTML5',
    'CSS3',
    'Sass',
    'Angular',
    'React',
    'VueJS',
    'MariaDB',
    'PostgreSQL',
    'Docker',
    'GitHub',
    'GitLab',
  ];

  const newPosition = (): Position => ({
    x: Math.floor(Math.random() * (screen.width - 200)),
    y: Math.floor(Math.random() * 500),
  });

  const initialPositions: Positions = skillsList.reduce(
    (acc: Positions, skill: string) => {
      acc[skill] = newPosition();
      return acc;
    },
    {}
  );

  const [positions, setPositions] = useState<Positions>(initialPositions);

  const handleMarbleClick = (skill: string) => () => {
    console.log(skill);
    setPositions({
      ...positions,
      [skill]: newPosition(),
    });
  };

  console.log(positions);

  return (
    <div id="skills" className="skills">
      <div className="title-container">
        <h2 className="title">Compétences</h2>
      </div>
      <div className="skills-container">
        {skillsList.map((skill) => (
          <motion.div
            className="skill"
            onClick={handleMarbleClick(skill)}
            animate={{ x: positions[skill].x, y: positions[skill].y }}
            key={skill}
          >
            <img
              className="skill-img logo"
              src={`/skills/${skill}.png`}
              alt={skill}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Skills;

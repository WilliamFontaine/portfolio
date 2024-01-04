import { useEffect, useState } from 'react';
import './Skills.scss';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

type Position = {
  x: number;
  y: number;
};

type Positions = {
  [key: string]: Position;
};

function Skills() {
  const { t } = useTranslation();
  const [width, setWidth] = useState<number>(0);

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
    x: Math.floor(Math.random() * (screen.width - width)),
    y: Math.floor(Math.random() * 500),
  });

  const initialPositions: Positions = skillsList.reduce(
    (acc: Positions, skill: string) => {
      acc[skill] = {
        x: 0,
        y: 0,
      };
      return acc;
    },
    {}
  );

  const [positions, setPositions] = useState<Positions>(initialPositions);

  const handleMarbleClick = (skill: string) => () => {
    setPositions({
      ...positions,
      [skill]: newPosition(),
    });
  };

  useEffect(() => {
    if (screen.width < 600) {
      setWidth(50);
    } else if (screen.width < 1200) {
      setWidth(100);
    } else {
      setWidth(200);
    }
  }, []);

  useEffect(() => {
    const newPositions: Positions = skillsList.reduce(
      (acc: Positions, skill: string) => {
        acc[skill] = newPosition();
        return acc;
      },
      {}
    );

    setPositions(newPositions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  return (
    <div id="skills" className="skills">
      <div className="title-container">
        <h2 className="title">{t('skills.title')}</h2>
      </div>
      <div className="skills-container">
        {skillsList.map((skill) => (
          <motion.div
            className="skill"
            onClick={handleMarbleClick(skill)}
            animate={{ x: positions[skill].x, y: positions[skill].y }}
            key={skill}
            title={skill}
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

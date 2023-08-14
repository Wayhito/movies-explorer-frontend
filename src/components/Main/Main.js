// О проекте
import React from 'react';

import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import AboutProject from '../AboutProject/AboutProject';
import Portfolio from '../Portfolio/Portfolio';
import './Main.css';

function Main() {
  return (
    <main className="main">
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  );
}

export default Main;
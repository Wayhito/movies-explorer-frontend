import NavTab from '../NavTab/NavTab';
import React from 'react';
import './Promo.css';

function Promo() {
  return (
    <div className="promo">
      <div className="promo__background">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <NavTab />
      </div>
    </div>
  );
}

export default Promo;
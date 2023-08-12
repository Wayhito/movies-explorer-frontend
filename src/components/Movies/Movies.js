import './Movies.css';
import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import TestCards from '../../utils/TestCards';

const Movies = ({ openPopup }) => {

  return (
    <div className="movies">
      <SearchForm />
      <MoviesCardList 
      cards={TestCards} 
      buttonMore={true} />
    </div>
  );
};

export default Movies;
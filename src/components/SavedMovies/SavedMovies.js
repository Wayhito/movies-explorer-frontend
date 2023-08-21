import './SavedMovies.css';
import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import mainApi from '../../utils/MainApi.js';

const SavedMovies = ({ openPopup }) => {
  const [films, setFilms] = useState(null);
  const [preloader, setPreloader] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [filmsTumbler, setFilmsTumbler] = useState(false);
  const [filmsInputSearch, setFilmsInputSearch] = useState('');
  const [filmsShowed, setFilmsShowed] = useState([]);
  
  const [filmsWithTumbler, setFilmsWithTumbler] = useState([]);
  const [filmsShowedWithTumbler, setFilmsShowedWithTumbler] = useState([]);

  useEffect(() => {
    //Удалим прошлый запрос т.к. он уже не нужен.
    localStorage.removeItem('InputText');
    async function getFilmsFunc() {

      try {
        const data = await mainApi.getMovies();
        setFilms(data);
        setFilmsShowed(data);
      } catch (err) {
        openPopup(`Ошибка сервера ${err}`);
      }
    };
    getFilmsFunc();
  }, [openPopup]);

  async function handleGetMovies(inputSearch, tumbler) {
    setErrorText('');
    setPreloader(true);
    
    try {
      //const data = films;
      const data = await mainApi.getMovies();
      let filterData = data.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()));

      if (tumbler) filterData = filterData.filter(({ duration }) => duration <= 40);
      
      setFilmsShowed(filterData);

      if (inputSearch) {
        localStorage.setItem('InputText', inputSearch);
        localStorage.setItem('savedFilms', JSON.stringify(filterData));
        localStorage.setItem('savedFilmsTumbler', tumbler);
        localStorage.setItem('savedFilmsInputSearch', inputSearch);
      } else {
        localStorage.removeItem('InputText');
        localStorage.removeItem('savedFilms');
        localStorage.removeItem('savedFilmsTumbler');
        localStorage.removeItem('savedFilmsInputSearch');
      }
    } catch (err) {
      setErrorText(
        'Фильмов по запросу нет или произошла ошибка.'
      );

      setFilms([]);
      localStorage.removeItem('savedFilms');
      localStorage.removeItem('savedFilmsTumbler');
      localStorage.removeItem('savedFilmsInputSearch');
    } finally {
      setPreloader(false);
    }
  }

  async function savedMoviesToggle(film, favorite) {
    if (!favorite) {
      try {
        await mainApi.deleteMovies(film._id);
        const newFilms = await mainApi.getMovies();
        setFilms(newFilms);
        setFilmsShowed(newFilms);

      } catch (err) {
        openPopup('Ошибка удаления');
      }

      // Попробуем найти прошлый запрос. Если есть запрос в прошлом - значит, остаемся на странице запроса.
      //Если запроса нет - остаемся на главной странице без поиска.
      const InputSearchText = localStorage.getItem('InputText');
      if (InputSearchText) {
        handleGetMovies(InputSearchText);
        localStorage.removeItem('InputText');
      }
    }
  }

  async function handleGetMoviesTumbler(tumbler) {
    let filterDataShowed = [];
    let filterData = [];

    if (tumbler) {
      setFilmsShowedWithTumbler(filmsShowed);
      setFilmsWithTumbler(films);
      filterDataShowed = filmsShowed.filter(({ duration }) => duration <= 40);
      filterData = films.filter(({ duration }) => duration <= 40);
    } else {
      filterDataShowed = filmsShowedWithTumbler;
      filterData = filmsWithTumbler;
    }

    // localStorage.setItem('films', JSON.stringify(filterDataShowed.concat(filterData)));
    // localStorage.setItem('filmsTumbler', tumbler);
    setFilmsShowed(filterDataShowed);
    setFilms(filterData);
  }

  return (
    <div className="saved-movies">
      <SearchForm handleGetMovies={handleGetMovies} filmsTumbler={filmsTumbler} filmsInputSearch={filmsInputSearch} handleGetMoviesTumbler={handleGetMoviesTumbler}/>
      {preloader && <Preloader />}
      {errorText && <div className="saved-movies__text-error">{errorText}</div>}
      {!preloader && !errorText && films !== null && (
        <MoviesCardList filmsRemains={[]} savedMoviesToggle={savedMoviesToggle} films={filmsShowed} />
      )}
    </div>
  );
};

export default SavedMovies;
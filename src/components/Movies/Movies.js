import './Movies.css';
import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi.js';

const Movies = ({ openPopup }) => {
  const [films, setFilms] = useState(null);
  const [filmsSaved, setFilmsSaved] = useState(null);
  const [preloader, setPreloader] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [filmsTumbler, setFilmsTumbler] = useState(false);
  const [filmsInputSearch, setFilmsInputSearch] = useState('');
  const [MoviesCount, setMoviesCount] = useState([]);
  const [filmsShowed, setFilmsShowed] = useState(null);
  const [filmsWithTumbler, setFilmsWithTumbler] = useState([]);
  const [filmsShowedWithTumbler, setFilmsShowedWithTumbler] = useState([]);
  
  useEffect(() => {
    setMoviesCount(getMoviesCount());
    const handlerResize = () => setMoviesCount(getMoviesCount());
    window.addEventListener('resize', handlerResize);

    //handleGetMovies();
    // const prevInput = localStorage.getItem('filmsInputSearch');
    // handleGetMovies(prevInput);

    return () => {
      window.removeEventListener('resize', handlerResize);
    };
  }, []);

  function getMoviesCount() {
    let countCards;
    const clientWidth = document.documentElement.clientWidth;
    const MoviesCountConfig = {
      '1250': [12, 3],
      '700': [8, 2],
      '550': [5, 2],
      '240': [5, 2],
    };

    Object.keys(MoviesCountConfig)
      .sort((a, b) => a - b)
      .forEach((key) => {
        if (clientWidth > +key) {
          countCards = MoviesCountConfig[key];
        }
      });

    return countCards;
  }

  function handleMore() {
    const spliceFilms = films;
    const newFilmsShowed = filmsShowed.concat(spliceFilms.splice(0, MoviesCount[1]));
    setFilmsShowed(newFilmsShowed);
    setFilms(spliceFilms);
  }

  async function handleGetMovies(inputSearch, tumbler) {
    setFilmsTumbler(false);
    localStorage.setItem('filmsTumbler', false);

    if (!inputSearch) {
      setErrorText('Начните поиск. Введите ключевое слово');
      return false;
    }

    setErrorText('');
    setPreloader(true);

    try {
      await gettingSomeFilms()
      const data = JSON.parse(localStorage.getItem('LoadedMovies'));
      let filterData = data.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()));
      localStorage.setItem('films', JSON.stringify(filterData));
      localStorage.setItem('filmsInputSearch', inputSearch);
      localStorage.setItem('prevInput', inputSearch);

      const spliceData = filterData.splice(0, MoviesCount[0]);

      setFilmsShowed(spliceData);
      setFilms(filterData);
      setFilmsShowedWithTumbler(spliceData);
      setFilmsWithTumbler(filterData);

      console.log(spliceData);
      console.log(filterData);

      localStorage.setItem('filmsShowedWithTumbler', JSON.stringify(spliceData));
      localStorage.setItem('filmsWithTumbler', JSON.stringify(filterData));

      if (tumbler) {
        showShorts(spliceData, filterData, tumbler);
      }

    } catch (err) {
      setErrorText(
        'Во время запроса произошла ошибка.'
      );

      setFilms([]);
      //localStorage.removeItem('films');
      //localStorage.removeItem('filmsTumbler');
      //localStorage.removeItem('filmsInputSearch');
    } finally {
      setPreloader(false);
    }
  }
  
  //Создадим дополнительную функцию, чтобы вызывать ее если производим поиск с уже включенным чекбоксом - Короткометражки
  function showShorts(spliceFilmsData, filterFilmsData, tumbler) {
    console.log(spliceFilmsData);
    console.log(filterFilmsData);
    // setFilmsShowedWithTumbler(filmsShowed);
    // setFilmsWithTumbler(films);
    const filterDataShowed = spliceFilmsData.filter(({ duration }) => duration <= 40);
    const filterData = filterFilmsData.filter(({ duration }) => duration <= 40);

    localStorage.setItem('films', JSON.stringify(filterDataShowed.concat(filterData)));
    localStorage.setItem('filmsTumbler', tumbler);
    setFilmsShowed(filterDataShowed);
    setFilms(filterData);
  }

  //Добавлю дополнительную функцию, чтобы каждый раз не совершать запросы
  async function gettingSomeFilms() {
    //Ищем фильмы в хранилище
    const data = JSON.parse(localStorage.getItem('LoadedMovies'));
    //Если фильмов в хранилище нет, делаем один запрос на получение фильмов с API
    if (!data) {
      await moviesApi.getMovies()
      .then((LoadedFilms) => {
        localStorage.setItem('LoadedMovies', JSON.stringify(LoadedFilms));
      })
    }
  }

  async function handleGetMoviesTumbler(tumbler) {
    console.log('функция тамблера', tumbler);
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

    localStorage.setItem('films', JSON.stringify(filterDataShowed.concat(filterData)));
    localStorage.setItem('filmsTumbler', tumbler);
    setFilmsShowed(filterDataShowed);
    setFilms(filterData);
  }

  async function savedMoviesToggle(film, favorite) {
    if (favorite) {
      const objFilm = {
        image: 'https://api.nomoreparties.co' + film.image.url,
        trailerLink: film.trailerLink,
        thumbnail: 'https://api.nomoreparties.co' + film.image.url,
        movieId: `${film.id}`,
        country: film.country || 'Неизвестно',
        director: film.director,
        duration: film.duration,
        year: film.year,
        description: film.description,
        nameRU: film.nameRU,
        nameEN: film.nameEN,
      };
      try {
        await mainApi.addMovies(objFilm);
        const newSaved = await mainApi.getMovies();
        setFilmsSaved(newSaved);
      } catch (err) {
        openPopup('Во время добавления фильма произошла ошибка.');
      }
    } else {
      try {
        await mainApi.deleteMovies(film._id);
        const newSaved = await mainApi.getMovies();
        setFilmsSaved(newSaved);
      } catch (err) {
        openPopup('Во время удаления фильма произошла ошибка.');
      }
    }
  }

  useEffect(() => {
    mainApi
      .getMovies()
      .then((data) => {
        setFilmsSaved(data);
      })
      .catch((err) => {
        openPopup(`Ошибка сервера ${err}`);
      });

    const localStorageFilms = localStorage.getItem('films');
    setFilmsShowedWithTumbler(JSON.parse(localStorage.getItem('filmsShowedWithTumbler')));
    setFilmsWithTumbler(JSON.parse(localStorage.getItem('filmsWithTumbler')));

    if (localStorageFilms) {
      const filterData = JSON.parse(localStorageFilms);
      setFilmsShowed(filterData.splice(0, getMoviesCount()[0]));
      setFilms(filterData);
      setPreloader(false);
    }

    const localStorageFilmsTumbler = localStorage.getItem('filmsTumbler');
    const localStorageFilmsInputSearch = localStorage.getItem('filmsInputSearch');

    if (localStorageFilmsTumbler) {
      setFilmsTumbler(localStorageFilmsTumbler === 'true');
    }

    if (localStorageFilmsInputSearch) {
      setFilmsInputSearch(localStorageFilmsInputSearch);
    }
  }, [openPopup]);

  return (
    <div className="movies">
      <SearchForm handleGetMovies={handleGetMovies} filmsTumbler={filmsTumbler} filmsInputSearch={filmsInputSearch} handleGetMoviesTumbler={handleGetMoviesTumbler} />
      {preloader && <Preloader />}
      {errorText && <div className="movies__text-error">{errorText}</div>}
      {!preloader && !errorText && films !== null && filmsSaved !== null && filmsShowed !== null && (
        <MoviesCardList handleMore={handleMore} filmsRemains={films} films={filmsShowed} savedMoviesToggle={savedMoviesToggle} filmsSaved={filmsSaved} />
      )}
    </div>
  );
};

export default Movies;
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import TestSavedCards from '../../utils/TestSavedCards';

const SavedMovies = () => {
  return (
    <main className="saved-movies">
      <SearchForm />
      <MoviesCardList 
      cards={TestSavedCards} 
      buttonMore={false} />
    </main>
  );
};

export default SavedMovies;
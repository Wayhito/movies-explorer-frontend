import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import TestSavedCards from '../../utils/TestSavedCards';

const SavedMovies = () => {
  return (
    <div className="saved-movies">
      <SearchForm />
      <MoviesCardList 
      cards={TestSavedCards} 
      buttonMore={false} />
    </div>
  );
};

export default SavedMovies;
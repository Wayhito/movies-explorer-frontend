import './PageNotFound.css';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <main className="pageNotFound">
      <div className="pageNotFound__container">
        <h1 className="pageNotFound__title">404</h1>
        <p className="pageNotFound__subtitle">Страница не найдена</p>
      </div>
      <Link to="/" className="pageNotFound__link">Назад</Link>
    </main>
  );
};

export default PageNotFound;
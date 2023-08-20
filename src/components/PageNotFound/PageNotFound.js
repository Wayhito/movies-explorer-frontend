import './PageNotFound.css';
import { useHistory } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useHistory();

  return (
    <main className="pageNotFound">
      <div className="pageNotFound__container">
        <h1 className="pageNotFound__title">404</h1>
        <p className="pageNotFound__subtitle">Страница не найдена</p>
      </div>
      <p onClick={() => navigate.goBack()} className="pageNotFound__link">Назад</p>
    </main>
  );
};

export default PageNotFound;
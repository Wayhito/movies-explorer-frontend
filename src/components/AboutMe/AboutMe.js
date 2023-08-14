import './AboutMe.css';
import avatar from '../../images/avatar.jpg';

const AboutMe = () => {
  return (
    <section className="about-me" id="about-me">
      <h2 className="about-me__header">Студент</h2>

      <div className="about-me__container">
        <div className="about-me__info">
          <h3 className="about-me__name">Илья</h3>
          <p className="about-me__job">Фронтенд-разработчик, 19 лет</p>
          <p className="about-me__description">
            Родился и вырос в Челябинске, в подростковом возрасте переехал в Калининград и по сей день живу здесь. 
            В свободное время люблю поиграть в различные игры. Занимаю самые высшие ранги/топы европы в Overwatch, CS: GO, Apex Legends. 
            Закончил художественную школу длинною в пять лет, имею неплохие дизайнерские навыки для верстальщика/фронтендера. 
            Видя, как многие знакомые занимаются этим, тоже решил попробовать и это дело меня затянуло. 
            Потихоньку набрался навыков кодинга, js, react, css, html, и тд. 
            Ненапряжная верстка, создание функций, предание вида сайту и различные красивые фоны. 
            Сейчас заканчиваю курс Яндекс-практикума по Веб-разработке. 
            Позднее хочу наработать навыки работы с реактом на пет проектах, и отправиться на поиск работы. 
            Анонс-сайт игры и Приложение-магазин ждут.
          </p>

          <ul className="about-me__links">
            <li><a className="about-me__link" href="https://www.twitch.tv/wayhito" target="_blank" rel="noreferrer">Twitch</a></li>
            <li><a className="about-me__link" href="https://www.youtube.com/@wayhito/featured" target="_blank" rel="noreferrer">YT</a></li>
            <li><a className="about-me__link" href="https://vk.com/wayhito" target="_blank" rel="noreferrer">VK</a></li>
            <li><a className="about-me__link" href="https://github.com/Wayhito" target="_blank" rel="noreferrer">Github</a></li>

          </ul>
        </div>

        <img src={avatar} alt="about-me" className="about-me__image" />
      </div>
    </section>
  );
};

export default AboutMe;
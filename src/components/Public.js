import { Link } from "react-router-dom";
import Logo from "../img/logo.svg";

const Public = () => {
  const content = (
    <section className="public">
      <section className="navbar header__text">
        <ul className="flex">
          <li>
            <img src={Logo} className="logo" alt="logo" />
          </li>
          <li>
            <span>Text adventures</span>
          </li>
          <li>
            <Link to="/login">Log in</Link>
          </li>
        </ul>
      </section>
      <main className="public__main">
        <div className="slim__border">
          <h2 className="titles second__title">DECIDE YOUR FATE</h2>
          <h1 className="titles main__title">CHOOSE YOUR OWN ADVENTURE</h1>
          <h3 className="titles third__title">FACE THE CONSEQUENCES</h3>
          <div className="buttons container">
            <Link to="dash/stories">
              <button className="main__button">Browse stories</button>
            </Link>
            <Link to="dash/stories/new">
              <button className="main__button">Write a story</button>
            </Link>
          </div>
        </div>
      </main>
    </section>
  );
  return content;
};
export default Public;

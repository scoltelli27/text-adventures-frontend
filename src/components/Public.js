import { Link } from "react-router-dom";
import Logo from "../img/logo.svg";

const Public = () => {
  const content = (
    <section className="public">
      <navbar className="navbar">
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
      </navbar>
      <main className="public__main">
        <h2 className="titles">DECIDE YOUR FATE</h2>
        <h1 className="titles">CHOOSE YOUR OWN ADVENTURE</h1>
        <h3 className="titles">FACE THE CONSEQUENCES</h3>
        <div className="buttons flex">
          <button className="main__button">Read</button>
          <button className="main__button">Write</button>
        </div>
      </main>
    </section>
  );
  return content;
};
export default Public;

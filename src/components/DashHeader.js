import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCirclePlus,
  faFilePen,
  faUserGear,
  faUserPlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Logo from "../img/logo.svg";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";

import useAuth from "../hooks/useAuth";

const DASH_REGEX = /^\/dash(\/)?$/;
const STORIES_REGEX = /^\/dash\/stories(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  const onNewStoryClicked = () => navigate("/dash/stories/new");
  const onNewUserClicked = () => navigate("/dash/users/new");
  const onStoriesClicked = () => navigate("/dash/stories");
  const onUsersClicked = () => navigate("/dash/users");

  let dashClass = null;
  if (
    !DASH_REGEX.test(pathname) &&
    !STORIES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = "dash-header__container--small";
  }

  let newStoryButton = null;
  if (STORIES_REGEX.test(pathname)) {
    newStoryButton = (
      <button
        className="icon-button"
        title="New Story"
        onClick={onNewStoryClicked}
      >
        <FontAwesomeIcon icon={faFileCirclePlus} />
      </button>
    );
  }

  let newUserButton = null;
  if (USERS_REGEX.test(pathname)) {
    newUserButton = (
      <button
        className="icon-button"
        title="New User"
        onClick={onNewUserClicked}
      >
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
    );
  }

  let userButton = null;
  if (isAdmin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes("/dash")) {
      userButton = (
        <button className="icon-button" title="Users" onClick={onUsersClicked}>
          <FontAwesomeIcon icon={faUserGear} />
        </button>
      );
    }
  }

  let storiesButton = null;
  if (!STORIES_REGEX.test(pathname) && pathname.includes("/dash")) {
    storiesButton = (
      <button
        className="icon-button"
        title="Stories"
        onClick={onStoriesClicked}
      >
        <FontAwesomeIcon icon={faFilePen} />
      </button>
    );
  }

  const logoutButton = (
    <button className="icon-button" title="Logout" onClick={sendLogout}>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );

  const errClass = isError ? "errmsg" : "offscreen";

  let buttonContent;
  if (isLoading) {
    buttonContent = <p>Logging Out...</p>;
  } else {
    buttonContent = (
      <>
        {newStoryButton}
        {newUserButton}
        {storiesButton}
        {userButton}
        {logoutButton}
      </>
    );
  }

  const onGoHomeClicked = () => navigate("/");

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <section className="navbar public header__text">
        <ul className="flex">
          <li>
            <img
              src={Logo}
              className="logo"
              alt="logo"
              onClick={onGoHomeClicked}
            />
          </li>
          <li>
            <span>Text adventures</span>
          </li>
          <li>
            <Link to="/login">Log in</Link>
          </li>
        </ul>
      </section>
    </>
  );

  return content;
};
export default DashHeader;

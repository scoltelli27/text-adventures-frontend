import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Welcome = () => {
  const { username, isAdmin } = useAuth();

  const content = (
    <section className="welcome">
      <h1>Welcome back {username}!</h1>
      <p>
        <Link to="/dash/stories">Browse stories</Link>
      </p>

      <p>
        <Link to="/dash/stories/new">Write a new story</Link>
      </p>

      {isAdmin && (
        <p>
          <Link to="/dash/users">View User Settings</Link>
        </p>
      )}

      {isAdmin && (
        <p>
          <Link to="/dash/users/new">Add New User</Link>
        </p>
      )}
    </section>
  );

  return content;
};
export default Welcome;

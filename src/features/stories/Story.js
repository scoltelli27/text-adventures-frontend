import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectStoryById } from "./storiesApiSlice";

const Story = ({ storyId }) => {
  const story = useSelector((state) => selectStoryById(state, storyId));

  const navigate = useNavigate();

  if (story) {
    const created = new Date(story.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    const updated = new Date(story.updatedAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    const handleEdit = () => navigate(`/dash/stories/${storyId}`);

    return (
      <tr className="table__row">
        {/* <td className="table__cell story__status">
          {story.read ? (
            <span className="story__status--completed">Read</span>
          ) : (
            <span className="story__status--open">Unread</span>
          )}
        </td> */}
        <td className="table__cell story__created">{story.storyNumber}</td>
        <td className="table__cell story__created">{created}</td>
        <td className="table__cell story__updated">{updated}</td>
        <td className="table__cell story__title">{story.title}</td>
        <td className="table__cell story__username">{story.text}</td>

        <td className="table__cell">
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};
export default Story;

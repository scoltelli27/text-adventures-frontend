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

    const handleRead = () => navigate(`/dash/stories/${storyId}`);

    return (
      <>
        <div className="story__item">
          <div className="story__title">
            #{story.storyNumber}
            {` ${story.title}`}
          </div>
          <div className="story__text">{story.summary}</div>
          {/* <div className="story__text">{story.text}</div> */}
          <div className="button__space">
            <button className="story__button" onClick={handleRead}>
              Read
            </button>
          </div>
        </div>
      </>
    );
  } else return null;
};
export default Story;

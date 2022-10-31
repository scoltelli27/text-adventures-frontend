import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectStoryById } from "./storiesApiSlice";
import { selectAllUsers } from "../users/usersApiSlice";
import EditStoryForm from "./EditStoryForm";

const EditStory = () => {
  const { id } = useParams();

  const story = useSelector((state) => selectStoryById(state, id));
  const users = useSelector(selectAllUsers);

  const content =
    story && users ? (
      <EditStoryForm story={story} users={users} />
    ) : (
      <p>Loading...</p>
    );

  return content;
};
export default EditStory;

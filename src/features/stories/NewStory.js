import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersApiSlice";
import NewStoryForm from "./NewStoryForm";

const NewStory = () => {
  const users = useSelector(selectAllUsers);

  if (!users?.length) return <p>Not Currently Available</p>;

  const content = <NewStoryForm users={users} />;

  return content;
};
export default NewStory;

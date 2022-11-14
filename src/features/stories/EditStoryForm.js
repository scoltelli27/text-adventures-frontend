import { useState, useEffect } from "react";
import {
  useUpdateStoryMutation,
  useDeleteStoryMutation,
} from "./storiesApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const EditStoryForm = ({ story, users }) => {
  const [updateStory, { isLoading, isSuccess, isError, error }] =
    useUpdateStoryMutation();

  const [
    deleteStory,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteStoryMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState(story.title);
  const [text, setText] = useState(story.text);
  const [completed, setCompleted] = useState(story.completed);
  const [userId, setUserId] = useState(story.user);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle("");
      setText("");
      setUserId("");
      navigate("/dash/stories");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);
  const onCompletedChanged = (e) => setCompleted((prev) => !prev);
  const onUserIdChanged = (e) => setUserId(e.target.value);

  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  const onSaveStoryClicked = async (e) => {
    if (canSave) {
      await updateStory({ id: story.id, user: userId, title, text, completed });
    }
  };

  const onDeleteStoryClicked = async () => {
    await deleteStory({ id: story.id });
  };

  const created = new Date(story.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const updated = new Date(story.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {" "}
        {user.username}
      </option>
    );
  });

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validTitleClass = !title ? "form__input--incomplete" : "";
  const validTextClass = !text ? "form__input--incomplete" : "";

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const goBack = () => navigate(`/dash/stories`);

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <section className="main__story">
        <h2 className="story__name">Welcome to "{story.title}" </h2>

        <div className="text__area">{story.text}</div>
        <div>
          <h3>Back to stories</h3>
          <FontAwesomeIcon
            className="go__back"
            onClick={goBack}
            icon={faArrowLeft}
          />
        </div>
        <div className="story__divider">
          <p className="story__created">
            Story created on:
            <br />
            {created}
          </p>
          <p className="story__updated">
            Last updated:
            <br />
            {updated}
          </p>
        </div>
      </section>
    </>
  );

  return content;
};

export default EditStoryForm;

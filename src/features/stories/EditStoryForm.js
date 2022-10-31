import { useState, useEffect } from "react";
import {
  useUpdateStoryMutation,
  useDeleteStoryMutation,
} from "./storiesApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";

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

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit Story #{story.ticket}</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onSaveStoryClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
              className="icon-button"
              title="Delete"
              onClick={onDeleteStoryClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="story-title">
          Title:
        </label>
        <input
          className={`form__input ${validTitleClass}`}
          id="story-title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
        />

        <label className="form__label" htmlFor="story-text">
          Text:
        </label>
        <textarea
          className={`form__input form__input--text ${validTextClass}`}
          id="story-text"
          name="text"
          value={text}
          onChange={onTextChanged}
        />
        <div className="form__row">
          <div className="form__divider">
            <label
              className="form__label form__checkbox-container"
              htmlFor="story-completed"
            >
              WORK COMPLETE:
              <input
                className="form__checkbox"
                id="story-completed"
                name="completed"
                type="checkbox"
                checked={completed}
                onChange={onCompletedChanged}
              />
            </label>

            <label
              className="form__label form__checkbox-container"
              htmlFor="story-username"
            >
              ASSIGNED TO:
            </label>
            <select
              id="story-username"
              name="username"
              className="form__select"
              value={userId}
              onChange={onUserIdChanged}
            >
              {options}
            </select>
          </div>
          <div className="form__divider">
            <p className="form__created">
              Created:
              <br />
              {created}
            </p>
            <p className="form__updated">
              Updated:
              <br />
              {updated}
            </p>
          </div>
        </div>
      </form>
    </>
  );

  return content;
};

export default EditStoryForm;

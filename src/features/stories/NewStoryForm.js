import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewStoryMutation } from "./storiesApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const NewStoryForm = ({ users }) => {
  const [addNewStory, { isLoading, isSuccess, isError, error }] =
    useAddNewStoryMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [text, setText] = useState("");
  const [userId, setUserId] = useState(users[0].id);

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setSummary("");
      setText("");
      setUserId("");
      navigate("/dash/stories");
    }
  }, [isSuccess, navigate]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onSummaryChanged = (e) => setSummary(e.target.value);
  const onTextChanged = (e) => setText(e.target.value);

  const canSave = [title, summary, text, userId].every(Boolean) && !isLoading;

  const onSaveStoryClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewStory({ user: userId, title, summary, text });
    }
  };

  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {" "}
        {user.username}
      </option>
    );
  });

  const errClass = isError ? "errmsg" : "offscreen";
  const validTitleClass = !title ? "form__input--incomplete" : "";
  const validSummaryClass = !summary ? "form__input--incomplete" : "";
  const validTextClass = !text ? "form__input--incomplete" : "";

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSaveStoryClicked}>
        <div className="form__title-row">
          <h2>New Story</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Save" disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="title">
          Title:
        </label>
        <input
          className={`form__input ${validTitleClass}`}
          id="title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
        />

        <label className="form__label" htmlFor="summary">
          Summary:
        </label>
        <textarea
          className={`form__input form__input--summary ${validSummaryClass}`}
          id="summary"
          name="summary"
          value={summary}
          onChange={onSummaryChanged}
        />
        <label className="form__label" htmlFor="text">
          Text:
        </label>
        <textarea
          className={`form__input form__input--text ${validTextClass}`}
          id="text"
          name="text"
          value={text}
          onChange={onTextChanged}
        />
      </form>
    </>
  );

  return content;
};

export default NewStoryForm;

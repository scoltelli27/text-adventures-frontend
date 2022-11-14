import { useGetStoriesQuery } from "./storiesApiSlice";
import Story from "./Story";

const StoriesList = () => {
  const {
    data: stories,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetStoriesQuery();

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = stories;

    const tableContent = ids?.length
      ? ids.map((storyId) => <Story key={storyId} storyId={storyId} />)
      : null;

    content = (
      <div className="public story__border">
        <div className="story__grid">{tableContent}</div>
      </div>
    );
  }

  return content;
};
export default StoriesList;

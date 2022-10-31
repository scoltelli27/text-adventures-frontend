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
      <table className="table table--stories">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th story__status">
              Story Number
            </th>
            <th scope="col" className="table__th story__created">
              Created
            </th>
            <th scope="col" className="table__th story__updated">
              Updated
            </th>
            <th scope="col" className="table__th story__updated">
              Title
            </th>
            <th scope="col" className="table__th story__title">
              Story
            </th>
            <th scope="col" className="table__th story__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};
export default StoriesList;

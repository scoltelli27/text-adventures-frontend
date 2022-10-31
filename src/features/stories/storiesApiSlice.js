import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const storiesAdapter = createEntityAdapter({
  sortComparer: (a, b) => (a.read === b.read ? 0 : a.read ? 1 : -1),
});

const initialState = storiesAdapter.getInitialState();

export const storiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStories: builder.query({
      query: () => "/stories",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },

      transformResponse: (responseData) => {
        const loadedStories = responseData.map((story) => {
          story.id = story._id;
          return story;
        });
        return storiesAdapter.setAll(initialState, loadedStories);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Story", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Story", id })),
          ];
        } else return [{ type: "Story", id: "LIST" }];
      },
    }),

    addNewStory: builder.mutation({
      query: (initialStory) => ({
        url: "/stories",
        method: "POST",
        body: {
          ...initialStory,
        },
      }),
      invalidatesTags: [{ type: "Story", id: "LIST" }],
    }),
    updateStory: builder.mutation({
      query: (initialStory) => ({
        url: "/stories",
        method: "PATCH",
        body: {
          ...initialStory,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Story", id: arg.id }],
    }),
    deleteStory: builder.mutation({
      query: ({ id }) => ({
        url: `/stories`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Story", id: arg.id }],
    }),
  }),
});

export const {
  useGetStoriesQuery,
  useAddNewStoryMutation,
  useUpdateStoryMutation,
  useDeleteStoryMutation,
} = storiesApiSlice;

// returns the query result object
export const selectStoriesResult =
  storiesApiSlice.endpoints.getStories.select();

// creates memoized selector
const selectStoriesData = createSelector(
  selectStoriesResult,
  (storiesResult) => storiesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllStories,
  selectById: selectStoryById,
  selectIds: selectStoryIds,
  // Pass in a selector that returns the stories slice of state
} = storiesAdapter.getSelectors(
  (state) => selectStoriesData(state) ?? initialState
);

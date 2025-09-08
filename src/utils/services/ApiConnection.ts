import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ApiHeaders = {
  Accept: "application/json",
};
const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;
const createRequest = (
  url: string,
  method: "GET" | "POST"
): { url: string; headers: Record<string, string>; method: string } => ({
  url,
  headers: ApiHeaders,
  method,
});
export enum Position {
  PRESIDENT = "president",
  VICE_PRESIDENT = "vice_president",
}
export interface ICandidate {
  id: string;
  full_name: string;
  position: Position;
  manifesto: string;
  image: string;
  level: string;
}
export interface IResults extends ICandidate {
  voteCount: number;
}
export type ICandidates = Array<ICandidate>;
const connectedAwardsApi = createApi({
  reducerPath: "votingApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include",
    mode: "cors",
  }),
  tagTypes: ["Post", "Get"],
  endpoints: (builder) => ({
    getAllCandidates: builder.query({
      query: () => createRequest(`/candidate/all`, "GET"),
      transformResponse: (response: ICandidates) => response,
      providesTags: ["Get"],
    }),
    voteCandidate: builder.mutation({
      query: (candidateId: string) =>
        createRequest(`/vote/cast/${candidateId}`, "POST"),
      invalidatesTags: ["Post"],
    }),
    getResult: builder.mutation({
      query: () =>
        createRequest(
          `/candidate/${process.env.NEXT_PUBLIC_RESULT_PATH}`,
          "GET"
        ),
      transformResponse: (response: Array<IResults>) => response,
      invalidatesTags: ["Post"],
    }),
  }),
});
export const {
  useGetAllCandidatesQuery,
  useVoteCandidateMutation,
  useGetResultMutation,
} = connectedAwardsApi;
export default connectedAwardsApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../function/storage";
import image from "next/image";

const ApiHeaders = {
  Accept: "application/json",
};
const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/v1`;
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
export type ICandidates = Array<ICandidate>;
const prepareHeaders = (headers: Headers) => {
  headers.set("Authorization", `Bearer ${getToken()}`);
  return headers;
};
const connectedAwardsApi = createApi({
  reducerPath: "votingApi",
  baseQuery: fetchBaseQuery({ baseUrl, prepareHeaders }),
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
  }),
});
export const { useGetAllCandidatesQuery, useVoteCandidateMutation } =
  connectedAwardsApi;
export default connectedAwardsApi;

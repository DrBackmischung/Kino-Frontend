import React from "react";
import AddCommentCard from "./AddCommentCard";
import ReviewsCard from "./ReviewsCard";
import { Box } from "@mui/material";
import { useQuery } from "react-query";
import APIUrl from "../config/APIUrl";

function ManageComments(props: any) {
  const { userData, movieId } = props;

  const apiUrlReviews = `${APIUrl.apiUrl}/movie/${movieId}/reviews`;

  const { isLoading, error, data, refetch } = useQuery(
    ["reviews", movieId],
    () => {
      return fetch(apiUrlReviews).then((res) => {
        return res.json();
      });
    },
    { enabled: Boolean(movieId) }
  );

  return (
    <div>
      <Box>
        <AddCommentCard movieId={movieId} userId={userData} refetch={refetch} />
      </Box>
      <ReviewsCard
        movieId={movieId}
        data={data}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}

export default ManageComments;

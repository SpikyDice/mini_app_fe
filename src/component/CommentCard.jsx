import React from "react";

function CommentCard({ allcomments }) {
  if (allcomments !== undefined) {
    return allcomments.map((val) => {
      return (
        <div className="bg-blue-600 my-2 py-2 rounded-xl mx-6">
          <div className="px-4">{val.comment}</div>
          <div className="px-4 text-right">By: {val.username}</div>
          <div className="px-4 text-right">Date: {val.commentdate}</div>
        </div>
      );
    });
  }
}

export default CommentCard;

import React from "react";
import { FeedbackReviewStatus } from "../models/enums";

type ReviewStatusProps = {
    status: FeedbackReviewStatus;
  };
  
const ReviewStatus: React.FC<ReviewStatusProps> = ({ status }) => {
    const statusStyles: Record<FeedbackReviewStatus, string> = {
      [FeedbackReviewStatus.reviewed]: 'bg-green-200',
      [FeedbackReviewStatus.pending]: 'bg-yellow-200',
      [FeedbackReviewStatus.processed]: 'bg-blue-200',
    };
  
    const statusClassName = statusStyles[status] || 'bg-gray-100'; // Default background color
  
    return (
      <div className={`font-bold rounded-xl px-2 text-center ${statusClassName}`}>
        {status}
      </div>
    );
  };
  
  export default ReviewStatus;
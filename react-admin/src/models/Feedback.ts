import { FeedbackReviewStatus } from "./enums";

export interface Feedback {
    _id: string;
    text: string;
    feedbackAviGrade: string;
    calculatedAviGrade: string;
    status: FeedbackReviewStatus;
};

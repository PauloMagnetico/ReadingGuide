//TO DO, include TS in the creation, follow the steps that are done in the auth service
import mongoose from 'mongoose';
import { aviGrades, feedbackStatus } from './enums'; 

// Interface that describes the properties
// that are reqyured to create a Feedback (for typescript)
interface FeedbackAttrs {
    text: string;
    calculatedAvigrade: aviGrades;
    feedbackAvigrade: aviGrades;
    status: feedbackStatus;
}

// An interface that describes the properties
// that a feedback model has
interface FeedbackModel extends mongoose.Model<FeedbackDoc> {
    build(attrs: FeedbackAttrs): FeedbackDoc;
};

// An interface that describes the properties
// that a feedback document has
interface FeedbackDoc extends mongoose.Document {
    text: string;
    calculatedAvigrade: aviGrades;
    feedbackAvigrade: aviGrades;
    status: feedbackStatus;
};

const feedbackSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    calculatedAviGrade: {
        type: String,
        enum: aviGrades,
        required: true
    },
    feedbackAviGrade: {
        type: String,
        enum: aviGrades,
        required: true
    },
    status: {
        type: String,
        enum: feedbackStatus,
        required: true
    }
});

// Statics are functions that are accessible on the model
// (e.g. Feedback.build), this way we can use typescript
feedbackSchema.statics.build = (attrs: FeedbackAttrs) => {
    return new Feedback(attrs);
};


const Feedback = mongoose.model<FeedbackDoc, FeedbackModel>("Feedback", feedbackSchema);
export default Feedback;
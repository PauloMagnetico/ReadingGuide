import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import Feedback from '../models/feedback';

const getAllFeedback = async (req: Request, res: Response) => {
    try {
        // For pagination, you might use query parameters like 'page' and 'limit'
        // const { page = 1, limit = 10 } = req.query;
        // const feedbackArray = await Feedback.find({})
        //                                       .limit(limit * 1)
        //                                       .skip((page - 1) * limit);

        const feedbackArray = await Feedback.find({});
        res.status(200).json(feedbackArray);
    } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//create new Feedback
const createFeedback = async (req: Request, res: Response) => {
    try {
        const feedbackData = req.body.feedback; // Assuming the entire object is under the 'feedback' key
        const feedback = Feedback.build({
            ...feedbackData,
            status: 'PENDING' // Preserving the status assignment
        });

        // Save the feedback to the database
        await feedback.save();

        // Send back the saved feedback object
        res.status(201).json(feedback);
    } catch (error) {
        console.error('Error in createFeedback:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteFeedback = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const feedback = await Feedback.findById(id);

        if (!feedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }

        await Feedback.findByIdAndDelete(id);
        res.status(200).json({ message: "Feedback deleted successfully" });
    } catch (error) {
        console.error('Error deleting feedback:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateFeedback = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const updatedFeedback = await Feedback.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedFeedback) {
            return res.status(404).json({ message: "Feedback not found" });
        };
        return res.status(200).json(updatedFeedback);
    } catch (error) {
        console.error('Error deleting feedback:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//endpoint that retrieves all reviewed feedback and writes it into a JSONL file in the format for finetuning ChatGPT
const processReviewedFeedback = async (req: Request, res: Response) => {
    try {
        const feedbackList = await Feedback.find({ status: 'REVIEWED' }).exec();

        const jsonLines = feedbackList.map(feedback => {
            const dialog = {
                messages: [
                    {
                        role: "system",
                        content: "Dit is een chatbot die het AVI-leesniveau van teksten evalueert. De gebruiker zal een tekst verstrekken, en de chatbot zal reageren met een AVI-leesniveau uit de volgende lijst: ['AviStart', 'M3', 'E3', 'M4', 'E4', 'M5', 'E5', 'M6', 'E6', 'M7', 'E7', 'AviPlus']."
                    },
                    {
                        role: "user",
                        content: feedback.text
                    },
                    {
                        role: "assistant",
                        content: feedback.calculatedAvigrade
                    }
                ]
            };
            return JSON.stringify(dialog);
        }).join('\n');

        const filename = 'reviewed_feedback.jsonl';
        const filePath = path.join(__dirname, filename);

        fs.writeFile(filePath, jsonLines, (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ message: "Error writing feedback data to file" });
            }

            res.sendFile(filePath, (downloadError) => {
                if (downloadError) {
                    console.error('Error sending file:', downloadError);
                    res.status(500).send('Error sending file');
                }

                // Optionally delete the file afterwards
                // fs.unlink(filePath, unlinkError => {
                //     if (unlinkError) console.error('Error deleting file:', unlinkError);
                // });
            });
        });
    } catch (err) {
        console.error('Error processing reviewed feedback:', err);
        res.status(500).json({ message: "Error processing reviewed feedback", error: err});
    }
};

export { getAllFeedback, createFeedback, deleteFeedback, updateFeedback, processReviewedFeedback };


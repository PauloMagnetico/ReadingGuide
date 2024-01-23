const fs = require('fs');
const path = require('path');

const Feedback = require('../models/feedback')

module.exports.getAllFeedback = async (req, res) => {
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
module.exports.createFeedback = async (req, res) => {
    try {
        const feedbackData = req.body.feedback; // Assuming the entire object is under the 'feedback' key
        const feedback = new Feedback({
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

module.exports.deleteFeedback = async (req, res) => {
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

module.exports.updateFeedback = async (req, res) => {
    const { id } = req.params;
    
    try {
        // Assuming 'req.body' has the feedback data and not 'req.body.feedback'
        const updatedFeedback = await Feedback.findByIdAndUpdate(id, req.body, { new: true });

        // Check if the feedback was found and updated
        if (!updatedFeedback) {
            return res.status(404).json({ message: "Feedback not found" });
        }

        // Send back the updated feedback
        return res.status(200).json(updatedFeedback);
    } catch (error) {
        // Handle possible errors
        return res.status(500).json({ message: error.message });
    }
};

//endpoint that retrieves all reviewed feedback and writes it into a JSONL file in the format for finetuning ChatGPT
module.exports.processReviewedFeedback = async (req, res) => {
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
                        content: feedback.aviGrade
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
        res.status(500).json({ message: "Error processing reviewed feedback", error: err.message });
    }
};


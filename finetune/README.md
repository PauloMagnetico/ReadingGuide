# Finetuning the classification model

This module contains the scripts that allow you to finetune the GPT model to help with classification.

## Usage

- in the AdminUi page, export the reviewed data. All data that has been manually reviewed and been set to reviewed status, will be exported in a jsonl file. Aditonally a jsonl file will be created with a test set containing 20% of the data that hasn't been used for taining the model. These jsonl files have to be saved in the root folder

- run ```node finetune``` to run the finetuning Job.
    - The files will be uploaded to the OpenAI fileserver
    - the finetuning job will be started
    - the name of the finetuned model will be returned
- run the test ```node testModel```, using the newly created model
    - the expected and calculated AVI grades will be logged in the console to give a basic success rate

## To do

- [ ] Include the base model into the testing to see the progress
- [ ] Include more metrics like success rate
- [ ] merge with server
- [ ] create endpoints to make finetuning possible through the admin UI
- [ ] provide graphical feedback about the test suits

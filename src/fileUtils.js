import fs from "fs";
import path from "path";

// Function to save job data to a file
export const saveJobsToFile = (jobs, filePath) => {
    // Format of the job data to be saved to a text file
    const jobText = jobs.map(job =>
        `Company Name: ${job.companyName}\nJob Title: ${job.jobTitle}\nPost Date: ${job.postDate}\nJob Link: ${job.jobLink}\n\n`
    ).join(''); // Join the job details into a string

    // Writing the job data to a text file
    fs.writeFileSync(filePath, jobText);

    console.log(`Jobs saved to: ${filePath}`);
};

// Function to get the file path
export const getFilePath = () => {
    // The file path can be changed to any desired location
    return path.join('C:\\Users\\username', 'oulu_jobs.txt'); // File path to save the job data
};
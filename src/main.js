import { launchBrowser, scrapeJobs, filterRecentJobs } from "./browserUtils.js";
import { saveJobsToFile, getFilePath } from "./fileUtils.js";

const getOuluJobs = async () => {
    let browser;
    try {
        // Launch the browser
        browser = await launchBrowser();

        // Open a new page
        const page = await browser.newPage();

        // Scrape job listings from the page
        const jobs = await scrapeJobs(page);

        // Filter jobs posted within the last 24 hours
        const recentJobs = filterRecentJobs(jobs);

        console.log(recentJobs); // Output the filtered jobs data to the console

        // Save the filtered jobs to a file
        const filePath = getFilePath();
        saveJobsToFile(recentJobs, filePath);
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        if (browser) {
            await browser.close(); // Ensure the browser closes even if there is an error
        }
    }
};

// Run the job scraper
getOuluJobs();
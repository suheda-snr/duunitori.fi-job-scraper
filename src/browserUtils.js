import puppeteer from "puppeteer";

// Function to launch the browser
export const launchBrowser = async () => {
    // Launch the browser in non-headless mode with default viewport settings
    return await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });
};

// Function to scrape job data from the website
export const scrapeJobs = async (page) => {
    // Navigate to Duunitori's job listings for Oulu
    // The region can be changed to any other region available on the website
    await page.goto("https://duunitori.fi/tyopaikat/alue/oulu", { waitUntil: "domcontentloaded" });

    // Wait for the search input field to be visible
    await page.waitForSelector('input.taggle_input');

    // Type the desired job category and press enter
    // Job category can be changed to any other category available on the website
    await page.type('input.taggle_input', 'Tieto- ja tietoliikennetekniikka');
    await page.keyboard.press('Enter');

    // Wait for job listings to load
    await page.waitForSelector('.job-box__content');

    // Extract job information from the page
    const jobs = await page.evaluate(() => {
        const jobElements = document.querySelectorAll('.job-box');
        const jobDataArray = [];

        jobElements.forEach(box => {
            const companyName = box.querySelector('.job-box__company-name')?.textContent.trim();
            const jobTitle = box.querySelector('.job-box__title')?.textContent.trim();
            const postDate = box.querySelector('.job-box__job-posted')?.textContent.trim();
            const jobLink = box.querySelector('a.job-box__hover')?.href; // job link

            // Add job to the list if all details are present
            if (companyName && jobTitle && postDate && jobLink) {
                jobDataArray.push({
                    companyName,
                    jobTitle,
                    postDate,
                    jobLink
                });
            }
        });

        return jobDataArray;
    });

    return jobs;
};

// Function to filter jobs posted within the last 24 hours
export const filterRecentJobs = (jobs) => {
    // Get current date for comparison
    const currentDate = new Date();

    // Filter jobs posted within the last 24 hours
    return jobs.filter((job) => {
        const postedDate = new Date();

        // Post date format is "Julkaistu DD.MM."
        const match = job.postDate.match(/(\d{1,2})\.(\d{1,2})\./);
        if (match) {
            const day = parseInt(match[1], 10);
            const month = parseInt(match[2], 10) - 1; // Month is 0-indexed in JavaScript
            const year = currentDate.getFullYear(); // Assuming all jobs are from the current year

            // Set the date of the job posting
            postedDate.setFullYear(year, month, day);
        }

        // Calculate the difference in hours
        const hoursDifference = (currentDate - postedDate) / (1000 * 60 * 60);
        return hoursDifference <= 24; // Check if the job was posted within the last 24 hours
    });
};
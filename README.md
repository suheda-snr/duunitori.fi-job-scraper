# duunitori.fi-job-scraper

## Overwiew
The duunitori-job-scraper is a web scraper built with Node-js/Puppeteer that extracts IT jobs from Duunitori.fi for the Oulu region, specifically targeting postings made within the last 24 hours. It saves the relevant job data to a text file for easy access, allowing users to stay updated with the latest opportunities. The scraper can be customized to filter by different industries and regions based on the options available on the website. Additionally, it can be automated using various tools to schedule the scraper to run at specific intervals without manual intervention.

## Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Automation](#automation)
- [License](#license)

## Features
- Scrapes job listings for a specified category from Duunitori.fi.
- Filters job listings posted within the last 24 hours.
- Saves the job data to a text file.
- Configurable for different cities and job categories.

## Requirements
- Node.js (v14 or later)
- npm (Node package manager)
- Puppeteer (automatically installed with the project dependencies)

## Installation
Clone the repository:

```bash
git clone https://github.com/suheda-snr/duunitori-job-scraper.git 
```

Navigate into the project directory:

```bash
cd duunitori-job-scraper 
```
Install the dependencies (Puppeteer will be automatically installed):

```bash
npm install
```

## Usage

1. Set the Path for the Text File:

- Open the `src/fileUtils.js` file
- Set the path and name for the txt file where the scraped job data will be saved.

2. Customize Job Scraping:

- Open the `src/browserUtils.js` file.
- Modify the code according to your preferences for job category and region based on the options available on the Duunitori.fi website.

3. Run the scraper:
```bash
node .\src\main.js
```

After execution, check the console for any filtered jobs and the specified file path for saved job listings.

## Automation
I used Task Scheduler on Windows to automate the job scraper. Here are the steps to automate this script via Task Scheduler:

1. Open Task Scheduler.
     
    - Press Windows + R, type taskschd.msc, and hit Enter.

2. Create a New Task.

    - Click on "Create Basic Task."
    - Name your task and click "Next."

3. Set the Trigger 
    - Choose how often to run the task (e.g., Daily) and set the time.

4. Set the Action.

    - Select "Start a program."

          In "Program/script," enter node .\src\main.js

          In "Add arguments," enter the path to your project folder.

5. Save the Task.
 
     - Review your settings and click "Finish."

### Additional Automation Options
 - Cron Jobs (Linux/Mac): Schedule the script to run at regular intervals.

 - Third-Party Tools:

     - Zapier: Automate workflows between apps.

     - NSSM (Non-Sucking Service Manager): Run your script as a Windows service.
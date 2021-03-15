# Hoo's There?

In Animal Crossing: New Horizons you can catch and collect various bugs and fish. Depending on where you live and the current date and time, different creatures are available to catch. This is a companion app that displays a list of currently available creatures that are out at the current date and time.

## Features
* List of new creatures that are coming this month and which ones are leaving this month and the next
* Filter currently available creatures by type ("all", "bugs", or "fish") or hemisphere ("Northern" or "Southern") - different creatures are available depending on which hemisphere you're in
* Real time updates: The clock time updates each minute, and the currently available creatures list is updated if it's time for new creatures to show and/or previous ones to leave
* Ability to sort the currently available creatures list by creature name, type, location, time available, and price in ascending or descending order

## Technologies
* JavaScript
* React
* Redux
* Sass

The creature data was scraped from the Animal Crossing Wiki, using a [scraper I wrote](https://github.com/robotspacefish/acnh_scraper) in Ruby.

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the console, type:
### `yarn install`

Next, follow the directions in the [back-end](https://github.com/robotspacefish/acnh_creature_tracker_backend)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
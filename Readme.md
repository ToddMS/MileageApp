# Weekly Mileage Tracker

The Weekly Mileage Tracker is a React Native app that connects to Strava to fetch activity data, calculate weekly totals for cycling and rowing, and display a summary. A notification is sent every Sunday at 8 pm with the total distance covered for the week.

## Features

- **Strava Integration**: Authenticates with Strava to fetch user activities.
- **Weekly Summary**: Calculates and displays total cycling and rowing mileage for each week.
- **Scheduled Notifications**: Every Sunday at 8 pm, a notification is sent with a weekly mileage summary.
- **Detailed Week View**: Expand each weekly summary to view individual activities, with an option to copy the summary.

## Usage

- **Authorize the app with Strava**: Upon loading, the app will authenticate with Strava and fetch recent activities.
- **View Weekly Summaries**: Scroll to view each week's total mileage for rowing and cycling. Expand to see individual activities or copy the summary.
- **Receive Weekly Notifications**: Every Sunday at 8 pm, receive a notification with a summary of the week’s total mileage.

## Dependencies

- `expo-notifications`: For scheduled notifications.
- `react-native`: Framework for the app.
- `expo`: Development framework for React Native.

## Notes

- **Expo Permissions**: Ensure notification permissions are granted.
- **Strava Rate Limits**: Strava imposes API rate limits, so avoid excessive requests.

## Planned Features and Improvements

- **Data Visualization with Graphs**: Add graphs to show mileage trends over weeks, months, and even longer durations, enabling users to see how their activity changes over time.
- **Enhanced UI/UX**: Improve the UI design to be visually appealing and user-friendly, including color themes, layout adjustments, and animations.
- **Activity Filtering and Sorting**: Allow users to filter and sort activities by type (cycling, rowing, etc.), distance, or date, providing a more customizable experience.
- **Milestone Tracking**: Add notifications or badges for milestones, such as reaching specific mileage goals or setting personal records.
- **Goal Setting and Tracking**: Implement features for setting mileage goals (e.g., monthly or yearly) and tracking progress toward those goals.

These planned features aim to make the app more engaging and useful for tracking and visualizing fitness progress. Let us know if you have additional ideas for enhancing the app!

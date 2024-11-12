import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import * as Notifications from 'expo-notifications';
import WeekSummary from './src/WeekSummary/WeekSummary';
import config from './config';
import styles from './App.styles';
import { formatDate, metersToKilometers } from './src/utils';

interface Activity {
  name: string;
  distance: number;
  start_date: string;
  type: string;
}

interface WeeklyData {
  weekStart: string;
  mileage: number;
  activities: Activity[];
}

const App: React.FC = () => {
  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([]);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.warn("Permission not granted for notifications!");
      }
    };
    requestPermissions();
  }, []);

  useEffect(() => {
    reAuthAccessToken();
  }, []);

  const scheduleWeeklyNotification = async (summaryText: string) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Weekly Mileage Summary',
        body: summaryText,
      },
      trigger: {
        weekday: 1,
        hour: 20,
        minute: 0,
        repeats: true,
      },
    });
  };

  const generateWeeklySummaryText = (rowingDistance: string, cyclingDistance: string) => {
    return `Rowing: ${rowingDistance} km\nCycling: ${cyclingDistance} km`;
  };

  const reAuthAccessToken = async () => {
    try {
      const response = await fetch('https://www.strava.com/oauth/token', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client_id: config.STRAVA_CLIENT_ID,
          client_secret: config.STRAVA_CLIENT_SECRET,
          refresh_token: config.STRAVA_REFRESH_TOKEN,
          grant_type: 'refresh_token'
        })
      });
      const data = await response.json();
      loadWeeklyData(data.access_token);
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  const loadWeeklyData = async (accessToken: string) => {
    try {
      const response = await fetch(`https://www.strava.com/api/v3/athlete/activities?access_token=${accessToken}&per_page=100`);
      const data: Activity[] = await response.json();

      const weeks: { [key: string]: Activity[] } = {};

      data.forEach(activity => {
        const activityDate = new Date(Date.parse(activity.start_date));
        const startOfWeek = new Date(activityDate);
        const dayOfWeek = startOfWeek.getDay();
        const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        startOfWeek.setDate(startOfWeek.getDate() - daysToMonday);

        const weekKey = formatDate(startOfWeek);

        if (!weeks[weekKey]) weeks[weekKey] = [];
        if (activity.type === 'Ride' || activity.type === 'Rowing') {
          weeks[weekKey].push(activity);
        }
      });

      const weeklySummaries = Object.entries(weeks).map(([weekStart, activities]) => ({
        weekStart,
        mileage: activities.reduce((sum, activity) => sum + activity.distance, 0),
        activities
      }));

      setWeeklyData(weeklySummaries);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  useEffect(() => {
    if (weeklyData.length > 0) {
      const latestWeek = weeklyData[0];
      const rowingDistance = metersToKilometers(latestWeek.activities
        .filter(activity => activity.type === 'Rowing')
        .reduce((sum, activity) => sum + activity.distance, 0));
      const cyclingDistance = metersToKilometers(latestWeek.activities
        .filter(activity => activity.type === 'Ride')
        .reduce((sum, activity) => sum + activity.distance, 0));

      const summaryText = generateWeeklySummaryText(rowingDistance, cyclingDistance);
      scheduleWeeklyNotification(summaryText);
    }
  }, [weeklyData]);

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>Weekly Mileage</Text>
      {weeklyData.map((week, index) => (
        <View key={index} style={styles.weekContainer}>
          <WeekSummary weekStart={week.weekStart} mileage={week.mileage} activities={week.activities} />
        </View>
      ))}
    </ScrollView>
  );
};

export default App;

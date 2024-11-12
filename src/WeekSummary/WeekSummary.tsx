// WeekSummary.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CopyButton from '../CopyButton/CopyButton';
import styles from './WeekSummary.styles';
import { formatDate, metersToKilometers } from '../utils';

interface Activity {
  name: string;
  distance: number;
  type: string;
}

interface WeekSummaryProps {
  weekStart: string;
  mileage: number;
  activities: Activity[];
}

const WeekSummary: React.FC<WeekSummaryProps> = ({ weekStart, activities }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const getDistanceByType = (type: string) => {
    const totalDistance = activities
      .filter(activity => activity.type === type)
      .reduce((sum, activity) => sum + activity.distance, 0);
    return metersToKilometers(totalDistance);
  };

  const weeklyRowingDistance = getDistanceByType('Rowing');
  const weeklyCyclingDistance = getDistanceByType('Ride'); 

  const [day, month, year] = weekStart.split('/').map(Number);
  const startDate = new Date(year, month - 1, day);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  const summaryText = `Rowing: ${weeklyRowingDistance}km\nCycling: ${weeklyCyclingDistance}km`;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleExpand} style={styles.headerContainer}>
        <Text style={styles.header}>{formatDate(startDate)} - {formatDate(endDate)}</Text>
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.activityList}>
          <View style={styles.summaryContent}>
            <Text style={styles.summaryText}>Rowing: {weeklyRowingDistance}km</Text>
            <Text style={styles.summaryText}>Cycling: {weeklyCyclingDistance}km</Text>
          </View>
          <CopyButton textToCopy={summaryText} />
        </View>
      )}
    </View>
  );
};

export default WeekSummary;

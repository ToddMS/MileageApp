import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { padding: 20, borderBottomWidth: 1, borderColor: '#ccc' },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  header: { fontSize: 18, fontWeight: 'bold' },
  activityList: { marginTop: 10, position: 'relative' },
  summaryContent: { marginBottom: 10 },
  summaryText: { fontSize: 16, fontWeight: 'bold', marginVertical: 2 },
  copyIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    backgroundColor: 'gray',
    opacity: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  copyText: { color: 'white', fontSize: 14 },
});

export default styles;

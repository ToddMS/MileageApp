import React from 'react';
import { TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import * as Clipboard from 'expo-clipboard';

interface CopyButtonProps {
  textToCopy: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(textToCopy);
  };

  return (
    <TouchableOpacity onPress={copyToClipboard} style={styles.copyIcon}>
      <Text style={styles.copyText}>⧉</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

export default CopyButton;

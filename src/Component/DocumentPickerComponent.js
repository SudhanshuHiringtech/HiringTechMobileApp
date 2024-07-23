import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const DocumentPickerComponent = ({ onDocumentPicked }) => {
  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      onDocumentPicked(result);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the picker');
      } else {
        throw err;
      }
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick a Document" onPress={handleDocumentPick} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
});

export default DocumentPickerComponent;

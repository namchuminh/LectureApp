import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Appbar, Text } from 'react-native-paper';

const EditCourse = ({ navigation }) => {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [credits, setCredits] = useState('');

  const handleAdd = () => {
    console.log('Thêm khóa học mới', courseName, courseCode, credits);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} color="#FFFFFF" />
        <Appbar.Content title="Thêm Môn Học" titleStyle={styles.headerTitle} />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.label}>Tên Môn Học</Text>
        <TextInput
          value={courseName}
          onChangeText={setCourseName}
          style={styles.input}
          placeholder="Nhập tên khóa học"
        />
        <Text style={styles.label}>Mã Khóa Học</Text>
        <TextInput
          value={courseCode}
          onChangeText={setCourseCode}
          style={styles.input}
          placeholder="Nhập mã khóa học"
        />
        <Text style={styles.label}>Số tín chỉ</Text>
        <TextInput
          value={credits}
          onChangeText={setCredits}
          style={styles.input}
          placeholder="Nhập số tín chỉ"
          keyboardType="numeric"
        />
        <Button mode="contained" onPress={handleAdd} style={styles.btn}>
          <Text style={styles.btnText}>Lưu</Text>
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#3F51B5',
  },
  headerTitle: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  form: {
    padding: 16,
  },
  label: {
    marginBottom: 4,
  },
  input: {
    marginBottom: 16,
  },
  btn: {
    backgroundColor: '#3F51B5',
    borderRadius: 4,
  },
  btnText: {
    color: '#FFFFFF',
  },
});

export default EditCourse;

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Appbar, Text } from 'react-native-paper';
import axios from 'axios';

const EditCourse = ({ route, navigation }) => {
  const { course_id } = route.params;

  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [credits, setCredits] = useState('1');

  const fetchData = () => {
    axios.get(`http://10.0.2.2:3001/courses/${course_id}`)
      .then(response => {
        setCourseName(response.data.course_name)
        setCourseCode(response.data.course_code)
        setCredits(response.data.credits.toString())
      })
      .catch(error => {
        console.error('Lỗi khi lấy thông tin:', error);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = () => {
    if(!courseName || !courseCode || !credits){
      fetchData();
      alert("Vui lòng nhập đủ thông tin môn học!");
      return;
    }

    axios.put(`http://10.0.2.2:3001/courses/${course_id}`, {
      course_name: courseName,
      course_code: courseCode,
      credits: credits
    })
    .then(response => {
        navigation.goBack();
    })
    .catch(error => {
        console.error('Lỗi khi lấy thông tin:', error);
    });
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} color="#FFFFFF" />
        <Appbar.Content title="Thêm Môn Học" titleStyle={styles.headerTitle} />
        <Appbar.Action />
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
        <Button mode="contained" onPress={handleEdit} style={styles.btn}>
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

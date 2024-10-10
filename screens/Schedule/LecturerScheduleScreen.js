import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Appbar, Divider, Card, Avatar, Button } from 'react-native-paper';
import moment from 'moment'; // Thư viện để làm việc với thời gian

const LecturerScheduleScreen = ({ navigation }) => {
  // Ngày hiện tại để hiển thị lịch
  const [currentDate, setCurrentDate] = useState(moment()); // Sử dụng moment để dễ dàng quản lý ngày

  // Dữ liệu giả lập cho các lịch giảng của giảng viên
  const scheduleData = {
    'Thứ 2': [
      {
        lecturer_id: 1,
        name: 'Nguyễn Văn A',
        photo_url: 'https://example.com/photo1.jpg',
        course_name: 'Lập trình Cơ bản',
        time: '08:00 - 10:00',
        status: 'Đã duyệt',
      },
      {
        lecturer_id: 2,
        name: 'Trần Thị B',
        photo_url: 'https://example.com/photo2.jpg',
        course_name: 'Mạng máy tính',
        time: '10:30 - 12:00',
        status: 'Chưa duyệt',
      },
    ],
    'Thứ 3': [
      {
        lecturer_id: 3,
        name: 'Lê Văn C',
        photo_url: 'https://example.com/photo3.jpg',
        course_name: 'Cấu trúc dữ liệu',
        time: '09:00 - 11:00',
        status: 'Đã duyệt',
      },
    ],
    // Thêm dữ liệu cho các ngày còn lại nếu cần
  };

  // Hàm để chuyển đến tuần trước
  const goToPreviousWeek = () => {
    setCurrentDate(currentDate.clone().subtract(1, 'week'));
  };

  // Hàm để chuyển đến tuần tiếp theo
  const goToNextWeek = () => {
    setCurrentDate(currentDate.clone().add(1, 'week'));
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} color="#FFFFFF" />
        <Appbar.Content title="Lịch Giảng" titleStyle={styles.headerTitle} />
        <Appbar.Action icon="plus" onPress={() => navigation.navigate('AddLecturerSchedule')} color="#FFFFFF" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.weekTitle}>
          Tuần: {currentDate.format('W/YYYY')}
        </Text>
        {Object.keys(scheduleData).map((day) => (
          <View key={day} style={styles.containerTitle}>
            <Text style={styles.title}>{day}</Text>
            <Divider style={styles.dividerTitle} />
            {scheduleData[day].map((lecturer) => (
              <Card key={lecturer.lecturer_id} style={styles.card}>
                <Card.Title
                  title={lecturer.name}
                  subtitle={`${lecturer.course_name} - ${lecturer.time}`}
                  left={(props) => (
                    <Avatar.Image
                      {...props}
                      source={{ uri: lecturer.photo_url }}
                      size={40}
                    />
                  )}
                />
                <Card.Content>
                  <Text style={styles.status}>
                    Trạng thái: {lecturer.status}
                  </Text>
                </Card.Content>
              </Card>
            ))}
          </View>
        ))}

        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={goToPreviousWeek} style={styles.button}>
            Trước
          </Button>
          <Button mode="contained" onPress={goToNextWeek} style={styles.button}>
            Tiếp
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  header: {
    backgroundColor: '#3F51B5',
  },
  headerTitle: {
    color: '#FFFFFF',
  },
  scrollContainer: {
    padding: 16,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#3F51B5',
  },
  weekTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F51B5',
    textAlign: 'right',
  },
  dividerTitle: {
    backgroundColor: '#3F51B5',
    height: 2,
    marginVertical: 10,
  },
  containerTitle: {
    marginVertical: 5,
  },
  card: {
    marginBottom: 10,
    borderRadius: 5,
  },
  status: {
    fontSize: 14,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default LecturerScheduleScreen;

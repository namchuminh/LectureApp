import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Appbar, Divider, Card, Avatar, Button } from 'react-native-paper';
import moment from 'moment'; // Thư viện để làm việc với thời gian
import axios from 'axios';
import { useIsFocused } from "@react-navigation/native";

const LecturerScheduleScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  // Ngày hiện tại để hiển thị lịch
  const [currentDate, setCurrentDate] = useState(moment()); // Sử dụng moment để dễ dàng quản lý ngày
  const [scheduleData, setScheduleData] = useState({});

  const fetchData = async () => {
    axios.get(`http://10.0.2.2:3001/schedules/?week=${currentDate.format('W/YYYY').split('/')[0]}`)
      .then(response => {
        setScheduleData(response.data)
      })
      .catch(error => {
        console.error('Lỗi khi lấy thông tin:', error);
      });
  }

  useEffect(() => {
    fetchData();
  }, [currentDate, isFocused]);

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
        <Appbar.Action icon="home" onPress={() => navigation.goBack()} color="#FFFFFF" />
        <Appbar.Content title="Lịch Giảng" titleStyle={styles.headerTitle} />
        <Appbar.Action />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.weekTitle}>
          Tuần: {currentDate.format('W/YYYY')}
        </Text>
        {Object.keys(scheduleData).map((day) => (
          <View key={day} style={styles.containerTitle}>
            <Text style={styles.title}>{day}</Text>
            <Divider style={styles.dividerTitle} />
            {scheduleData[day].length > 0 ? (
              scheduleData[day].map((lecturer, index) => (
                <Card key={`${day}-${lecturer.lecturer_id}-${index}`} style={styles.card}>
                  <Card.Title
                    title={lecturer.name}
                    subtitle={`${lecturer.course_name}`}
                    left={(props) => (
                      <Avatar.Image
                        {...props}
                        source={{ uri: `http://10.0.2.2:3001/${lecturer.photo_url}` }}
                        size={40}
                      />
                    )}
                  />
                  <Card.Content>
                    <Text style={styles.status}>
                      {lecturer.time}
                    </Text>
                    <Text style={styles.status}>
                      Trạng thái: {lecturer.status}
                    </Text>
                  </Card.Content>
                </Card>
              ))
            ) : (
              <Text style={styles.noScheduleText}>Chưa có lịch giảng</Text>
            )}
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
  noScheduleText: {
    fontSize: 14,
    color: '#A9A9A9', // Màu xám nhạt
    textAlign: 'center',
    marginVertical: 10,
  }
});

export default LecturerScheduleScreen;

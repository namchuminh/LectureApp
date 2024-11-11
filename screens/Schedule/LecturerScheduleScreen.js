import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Appbar, Divider, Card, Avatar, Button } from 'react-native-paper';
import moment from 'moment'; // Thư viện để làm việc với thời gian
import axios from 'axios';
import { useIsFocused } from "@react-navigation/native";
import CryptoJS from 'crypto-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const decodeJWT = (token) => {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('JWT không hợp lệ');
  }

  const payload = parts[1];
  const decoded = CryptoJS.enc.Base64.parse(payload);
  return JSON.parse(decoded.toString(CryptoJS.enc.Utf8));
};

const LecturerScheduleScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  // Ngày hiện tại để hiển thị lịch
  const [currentDate, setCurrentDate] = useState(moment()); // Sử dụng moment để dễ dàng quản lý ngày
  const [scheduleData, setScheduleData] = useState({});
  const [isAdmin, setIsAdmin] = useState(true)

  const fetchData = async () => {
    const token = await AsyncStorage.getItem('token');
    const decodedToken = decodeJWT(token);
    if (decodedToken.account.role == 'lecturer') {
      setIsAdmin(false);
      axios.get(`http://10.0.2.2:3001/schedules/?week=${currentDate.format('W/YYYY').split('/')[0]}&lecturer_id=${decodedToken.lecturer.lecturer_id}`)
        .then(response => {
          setScheduleData(response.data)
        })
        .catch(error => {
          console.error('Lỗi khi lấy thông tin:', error);
        });
    } else {
      setIsAdmin(true)
      axios.get(`http://10.0.2.2:3001/schedules/?week=${currentDate.format('W/YYYY').split('/')[0]}`)
        .then(response => {
          setScheduleData(response.data)
        })
        .catch(error => {
          console.error('Lỗi khi lấy thông tin:', error);
        });
    }
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

  const handleStatus = (schedule_id, status) => {
    const data = {
      status
    };
    axios.patch(`http://10.0.2.2:3001/schedules/${schedule_id}/status`, data)
        .then(response => {
          fetchData();
        })
        .catch(error => {
          console.error('Lỗi khi xử lý:', error);
        });
  }


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
                      Thời Gian: {lecturer.time}
                    </Text>
                    <Text></Text>
                    <Text style={styles.status}>
                      Trạng Thái: {lecturer.status}
                    </Text>
                  </Card.Content>
                  <Divider style={styles.divider} />
                  {
                    isAdmin == false ?
                      lecturer.status == "Chưa duyệt" ?
                      <>
                        <Card.Actions style={styles.actions}>
                          <Button style={{ backgroundColor: 'white' }} onPress={() => handleStatus(lecturer.schedule_id, "approved")}>
                            <Text style={styles.btnText}>
                              Đồng Ý
                            </Text>
                          </Button>
                          <Button style={{ backgroundColor: 'white' }} onPress={() => handleStatus(lecturer.schedule_id, "rejected")}>
                            <Text style={styles.btnText}>
                              Từ Chối
                            </Text>
                          </Button>
                        </Card.Actions>
                      </>
                      :
                      null
                    :
                      null
                  }
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
  },
  divider: {
    marginVertical: 8,
    marginHorizontal: 15
  },
  actions: {
    justifyContent: 'flex-end',
  },
  btnText: {
    color: '#3F51B5',
  },
});

export default LecturerScheduleScreen;

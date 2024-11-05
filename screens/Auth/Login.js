import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { TextInput, Button, Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


// URL hình nền
const backgroundImageUrl = 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDEwfHxuYXR1cmV8ZW58MHx8fHwxNjk5MjA4MTY1&ixlib=rb-1.2.1&q=80&w=1080'; // Thay đổi URL hình nền ở đây

const Login = ({ setIsLoggedIn, navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Vui lòng nhập tài khoản và mật khẩu!");
      return;
    }
    try {
      const response = await axios.post('http://10.0.2.2:3001/auth/login', {
        username,
        password,
      });
      
      const token = response.data.token; // Thay đổi nếu cần
      await AsyncStorage.setItem('token', token); // Lưu token vào AsyncStorage

      setIsLoggedIn(true); // Cập nhật trạng thái đăng nhập
      navigation.navigate('LecturerScheduleScreen'); // Chuyển đến trang chủ
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Sai tài khoản hoặc mật khẩu!");
      }
    }
  };

  return (
    <ImageBackground source={{ uri: backgroundImageUrl }} style={styles.background}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Đăng Nhập</Title>
            <TextInput
              label="Tài Khoản"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              label="Mật Khẩu"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              mode="outlined"
              secureTextEntry
            />
            <Button
              mode="contained"
              onPress={handleLogin}
              style={styles.button}
              contentStyle={styles.buttonContent}
            >
              Đăng Nhập
            </Button>
            <Paragraph style={styles.registerText}>
              <Button onPress={() => navigation.navigate('Register') }>Đăng Ký Thính Giảng</Button>
            </Paragraph>
          </Card.Content>
        </Card>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  card: {
    borderRadius: 16,
    elevation: 5,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  buttonContent: {
    height: 50,
  },
  registerText: {
    textAlign: 'center',
    marginTop: 18,
  },
});

export default Login;

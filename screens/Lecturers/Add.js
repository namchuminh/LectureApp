import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { Appbar, TextInput, Button, RadioButton, Menu, Divider } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

const Add = ({ navigation }) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('Nam'); // Giới tính mặc định
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [degree, setDegree] = useState('');
  const [major, setMajor] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [imageDegree, setImageDegree] = useState('');
  const [departments, setDepartments] = useState([]);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const fetchData = async () => {
    axios.get('http://10.0.2.2:3001/departments')
      .then(response => {
        const formattedDepartments = response.data.departments.map(department => ({
          label: department.name,
          value: department.name
        }));
        setDepartments(formattedDepartments)
      })
      .catch(error => {
        console.error('Lỗi khi lấy thông tin:', error);
      });
  }

  useEffect(() => {
    fetchData();
  }, [])


  const handleAddLecturer = () => {
    const fieldsToCheck = {
      'Họ và tên': name,
      'Giới tính': gender,
      'Ngày sinh': dateOfBirth,
      'Email': email,
      'Số điện thoại': phone,
      'Địa chỉ': address,
      'Bằng cấp': degree,
      'Chuyên ngành': major,
      'Ảnh đại diện': photoUrl,
      'Tài khoản': username,
      'Mật khẩu': password,
    };

    // Lặp qua từng trường và kiểm tra
    for (const [label, value] of Object.entries(fieldsToCheck)) {
      if (!value) {
        alert(`Vui lòng nhập ${label}`);
        return;
      }
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('gender', gender);
    formData.append('date_of_birth', dateOfBirth);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('degree', degree);
    formData.append('major', major);
    formData.append('photo', {
      uri: photoUrl,
      type: 'image/jpeg', // Thay đổi kiểu theo định dạng ảnh của bạn
      name: 'photo.jpg', // Đặt tên file cho ảnh
    });
    formData.append('photoDegree', {
      uri: imageDegree,
      type: 'image/jpeg', // Thay đổi kiểu theo định dạng ảnh của bạn
      name: 'imageDegree.jpg', // Đặt tên file cho ảnh
    });
    formData.append('username', username);
    formData.append('password', password);

    axios.post('http://10.0.2.2:3001/lecturers', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Cấu hình Content-Type cho FormData
      },
    })
      .then(response => {
        alert('Đăng ký thính giảng thành công! Chúng tôi sẽ liên hệ cho bạn sớm nhất!');
        navigation.navigate('Login');
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert('Đã xảy ra lỗi không xác định. Vui lòng thử lại!');
        }
      });

  };

  const handleSelectImage = async () => {
    // Yêu cầu quyền truy cập vào ảnh
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Bạn cần cấp quyền truy cập vào thư viện ảnh!');
      return;
    }

    // Mở thư viện ảnh để chọn ảnh
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotoUrl(result.assets[0].uri); // Lưu URL ảnh đã chọn
    }
  };

  const handleSelectImageDegree = async () => {
    // Yêu cầu quyền truy cập vào ảnh
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Bạn cần cấp quyền truy cập vào thư viện ảnh!');
      return;
    }

    // Mở thư viện ảnh để chọn ảnh
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageDegree(result.assets[0].uri); // Lưu URL ảnh đã chọn
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Action icon="arrow-left" onPress={() => navigation.navigate('Login')} color="#FFFFFF" />
        <Appbar.Content title="Đăng Ký Thính Giảng" titleStyle={styles.headerTitle} />
        <Appbar.Action />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Thông Tin Cá Nhân</Text>
          <Divider style={styles.dividerTitle} />
        </View>
        <Text style={styles.label}>Ảnh đại diện</Text>
        <TouchableOpacity onPress={handleSelectImage}
          style={[
            styles.inputImage,
            { paddingVertical: photoUrl ? 5 : 18 } // Thay đổi paddingVertical dựa trên photoUrl
          ]}
        >
          {photoUrl ? (
            <Image source={{ uri: photoUrl }} style={styles.image} />
          ) : (
            <Text style={styles.placeholder}>Chọn ảnh từ thư viện</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.label}>Họ và tên</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          mode="outlined"
          placeholder="Nhập họ và tên"
        />
        <Text style={styles.label}>Giới tính:</Text>
        <View style={styles.genderContainer}>
          <RadioButton.Group onValueChange={setGender} value={gender}>
            <View style={styles.genderOption}>
              <RadioButton value="Nam" />
              <Text>Nam</Text>
            </View>
            <View style={styles.genderOption}>
              <RadioButton value="Nữ" />
              <Text>Nữ</Text>
            </View>
          </RadioButton.Group>
        </View>
        <Text style={styles.label}>Ngày sinh (YYYY-MM-DD)</Text>
        <TextInput
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
          style={styles.input}
          mode="outlined"
          placeholder="Nhập ngày sinh"
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          mode="outlined"
          keyboardType="email-address"
          placeholder="Nhập email"
        />
        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
          mode="outlined"
          keyboardType="phone-pad"
          placeholder="Nhập số điện thoại"
        />
        <Text style={styles.label}>Địa chỉ</Text>
        <TextInput
          value={address}
          onChangeText={setAddress}
          style={styles.input}
          mode="outlined"
          placeholder="Nhập địa chỉ"
        />
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Thông Tin Trình Độ</Text>
          <Divider style={styles.dividerTitle} />
        </View>
        <Text style={styles.label}>Bằng cấp</Text>
        <View style={styles.inputContainer}>
          <RNPickerSelect
            onValueChange={(value) => setDegree(value)}
            items={[
              { label: 'Cử Nhân', value: 'Cử Nhân' },
              { label: 'Kỹ Sư', value: 'Kỹ Sư' },
              { label: 'Chuyên Gia', value: 'Chuyên Gia' },
              { label: 'Thạc Sĩ', value: 'Thạc Sĩ' },
              { label: 'Tiến Sĩ', value: 'Tiến Sĩ' },
              { label: 'Giáo Sư', value: 'Giáo Sư' },
            ]}
            placeholder={{
              label: 'Chọn Bằng Cấp',
              value: null,
              color: 'black',
            }}
            style={{
              inputIOS: styles.pickerInput,
              inputAndroid: styles.pickerInput,
              placeholder: {
                color: 'black',
              },
              iconContainer: {
                top: 10,
                right: 12,
              },
            }}
            value={degree}
            useNativeAndroidPickerStyle={false} // Để style tùy chỉnh hoạt động trên Android
          />
        </View>
        <Text style={styles.label}>Chuyên ngành</Text>
        <View style={styles.inputContainer}>
          <RNPickerSelect
            onValueChange={(value) => setMajor(value)}
            items={departments}
            placeholder={{
              label: 'Chọn Giảng Dạy',
              value: null,
              color: 'black',
            }}
            style={{
              inputIOS: styles.pickerInput,
              inputAndroid: styles.pickerInput,
              placeholder: {
                color: 'black',
              },
              iconContainer: {
                top: 10,
                right: 12,
              },
            }}
            value={major}
            useNativeAndroidPickerStyle={false} // Để style tùy chỉnh hoạt động trên Android
          />
        </View>

        <Text style={styles.label}>Ảnh Bằng Cấp</Text>
        <TouchableOpacity onPress={handleSelectImageDegree}
          style={[
            styles.inputImage,
            { paddingVertical: imageDegree ? 5 : 18 } // Thay đổi paddingVertical dựa trên photoUrl
          ]}
        >
          {imageDegree ? (
            <Image source={{ uri: imageDegree }} style={styles.degreeImage} />
          ) : (
            <Text style={styles.placeholder}>Chọn ảnh từ thư viện</Text>
          )}
        </TouchableOpacity>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Thông Tin Hệ Thống</Text>
          <Divider style={styles.dividerTitle} />
        </View>
        <Text style={styles.label}>Tài khoản</Text>
        <TextInput
          value={username}
          onChangeText={setUserName}
          style={styles.input}
          mode="outlined"
          placeholder="Nhập tài khoản"
        />

        <Text style={styles.label}>Mật khẩu</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          mode="outlined"
          placeholder="Nhập mật khẩu"
          secureTextEntry // Ẩn mật khẩu khi nhập
        />
        <Button style={styles.btn} onPress={handleAddLecturer}>
          <Text style={styles.btnText}>Đăng Ký</Text>
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    backgroundColor: '#3F51B5', // Màu xanh cho header
  },
  headerTitle: {
    color: '#FFFFFF', // Màu chữ trắng
  },
  scrollContainer: {
    padding: 16,
  },
  label: {
    marginBottom: 5
  },
  input: {
    marginBottom: 10
  },
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  divider: {
    marginTop: 20,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: '#3F51B5',
    borderRadius: 4,
    marginVertical: 15
  },
  btnText: {
    color: '#FFFFFF',
  },
  title: {
    fontSize: 15, // Kích thước chữ
    fontWeight: 'bold', // Đậm
    color: '#3F51B5', // Màu chữ
  },
  dividerTitle: {
    backgroundColor: '#3F51B5', // Màu đường chia
    height: 2, // Độ dày của đường chia
    marginVertical: 10, // Khoảng cách dọc xung quanh đường chia
  },
  containerTitle: {
    marginVertical: 5, // Khoảng cách dọc xung quanh
  },
  image: {
    width: 130,               // Chiều rộng hình chữ nhật của ảnh
    height: 150,              // Chiều cao hình chữ nhật của ảnh
  },
  degreeImage: {
    width: '100%',               // Chiều rộng hình chữ nhật của ảnh
    height: 200,
  },
  inputImage: {
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 5
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 10
  },
  pickerInput: {
    fontSize: 14,
    paddingHorizontal: 10
  },
});

export default Add;

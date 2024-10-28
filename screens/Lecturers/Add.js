import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Appbar, TextInput, Button, RadioButton, Menu, Divider } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

const Add = ({ navigation }) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('Nam'); // Giới tính mặc định
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [degree, setDegree] = useState('');
  const [degreeMenuVisible, setDegreeMenuVisible] = useState(false); // Kiểm soát menu
  const [major, setMajor] = useState('');
  const [university, setUniversity] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [currentPosition, setCurrentPosition] = useState('');
  const [institution, setInstitution] = useState('');
  const [bio, setBio] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const handleAddLecturer = () => {
    const newLecturer = {
      name,
      gender,
      date_of_birth: dateOfBirth,
      email,
      phone,
      address,
      degree,
      major,
      university,
      years_of_experience: yearsOfExperience,
      current_position: currentPosition,
      institution,
      bio,
      photo_url: photoUrl,
    };
    // Xử lý thêm giảng viên vào danh sách hoặc gọi API
    console.log('Giảng viên mới:', newLecturer);
    navigation.goBack(); // Quay về trang trước đó
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

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Đăng Ký Thính Giảng" titleStyle={styles.headerTitle} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Thông Tin Cá Nhân</Text>
          <Divider style={styles.dividerTitle} />
        </View>
        <Text style={styles.label}>Ảnh đại diện</Text>
        <TouchableOpacity onPress={handleSelectImage} style={styles.inputImage}>
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
        <Menu
          visible={degreeMenuVisible}
          onDismiss={() => setDegreeMenuVisible(false)}
          anchor={
            <Button
              mode="outlined"
              onPress={() => setDegreeMenuVisible(true)}
              style={[styles.input, { borderRadius: 5, paddingVertical: 7 }]} // Bỏ border radius
            >
              Chọn Bằng cấp: {degree || 'Chưa chọn'}
            </Button>
          }
        >
          {['Công Nghệ Thông Tin', 'An Toàn Thông Tin', 'Thị Giác Máy Tính'].map((degreeOption) => (
            <Menu.Item
              key={degreeOption}
              onPress={() => {
                setDegree(degreeOption);
                setDegreeMenuVisible(false);
              }}
              title={degreeOption}
            />
          ))}
        </Menu>
        <Text style={styles.label}>Chuyên ngành</Text>
        <Menu
          visible={degreeMenuVisible}
          onDismiss={() => setDegreeMenuVisible(false)}
          anchor={
            <Button
              mode="outlined"
              onPress={() => setDegreeMenuVisible(true)}
              style={[styles.input, { borderRadius: 5, paddingVertical: 7 }]} // Bỏ border radius
            >
              Chọn Chuyên Ngành: {degree || 'Chưa chọn'}
            </Button>
          }
        >
          {['Công Nghệ Thông Tin', 'An Toàn Thông Tin', 'Thị Giác Máy Tính'].map((degreeOption) => (
            <Menu.Item
              key={degreeOption}
              onPress={() => {
                setDegree(degreeOption);
                setDegreeMenuVisible(false);
              }}
              title={degreeOption}
            />
          ))}
        </Menu>
        
        <Text style={styles.label}>Ảnh Bằng Cấp</Text>
        <TouchableOpacity onPress={handleSelectImage} style={styles.inputImage}>
          {photoUrl ? (
            <Image source={{ uri: photoUrl }} style={styles.image} />
          ) : (
            <Text style={styles.placeholder}>Chọn ảnh từ thư viện</Text>
          )}
        </TouchableOpacity>
        <Button style={styles.btn}>
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
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  inputImage: {
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    marginBottom: 10
  },
});

export default Add;

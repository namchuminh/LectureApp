import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Appbar, Button } from 'react-native-paper';

const Profile = ({ navigation }) => {
    const userProfile = {
        name: 'Trần Thị B',
        gender: 'Nữ',
        date_of_birth: '1990-08-20',
        email: 'b.tran@example.com',
        phone: '0987654321',
        address: '456 Đường XYZ, Quận 2, TP.HCM',
        degree: 'Thạc Sĩ',
        major: 'Kỹ thuật phần mềm',
        university: 'Đại học Sư Phạm Kỹ Thuật',
        years_of_experience: 5,
        photo_url: 'https://randomuser.me/api/portraits/women/2.jpg',
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <Appbar.Header style={styles.header}>
                <Appbar.Action icon="home" onPress={() => navigation.goBack()} color="#FFFFFF" />
                <Appbar.Content title="Cá Nhân" titleStyle={styles.headerTitle} />
                <Appbar.Action icon="square-edit-outline" color="#FFFFFF" />
            </Appbar.Header>

            {/* Avatar */}
            <View style={styles.avatarContainer}>
                <ImageBackground
                    source={require('../../assets/bg-lecture.jpg')} // Đường dẫn tới hình ảnh nền
                    style={styles.avatarBackground}
                >
                    <Image source={{ uri: userProfile.photo_url }} style={styles.avatar} />
                </ImageBackground>
            </View>

            {/* Thông tin người dùng */}
            <View style={styles.infoContainer}>
                <View style={styles.row}>
                    <Text style={styles.label}>Họ và Tên:</Text>
                    <Text style={styles.value}>{userProfile.name}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Giới Tính:</Text>
                    <Text style={styles.value}>{userProfile.gender}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Ngày Sinh:</Text>
                    <Text style={styles.value}>{userProfile.date_of_birth}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.value}>{userProfile.email}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Điện Thoại:</Text>
                    <Text style={styles.value}>{userProfile.phone}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Địa Chỉ:</Text>
                    <Text style={styles.value}>{userProfile.address}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Bằng Cấp:</Text>
                    <Text style={styles.value}>{userProfile.degree}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Chuyên Ngành:</Text>
                    <Text style={styles.value}>{userProfile.major}</Text>
                </View>

            </View>

            {/* Nút Đăng Xuất */}
            <TouchableOpacity style={styles.logoutButton} onPress={() => {/* Xử lý đăng xuất */}}>
                <Text style={styles.logoutButtonText}>Đăng Xuất</Text>
            </TouchableOpacity>
        </View>
    );
};

// Các Style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        backgroundColor: '#3F51B5',
    },
    headerTitle: {
        color: '#FFFFFF',
    },
    avatarContainer: {
        alignItems: 'center',
        backgroundColor: '#F2F2F2'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50, // Hình tròn
        marginVertical: 30
    },
    infoContainer: {
        marginHorizontal: 20,
        marginTop: 15
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
    },
    label: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    value: {
        color: '#555555',
    },
    avatarBackground: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutButton: {
        backgroundColor: '#3F51B5', // Màu đỏ cho nút đăng xuất
        borderRadius: 4,
        margin: 20,
        padding: 10,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});

export default Profile;

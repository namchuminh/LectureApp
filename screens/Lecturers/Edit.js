import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Appbar, Button } from 'react-native-paper';

const Edit = ({ route, navigation }) => {
    const lecturer = {
        lecturer_id: 2,
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
                <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} color="#FFFFFF" />
                <Appbar.Content title="Thông Tin" titleStyle={styles.headerTitle} />
            </Appbar.Header>

            {/* Avatar */}
            <View style={styles.avatarContainer}>
                <ImageBackground
                    source={require('../../assets/bg-lecture.jpg')} // Đường dẫn tới hình ảnh
                    style={styles.avatarBackground}
                >
                    <Image source={{ uri: lecturer.photo_url }} style={styles.avatar} />
                </ImageBackground>
            </View>

            {/* Thông tin giảng viên */}
            <View style={styles.infoContainer}>
                <View style={styles.row}>
                    <Text style={styles.label}>Họ và Tên:</Text>
                    <Text style={styles.value}>{lecturer.name}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Giới Tính:</Text>
                    <Text style={styles.value}>{lecturer.gender}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Ngày Sinh:</Text>
                    <Text style={styles.value}>{lecturer.date_of_birth}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.value}>{lecturer.email}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Điện Thoại:</Text>
                    <Text style={styles.value}>{lecturer.phone}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Địa Chỉ:</Text>
                    <Text style={styles.value}>{lecturer.address}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Bằng Cấp:</Text>
                    <Text style={styles.value}>{lecturer.degree}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Chuyên Ngành:</Text>
                    <Text style={styles.value}>{lecturer.major}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Trường:</Text>
                    <Text style={styles.value}>{lecturer.university}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Kinh Nghiệm:</Text>
                    <Text style={styles.value}>{lecturer.years_of_experience} năm</Text>
                </View>
                <Button style={styles.btn}>
                    <Text style={styles.btnText}>Cập Nhật Thông Tin</Text>
                </Button>
            </View>
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
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
        marginVertical: 10,
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
        fontSize: '15'
    },
    value: {
        color: '#555555',
    },
    avatarBackground: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        backgroundColor: '#3F51B5',
        borderRadius: 4,
        marginTop: 20
    },
    btnText: {
        color: '#FFFFFF'
    },
});

export default Edit;

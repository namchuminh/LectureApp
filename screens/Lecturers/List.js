import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Appbar, Card, Avatar, IconButton } from 'react-native-paper';

const List = ({ navigation }) => {
    const initialLecturers = [
        {
            lecturer_id: 1,
            name: 'Nguyễn Văn A',
            email: 'nguyenvana@example.com',
            degree: 'Tiến Sĩ',
            university: 'Đại học ABC',
            photo_url: 'https://via.placeholder.com/150',
        },
        {
            lecturer_id: 2,
            name: 'Trần Thị B',
            email: 'tranthib@example.com',
            degree: 'Thạc Sĩ',
            university: 'Đại học DEF',
            photo_url: 'https://via.placeholder.com/150',
        },
        {
            lecturer_id: 3,
            name: 'Lê Văn C',
            email: 'levanc@example.com',
            degree: 'Cử Nhân',
            university: 'Đại học GHI',
            photo_url: 'https://via.placeholder.com/150',
        },
        {
            lecturer_id: 4,
            name: 'Phạm Thị D',
            email: 'phamthid@example.com',
            degree: 'Tiến Sĩ',
            university: 'Đại học XYZ',
            photo_url: 'https://via.placeholder.com/150',
        },
        {
            lecturer_id: 5,
            name: 'Hoàng Văn E',
            email: 'hoangvane@example.com',
            degree: 'Thạc Sĩ',
            university: 'Đại học LMN',
            photo_url: 'https://via.placeholder.com/150',
        },
    ];

    const [lecturers, setLecturers] = useState(initialLecturers);
    const [search, setSearch] = useState('');

    const handleSearch = (text) => {
        setSearch(text);
    };

    const handleDeleteLecturer = (lecturer_id) => {
        setLecturers(lecturers.filter(lecturer => lecturer.lecturer_id !== lecturer_id));
    };

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} color="#FFFFFF" />
                <Appbar.Content title="Giảng Viên" titleStyle={styles.headerTitle} />
                <Appbar.Action icon="plus" onPress={() => navigation.navigate('Add')} color="#FFFFFF" />
            </Appbar.Header>

            <FlatList
                style={{ marginTop: 10 }}
                data={lecturers.filter(lecturer => lecturer.name.toLowerCase().includes(search.toLowerCase()) || lecturer.email.toLowerCase().includes(search.toLowerCase()))}
                keyExtractor={(item) => item.lecturer_id.toString()}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <Card.Title
                            title={item.name}
                            subtitle={`${item.degree} - ${item.university}`}
                            left={(props) => (
                                <Avatar.Image
                                    {...props}
                                    source={{ uri: item.photo_url }}
                                    size={50}
                                />
                            )}
                            right={(props) => (
                                <IconButton
                                icon="square-edit-outline" 
                                size={24}
                                onPress={() => navigation.navigate('Edit')}
                                />
                            )}
                        />
                    </Card>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#3F51B5', // Màu xanh cho header
    },
    headerTitle: {
        color: '#FFFFFF', // Màu chữ trắng
    },
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2'
    },
    card: {
        marginHorizontal: 10,
        marginVertical: 5,
        backgroundColor: '#FFFFFF'
    },
    button: {
        backgroundColor: '#3F51B5'
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    divider: {
        marginTop: 15,
    }
});

export default List;

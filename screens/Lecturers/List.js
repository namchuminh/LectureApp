import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import { Appbar, Card, Avatar, IconButton, Button } from 'react-native-paper';

const List = ({ navigation }) => {
    const initialLecturers = [
        { lecturer_id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@example.com', degree: 'Tiến Sĩ', university: 'Đại học ABC', photo_url: 'https://via.placeholder.com/150', status: 1 },
        { lecturer_id: 2, name: 'Trần Thị B', email: 'tranthib@example.com', degree: 'Thạc Sĩ', university: 'Đại học DEF', photo_url: 'https://via.placeholder.com/150', status: 0 },
        { lecturer_id: 3, name: 'Lê Văn C', email: 'levanc@example.com', degree: 'Cử Nhân', university: 'Đại học GHI', photo_url: 'https://via.placeholder.com/150', status: 0 },
        { lecturer_id: 4, name: 'Phạm Thị D', email: 'phamthid@example.com', degree: 'Tiến Sĩ', university: 'Đại học XYZ', photo_url: 'https://via.placeholder.com/150', status: 1 },
        { lecturer_id: 5, name: 'Hoàng Văn E', email: 'hoangvane@example.com', degree: 'Thạc Sĩ', university: 'Đại học LMN', photo_url: 'https://via.placeholder.com/150', status: 0 },
    ];

    const [lecturers, setLecturers] = useState(initialLecturers);
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState('Danh sách'); // Trạng thái để lưu tab đang chọn

    const handleSearch = (text) => {
        setSearch(text);
    };

    // Lọc danh sách giảng viên theo trạng thái của tab
    const filteredLecturers = lecturers.filter(
        (lecturer) => lecturer.name.toLowerCase().includes(search.toLowerCase()) || lecturer.email.toLowerCase().includes(search.toLowerCase())
    ).filter(
        (lecturer) => (activeTab === 'Danh sách' ? lecturer.status === 1 : lecturer.status === 0)
    );

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Appbar.Action  icon="home" onPress={() => navigation.goBack()} color="#FFFFFF" />
                <Appbar.Content title="Thính Giảng" titleStyle={styles.headerTitle} />
                <Appbar.Action icon="magnify" onPress={() => navigation.navigate('Add')} color="#FFFFFF" />
            </Appbar.Header>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                <Text
                    style={[
                        styles.tabButton,
                        activeTab === 'Danh sách' && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab('Danh sách')}
                >
                    Danh sách
                </Text>
                <Text
                    style={[
                        styles.tabButton,
                        activeTab === 'Đang chờ' && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab('Đang chờ')}
                >
                    Đang chờ
                </Text>
            </View>

            <FlatList
                data={filteredLecturers}
                keyExtractor={(item) => item.lecturer_id.toString()}
                renderItem={({ item }) => (
                    <Card style={styles.card} onPress={() => navigation.navigate('Edit')}>
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
    tabContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#dbdfe4',
        backgroundColor: 'white'
    },
    tabButton: {
        flex: 1,
        textAlign: 'center',
        paddingVertical: 10,
        fontSize: 16,
        color: '#3F51B5',
        borderBottomWidth: 1,
        borderBottomColor: 'transparent'
    },
    activeTab: {
        fontWeight: 'bold'
    },
    card: {
        marginHorizontal: 10,
        marginVertical: 5,
        backgroundColor: '#FFFFFF'
    }
});

export default List;

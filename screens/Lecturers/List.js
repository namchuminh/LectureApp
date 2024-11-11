import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import { Appbar, Card, Avatar, IconButton } from 'react-native-paper';
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
const List = ({ navigation }) => {
    const isFocused = useIsFocused();
    const [lecturers, setLecturers] = useState([]);
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState('Danh sách'); // Trạng thái để lưu tab đang chọn
    const [isAdmin, setIsAdmin] = useState(true)
    const handleSearch = (text) => {
        setSearch(text);
    };

    // Lọc danh sách giảng viên theo trạng thái của tab
    const filteredLecturers = lecturers.filter(
        (lecturer) => lecturer.name.toLowerCase().includes(search.toLowerCase()) || lecturer.email.toLowerCase().includes(search.toLowerCase())
    ).filter(
        (lecturer) => (activeTab === 'Danh sách' ? lecturer.status === 1 : lecturer.status === 0)
    );

    const fetchData = async () => {
        axios.get('http://10.0.2.2:3001/lecturers')
        .then(response => {
            setLecturers(response.data.lecturers)
        })
        .catch(error => {
            console.error('Lỗi khi lấy thông tin:', error);
        });
    }

    const checkAdmin = async () => {
        const token = await AsyncStorage.getItem('token');
        const decodedToken = decodeJWT(token);
        if(decodedToken.account.role == 'lecturer'){
            setIsAdmin(false);
        }else{
            setIsAdmin(true)
        }
    }
    
    useEffect(() => {
        fetchData();
        checkAdmin();
    },[isFocused])

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Appbar.Action  icon="home" onPress={() => navigation.goBack()} color="#FFFFFF" />
                <Appbar.Content title="Thính Giảng" titleStyle={styles.headerTitle} />
                <Appbar.Action />
            </Appbar.Header>

            {/* Tabs */}
            {
                isAdmin == true
                ?
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
                :
                null
            }
        
            <FlatList
                data={filteredLecturers}
                keyExtractor={(item) => item.lecturer_id.toString()}
                renderItem={({ item }) => (
                    <Card style={styles.card} onPress={() => navigation.navigate('Edit', { lecturer_id: item.lecturer_id })}>
                        <Card.Title
                            title={item.name}
                            subtitle={`${item.degree} - ${item.major}`}
                            left={(props) => (
                                <Avatar.Image
                                    {...props}
                                    source={{ uri: `http://10.0.2.2:3001/${item.photo_url}` }}
                                    size={50}
                                />
                            )}
                            right={(props) => (
                                item.status == 1 && isAdmin == true ? ( // Kiểm tra điều kiện
                                    <IconButton
                                        icon="calendar-plus"
                                        color="#D32F2F"
                                        onPress={() => navigation.navigate('AddLecturerSchedule', { lecturer_id: item.lecturer_id })}
                                    />
                                )
                                :
                                null
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

import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Appbar, Card, Text, Button, IconButton, Divider, Icon } from 'react-native-paper';
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
const ListCourse = ({ route, navigation }) => {
    const { department_id } = route.params || {};

    const isFocused = useIsFocused();
    const [courses, setCourses] = useState([]);
    const [isAdmin, setIsAdmin] = useState(true)

    const fetchData = async () => {
        axios.get(`http://10.0.2.2:3001/courses/${department_id}/index`)
        .then(response => {
            setCourses(response.data.courses)
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

    const handelDelete = (id) => {
        axios.delete(`http://10.0.2.2:3001/courses/${id}`)
        .then(response => {
            fetchData();
        })
        .catch(error => {
            console.error('Lỗi khi lấy thông tin:', error);
        });
    }

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Appbar.Action icon="arrow-left" onPress={() => navigation.navigate('ListDepartment')} color="#FFFFFF" />
                <Appbar.Content title="Môn Học" titleStyle={styles.headerTitle} />
                {
                    isAdmin == true ?
                        <Appbar.Action icon="plus" onPress={() => navigation.navigate('AddCourse', { department_id })} color="#FFFFFF" />
                    :
                        <Appbar.Action />
                }
            </Appbar.Header>
            {
                courses.length != 0 
                ?
                    <FlatList
                        data={courses}
                        style={{ marginTop: 8 }}
                        keyExtractor={(item) => item.course_id.toString()}
                        renderItem={({ item }) => (
                            <Card style={styles.card}>
                                <Card.Title title={item.course_name}/>
                                <Card.Content>
                                    <Text>{`Mã môn: ${item.course_code}`}</Text>
                                    <Text></Text>
                                    <Text>{`Tín chỉ: ${item.credits} tín`}</Text>
                                </Card.Content>
                                <Divider style={styles.divider} />
                                <Card.Actions style={styles.actions}>
                                    <Button  style={{ backgroundColor: 'white' }} onPress={() => navigation.navigate('LecturerListByCourse', { course: item })}>
                                        <Text style={styles.btnText}>
                                            {
                                                isAdmin ? 
                                                    "Thính Giảng"
                                                :
                                                    "Xem Thính Giảng"
                                            }
                                        </Text>
                                    </Button>
                                    {
                                        isAdmin == true ?
                                            <>
                                                <IconButton
                                                    icon="square-edit-outline"
                                                    color="#D32F2F"
                                                    onPress={() => navigation.navigate('EditCourse', { course_id: item.course_id })}
                                                />
                                                <IconButton
                                                    icon="delete"
                                                    color="#D32F2F"
                                                    onPress={() => handelDelete(item.course_id)}
                                                />
                                            </>
                                        :
                                            null
                                    }
                                    
                                </Card.Actions>
                            </Card>
                        )}
                    />
                :
                    <View style={styles.emptyMessageContainer}>
                        <Text style={styles.emptyMessageText}>Không tìm thấy môn học!</Text>
                    </View>
            }
            
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
        margin: 8,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        elevation: 3,
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
    emptyMessageContainer: {
        flex: 1,                          // Chiếm toàn bộ chiều cao
        justifyContent: 'center',         // Căn giữa theo chiều dọc
        alignItems: 'center',             // Căn giữa theo chiều ngang
        paddingHorizontal: 20,
    },
    emptyMessageText: {
        fontSize: 18,                     // Cỡ chữ
        color: '#666',                    // Màu chữ xám dịu
        textAlign: 'center',              // Căn giữa chữ
    },
});

export default ListCourse;

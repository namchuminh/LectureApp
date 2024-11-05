import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Appbar, Card, Text, Button, IconButton, Divider, Icon } from 'react-native-paper';
import axios from 'axios';
import { useIsFocused } from "@react-navigation/native";

const ListCourse = ({ route, navigation }) => {
    const { department_id } = route.params || {};

    const isFocused = useIsFocused();
    const [courses, setCourses] = useState([]);

    const fetchData = async () => {
        axios.get(`http://10.0.2.2:3001/courses/${department_id}/index`)
        .then(response => {
            setCourses(response.data.courses)
        })
        .catch(error => {
            console.error('Lỗi khi lấy thông tin:', error);
        });
    }

    useEffect(() => {
        fetchData();
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
                <Appbar.Action icon="plus" onPress={() => navigation.navigate('AddCourse', { department_id })} color="#FFFFFF" />
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
                                        <Text style={styles.btnText}>Thính Giảng</Text>
                                    </Button>
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

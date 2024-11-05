import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Text, Button, IconButton, Divider, Appbar } from 'react-native-paper';
import axios from 'axios';
import { useIsFocused } from "@react-navigation/native";


const DepartmentList = ({ navigation }) => {
    const isFocused = useIsFocused();
    const [departments, setDepartments] = useState([]);

    const fetchData = async () => {
        axios.get('http://10.0.2.2:3001/departments')
        .then(response => {
            setDepartments(response.data.departments)
        })
        .catch(error => {
            console.error('Lỗi khi lấy thông tin:', error);
        });
    }

    
    useEffect(() => {
        fetchData();
    },[isFocused])

    const handelDelete = (id) => {
        axios.delete(`http://10.0.2.2:3001/departments/${id}`)
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
                <Appbar.Action icon="home" onPress={() => navigation.goBack()} color="#FFFFFF" />
                <Appbar.Content title="Chuyên Ngành" titleStyle={styles.headerTitle} />
                <Appbar.Action icon="plus" onPress={() => navigation.navigate('AddDepartment')} color="#FFFFFF" />
            </Appbar.Header>
            <FlatList
                data={departments}
                style={{ marginTop: 8 }}
                keyExtractor={(item) => item.department_id.toString()}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <Card.Title title={item.name} />
                        <Card.Content>
                            <Text>{item.description}</Text>
                            <Text></Text>
                        </Card.Content>
                        <Divider style={styles.divider} />
                        <Card.Actions style={styles.actions}>
                            <Button  style={{ backgroundColor: 'white' }} onPress={() => navigation.navigate('ListCourse', { department_id: item.department_id })}>
                                <Text style={styles.btnText}>Môn Học</Text>
                            </Button>
                            <IconButton
                                icon="square-edit-outline"
                                color="#D32F2F"
                                onPress={() => navigation.navigate('EditDepartment', { department_id: item.department_id })}
                            />
                            <IconButton
                                icon="delete"
                                color="#D32F2F"
                                onPress={() => handelDelete(item.department_id)}
                            />
                        </Card.Actions>
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
});

export default DepartmentList;

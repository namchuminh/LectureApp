import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Text, Button, IconButton, Divider, Appbar } from 'react-native-paper';

const departments = [
    { department_id: 1, name: 'Bộ môn Khoa học dữ liệu', description: 'Nghiên cứu về AI và ML', createdAt: '2024-01-01' },
    { department_id: 2, name: 'Bộ môn Hệ thống thông tin', description: 'Hệ thống và quản lý dữ liệu', createdAt: '2024-01-15' },
    // Add more sample data...
];

const DepartmentList = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} color="#FFFFFF" />
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
                            <Text>Mô tả: {item.description}</Text>
                            <Text></Text>
                            <Text>Ngày tạo: {item.createdAt}</Text>
                        </Card.Content>
                        <Divider style={styles.divider} />
                        <Card.Actions style={styles.actions}>
                            <Button  style={{ backgroundColor: 'white' }} onPress={() => navigation.navigate('ListCourse', { course: item })}>
                                <Text style={styles.btnText}>Môn Học</Text>
                            </Button>
                            <IconButton
                                icon="square-edit-outline"
                                color="#D32F2F"
                                onPress={() => navigation.navigate('EditDepartment', { course: item })}
                            />
                            <IconButton
                                icon="delete"
                                color="#D32F2F"
                                onPress={() => console.log('Xóa', item.name)}
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

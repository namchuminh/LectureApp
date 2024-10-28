import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Appbar, Card, Text, Button, IconButton, Divider, Icon } from 'react-native-paper';

const courses = [
    { course_id: 1, course_name: 'Nhập môn Công Nghệ Thông Tin', course_code: 'CS101', department_id: 1, credits: 3, createdAt: '2024-01-01' },
    { course_id: 2, course_name: 'Lập trình Web', course_code: 'CS102', department_id: 2, credits: 4, createdAt: '2024-01-15' },
    // Thêm dữ liệu mẫu nếu cần...
];

const ListCourse = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} color="#FFFFFF" />
                <Appbar.Content title="Môn Học" titleStyle={styles.headerTitle} />
                <Appbar.Action icon="plus" onPress={() => navigation.navigate('AddCourse')} color="#FFFFFF" />
            </Appbar.Header>
            <FlatList
                data={courses}
                style={{ marginTop: 8 }}
                keyExtractor={(item) => item.course_id.toString()}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <Card.Title title={item.course_name}/>
                        <Card.Content>
                            <Text>{`Mã: ${item.course_code} - Tín chỉ: ${item.credits} tín`}</Text>
                            <Text></Text>
                            <Text>Ngày tạo: {item.createdAt}</Text>
                        </Card.Content>
                        <Divider style={styles.divider} />
                        <Card.Actions style={styles.actions}>
                            <Button  style={{ backgroundColor: 'white' }} onPress={() => navigation.navigate('LecturerListByCourse', { course: item })}>
                                <Text style={styles.btnText}>Thính Giảng</Text>
                            </Button>
                            <IconButton
                                icon="square-edit-outline"
                                color="#D32F2F"
                                onPress={() => navigation.navigate('EditCourse', { course: item })}
                            />
                            <IconButton
                                icon="delete"
                                color="#D32F2F"
                                onPress={() => console.log('Xóa', item.course_name)}
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

export default ListCourse;

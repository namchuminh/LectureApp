import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Appbar, Text } from 'react-native-paper';
import axios from 'axios';

const AddDepartment = ({ navigation }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleAdd = () => {
        axios.post('http://10.0.2.2:3001/departments', {
            name: name,
            description: description
        })
        .then(response => {
            navigation.goBack();
        })
        .catch(error => {
            console.error('Lỗi khi lấy thông tin:', error);
        });
    };

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} color="#FFFFFF" />
                <Appbar.Content title="Thêm Chuyên Ngành" titleStyle={styles.headerTitle} />
                <Appbar.Action />
            </Appbar.Header>
            <ScrollView contentContainerStyle={styles.form}>
                <Text style={styles.label}>Tên Chuyên Ngành</Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    style={styles.input}
                    placeholder="Nhập tên chuyên ngành"
                />
                <Text style={styles.label}>Mô tả</Text>
                <TextInput
                    value={description}
                    onChangeText={setDescription}
                    style={[styles.input]}
                    placeholder="Nhập mô tả"
                />
                <Button mode="contained" onPress={handleAdd} style={styles.btn}>
                    <Text style={styles.btnText}>Lưu</Text>
                </Button>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        backgroundColor: '#3F51B5',
    },
    headerTitle: {
        color: '#FFFFFF',
        textAlign: 'center',
    },
    form: {
        padding: 16,
    },
    label: {
        marginBottom: 5,
        color: '#000',
    },
    input: {
        marginBottom: 16,
    },
    btn: {
        backgroundColor: '#3F51B5',
        borderRadius: 4,
    },
    btnText: {
        color: '#FFFFFF',
    },
});

export default AddDepartment;

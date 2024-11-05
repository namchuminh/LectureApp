import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput, Button, Appbar, Divider, Text } from 'react-native-paper';
import axios from 'axios';

const EditDepartment = ({ route, navigation }) => {
    const { department_id } = route.params;

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const fetchData = () => {
        axios.get(`http://10.0.2.2:3001/departments/${department_id}`)
        .then(response => {
            setName(response.data.name)
            setDescription(response.data.description)
        })
        .catch(error => {
            console.error('Lỗi khi lấy thông tin:', error);
        });
    }

    useEffect(() => {
        fetchData();
    }, []); 

    const handleEdit = () => {
        if(!name || !description){
            fetchData();
            alert("Vui lòng nhập đủ thông tin chuyên ngành!");
            return;
        }

        axios.put(`http://10.0.2.2:3001/departments/${department_id}`, {
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
                <Appbar.Content title="Sửa Chuyên Ngành" titleStyle={styles.headerTitle} />
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
                <Button style={styles.btn} onPress={() => handleEdit()}>
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

export default EditDepartment;

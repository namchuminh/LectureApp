import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Appbar, Text } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';


const AddLecturerByCourse = ({ navigation }) => {
    const [courseName, setCourseName] = useState('');
    const [selectedValue, setSelectedValue] = useState('');


    const handleAdd = () => {
        console.log('Chọn Giảng Viên', courseName, courseCode, credits);
    };

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} color="#FFFFFF" />
                <Appbar.Content title="Chọn Giảng Viên" titleStyle={styles.headerTitle} />
            </Appbar.Header>
            <ScrollView contentContainerStyle={styles.form}>
                <Text style={styles.label}>Tên Môn Học</Text>
                <TextInput
                    value={courseName}
                    onChangeText={setCourseName}
                    style={styles.input}
                    placeholder="Nhập tên khóa học"
                />
                <Text style={styles.label}>Chọn Giảng Viên</Text>
                <View style={styles.inputContainer}>
                    <RNPickerSelect
                        onValueChange={(value) => setSelectedValue(value)}
                        items={[
                            { label: 'Football', value: 'football' },
                            { label: 'Baseball', value: 'baseball' },
                            { label: 'Hockey', value: 'hockey' },
                        ]}
                        placeholder={{
                            label: 'Chọn giảng viên...',
                            value: null,
                            color: '#9E9E9E',
                        }}
                        style={{
                            inputIOS: styles.pickerInput,
                            inputAndroid: styles.pickerInput,
                            placeholder: {
                                color: '#9E9E9E',
                            },
                            iconContainer: {
                                top: 10,
                                right: 12,
                            },
                        }}
                        value={selectedValue}
                        useNativeAndroidPickerStyle={false} // Để style tùy chỉnh hoạt động trên Android
                    />
                </View>
                <Button mode="contained" onPress={handleAdd} style={styles.btn}>
                    <Text style={styles.btnText}>Lưu</Text>
                </Button>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        marginBottom: 4,
    },
    input: {
        marginBottom: 16,
    },
    btn: {
        backgroundColor: '#3F51B5',
        borderRadius: 4,
        marginTop: 20
    },
    btnText: {
        color: '#FFFFFF',
    },
    inputContainer: {
        borderRadius: 4,
        backgroundColor: '#e7e0ec',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderBottomEndRadius: 0,
        borderBottomStartRadius: 0,
        borderBottomColor: '#524e58'
    },
    pickerInput: {
        fontSize: 16,
        paddingVertical: 19,
        paddingHorizontal: 15,
        color: '#49454f',
    },
});

export default AddLecturerByCourse;

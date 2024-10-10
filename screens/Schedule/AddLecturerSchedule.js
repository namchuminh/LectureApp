import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Appbar, Text } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';

const getDatesUntilEndOfMonth = () => {
    const today = new Date();
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const dates = [];
  
    for (let date = today.getDate(); date <= endOfMonth.getDate(); date++) {
      const dateString = `${date}/${today.getMonth() + 1}/${today.getFullYear()}`;
      dates.push({ label: dateString, value: dateString });
    }
  
    return dates;
};
 
const dateItems = getDatesUntilEndOfMonth();

const AddLecturerSchedule = ({ navigation }) => {
    const [courseName, setCourseName] = useState('');
    const [selectedValue, setSelectedValue] = useState('');

    const handleAdd = () => {
        console.log('Chọn Giảng Viên', courseName, courseCode, credits);
    };

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} color="#FFFFFF" />
                <Appbar.Content title="Thêm Lịch Giảng" titleStyle={styles.headerTitle} />
            </Appbar.Header>
            <ScrollView contentContainerStyle={styles.form}>
                <Text style={styles.label}>Chọn Ngày</Text>
                <View style={styles.inputContainer}>
                    <RNPickerSelect
                        onValueChange={(value) => setSelectedValue(value)}
                        items={dateItems}
                        placeholder={{
                            label: 'Chọn ngày...',
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
                <Text style={styles.label}>Chọn Tiết</Text>
                <View style={styles.inputContainer}>
                    <RNPickerSelect
                        onValueChange={(value) => setSelectedValue(value)}
                        items={[
                            { label: 'Tiết 1', value: 'tiet1' },
                            { label: 'Tiết 2', value: 'tiet2' },
                            { label: 'Tiết 3', value: 'tiet3' },
                            { label: 'Tiết 4', value: 'tiet4' },
                            { label: 'Tiết 5', value: 'tiet5' },
                            { label: 'Tiết 6', value: 'tiet6' },
                            { label: 'Tiết 7', value: 'tiet7' },
                            { label: 'Tiết 8', value: 'tiet8' },
                            { label: 'Tiết 9', value: 'tiet9' },
                            { label: 'Tiết 10', value: 'tiet10' },
                        ]}
                        placeholder={{
                            label: 'Chọn tiết...',
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
                <Text style={styles.label}>Chọn Môn Học</Text>
                <View style={styles.inputContainer}>
                    <RNPickerSelect
                        onValueChange={(value) => setSelectedValue(value)}
                        items={[
                            { label: 'Football', value: 'football' },
                            { label: 'Baseball', value: 'baseball' },
                            { label: 'Hockey', value: 'hockey' },
                        ]}
                        placeholder={{
                            label: 'Chọn môn học...',
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
        borderBottomColor: '#524e58',
        marginBottom: 16,
    },
    pickerInput: {
        fontSize: 16,
        paddingVertical: 19,
        paddingHorizontal: 15,
        color: '#49454f',
    },
});

export default AddLecturerSchedule;

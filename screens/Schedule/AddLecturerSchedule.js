import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Appbar, Text } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

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

const AddLecturerSchedule = ({ route, navigation }) => {
    const { lecturer_id } = route.params;

    const [date, setDate] = useState('');
    const [section, setSection] = useState('');
    const [course, setCourse] = useState('');
    const [departments, setDepartments] = useState('');
    const [listDepartments, setListDepartments] = useState([]);
    const [listCourses, setListCourses] = useState([]);

    const fetchData = async () => {
        axios.get('http://10.0.2.2:3001/departments')
        .then(response => {
            const formattedDepartments = response.data.departments.map(department => ({
                label: department.name,
                value: department.department_id
            }));
            setListDepartments(formattedDepartments)
        })
        .catch(error => {
            console.error('Lỗi khi lấy thông tin:', error);
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const fetchDataCourse = async (id) => {
        axios.get(`http://10.0.2.2:3001/courses/${id}/index`)
        .then(response => {
            const formattedCourses = response.data.courses.map(course => ({
                label: course.course_name,
                value: course.course_id
            }));
            setListCourses(formattedCourses)
        })
        .catch(error => {
            console.error('Lỗi khi lấy thông tin:', error);
        });
    }
    const handleChangeDepartments = (value) => {
        setDepartments(value);
        fetchDataCourse(value);
    }

    const handleAdd = () => {
        const data = {  
            lecturer_id,
            course_id: course,
            date: date.split('/').reverse().join('-'),
            section
        };

        axios.post(`http://10.0.2.2:3001/schedules`, data)
        .then(response => {
            alert("Mời thành công!");
            navigation.navigate('List');
        })
        .catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert("Có lỗi khi thực hiện mời giảng dạy!");
            }
        });
    };

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} color="#FFFFFF" />
                <Appbar.Content title="Mời Giảng Dạy" titleStyle={styles.headerTitle} />
                <Appbar.Action />
            </Appbar.Header>
            <ScrollView contentContainerStyle={styles.form}>
                <Text style={styles.label}>Chọn Ngày</Text>
                <View style={styles.inputContainer}>
                    <RNPickerSelect
                        onValueChange={(value) => setDate(value)}
                        items={dateItems}
                        placeholder={{
                            label: 'Chọn ngày',
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
                        value={date}
                        useNativeAndroidPickerStyle={false} // Để style tùy chỉnh hoạt động trên Android
                    />
                </View>
                <Text style={styles.label}>Chọn Tiết</Text>
                <View style={styles.inputContainer}>
                    <RNPickerSelect
                        onValueChange={(value) => setSection(value)}
                        items={[
                            { label: 'Tiết 1 - Tiết 6', value: 'Tiết 1 - Tiết 6' },
                            { label: 'Tiết 1 - Tiết 3', value: 'Tiết 1 - Tiết 3' },
                            { label: 'Tiết 1 - Tiết 5', value: 'Tiết 1 - Tiết 5' },
                            { label: 'Tiết 4 - Tiết 6', value: 'Tiết 4 - Tiết 6' },
                            { label: 'Tiết 7 - Tiết 12', value: 'Tiết 7 - Tiết 12' },
                            { label: 'Tiết 7 - Tiết 11', value: 'Tiết 7 - Tiết 11' },
                            { label: 'Tiết 7 - Tiết 9', value: 'Tiết 7 - Tiết 9' },
                            { label: 'Tiết 10 - Tiết 12', value: 'Tiết 10 - Tiết 12' },
                            { label: 'Tiết 13 - Tiết 17', value: 'Tiết 13 - Tiết 17' },
                            { label: 'Tiết 13 - Tiết 15', value: 'Tiết 13 - Tiết 15' },
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
                        value={section}
                        useNativeAndroidPickerStyle={false} // Để style tùy chỉnh hoạt động trên Android
                    />
                </View>
                <Text style={styles.label}>Chọn Chuyên Ngành</Text>
                <View style={styles.inputContainer}>
                    <RNPickerSelect
                        onValueChange={(value) => handleChangeDepartments(value)}
                        items={listDepartments}
                        placeholder={{
                            label: 'Chọn chuyên ngành...',
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
                        value={departments}
                        useNativeAndroidPickerStyle={false} // Để style tùy chỉnh hoạt động trên Android
                    />
                </View>
                <Text style={styles.label}>Chọn Môn Học</Text>
                <View style={styles.inputContainer}>
                    <RNPickerSelect
                        onValueChange={(value) => setCourse(value)}
                        items={listCourses}
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
                        value={course}
                        useNativeAndroidPickerStyle={false} // Để style tùy chỉnh hoạt động trên Android
                    />
                </View>
                <Button mode="contained" onPress={handleAdd} style={styles.btn}>
                    <Text style={styles.btnText}>Mời Thính Giảng</Text>
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

import axiosInstance from './index';

const LecturerServices = {
    index: async () => {
        try {
            const response = await axiosInstance.get(`/lecturers`);
            return response;
        } catch (error) {
            throw error;
        }
    },
};

export default LecturerServices;

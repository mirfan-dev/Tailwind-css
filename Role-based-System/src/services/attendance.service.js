import { privateAxios, publicAxios } from "./axios.service";

// Scan QR code — records attendance (auto CHECK_IN / CHECK_OUT)
export const scanQr = (qrPayload) => {
  return publicAxios
    .post(`/attendance/scan`, { qrPayload })
    .then((response) => response.data);
};

export const getUserLogs = (userId) => {
  return publicAxios
    .get(`/attendance/user/${userId}`) 
    .then((response) => response.data);
};




// get All Attendance

export const getAllAttendance = (pageNumber=0, pageSize=10, sortBy='date', sortDir='desc') => {
  return privateAxios
    .get(`/attendance?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`)
    .then((response) => response.data);
}
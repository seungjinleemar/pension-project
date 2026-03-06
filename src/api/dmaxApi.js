import axios from 'axios';

// Vite 전용 환경변수 읽기
const dMaxBaseURL = import.meta.env.VITE_BACKEND_DMAX_URL;

const dMaxInstance = axios.create({
    baseURL: dMaxBaseURL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 5000,
});

export const dmaxApi = {
    get: (url, params = {}) => {
        // Axios가 쿼리 스트링을 자동으로 생성하도록 설정
        return dMaxInstance.get(url, {
            params: {
                ...params,
                t: new Date().getTime(), // 캐시 방지 타임스탬프
            },
        });
    },
};
import axios from "axios";


const getEnvBaseUrl = () :string => {
    switch(process.env.NODE_ENV){
        case 'development':
            return "devurl";
        case "production":
            return "produrl"
        case "test":
            return "test"
    };
}
const axiosInstance = axios.create({
    baseURL: getEnvBaseUrl()
})




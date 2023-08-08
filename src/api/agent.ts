import axios, { AxiosError, AxiosResponse } from "axios"
import { toast } from "react-toastify";
import { router } from "../main";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500))

axios.defaults.baseURL = 'http://localhost:5000/api/';

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(async response => {
    await sleep();

    return response;
},(error: AxiosError) => {
    const {data, status} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if(data.errors) {
                const modelStateErrors: string[] = [];
                for(const key in data.errors) {
                    if(data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }    
            toast.error(data.title)
            break;
            case 401:
                toast.error(data.title);
                break;
           case 403:
                toast.error('You are not allowed to do that');
                break;
            case 500:
                router.navigate('/server-error', {state: {error: data}});
                break;
            default:
                break;
    }
    return Promise.reject(error.response);    
})

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Blog = {
    list: () => requests.get('blog/list'),
    details: (id: number) => requests.get(`blog/${id}`)
}

const agent = {
    Blog
}

export default agent;
import axios, { AxiosError, AxiosResponse } from "axios"
import { toast } from "react-toastify";
import { router } from "../main";
import { PagenatedResponse } from "../models/pagination";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500))

axios.defaults.baseURL = `${import.meta.env.VITE_API_URL}/api/`;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(async response => {
    await sleep();
    const pagination = response.headers['pagination'];

    if(pagination) {
        response.data = new PagenatedResponse(response.data, JSON.parse(pagination));
        return response;
    }

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
           case 429:
                toast.error('Too many requests.Please try again later.');
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
    get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
    postForm: (url: string,data: FormData) => axios.post(url,data, {
        headers: {'Content-Type': 'multipart/form-data'}
    }).then(responseBody),
    putForm: (url: string,data: FormData) => axios.put(url,data, {
        headers: {'Content-Type': 'multipart/form-data'}
    }).then(responseBody)
}

function createFormData(item: any) {
    let formData = new FormData();
    for (const key in item) {
        if (Array.isArray(item[key])) {
            formData.append(key, item[key]);
          } else if (typeof item[key] === 'string') {
            formData.append(key, item[key].split(','));
          } else {
            formData.append(key, item[key]);
          }
    }
    return formData;
}

const Admin = {
    createBlog: (blog: any, token: string) => {
        const headersWithToken = {
          Authorization: `Bearer ${token}`,
        };

        const formData = createFormData(blog);

        return axios.postForm('blog', formData, { headers: headersWithToken })
          .then(responseBody);
    },
    updateBlog: (blog: any, token: string) => {
        const headersWithToken = {
          Authorization: `Bearer ${token}`,
        };

        const formData = createFormData(blog);

        return axios.putForm('blog', formData, { headers: headersWithToken })
          .then(responseBody);
    },    
    deleteBlog: (id: number, token: string) => {
        const headersWithToken = {
          Authorization: `Bearer ${token}`,
        };

        return axios.delete(`blog/${id}`, { headers: headersWithToken })
          .then(responseBody);
    },  
    createCategory: (category: any, token: string) => {
        const headersWithToken = {
          Authorization: `Bearer ${token}`,
        };

        const formData = createFormData(category);

        return axios.postForm('category', formData, { headers: headersWithToken })
          .then(responseBody);
    },  
    updateCategory: (category: any, token: string) => {
        const headersWithToken = {
          Authorization: `Bearer ${token}`,
        };

        const formData = createFormData(category);

        return axios.putForm('category', formData, { headers: headersWithToken })
          .then(responseBody);
    },     
    deleteCategory: (id: number, token: string) => {
        const headersWithToken = {
          Authorization: `Bearer ${token}`,
        };

        return axios.delete(`category/${id}`, { headers: headersWithToken })
          .then(responseBody);
    },  
    createTag: (tag: any, token: string) => {
        const headersWithToken = {
          Authorization: `Bearer ${token}`,
        };

        const formData = createFormData(tag);

        return axios.postForm('tag', formData, { headers: headersWithToken })
          .then(responseBody);
    }, 
    updateTag: (tag: any, token: string) => {
        const headersWithToken = {
          Authorization: `Bearer ${token}`,
        };

        const formData = createFormData(tag);

        return axios.putForm('tag', formData, { headers: headersWithToken })
          .then(responseBody);
    },   
    deleteTag: (id: number, token: string) => {
        const headersWithToken = {
          Authorization: `Bearer ${token}`,
        };

        return axios.delete(`tag/${id}`, { headers: headersWithToken })
          .then(responseBody);
    },  
    createComment: (comment:any) => requests.postForm('comment', createFormData(comment)),
    acceptComment: (commentId: any, token: string) => {
        const headersWithToken = {
          Authorization: `Bearer ${token}`,
        };

        debugger;
      
        return axios.put(`comment/${commentId}/accept`, {}, { headers: headersWithToken })
        .then(responseBody);
    },
    deleteComment: (id: number, token: string) => {
        const headersWithToken = {
          Authorization: `Bearer ${token}`,
        };

        return axios.delete(`comment/${id}`, { headers: headersWithToken })
          .then(responseBody);
    },
  }

const Blog = {
    list: (params: URLSearchParams) => requests.get('blog/list', params),
    listNoFilter: () => requests.get('blog/listNoFilter'),
    details: (name: string) => requests.get(`blog/${name}`),
    fetchFilters: () => requests.get('blog/filters')
}

const Category = {
    list: (params: URLSearchParams) => requests.get('category/list', params),
}

const Tag = {
    list: (params: URLSearchParams) => requests.get('tag/list', params),
}

const Comment = {
    list: (params: URLSearchParams) => requests.get('comment/list', params),
    listNoFilter: () => requests.get('comment/listNoFilter'),
}

const Account = {
    login: (values: any) => requests.post('account/login', values),
    currentUser: () => requests.get('account/current-user')
}

const agent = {
    Blog,
    Account,
    Admin,
    Category,
    Tag,
    Comment
}

export default agent;
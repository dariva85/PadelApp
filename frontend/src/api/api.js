const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const isSuccess = (httpCode) => httpCode === 200 || httpCode === 201;

const apiCall = async (method, path, body, headers) => {
  console.log(BASE_URL);
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    });
    const json = await response.json();
    if (isSuccess(response.status)) {
      return { success: true, result: json };
    } else {
      return { success: false, error: json.error };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const apiPost = (path, body) => apiCall("POST", path, body);
export const login = (userData) => apiPost("/login", userData);
export const register = (userData) => apiPost("/register", userData);

const authApiCall = (method, path, body) => {
  const { accessToken } = JSON.parse(localStorage.getItem("token"));
  return apiCall(method, path, body, {
    Authorization: `Bearer ${accessToken}`,
  });
};
export const getTodoList = () => authApiCall("GET", "/users/me/todos");
export const addTodo = (todo) => authApiCall("POST", "/users/me/todos", todo);
export const updateTodo = (todo) =>
  authApiCall("PUT", `/users/me/todos/${todo._id}`, todo);
export const deleteTodo = (todo) =>
  authApiCall("DELETE", `/users/me/todos/${todo._id}`);

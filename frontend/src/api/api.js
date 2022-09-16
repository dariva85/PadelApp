const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const isSuccess = (httpCode) => httpCode === 200 || httpCode === 201;

const apiCall = async (method, path, body, headers) => {
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
export const updatePassword = (userInfo) =>
  authApiCall("PUT", `/usuarios/${userInfo._id}/updatePassword`, userInfo);
export const getUsuario = (email) =>
  authApiCall("GET", `/usuarios/email/${email}`);
export const saveUsuario = ({ userInfo }) =>
  authApiCall("PUT", `/usuarios/${userInfo._id}`, userInfo);
export const getCompetition = (id) =>
  authApiCall("GET", `/competiciones/${id}`);
export const getCompetitions = (id) =>
  authApiCall("GET", `/competiciones/userId/${id}`);
export const getNonSubcribedCompetitions = (id) =>
  authApiCall("GET", `/competiciones/nonsubscribed/${id}`);
export const findAllOpenedInscriptions = (id) =>
  authApiCall("GET", `/inscription/opened/${id}`);
export const signUpOnCompetition = ({ signupdata }) =>
  authApiCall(
    "PUT",
    `/inscription/signup/${signupdata.inscriptionId}`,
    signupdata
  );
export const getMatches = (id) => authApiCall("GET", `/partidos/userId/${id}`);
export const getMatchesOfOneCompetition = (ids) =>
  authApiCall(
    "GET",
    `/competiciones/userId/${ids.userId}/${ids.competitionId}/Matches`
  );
export const getRanking = (id) =>
  authApiCall("GET", `/rankings/competition/${id}`);
export const subscribeOrUnsubscribeOnCompetition = (ids) =>
  authApiCall(
    "PUT",
    `/competiciones/subscribeorunsubscrive/${ids.userId}/${ids.competitionId}`
  );
export const getNamesUser = (id) => authApiCall("GET", `/usuarios/name/${id}`);
export const submitMatch = (id, match) =>
  authApiCall("PUT", `/partidos/updatePartido/userId/${id}`, { match });

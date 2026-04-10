const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const getAuthToken = () => {
  return localStorage.getItem('auth_token');
};

export const setAuthToken = (token: string) => {
  localStorage.setItem('auth_token', token);
};

export const removeAuthToken = () => {
  localStorage.removeItem('auth_token');
};

const apiCall = async (
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: unknown
) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const token = getAuthToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const options: RequestInit = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const fullUrl = `${API_BASE_URL}${endpoint}`;
  console.log('API Call:', { fullUrl, method, body });

  const response = await fetch(fullUrl, options);

  console.log('Response status:', response.status, response.statusText);
  console.log('Response headers:', Object.fromEntries(response.headers.entries()));

  if (!response.ok) {
    let errorMessage = 'API error';
    try {
      const error = await response.json();
      errorMessage = error.message || errorMessage;
    } catch (jsonError) {
      // If response is not JSON, try to get text
      try {
        const errorText = await response.text();
        console.log('Error response text:', errorText);
        errorMessage = errorText || errorMessage;
      } catch (textError) {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }
    }
    throw new Error(errorMessage);
  }

  try {
    const data = await response.json();
    console.log('Success response data:', data);
    return data;
  } catch (jsonError) {
    // If response is not JSON, return the text
    const text = await response.text();
    console.log('Non-JSON response text:', text);
    // Try to parse as JSON if it looks like JSON
    try {
      return JSON.parse(text);
    } catch {
      return { data: text };
    }
  }
};

// Auth APIs
export const loginAPI = async (email: string, password: string) => {
  const data = await apiCall('/auth/login', 'POST', { email, password });
  setAuthToken(data.token);
  return data;
};

export const registerAPI = async (email: string, password: string, name: string, role: string) => {
  const data = await apiCall('/auth/register', 'POST', { email, password, name, role });
  setAuthToken(data.token);
  return data;
};

// Course APIs
export const getCoursesAPI = async () => {
  return apiCall('/courses', 'GET');
};

export const createCourseAPI = async (course: unknown) => {
  return apiCall('/courses', 'POST', course);
};

export const updateCourseAPI = async (id: string, course: unknown) => {
  return apiCall(`/courses/${id}`, 'PUT', course);
};

export const deleteCourseAPI = async (id: string) => {
  return apiCall(`/courses/${id}`, 'DELETE');
};

// Module APIs
export const getModulesAPI = async (courseId: string) => {
  return apiCall(`/courses/${courseId}/modules`, 'GET');
};

export const createModuleAPI = async (courseId: string, module: unknown) => {
  return apiCall(`/courses/${courseId}/modules`, 'POST', module);
};

// Learning Material APIs
export const getMaterialsAPI = async (moduleId: string) => {
  return apiCall(`/modules/${moduleId}/materials`, 'GET');
};

export const createMaterialAPI = async (moduleId: string, material: unknown) => {
  return apiCall(`/modules/${moduleId}/materials`, 'POST', material);
};

// Assignment APIs
export const getAssignmentsAPI = async (courseId?: string) => {
  const query = courseId ? `?courseId=${courseId}` : '';
  return apiCall(`/assignments${query}`, 'GET');
};

export const createAssignmentAPI = async (assignment: unknown) => {
  return apiCall('/assignments', 'POST', assignment);
};

export const getSubmissionsAPI = async (assignmentId: string) => {
  return apiCall(`/assignments/${assignmentId}/submissions`, 'GET');
};

export const submitAssignmentAPI = async (assignmentId: string, submission: unknown) => {
  return apiCall(`/assignments/${assignmentId}/submit`, 'POST', submission);
};

export const gradeSubmissionAPI = async (submissionId: string, grade: unknown) => {
  return apiCall(`/submissions/${submissionId}/grade`, 'PUT', grade);
};

// Quiz APIs
export const getQuizzesAPI = async (courseId?: string) => {
  const query = courseId ? `?courseId=${courseId}` : '';
  return apiCall(`/quizzes${query}`, 'GET');
};

export const createQuizAPI = async (quiz: unknown) => {
  return apiCall('/quizzes', 'POST', quiz);
};

export const getQuizAPI = async (quizId: string) => {
  return apiCall(`/quizzes/${quizId}`, 'GET');
};

export const submitQuizAPI = async (quizId: string, answers: unknown) => {
  return apiCall(`/quizzes/${quizId}/submit`, 'POST', answers);
};

export const getQuizAttemptsAPI = async (quizId: string) => {
  return apiCall(`/quizzes/${quizId}/attempts`, 'GET');
};

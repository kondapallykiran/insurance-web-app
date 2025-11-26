import axios from 'axios';

const API_BASE_URL = 'http://localhost:8088/api/persons';

// Get all persons
export const getAllPersons = () => axios.get(API_BASE_URL);

// Get person by ID
export const getPersonById = (id) => axios.get(`${API_BASE_URL}/${id}`);

// Create person
export const createPerson = (person) => axios.post(API_BASE_URL, person);

// Update person
export const updatePerson = (id, person) => axios.put(`${API_BASE_URL}/${id}`, person);

// Delete person
export const deletePerson = (id) => axios.delete(`${API_BASE_URL}/${id}`);

// Search persons
export const searchPersons = (query) =>
  axios.get(`${API_BASE_URL}/search`, {
    params: { query },
  });

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const petService = {
  getAllPets: async (category) => {
    const params = category ? { category } : {};
    const response = await axios.get(`${API_BASE_URL}/pets`, { params });
    return response.data;
  },

  getPetById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/pets/${id}`);
    return response.data;
  },

  createPet: async (pet) => {
    const response = await axios.post(`${API_BASE_URL}/pets`, pet);
    return response.data;
  },

  updatePet: async (id, pet) => {
    const response = await axios.put(`${API_BASE_URL}/pets/${id}`, pet);
    return response.data;
  },

  deletePet: async (id) => {
    await axios.delete(`${API_BASE_URL}/pets/${id}`);
  }
};

export default petService;

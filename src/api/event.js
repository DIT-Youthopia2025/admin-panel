import axios from "axios";

const baseUrl = "http://localhost:3001/api";

// GET all events
export const fetchEvents = async () => {
  const response = await axios.get(`${baseUrl}/events`);
  return response.data;
};

// GET single event
export const fetchEventById = async (id) => {
  const response = await axios.get(`${baseUrl}/events/${id}`);
  return response.data;
};

// CREATE event
export const createEvent = async (newEvent) => {
  const response = await axios.post(`${baseUrl}/events`, newEvent);
  return response.data;
};

// UPDATE event
export const updateEvent = async ({ id, updatedEvent }) => {
  const response = await axios.put(`${baseUrl}/events/${id}`, updatedEvent);
  return response.data;
};

// DELETE event
export const deleteEvent = async (id) => {
  const response = await axios.delete(`${baseUrl}/events/${id}`);
  return response.data;
};

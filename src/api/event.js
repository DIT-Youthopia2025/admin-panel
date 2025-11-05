import axios from "axios";
import baseConfig from './base_url.json' assert { type: 'json' };

const base_url = baseConfig.base_url;


// GET all events
export const fetchEvents = async () => {
  const response = await axios.get(`${base_url}/events`);
  return response.data;
};

// GET single event
export const fetchEventById = async (id) => {
  const response = await axios.get(`${base_url}/events/${id}`);
  return response.data;
};

// CREATE event
export const createEvent = async (newEvent) => {
  // axios automatically sets Content-Type to multipart/form-data for FormData objects
  const response = await axios.post(`${base_url}/events`, newEvent);
  return response.data;
};

// UPDATE event
export const updateEvent = async ({ id, updatedEvent }) => {
  const response = await axios.put(`${base_url}/events/${id}`, updatedEvent);
  return response.data;
};

// DELETE event
export const deleteEvent = async (id) => {
  const response = await axios.delete(`${base_url}/events/${id}`);
  return response.data;
};

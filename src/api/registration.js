import axios from "axios";
import baseConfig from "./base_url.json" assert { type: "json" };

const base_url = baseConfig.base_url;

const token = localStorage.getItem("token");

export const getAllRegistrations = async () => {
  const res = await axios.get(`${base_url}/registrations`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.registrations;
};

export const getRegistrationById = async (id) => {
  const res = await axios.get(`${base_url}/registrations/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.registration;
};

export const deleteRegistration = async (id) => {
  const res = await axios.delete(`${base_url}/registrations/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getRegistrationByEventId = async (id) => {
  const res = await axios.get(`${base_url}/registrations/event/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

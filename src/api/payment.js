import axios from "axios";
import baseConfig from "./base_url.json" assert { type: "json" };

const base_url = baseConfig.base_url;

const token = localStorage.getItem("token");

const getAllPayments = async () => {};

export { getAllPayments };

import axios from "axios";

export default function createApiClient({ apiKey }) {
  return axios.create({
    baseURL: "https://fe-assignment-api.herokuapp.com/",
    headers: { "x-api-key": apiKey },
  });
}

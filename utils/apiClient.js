import axios from "axios";

export default function createApiClient({ apiKey }) {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { "x-api-key": apiKey },
  });
}

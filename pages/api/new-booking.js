// Using Environment Variables on the server to securely access external services.
import createApiClient from "../../utils/apiClient";

async function handler(req, res) {
  if (req.method === "POST") {
    const apiKey = process.env.API_KEY;
    const axiosInstance = createApiClient({ apiKey });
    const bookingData = req.body;
    try {
      const { data } = await axiosInstance.post("booking", bookingData);
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ error: "Request failed" });
    }
  }
}

export default handler;

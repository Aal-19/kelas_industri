const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

export default async function handler(req, res) {
    const { method } = req;

    switch (method) {
        case 'GET': {
            const fetchRes = await fetch(`${BACKEND_URL}/books`);
            const data = await fetchRes.json();
            return res.status(fetchRes.status).json(data);
        }
        case 'POST': {
            const { title, author } = req.body;
            const fetchRes = await fetch(`${BACKEND_URL}/books`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, author }),
            });
            const data = await fetchRes.json();
            return res.status(fetchRes.status).json(data);
        }
        default: {
            res.setHeader('Allow', ['GET', 'POST']);
            return res.status(405).json({
                message: `Method ${method} Not Allowed`
            });
        }
    }
}
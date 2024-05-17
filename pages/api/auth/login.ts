// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

const ADMIN_PASSWORD = process.env.HASHED_PASSWORD;

console.log('Loaded ADMIN_PASSWORD:', ADMIN_PASSWORD);

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    }

    const { password } = req.body;
    if (!password) {
        return res.status(400).json({ error: 'Password is required' });
    }

    bcrypt.compare(password, ADMIN_PASSWORD!, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error occurred' });
        }
        if (result) {
            return res.status(200).json({ message: 'Login successful' });
        } else {
            return res.status(401).json({ error: 'Wrong password. Please try again.' });
        }
    });
};

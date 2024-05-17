import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import atob from 'atob';

const HASHED_PASSWORD_BASE64 = process.env.HASHED_PASSWORD;

if (!HASHED_PASSWORD_BASE64) {
    throw new Error('Environment variable HASHED_PASSWORD is not defined');
}

const HASHED_PASSWORD = atob(HASHED_PASSWORD_BASE64);

console.log('Loaded ADMIN_PASSWORD:', HASHED_PASSWORD); // Debug log

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    }

    const { password } = req.body;
    if (!password) {
        return res.status(400).json({ error: 'Password is required' });
    }

    bcrypt.compare(password, HASHED_PASSWORD!, (err, result) => {
        if (err) {
            console.error('Error during password comparison:', err);
            return res.status(500).json({ error: 'Error occurred' });
        }
        if (result) {
            return res.status(200).json({ message: 'Login successful' });
        } else {
            return res.status(401).json({ error: 'Wrong password. Please try again.' });
        }
    });
};

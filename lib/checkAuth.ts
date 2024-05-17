// lib/checkAuth.ts
import { NextApiRequest } from 'next';
import { parse } from 'cookie';
import cookieSignature from 'cookie-signature';
import { CipherKey } from 'crypto'; // Import the CipherKey type
const COOKIE_SECRET = process.env.COOKIE_SECRET;

if (!COOKIE_SECRET) {
    throw new Error('Environment variable COOKIE_SECRET is not defined');
}

export function checkAuth(req: NextApiRequest): boolean {
    const cookies = parse(req.headers.cookie || '');
    const signedValue = cookies.auth;
    if (!signedValue) {
        return false;
    }
    const value = cookieSignature.unsign(signedValue, COOKIE_SECRET as CipherKey); // Cast COOKIE_SECRET as CipherKey
    return value === 'logged-in';
}

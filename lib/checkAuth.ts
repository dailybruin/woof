// lib/checkAuth.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'cookie';

export function checkAuth(req: NextApiRequest): boolean {
    const cookies = parse(req.headers.cookie || '');
    return cookies.auth === 'logged-in';
}

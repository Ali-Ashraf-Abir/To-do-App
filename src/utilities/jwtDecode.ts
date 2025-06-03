import { jwtDecode } from 'jwt-decode';

type TokenPayload = {
  id: string;
  // Add other fields based on your token
  exp?: number;
  iat?: number;
};

export function decodeToken(token: string): TokenPayload | null {
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    return decoded;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
}

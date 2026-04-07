import jwt from 'jsonwebtoken';
import { VercelRequest } from '@vercel/node';

export interface AuthResult {
  success: boolean;
  userId?: string;
  userRole?: string;
  message?: string;
}

export const authenticateToken = async (req: VercelRequest): Promise<AuthResult> => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;

  if (!token) {
    return { success: false, message: 'No token provided' };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as {
      userId: string;
      role: string;
    };

    return {
      success: true,
      userId: decoded.userId,
      userRole: decoded.role,
    };
  } catch {
    return { success: false, message: 'Invalid token' };
  }
};

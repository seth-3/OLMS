import { VercelRequest, VercelResponse } from '@vercel/node';
import User from './models/User';
import * as jwtUtils from './utils/jwt';
import { connectDB } from './utils/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { email, password, name, role } = req.body;

    // Login
    if (req.url?.includes('/login')) {
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isPasswordValid = await jwtUtils.comparePassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwtUtils.generateToken(user._id.toString(), user.role);

      return res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatarUrl: user.avatarUrl,
        },
      });
    }

    // Register
    if (req.url?.includes('/register')) {
      if (!email || !password || !name || !role) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'Email already in use' });
      }

      const hashedPassword = await jwtUtils.hashPassword(password);

      const user = new User({
        name,
        email,
        password: hashedPassword,
        role,
        status: 'Active',
      });

      await user.save();

      const token = jwtUtils.generateToken(user._id.toString(), user.role);

      return res.status(201).json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    }

    return res.status(404).json({ message: 'Endpoint not found' });
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}
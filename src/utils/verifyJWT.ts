/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../errors/appError';
import { USER_ROLE, USER_STATUS } from '../modules/User/user.constant';
import { Types } from 'mongoose';

export const createToken = (
  jwtPayload: {
    _id?: string;
    name: string;
    email: string;
    role: keyof typeof USER_ROLE;
    status: keyof typeof USER_STATUS;
    profilePhoto?: string;
    followers: Types.ObjectId[];
    following: Types.ObjectId[];
    isVerified: boolean;
    totalUpvote: number;
    postCount: number;
    premiumStart?: string;
    premiumEnd?: string;
  },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (
  token: string,
  secret: string,
): JwtPayload | Error => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error: any) {
    throw new AppError(401, 'You are not authorized!');
  }
};

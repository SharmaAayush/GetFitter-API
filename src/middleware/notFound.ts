import { Request, Response, NextFunction } from 'express';

/**
 * 404 Not Found handler middleware
 */
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Route not found'
    },
    data: null
  });
};
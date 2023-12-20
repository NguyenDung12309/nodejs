import { createHash } from 'crypto';

export const hashString = (content: string) => {
  return createHash('sha256').update(content).digest('hex');
};

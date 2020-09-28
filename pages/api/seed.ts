import { NextApiRequest, NextApiResponse } from 'next';

const stats = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.status(200);
  } catch (error) {
    console.log('error: ', error);
    res.status(500);
  }
};

export default stats;

import { deleteService } from '@services/cobogoApi';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { serviceId } = req.query;

  try {
    await deleteService(serviceId);

    res.status(201).json({ status: 201 });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
}

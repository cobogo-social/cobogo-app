import { updateService } from '@services/cobogoApi';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { name, description, serviceId } = req.body;

  try {
    await updateService(name, description, serviceId);

    res.status(201).json({ status: 201 });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
}

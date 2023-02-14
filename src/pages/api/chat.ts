// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import client from '@services/index'
import NextCors from 'nextjs-cors'

const mes: any = []

// eslint-disable-next-line import/no-unused-modules
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  })
  const sendMessage = () => {
    mes.push(req.body.events?.[0].message)
    client
      .pushMessage(req.body.events?.[0]?.source.userId, {
        type: 'text',
        text: 'From DigiHub',
      })
      .then(() => {})
      .catch(() => {})
  }
  req.body.events?.[0]?.message && sendMessage

  res.status(200).json({ mes: mes })
}

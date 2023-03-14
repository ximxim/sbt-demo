import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
	description: string;
	image: string;
	external_link: string;
	seller_fee_basis_points: number;
	fee_recipient: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
	const contractAddress = req.query.contractAddress;
  res.status(200).json({
		"name": "OpenSea Creatures",
		"description": "OpenSea Creatures are adorable aquatic beings primarily for demonstrating what can be done using the OpenSea platform. Adopt one today to try out all the OpenSea buying, selling, and bidding feature set.",
		"image": "external-link-url/image.png",
		"external_link": "external-link-url",
		"seller_fee_basis_points": 100, // Indicates a 1% seller fee.
		"fee_recipient": "0xA97F337c39cccE66adfeCB2BF99C1DdC54C2D721" // Where seller fees will be paid to.
	})
}

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
		"name": "Starbucks Coffee",
		"description": "Starbucks Coffee NFT collection",
		"image": "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/640px-Starbucks_Corporation_Logo_2011.svg.png",
		"external_link": "https://www.starbucks.ca/",
		"seller_fee_basis_points": 100, // Indicates a 1% seller fee.
		"fee_recipient": "0xed76201FA41288942F986a144106E7Ba5a71CF47" // Where seller fees will be paid to.
	})
}

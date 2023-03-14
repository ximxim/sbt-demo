import type { NextApiRequest, NextApiResponse } from 'next'

interface NFTMetadataAttribute {
  display_type?: 'boost_number' | 'boost_percentage' | 'number' | 'date';
  trait_type: string;
  value: string | number;
}

interface NFTMetadata {
  description: string;
  external_url?: string;
  image: string;
  animation_url?: string;
  name: string;
  attributes: NFTMetadataAttribute[];
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<NFTMetadata>
) {
	const contractAddress = req.query.contractAddress;
	const tokenId = req.query.tokenId;
	console.log(contractAddress, tokenId);

  res.status(200).json({
			"description": "Starbucks Star coffee", 
			"external_url": "https://www.starbucks.ca/", 
			"image": "https://media.glamour.com/photos/570e9ff1d7886f300b58bdba/master/w_1080,h_1080,c_limit/Starbucks.gif", 
			"name": "Star Coffee",
			// animation_url: "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.mp4",
			"attributes": [
				{
					"trait_type": "Base", 
					"value": "Starfish"
				}, 
				{
					"trait_type": "Eyes", 
					"value": "Big"
				}, 
				{
					"trait_type": "Mouth", 
					"value": "Surprised"
				}, 
				{
					"trait_type": "Level", 
					"value": 5
				}, 
				{
					"trait_type": "Stamina", 
					"value": 1.4
				}, 
				{
					"trait_type": "Personality", 
					"value": "Sad"
				}, 
				{
					"display_type": "boost_number", 
					"trait_type": "Aqua Power", 
					"value": 40
				}, 
				{
					"display_type": "boost_percentage", 
					"trait_type": "Stamina Increase", 
					"value": 10
				}, 
				{
					"display_type": "number", 
					"trait_type": "Generation", 
					"value": 2
				}
			],
	})
}

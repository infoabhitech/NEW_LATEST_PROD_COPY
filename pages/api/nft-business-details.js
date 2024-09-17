import dbConnect from "../../db/dbConnect";
import NFTBusiness from "../../models/nftBusinessModel";

export default async function handler(req, res) {
  const { method, body } = req;

  if (method === "POST") {
    const businessName = body.business_name;
    if (!businessName) {
      return res.status(400).json({ success: false, message: "No NFT ID!" });
    }

    await dbConnect();
    try {
      const businessDetails = await NFTBusiness.findOne({ inputName: businessName });
      return res.status(200).json({ success: true, business: businessDetails });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  return res.status(400).json({ success: false, message: "Unable to process the request." });
}

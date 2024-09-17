import mongoose from "mongoose";

const NftBusinessSchema = new mongoose.Schema(
	{
		inputName: {
			type: String,
		},
		inputCountry: {
			type: String,
		},
		inputRegion: {
			type: String,
		},
		inputDescription: {
			type: String,
		},
		inputEmail: {
			type: String,
		},
		inputIndustry: {
			type: String,
		},
		inputUtility: {
			type: String,
		},
	},
	{ collection: "NFTBusiness" }
);

module.exports =
	mongoose.models.NFTBusiness ||
	mongoose.model("NFTBusiness", NftBusinessSchema);
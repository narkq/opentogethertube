import { SponsorBlock } from "sponsorblock-api";
import { redisClient } from "./redisclient";
import { v4 as uuidv4 } from "uuid";

const SPONSORBLOCK_USERID_KEY = `sponsorblock-userid`;

export async function getSponsorBlockUserId(): Promise<string> {
	let userid = await redisClient.get(SPONSORBLOCK_USERID_KEY);
	if (!userid) {
		userid = uuidv4();
		await redisClient.set(SPONSORBLOCK_USERID_KEY, userid);
	}
	return userid;
}

export async function getSponsorBlock(): Promise<SponsorBlock> {
	const userid = await getSponsorBlockUserId();
	const sponsorblock = new SponsorBlock(userid);
	return sponsorblock;
}

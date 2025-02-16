// Token generation utilities for ZegoCloud video calls
import { generateToken04 } from "zego-token";

// Your ZegoCloud app credentials
const appID = process.env.NEXT_PUBLIC_ZEGO_APP_ID;
const serverSecret = process.env.ZEGO_SERVER_SECRET;

// Token validity duration in seconds (e.g., 3600 = 1 hour)
const tokenExpiryDuration = 3600;

/**
 * Generates a user token for ZegoCloud authentication
 * @param {string} userID - Unique identifier for the user
 * @param {string} userName - Display name of the user
 * @returns {string} Generated token
 */
export const generateUserToken = (userID, userName) => {
  if (!appID || !serverSecret) {
    throw new Error("ZegoCloud credentials not configured");
  }

  try {
    const payload = {
      room_id: "", // Empty for 1-on-1 calls
      privilege: {
        1: 1, // Login privilege
        2: 1, // Publishing privilege
      },
      stream_id_list: null,
    };

    const token = generateToken04(
      parseInt(appID),
      userID,
      serverSecret,
      tokenExpiryDuration,
      payload
    );

    return token;
  } catch (error) {
    console.error("Error generating user token:", error);
    throw new Error("Failed to generate user token");
  }
};

/**
 * Generates a room token for a specific video call session
 * @param {string} userID - Unique identifier for the user
 * @param {string} roomID - Unique identifier for the room/call
 * @returns {string} Generated room token
 */
export const generateRoomToken = (userID, roomID) => {
  if (!appID || !serverSecret) {
    throw new Error("ZegoCloud credentials not configured");
  }

  try {
    const payload = {
      room_id: roomID,
      privilege: {
        1: 1, // Login privilege
        2: 1, // Publishing privilege
      },
      stream_id_list: null,
    };

    const token = generateToken04(
      parseInt(appID),
      userID,
      serverSecret,
      tokenExpiryDuration,
      payload
    );

    return token;
  } catch (error) {
    console.error("Error generating room token:", error);
    throw new Error("Failed to generate room token");
  }
};

/**
 * Creates necessary tokens for initializing a video call
 * @param {string} userID - Unique identifier for the user
 * @param {string} userName - Display name of the user
 * @param {string} roomID - Unique identifier for the room/call
 * @returns {Object} Object containing both user and room tokens
 */
export const createCallTokens = (userID, userName, roomID) => {
  const userToken = generateUserToken(userID, userName);
  const roomToken = generateRoomToken(userID, roomID);

  return {
    userToken,
    roomToken,
  };
};

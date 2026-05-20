import db from "../config/db.js";
import {
  createModel,
  getConversationsModel,
  getSingleConversationModel,
  updateConversation,
  deleteConversationModel,
} from "../models/conversation.model.js";
import ApiResponse from "../utils/response.util.js";
import {
  createConversationMemberModel,
  createGroupConversationMemberModel,
} from "../models/conversation_members.model.js";

export const createPrivateConversation = async (req, res) => {
  try {
    const { receiver_id } = req.body;

    const { currentUser } = req.user;

    if (!receiver_id) {
      return ApiResponse(res, "Receiver id is required.", 404);
    }

    const [existing] = await db.query(
      `
             SELECT cm1.conversation_id
      FROM conversation_members cm1
      JOIN conversation_members cm2
        ON cm1.conversation_id = cm2.conversation_id
      JOIN conversations c
        ON c.id = cm1.conversation_id
      WHERE cm1.user_id = ?
      AND cm2.user_id = ?
      AND c.is_group = 0
        `,
      [currentUser, receiver_id],
    );

    if (existing.length > 0) {
      return res.json({
        success: true,
        conversationId: existing[0].conversation_id,
      });
    }

    const conversation = await createModel(NULL, 0, currentUser);

    const conversationID = conversation.insertId;

    await createConversationMemberModel(
      conversationID,
      currentUser,
      conversationID,
      receiver_id,
    );

    return res.json({
      success: true,
      conversationId,
    });
  } catch (error) {
    return ApiResponse.error(res, "Somwthing went wrong", 500, error);
  }
};

export const createGroupConversation = async (req, res) => {
  try {
    const { name, members = [] } = req.body;
    const { id: currentUser } = req.user;

    if (!name) {
      return ApiResponse.error(res, "Group name is required.", 400);
    }

    const conversation = await createModel(name, 1, currentUser);

    const conversationId = conversation.insertId;
    console.log(conversationId);

    // add admin
    await createGroupConversationMemberModel(
      conversationId,
      currentUser,
      "admin",
    );

    // add members safely
    if (Array.isArray(members) && members.length > 0) {
      for (const memberId of members) {
        await createGroupConversationMemberModel(
          conversationId,
          memberId,
          "member",
        );
      }
    }

    return res.json({
      success: true,
      conversationId,
    });
  } catch (error) {
    return ApiResponse.error(res, "Something went wrong", 500, error);
  }
};

import db from "../config/db.js";

const createConversationMemberModel = async (
  conversation_id,
  user_id,
  conversation_id2,
  receiver_id,
) => {
  const [result] = await db.query(
    "insert into conversation_members (conversation_id,user_id,role,joined_at) values (?, ?, 'member', now()),(?, ?, 'member', now())",
    [conversation_id, user_id, conversation_id2, receiver_id],
  );
  return result;
};

const createGroupConversationMemberModel = async (
  conversation_id,
  user_id,
  role,
) => {
  const [result] = await db.query(
    "insert into conversation_members (conversation_id,user_id,role,joined_at) values (?, ?, ?, now())",
    [conversation_id, user_id, role],
  );
  return result;
};

export { createConversationMemberModel, createGroupConversationMemberModel };

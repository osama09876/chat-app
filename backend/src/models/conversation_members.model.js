import db from "../config/db.js";

const createConversationMemberModel = (
  conversation_id,
  user_id,
  role,
  joined_at,
) => {
  const [result] = db.query(
    "insert into conversation_members (conversation_id,user_id,role,joined_at) values (?, ?, ?, ?)",
    [conversation_id, user_id, role, joined_at],
  );
};

export { createConversationMemberModel };

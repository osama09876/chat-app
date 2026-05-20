import db from "../config/db.js";

const getConversationsModel = () => {
  const [result] = db.query("SELECT * from conversations");

  return result;
};

const getSingleConversationModel = (id) => {
  const [result] = db.query("select * from conversations where id = ?", [id]);
  return result;
};

const createModel = async (name, is_group, created_by) => {
  const [result] = await db.query(
    "insert into conversations (name,is_group,created_by,created_at) values (?, ?, ?, NOW())",
    [name, is_group, created_by],
  );
  return result;
};

const updateConversation = (conversation_id, name) => {
  const [result] = db.query("update conversation set name = ? where id = ?", [
    name,
    conversation_id,
  ]);
  return result;
};

const deleteConversationModel = (conversation_id) => {
  const [result] = db.query("delete from conversation where id = ? ", [
    conversation_id,
  ]);

  return result;
};

export {
  createModel,
  getConversationsModel,
  getSingleConversationModel,
  updateConversation,
  deleteConversationModel,
};

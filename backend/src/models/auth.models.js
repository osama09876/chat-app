import db from "../config/db.js";

const createUserModel = async (username, email, password, avatar) => {
  const [result] = await db.query(
    "insert into users (username, email, password, avatar) values (?, ?, ?, ?)",
    [username, email, password, avatar],
  );

  return result;
};

const findUserByEmail = async (email) => {
  const [result] = await db.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return result[0];
};
const findUserById= async (id) => {
  const [result] = await db.query("SELECT * FROM users WHERE id = ?", [
    id,
  ]);
  return result[0];
};


const updateUserModel = async (id, data) => {
  const fields = Object.keys(data)
    .map((key) => `${key} = ?`)
    .join(", ");

  const values = Object.values(data);

  values.push(id);

  const query = `UPDATE users SET ${fields} WHERE id = ?`;

  const [result] = await db.query(query, values);

  return result;
};

const deleteUserModel = async (id) => {
  const [result] = await db.query(
    "UPDATE users SET is_deleted = 1 WHERE id = ?",
    [id],
  );

  return result;
};

export {
  createUserModel,
  findUserById,
  updateUserModel,
  deleteUserModel,
  findUserByEmail,
};

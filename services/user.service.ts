import db from "../config/db.ts";
import { User } from "../interfaces/User.interface.ts";

export function getUsers(): User[] {
  let users: User[] = [];

  try {
    const stmt = db.prepare("SELECT * FROM users");
    users = stmt.all();
  } catch (error) {
    console.error("Error fetching users:", error);
  }

  return users;
}

export function createUser(user: User) {
  try {
    const stmt = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");
    stmt.run(user.name, user.email);
    return { message: "User created successfully" };
  } catch (error) {
    console.error("Error creating user:", error);
    return { error: "Error creating user" };
  }
}

export function updateUser(id: number, user: User) {
  try {
    const stmt = db.prepare(
      "UPDATE users SET name = ?, email = ? WHERE id = ?",
    );
    stmt.run(user.name, user.email, id);
    return { message: "User updated successfully" };
  } catch (error) {
    console.error("Error updating user:", error);
    return { error: "Error updating user" };
  }
}

export function deleteUser(id: number) {
  try {
    const stmt = db.prepare("DELETE FROM users WHERE id = ?");
    stmt.run(id);
    return { message: "User deleted successfully" };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { error: "Error deleting user" };
  }
}

import { Handlers } from "$fresh/server.ts";
import { getUsers } from "../../services/user.service.ts";

export const handler: Handlers = {
  GET(_req) {
    const users = getUsers()
    return new Response(JSON.stringify(users), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
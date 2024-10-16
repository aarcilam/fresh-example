import { Handlers } from "$fresh/server.ts";
import type { User } from "../../interfaces/User.interface.ts";
import { createUser, getUsers } from "../../services/user.service.ts";

export const handler: Handlers = {
  GET(_req) {
    const users = getUsers();
    return new Response(JSON.stringify(users), {
      headers: { "Content-Type": "application/json" },
    });
  },
  async POST(req, _ctx) {
    const userReq = (await req.json()) as User;
    const user = createUser(userReq);

    return new Response(JSON.stringify(user));
  },
};

import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { createUser, getUsers } from "../services/user.service.ts";
import type { User } from "../interfaces/User.interface.ts";

export const handler: Handlers = {
  GET(_req: Request, ctx: HandlerContext) {
    const users = getUsers();
    return ctx.render({ users });
  },
  async POST(req, ctx) {
    const form = await req.formData();
    const email = form.get("email")?.toString();
    const name = form.get("name")?.toString();
    const user :User = {email, name}
    // Add email to list.
    createUser(user);
    // Redirect user to thank you page.
    const headers = new Headers();
    headers.set("location", "/");
    return new Response(null, {
      status: 302, // See Other
      headers,
    });
  },
};

export default function Home(props: PageProps) {
  const count = useSignal(3);
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <ul>
          {props.data.users.map((user: User) => (
            <li key={user.id}>{user.name} - {user.email}</li>
          ))}
        </ul>
        <form method="post">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Email"
              name="email"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Username"
              name="name"
            />
          </label>
          <button type="submit">Subscribe</button>
        </form>
        <h1 class="text-4xl font-bold">Welcome to Fresh</h1>
        <p class="my-4">
          Try updating this message in the
          <code class="mx-2">./routes/index.tsx</code> file, and refresh.
        </p>
        <Counter count={count} />
      </div>
    </div>
  );
}

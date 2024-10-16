import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import { getUsers } from "../services/user.service.ts";
import type { User } from "../interfaces/User.interface.ts";

export const handler: Handlers = {
  GET(_req: Request, ctx: HandlerContext) {
    const users = getUsers();
    return ctx.render({ users });
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

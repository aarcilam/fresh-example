import { PageProps } from "$fresh/server.ts";
import { Partial } from "$fresh/runtime.ts";

export default function Layout({ Component, state }: PageProps) {
    // do something with state here
    return (
        <div class="layout" f-client-nav>
            <Partial name="layout">
                <Component />
            </Partial>
        </div>
    );
}

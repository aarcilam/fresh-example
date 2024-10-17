import { PageProps, type RouteConfig } from "$fresh/server.ts";
import { Partial } from "$fresh/runtime.ts";
export const config: RouteConfig = {
  skipAppWrapper: true,
  skipInheritedLayouts: true,
};
export default function Greet(props: PageProps) {
  return (
    <>
      <Partial name="greet">
        Greetings !! {props.params.name} !!
      </Partial>
      <Partial name="greet-2">
        {props.params.name.toUpperCase()} !!
      </Partial>
    </>
  );
}

import { PageProps, type RouteConfig } from "$fresh/server.ts";
import { Partial } from "$fresh/runtime.ts";
export const config: RouteConfig = {
  skipAppWrapper: true,
  skipInheritedLayouts: true,
};
export default function Greet(props: PageProps) {
  return (
    <>
      <Partial name="greet" mode="replace">
        Greetings !! {props.params.name} !!
      </Partial>
      <Partial name="greet-2"  mode="append">
        {props.params.name.toUpperCase()} !!
      </Partial>
    </>
  );
}

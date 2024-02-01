declare module "@vitepress/theme/composables/sidebar.js"
{
    import type { ComputedRef } from "vue";

    export function useSidebar(): { hasSidebar: ComputedRef<boolean> };
}

declare module "@vitepress/theme/support/utils.js"
{
    export function normalizeLink(url: string): string;
}
declare module "@vitepress/theme/../shared.js"
{
    export const EXTERNAL_URL_RE: RegExp;
}

declare module "@vitepress/theme/components/*.vue"
{
    import type { Component } from "vue";

    export default { } as Component;
}

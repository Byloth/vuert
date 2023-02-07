declare module "@vitepress/theme/composables/sidebar.js"
{
    import type { ComputedRef } from "vue";

    export function useSidebar(): { hasSidebar: ComputedRef<boolean> };
}

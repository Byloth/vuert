import { nextTick } from "vue";

export const delay = (milliseconds: number): Promise<void> =>
{
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const update = (): Promise<void> =>
{
    return new Promise((resolve) => nextTick(resolve));
};

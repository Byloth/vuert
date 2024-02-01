export const random = (min: number, max?: number): number =>
{
    if (max === undefined)
    {
        max = min;
        min = 0;
    }

    return Math.floor(Math.random() * (max - min)) + min;
};

export const pickOne = <T>(elements: Array<T>): T =>
{
    const index = random(elements.length);
    const element = elements[index];

    if (element instanceof Object)
    {
        return { ...element };
    }

    return element;
};

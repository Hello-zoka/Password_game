export const countOccurrences = (text, searchString) => {
    const regex = new RegExp(searchString, 'g');
    const matches = text.match(regex);
    return matches ? matches.length : 0;
};

export function spawnWolfs(text) {
    const randomIndex = Math.floor(Math.random() * text.length);
    return text.substring(0, randomIndex) +
        '🐺' +
        text.substring(randomIndex)
}
/**
 * Получает случайную активность с помощью запроса к API.
 * @returns {Promise<string>} Строка с описанием случайной активности.
 * @throws {Error} Если не удалось получить активность.
 */
export async function getRandomActivity() {
    try {
        const response = await fetch('https://www.boredapi.com/api/activity/');
        if (!response.ok) {
            throw new Error('Failed to fetch activity');
        }
        const data = await response.json();
        return data.activity;
    } catch (error) {
        throw new Error('Failed to fetch activity');
    }
}

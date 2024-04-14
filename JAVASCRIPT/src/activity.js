async function getRandomActivity() {
    try {
        const response = await fetch('https://www.boredapi.com/api/activity/');
        const data = await response.json();
        return data.activity; // Возвращаем текст активности
    } catch (error) {
        console.error('Error fetching activity:', error);
        throw new Error('An error occurred while fetching the activity.');
    }
}
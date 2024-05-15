import { getRandomActivity } from './activity.js';

/**
 * Обновляет активность с интервалом в минуту, используя функцию getRandomActivity.
 */
async function updateActivity() {
    try {
        const activity = await getRandomActivity();
        document.getElementById('activity').innerText = activity;
    } catch (error) {
        console.error('Error fetching activity:', error.message);
    } finally {
        document.addEventListener("DOMContentLoaded", function() {
            setTimeout(updateActivity, 1000);
        });
        
    }
}

updateActivity();

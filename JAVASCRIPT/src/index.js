async function updateActivity() {
    try {
        const activity = await getRandomActivity();
        const activityElement = document.getElementById('activity');
        activityElement.textContent = activity;
    } catch (error) {
        console.error('Error updating activity:', error);
        const activityElement = document.getElementById('activity');
        activityElement.textContent = 'К сожалению, произошла ошибка';
    }
}

// Обновлять активность каждую минуту
setInterval(updateActivity, 60000);

// Вызов функции updateActivity при загрузке страницы
document.addEventListener('DOMContentLoaded', updateActivity);
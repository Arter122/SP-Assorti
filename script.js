// Переменные для хранения данных калькулятора
let selectedGlassType = '';
let selectedPricePerM2 = 0;

// Функция выбора типа стекла из выпадающего меню
function selectGlass(type, price) {
    selectedGlassType = type;
    selectedPricePerM2 = price;
    
    // Обновляем поле в форме
    document.getElementById('glassType').value = type;
    
    
    // Закрываем выпадающее меню (убираем hover)
    const dropdown = document.querySelector('.dropdown');
    dropdown.classList.add('hide-dropdown');
    setTimeout(() => {
        dropdown.classList.remove('hide-dropdown');
    }, 300);
}

// Функция расчёта стоимости
function calculateCost() {
    // Получаем значения из формы
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);
    const quantity = parseInt(document.getElementById('quantity').value);
    
    // Проверяем, выбран ли тип стекла
    if (!selectedGlassType) {
        alert('Пожалуйста, выберите тип стекла из выпадающего меню!');
        return;
    }
    
    // Расчёт площади в м² (переводим мм в м)
    const area = (width / 1000) * (height / 1000);
    const totalArea = area * quantity;
    
    // Расчёт общей стоимости
    const totalCost = totalArea * selectedPricePerM2;
    
    // Обновляем результаты на странице
    document.getElementById('resultType').textContent = selectedGlassType;
    document.getElementById('resultSize').textContent = `${width} × ${height}`;
    document.getElementById('resultArea').textContent = area.toFixed(3);
    document.getElementById('resultQuantity').textContent = quantity;
    document.getElementById('resultPrice').textContent = selectedPricePerM2;
    document.getElementById('resultTotal').textContent = totalCost.toFixed(2);
}

// Инициализация — очищаем результаты при загрузке
window.onload = function() {
    calculateCost(); // Показываем начальные значения
};

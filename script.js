let selectedGlass = null;

// Выбор типа стекла
function selectGlass(type, price) {
    selectedGlass = { type, price };
    
    // Обновляем поле в калькуляторе
    document.getElementById('glassType').value = type;
    
    // Визуальная обратная связь на карточках
    document.querySelectorAll('.glass-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
    
    // Обновляем блок "Выбрано"
    document.getElementById('selectedGlassName').textContent = type;
    document.getElementById('selectedGlassPrice').textContent = `${price.toLocaleString('ru')} ₽/м²`;
    document.getElementById('selectedGlass').classList.remove('hidden');
}

// Расчет стоимости
function calculateCost() {
    if (!selectedGlass) {
        alert('⚠️ Пожалуйста, выберите тип стекла!');
        document.querySelector('.glass-grid').scrollIntoView({ behavior: 'smooth' });
        return;
    }

    const width = parseFloat(document.getElementById('width').value) / 1000;   // в метрах
    const height = parseFloat(document.getElementById('height').value) / 1000; // в метрах
    const quantity = parseInt(document.getElementById('quantity').value);

    const area = (width * height).toFixed(2);
    const totalArea = (area * quantity).toFixed(2);
    const totalCost = (totalArea * selectedGlass.price).toFixed(2);

    // Заполняем результат
    document.getElementById('resultType').textContent = selectedGlass.type;
    document.getElementById('resultSize').textContent = `${document.getElementById('width').value}×${document.getElementById('height').value}`;
    document.getElementById('resultArea').textContent = area;
    document.getElementById('resultQuantity').textContent = quantity;
    document.getElementById('resultPrice').textContent = selectedGlass.price.toLocaleString('ru');
    document.getElementById('resultTotal').textContent = totalCost.toLocaleString('ru');
    
    // Показываем результат
    document.getElementById('result').classList.remove('hidden');
    
    // Плавный скролл к результату
    document.getElementById('result').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
// Функция для бронирования билета
function bookTicket() {
  alert('Бронирование Временно Не Доступно!');
  // Здесь можно добавить перенаправление на страницу бронирования
  // window.location.href = '/booking';
}

// Инициализация спойлеров
document.addEventListener('DOMContentLoaded', function() {
  const spoilerButtons = document.querySelectorAll('.spoiler-toggle');

  spoilerButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Находим родительский спойлер
      const spoiler = this.parentElement;

      // Переключаем класс 'active' для спойлера
      spoiler.classList.toggle('active');

      // Анимируем открытие/закрытие
      const content = this.nextElementSibling;

      if (spoiler.classList.contains('active')) {
        // Открываем спойлер
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        // Закрываем спойлер
        content.style.maxHeight = '0';
      }
    });
  });

  // Закрытие всех спойлеров при клике вне их области
  document.addEventListener('click', function(event) {
    // Проверяем, что клик был не по кнопке спойлера и не внутри спойлера
    if (!event.target.matches('.spoiler-toggle') &&
        !event.target.closest('.spoiler')) {
      // Закрываем все активные спойлеры
      document.querySelectorAll('.spoiler.active').forEach(spoiler => {
        spoiler.classList.remove('active');
        const content = spoiler.querySelector('.spoiler-content');
        if (content) content.style.maxHeight = '0';
      });
    }
  });
});

// Дополнительная функция для программного открытия спойлера по ID
function openSpoiler(spoilerId) {
  const spoiler = document.getElementById(spoilerId);
  if (spoiler) {
    spoiler.classList.add('active');
    const content = spoiler.querySelector('.spoiler-content');
    if (content) content.style.maxHeight = content.scrollHeight + 'px';
  }
}

// Функция для закрытия всех спойлеров
function closeAllSpoilers() {
  document.querySelectorAll('.spoiler.active').forEach(spoiler => {
    spoiler.classList.remove('active');
    const content = spoiler.querySelector('.spoiler-content');
    if (content) content.style.maxHeight = '0';
  });
}

// Основная логика формы бронирования
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.booking-form');
  const summaryFrom = document.querySelector('.route-from .route-value');
  const summaryTo = document.querySelector('.route-to .route-value');
  const summaryDate = document.querySelector('.route-date .route-value');
  const summaryPassengers = document.querySelector('.route-passengers .route-value');
  const summaryClass = document.querySelector('.route-class .route-value');
  const priceAmount = document.querySelector('.price-amount');
  const bookingSuccess = document.querySelector('.booking-success');

  if (!form) return; // Защита от отсутствия формы

  // Обработка отправки формы
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Простая валидация
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      if (!field.value) {
        field.classList.add('error');
        isValid = false;
      } else {
        field.classList.remove('error');
      }
    });

    if (!isValid) return;

    // Показываем состояние загрузки
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.classList.add('btn-loading');

    // Имитация отправки данных и ответа сервера
    setTimeout(() => {
      // Убираем состояние загрузки
      submitBtn.classList.remove('btn-loading');

      // Показываем сообщение об успехе
      if (bookingSuccess) {
        bookingSuccess.style.display = 'block';
        bookingSuccess.innerHTML = `
          <div class="success-icon">✓</div>
          <h3 class="success-title">Бронирование успешно оформлено!</h3>
          <div class="success-details">
            <p>Ваш билет забронирован. Номер бронирования: <strong>TRN-${Math.floor(Math.random() * 100000)}</strong></p>
            <p>Проверьте вашу электронную почту для получения подробной информации.</p>
          </div>
        `;

        // Прокручиваем к сообщению об успехе
        bookingSuccess.scrollIntoView({ behavior: 'smooth' });
      }
    }, 2000);
  });

  // Сброс формы
  const resetForm = () => {
    form.reset();
    summaryFrom.textContent = '—';
    summaryTo.textContent = '—';
    summaryDate.textContent = '—';
    summaryPassengers.textContent = '1 пассажир(а/ов)';
    summaryClass.textContent = 'Эконом';
    priceAmount.textContent = 'от 1 250 ₽';
    if (bookingSuccess) bookingSuccess.style.display = 'none';
  };

  // Добавляем обработчик для сброса формы (опционально)
  const resetBtn = document.createElement('button');
  resetBtn.type = 'button';
  resetBtn.textContent = 'Очистить форму';
  resetBtn.className = 'btn btn-secondary';
  resetBtn.style.marginTop = '15px';
  resetBtn.addEventListener('click', resetForm);

  // Вставляем кнопку сброса после кнопки отправки
  const submitButton = form.querySelector('.btn-full');
  if (submitButton) submitButton.after(resetBtn);

  // Подсветка полей при фокусе
  document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.style.transform = 'translateY(-2px)';
      input.parentElement.style.boxShadow = '0 5px 15px rgba(47, 220, 245, 0.2)';
    });
    input.addEventListener('blur', () => {
      input.parentElement.style.transform = 'none';
      input.parentElement.style.boxShadow = 'none';
    });
  });

  // Автоматическое обновление цены при изменении количества пассажиров или класса
  const passengersSelect = document.getElementById('passengers');
  const classSelect = document.getElementById('ticket-class');

  if (passengersSelect) passengersSelect.addEventListener('change', updatePrice);
  if (classSelect) classSelect.addEventListener('change', updatePrice);

  // Инициализация при загрузке
  updatePrice();

  // Обработка закрытия сообщения об успехе (опционально)
  if (bookingSuccess) {
    const closeSuccess = document.createElement('button');
    closeSuccess.textContent = 'Закрыть';
    closeSuccess.className = 'btn btn-secondary';
    closeSuccess.style.marginTop = '20px';
    closeSuccess.addEventListener('click', () => {
      bookingSuccess.style.display = 'none';
    });
    bookingSuccess.appendChild(closeSuccess);
  }
});

// Функция расчёта цены
function updatePrice() {
  const passengers = parseInt(document.getElementById('passengers').value) || 1;
  const ticketClass = document.getElementById('ticket-class').value;
  let basePrice = 1250;

  if (ticketClass === 'business') basePrice *= 2;
  if (ticketClass === 'first') basePrice *= 3;

  const totalPrice = basePrice * passengers;
  const priceAmount = document.querySelector('.price-amount');

  if (priceAmount) {
    priceAmount.textContent = `от ${totalPrice.toLocaleString('ru-RU')} ₽`;
  }
}

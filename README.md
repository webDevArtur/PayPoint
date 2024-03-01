# Одностраничное приложение с управлением таймерами

Это одностраничное приложение (SPA) разработано для управления двумя таймерами. Оно позволяет задать время для каждого таймера в минутах и запустить обратный отсчет. Оба таймера работают параллельно, и в интерфейсе отображается только один из них одновременно.

## Как запустить приложение

1. Убедитесь, что у вас установлен Node.js.
2. Склоните репозиторий с помощью команды '[git clone https://github.com/webDevArtur/PayPoint.git]'.
3. Перейдите в директорию проекта с помощью команды 'cd your_repository'.
4. Установите зависимости, запустив команду 'npm install'.
5. Запустите приложение командой 'npm run start'.

## Функциональность приложения

- Компонент 'TimeManager' управляет двумя экземплярами компонента 'Timer'.
- 'Timer' отображает обратный отсчет времени в минутах и секундах.
- В интерфейсе отображается только один таймер одновременно.
- После завершения отсчета на экране появляется слово "Готово".
- В 'TimeManager' есть элементы интерфейса для управления отображаемым таймером:
  - Инпут для ввода времени таймера в минутах.
  - Кнопка старта/сброса.
  - Кнопка паузы/продолжения работы таймера.
  - Кнопка смены отображаемого таймера на другой.
- Реализован механизм сохранения состояния таймера и возможность продолжить работу с того же момента при перезагрузке страницы.

## Используемые технологии

- React.js для создания компонентов пользовательского интерфейса.
- TypeScript для статической типизации.
- Webpack для сборки приложения.
- npm для управления зависимостями.

## Был реализован адаптивный диазайн

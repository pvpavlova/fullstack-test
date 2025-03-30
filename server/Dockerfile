# Базовый образ
FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package.json package-lock.json ./
RUN npm install

# Копируем весь код проекта
COPY . .

# Компиляция TypeScript
RUN npm run build

# Открываем порт
EXPOSE 3000

# Команда для запуска сервера
CMD ["npm", "run", "start"]
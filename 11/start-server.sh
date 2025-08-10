#!/bin/bash

echo "🚀 Запуск PhoneStore PWA..."
echo "📱 Відкрийте http://localhost:8000 у браузері"
echo "🔧 Для зупинки сервера натисніть Ctrl+C"
echo ""

# Перевірка наявності Python
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 знайдено, запускаю сервер..."
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "✅ Python знайдено, запускаю сервер..."
    python -m http.server 8000
else
    echo "❌ Python не знайдено"
    echo "💡 Встановіть Python або використайте інший локальний сервер"
    echo ""
    echo "Альтернативні варіанти:"
    echo "  - npx serve ."
    echo "  - php -S localhost:8000"
    echo "  - node -e \"require('http').createServer((req, res) => require('fs').createReadStream('.' + req.url).pipe(res)).listen(8000)\""
fi

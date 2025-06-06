import os
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Updater, CommandHandler, CallbackContext

# Конфигурация
TOKEN = os.getenv("7574898043: AAH4945j Ih6A9jIEfgv6l
RcBU34oITgTGps")  # Токен из переменных окружения (.env)
GAME_URL = "https://starclick.vercel.app/"  # Ссылка на игру в Vercel

# Обработчик команды /start
def start(update: Update, context: CallbackContext):
    keyboard = [
        [InlineKeyboardButton("🎮 Играть", url=GAME_URL)],
        [InlineKeyboardButton("📊 Статистика", callback_data="stats")]
    ]
    update.message.reply_text(
        "Нажмите кнопку, чтобы начать игру:",
        reply_markup=InlineKeyboardMarkup(keyboard)
    )

# Запуск бота
if __name__ == "__main__":
    updater = Updater(TOKEN)
    updater.dispatcher.add_handler(CommandHandler("start", start))
    updater.start_polling()
    print("🤖 Бот запущен! Для остановки Ctrl+C")

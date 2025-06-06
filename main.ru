from telegram import Update, ReplyKeyboardMarkup, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Updater, CommandHandler, CallbackContext

# ======== КОМАНДЫ БОТА ======== #
def start(update: Update, context: CallbackContext):
    # Кнопки внизу экрана (Reply-клавиатура)
    reply_buttons = [["🎮 Играть", "📊 Статистика"], ["⚙️ Настройки"]]
    
    # Кнопки внутри сообщения (Inline-клавиатура)
    inline_buttons = [
        [InlineKeyboardButton("🔍 Поиск", callback_data="search")],
        [InlineKeyboardButton("📌 Профиль", url="https://example.com")]
    ]
    
    update.message.reply_text(
        "Добро пожаловать в **StarclickkBot**!",
        reply_markup=ReplyKeyboardMarkup(reply_buttons, resize_keyboard=True)
    )
    
    update.message.reply_text(
        "Выберите действие:",
        reply_markup=InlineKeyboardMarkup(inline_buttons)
    )

def help(update: Update, context: CallbackContext):
    update.message.reply_text("ℹ️ Это помощь по боту!")

# ======== ЗАПУСК БОТА ======== #
TOKEN = "7574898043: AAH4945j Ih6A9jIEfgv6l
RcBU34oITgTGps"
updater = Updater(TOKEN)

# Регистрируем команды
updater.dispatcher.add_handler(CommandHandler("start", start))
updater.dispatcher.add_handler(CommandHandler("help", help))

updater.start_polling()
print("✅ Бот запущен!")  # Проверка работы

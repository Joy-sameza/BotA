import { config } from "dotenv";
import { Telegraf, Markup } from "telegraf";

config({ path: "../../.env" });

const { PORT, TOKEN: token } = process.env;
const port = Number(PORT);

if (!token) throw new Error('"TOKEN" env var is required!');
const bot = new Telegraf(token);

const keyboard = Markup.inlineKeyboard([
  Markup.button.url("❤️", "http://telegraf.js.org"),
  Markup.button.callback("Delete", "delete"),
]);

bot.start((ctx) => ctx.reply("Hello"));
bot.help((ctx) => ctx.reply("/Help message - help"));

bot.on("message", (ctx) => ctx.copyMessage(ctx.message.chat.id, keyboard));

bot.action("delete", (ctx) => ctx.deleteMessage());

// Start webhook via launch method (preferred)
bot.launch();
// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));


// exports.handler = async event => {
//     try {
//       await bot.handleUpdate(JSON.parse(event.body))
//       return { statusCode: 200, body: "" }
//     } catch (e) {
//       console.error("error in handler:", e)
//       return { statusCode: 400, body: "This endpoint is meant for bot and telegram communication" }
//     }
//   }
import { sendData, sendError } from "./send.js";
import fs from "node:fs/promises";

export const handleAddClient = (req, res) => {
  let body = "";
  try {
    req.on("data", (chunk) => {
      body += chunk;
    });
  } catch (error) {
    console.log(`Ошибка при чтении запроса`);
    sendError(res, 500, "Ошибка сервера при чтении запроса");    
  }

  req.on("end", async () => {
    try {
      const newClient = JSON.parse(body);
      console.log('body: ', body);
      console.log('newClient: ', newClient);
      sendData(res, newClient);
    } catch (error) {
      console.log('error: ', error);      
    }
  })
}
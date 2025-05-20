import express from "express";
import prisma from "./config/db.config.js";
import router from "./router/index.js";

const app = express();

app.use(express.json());
app.use(router)

app.get("/users",async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.status(200).json(users)
    } catch (error) {
        res.json(error)
    }
})

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});

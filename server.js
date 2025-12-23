const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Fonnte backend aktif");
});

app.post("/send", async (req, res) => {
    const {
        game,
        gameId,
        server,
        displayName,
        nominal,
        harga,
        payment
    } = req.body;

    const message =
`TOP UP BARU 🔔

Game: ${game}
ID: ${gameId}
${game === "Roblox" ? "Display Name: " + displayName : "Server: " + server}

Nominal: ${nominal}
Harga: Rp ${harga}
Pembayaran: ${payment}
`;

    try {
        await fetch("https://api.fonnte.com/send", {
            method: "POST",
            headers: {
                "Authorization": process.env.FONNTE_TOKEN
            },
            body: new URLSearchParams({
                target: "6283142808857",
                message
            })
        });

        res.json({ success: true, message: "Pesanan terkirim" });
    } catch (err) {
        res.status(500).json({ success: false });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});

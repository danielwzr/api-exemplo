const express = require('express')
const { Pool } = require("pg")

const app = express()

app.use(express.json()) // permite receber JSON no body
app.use(express.urlencoded({ extended: true }))

const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_nrl0dpCFZc2G@ep-wild-bread-ad7oaxxh-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
    ssl: { rejectUnauthorized: false }
})

app.listen(8080, () => {
    console.log("o servidor foi aberto")
})

app.get("/usuarios", async (req, res)=>{
    const result = await pool.query("SELECT * FROM users")
    res.json(result.rows)
})

app.post("/usuarios", async(req, res)=>{
    const { email } = req.body // exemplo de colunas

    const result = await pool.query(
      "INSERT INTO users (email) VALUES ($1) RETURNING *",
      [email]
    );
    res.send("Obrigado pelo cadastro")
})
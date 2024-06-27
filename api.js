const express = require("express");
const sql = require("mssql");
const bodyParser = require("body-parser");
const cors = require("cors"); 
const port = 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); 


const config = {
    server: 'LAPTOP-7EOS1BS8\\SQLEXPRESS', 
    database: 'aquaguard',
    user: 'willie',
    password: 'abcd1234',
    options: {
        enableArithAbort: true,
        trustServerCertificate: true,
    },
};

// Create connection pool
const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log("Connected to MSSQL");
        return pool;
    })
    .catch(err => {
        console.error("Database Connection Failed! Bad Config: ", err);
        throw err;
    });

// API endpoints
app.post('/apiTemp', async (req, res) => {
    console.log("Received POST request at /apiTemp"); // Log request
    let temperature = req.body.temperature;
    console.log("Temperature:", temperature); // Log body content

    if (!temperature) {
        console.log("Missing required field: temperature"); // Log missing field
        return res.status(400).send("Missing required field: temperature");
    }

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('temperature', sql.Float, temperature)
            .query('INSERT INTO [aquaguard].[dbo].Temperature (Temperature, UpdateTime) VALUES (@temperature, GETDATE())');

        console.log("Data inserted successfully!"); // Log success
        res.status(201).send("Data inserted successfully!");
    } catch (err) {
        console.error("Error inserting data: ", err);
        res.status(500).send("An error occurred while inserting data.");
    }
});

app.post('/apiTurbidity', async (req, res) => {
    console.log("Received POST request at /apiTurbidity"); // Log request
    let turbidity = req.body.turbidity;
    console.log("Turbidity:", turbidity); // Log body content

    if (!turbidity) {
        console.log("Missing required field: turbidity"); // Log missing field
        return res.status(400).send("Missing required field: turbidity");
    }

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('turbidity', sql.Float, turbidity)
            .query('INSERT INTO [aquaguard].[dbo].Turbidity (Turbidity, UpdateTime) VALUES (@turbidity, GETDATE())');

        console.log("Data inserted successfully!"); // Log success
        res.status(201).send("Data inserted successfully!");
    } catch (err) {
        console.error("Error inserting data: ", err);
        res.status(500).send("An error occurred while inserting data.");
    }
});

app.post('/apiPh', async (req, res) => {
    console.log("Received POST request at /apiPh"); // Log request
    let ph = req.body.ph;
    console.log("PH:", ph); // Log body content

    if (!ph) {
        console.log("Missing required field: ph"); // Log missing field
        return res.status(400).send("Missing required field: ph");
    }

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('ph', sql.Float, ph)
            .query('INSERT INTO [aquaguard].[dbo].PH (PH, UpdateTime) VALUES (@ph, GETDATE())');

        console.log("Data inserted successfully!"); // Log success
        res.status(201).send("Data inserted successfully!");
    } catch (err) {
        console.error("Error inserting data: ", err);
        res.status(500).send("An error occurred while inserting data.");
    }
});

app.get('/getData', async (req, res) => {
    try {
        const pool = await poolPromise;

        const tempResult = await pool.request().query('SELECT TOP 1 Temperature FROM [aquaguard].[dbo].Temperature ORDER BY UpdateTime DESC');
        const temperature = tempResult.recordset[0]?.Temperature || 0;

        const turbidityResult = await pool.request().query('SELECT TOP 1 Turbidity FROM [aquaguard].[dbo].Turbidity ORDER BY UpdateTime DESC');
        const turbidity = turbidityResult.recordset[0]?.Turbidity || 0;

        const phResult = await pool.request().query('SELECT TOP 1 PH FROM [aquaguard].[dbo].PH ORDER BY UpdateTime DESC');
        const ph = phResult.recordset[0]?.PH || 0;

        res.json({ Temp: temperature, Turbidity: turbidity, PH: ph });

    } catch (err) {
        console.error("Error fetching data: ", err);
        res.status(500).send("An error occurred while fetching data.");
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

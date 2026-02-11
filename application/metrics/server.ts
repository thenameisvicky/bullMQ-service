import client from "prom-client"
import express from "express"

/**
 * Express server (Metrics)
 * To track metrics for dashboard
 */

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

/**
 * Registry for prometheus
 */

const register = new client.Registry();
client.collectDefaultMetrics({
    register,
})

/**
 * POST /api/v1/metrics/prom
 * Returns hardware metrics 
 */

app.get("/api/v1/metrics/prom", async (req, res) => {
    const response = await register.metrics();

    res.set("Content-Type", register.contentType);
    res.send(response);
});

/**
 * POST /api/v1/metrics/elastic
 * Returns in app metrics
 */

app.post("/api/v1/metrics/elastic", async (req, res) => {

});


app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`);
})
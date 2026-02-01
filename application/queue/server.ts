import { Worker } from 'bullmq';

/**
 * BullMQ server (Consumer)
 * Consumes from Producer
 * Handles Inference
 */

const worker = new Worker("LLM_INFERENCE", async job => {
    const response = await fetch(`http://${process.env.INFERENCE_HOST}:${process.env.INFERENCE_PORT}/api/v1/infer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: job.data.prompt
        })
    });

    const data = await response.json();

    console.log(`Job completed: ${job.id} - ${JSON.stringify(data)}`);
}, {
    connection: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT)
    }
});

worker.on("ready", () => {
    console.log("Consumer ready!");
});

worker.on("failed", () => {
    console.log("Consumer crashed!")
})
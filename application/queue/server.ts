import { Worker } from 'bullmq';

/**
 * BullMQ server (Consumer)
 * Consumes from Producer
 * Handles Inference
 */

const worker = new Worker("LLM_INFERENCE", async job => {
    console.log(`Consuming...Job-${job.id} Payload-${JSON.stringify(job.data)}`);

    /**
     * Replace with inference API
     */
    const response = await fetch(`http://${process.env.INFERENCE_HOST}:${process.env.INFERENCE_PORT}/api/v1/infer`, {
        method: 'POST',
        body: JSON.stringify({
            message: job.data.message
        })
    });

    const data = await response.json();

    console.log("Job completed:", job.id, data);

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
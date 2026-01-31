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
    await new Promise(r => setTimeout(r, 1000));

    console.log("Job completed:", job.id);
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
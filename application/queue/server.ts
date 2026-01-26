import { Worker } from 'bullmq';

/**
 * BullMQ server (Consumer)
 * Consumes from Producer
 * Handles Inference
 */

const worker = new Worker("LLM_INFERENCE", async job => {
    console.log(`Consuming...Job-${job.id} Payload-${JSON.stringify(job.data)}`);

    await new Promise(r => setTimeout(r, 1000));
    console.log("Job completed:", job.id);
}, {
    connection: {
        host: '127.0.0.1',
        port: 6379
    }
});

worker.on("ready", () => {
    console.log("Consumer ready!");
});

worker.on("failed", () => {
    console.log("Consumer crashed!")
})
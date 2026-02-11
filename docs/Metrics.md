# Metrics

## Metrics to be tracked -

### API Metrics

1. Request per time window -
   - Incoming load pattern.
   - Bursts vs steady traffic.
   - Shows load -> Queue depth -> latency.
2. Success / Failure rate -
   - System relaiability at entry point.
   - Distingush overlaod vs internal failure.
   - High failure + High RPS = backpressure problem.
3. API Latency -
   - Time to enqueue and acknowledge request.
   - If API latency grows system collapse before inference.
   - Should remain mostly flat even under big load.

### Queue / worker Metrics

1. Jobs per time window -
   - Throughput of system.
   - True capacity metrics.
   - Shows how many inference you can sustain.
2. Job success / failure -
   - Worker stability.
   - Failure here mean inference / runtime problems.
   - Distungush model issues from infra issues.
3. Time to process -
   - Queue wait and process time.

### Inference metrics

1. Inference time -
   - Cost of model execution.
   - This is the dominant latency component.
   - Enables model comparison (7B vs 3B).
2. CPU usage during inference -
   - How “expensive” inference is on CPU.
   - Correlates directly with throughput limits.
   - Lets you prove CPU saturation behavior.
3. RAM usage during inference -
   - Memory footprint of model.
   - Prevents OOM suspences.
   - Explains why scaling workers is limited.
4. Tokens generated -
   - Output size.
   - Directly impacts inference time.
   - Larger outputs longer CPU usage.
5. Tokens used -
   - Input complexity.
   - Input size affects execution time.
   - Lets you normalize latency by token count.
6. Tokens generated per sec -
   - tokens generated / inference time.
7. Queue  / worker wait time -
   - queue_wait_time / total_latency.

## Low level design -

### Tech stack

- Dashboards in kibana.
- In App logs in elastic.
- Using prometheus to scrape hardware usage.
- References is bulkId from Queue.

### Development plan

- Run metrics in seperate container.
- Metric code will be in this repository, like queue it is built into seperate image.
- Every API hit, worker logs are stored in elastic.
- Every CPU, RAM usage automatically tracked by prometheus we need to show them grouped in kibana.
- 

### Low level design

- **API Metric** -
  - API metric plan.

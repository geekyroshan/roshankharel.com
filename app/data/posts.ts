// Static blog posts data
export const posts = [
    {
        _id: "reinforcement-learning-agents",
        _createdAt: "2025-12-15",
        title: "Building Production-Ready RL Agents",
        slug: "reinforcement-learning-agents",
        description: "A deep dive into creating reinforcement learning agents that work in production environments, with lessons learned from the Fundora project.",
        tags: ["AI", "Reinforcement Learning", "MLOps"],
        coverImage: {
            image: "",
            lqip: "",
            alt: "Reinforcement Learning Agents",
        },
        featured: true,
        isPublished: true,
        readingTime: "4 min read",
        body: `## The Gap Between Research and Production

Reinforcement learning has produced remarkable results in controlled environments -- from mastering Atari games to beating world champions at Go. But anyone who has tried to deploy an RL agent into a live production system knows there is a massive chasm between a notebook demo and a reliable, maintainable service. When I started building the recommendation engine for Fundora, a personalized investment advisory platform, I ran headfirst into that chasm.

This post distills the hard-won lessons from that journey: what works, what breaks, and the engineering patterns that keep RL agents running smoothly in production.

## Why RL for Fundora?

Fundora needed to recommend investment strategies that adapted to each user's risk tolerance, goals, and market conditions in real time. Traditional recommendation approaches -- collaborative filtering, static rule engines -- could not capture the sequential nature of financial decisions. Each recommendation changes the user's portfolio, which changes the optimal next recommendation. That temporal dependency is exactly what RL is designed for.

We modeled the problem as a contextual bandit with delayed rewards. The agent observes a user's current portfolio state, market signals, and behavioral features, then selects from a set of candidate strategies. Rewards are computed from portfolio performance over a rolling 30-day window.

## Lesson 1: Simulation Is Your Safety Net

The single most important investment we made was building a high-fidelity simulator before touching real user traffic. We replayed 18 months of historical market data and user interaction logs through the simulator, validating that our agent's policies produced reasonable outputs before any live deployment.

The simulator also served as our continuous integration test. Every model update ran through a battery of simulated scenarios -- bull markets, flash crashes, low-liquidity periods -- and had to pass minimum performance thresholds before promotion.

**Key takeaway**: Never train or deploy an RL agent without a simulator. It is your test suite, your staging environment, and your rollback validation layer all in one.

## Lesson 2: Reward Engineering Is the Real Challenge

Getting the reward function right consumed more engineering time than the model architecture itself. Our first attempt used raw portfolio return as the reward signal. The agent quickly learned to recommend high-volatility strategies because the upside rewards dominated. Users were unhappy.

We iterated through several reward formulations before settling on a risk-adjusted metric that combined Sharpe ratio, maximum drawdown penalty, and a user satisfaction proxy derived from engagement signals. The final reward function looked roughly like this:

\`\`\`python
def compute_reward(portfolio_return, volatility, max_drawdown, engagement_score):
    sharpe = portfolio_return / (volatility + 1e-8)
    drawdown_penalty = max(0, max_drawdown - 0.15) * 10.0
    engagement_bonus = engagement_score * 0.1
    return sharpe - drawdown_penalty + engagement_bonus
\`\`\`

**Key takeaway**: Spend disproportionate time on reward engineering. A well-shaped reward function matters far more than a clever architecture.

## Lesson 3: Offline-First Training with Online Fine-Tuning

We adopted a two-phase training strategy. Phase one uses offline RL (specifically Conservative Q-Learning) trained on historical interaction logs. This produces a reasonable baseline policy without any live experimentation risk. Phase two deploys the offline policy behind an epsilon-greedy exploration wrapper and fine-tunes with live feedback.

This approach let us launch with a policy that was already competent on day one, then improve continuously. We also implemented policy constraints -- the online policy could never deviate more than a configurable KL-divergence threshold from the offline baseline, preventing catastrophic drift.

## Lesson 4: Observability Changes Everything

RL agents are notoriously difficult to debug. Unlike supervised models where you can inspect predictions against labels, an RL agent's quality is only apparent over time. We built a custom observability stack that tracked:

- **Action distributions** per user segment (detecting mode collapse early)
- **Reward trends** over rolling windows (catching reward hacking)
- **State coverage** metrics (ensuring the agent explored diverse portfolio configurations)
- **Policy divergence** from the baseline (automated alerting on drift)

We piped these metrics into Grafana dashboards with Prometheus, and set up PagerDuty alerts for anomalies. When the agent started recommending a single strategy to 80% of users one weekend, the action distribution alert caught it within 15 minutes.

## Lesson 5: Versioned Model Serving with Rollback

We treated model versions the same way we treat code releases. Every trained policy was serialized with its full configuration, reward function hash, training data snapshot ID, and evaluation metrics. We used MLflow for tracking and a custom Kubernetes operator for blue-green deployment of model versions.

Rollback was a first-class operation. If post-deployment monitoring detected degradation, the system could revert to the previous policy version within seconds. We exercised this capability in production three times during the first six months.

## Architecture Overview

The production system consisted of four main components:

- **Feature Store**: Real-time user and market features served via Redis, with batch features computed hourly in Spark
- **Policy Server**: A FastAPI service wrapping the trained policy, deployed as a Kubernetes Deployment with HPA
- **Reward Pipeline**: An asynchronous Kafka-based pipeline that computed delayed rewards and wrote them to the training data store
- **Training Loop**: A periodic retraining job running on GPU nodes, triggered when sufficient new reward data accumulated

## What I Would Do Differently

If I were starting over, I would invest in better counterfactual evaluation methods earlier. We relied heavily on A/B testing for policy evaluation, which is slow and expensive. Techniques like doubly robust estimation and importance-weighted evaluators would have let us evaluate candidate policies offline with higher confidence, reducing the number of live experiments needed.

I would also standardize the action space more carefully from the beginning. We added new strategy types mid-project, which required retraining from scratch. A more modular action representation would have made this incremental.

## Conclusion

Building production RL agents is fundamentally an engineering discipline, not just a modeling exercise. The model architecture matters, but the surrounding infrastructure -- simulation, observability, reward pipelines, versioned deployment -- is what determines whether your agent survives contact with real users. The Fundora project taught me that investing in these systems early pays compound returns as the product evolves.`,
    },
    {
        _id: "ai-agents-for-enterprise",
        _createdAt: "2025-11-20",
        title: "Shipping AI Agents for Enterprise Clients",
        slug: "ai-agents-enterprise",
        description: "How we built and deployed vision-aware AI agents and real estate automation systems at AlysAI for enterprise clients.",
        tags: ["AI Agents", "Enterprise", "Automation"],
        coverImage: {
            image: "",
            lqip: "",
            alt: "AI Agents",
        },
        featured: true,
        isPublished: true,
        readingTime: "4 min read",
        body: `## From Demos to Deployments

Everyone is building AI agents. Few are shipping them to enterprise clients who expect uptime SLAs, audit trails, and predictable costs. At AlysAI, we spent the past year doing exactly that -- building and deploying autonomous AI agents for real estate firms and enterprise operations teams. This post covers the architectural decisions, failure modes, and engineering patterns that made it possible.

## The Problem Space

Our primary clients were real estate enterprises that needed to automate document-heavy workflows: lease abstraction, property valuation analysis, compliance checking, and tenant communication. These tasks involved processing PDFs, images of floor plans, scanned contracts, and structured data from multiple systems. A human analyst might spend 4-6 hours per property doing work that our agents needed to complete in minutes.

The second category was vision-aware agents for property inspection. Using computer vision models combined with LLM reasoning, these agents could analyze property photos, identify maintenance issues, cross-reference against inspection checklists, and generate structured reports.

## Architecture: The Agent Orchestration Layer

We settled on a multi-agent orchestration architecture rather than a single monolithic agent. Each agent specializes in a narrow task and communicates through a central orchestrator. This design was motivated by three hard-learned lessons:

**Reliability through specialization.** A single agent tasked with "analyze this entire lease document" would hallucinate terms approximately 12% of the time. Breaking the task into specialized sub-agents -- one for financial terms extraction, one for clause classification, one for date parsing -- brought the error rate below 2%.

**Cost predictability.** Enterprise clients need to forecast costs. By routing simpler sub-tasks to smaller models (GPT-4o-mini, Claude Haiku) and reserving larger models for complex reasoning steps, we reduced per-document processing costs by 60% while maintaining quality thresholds.

**Auditability.** Each sub-agent produces a typed, structured output with confidence scores. The orchestrator logs every decision point. When a client asks "why did the system flag this clause as non-standard?", we can trace the exact reasoning chain.

The orchestrator itself is a directed acyclic graph (DAG) execution engine built on top of LangGraph. Each node is an agent with defined input/output schemas, and edges can be conditional based on confidence thresholds or classification results.

## Vision Agents: Beyond Text

The property inspection agents were technically the most challenging. They needed to:

1. Ingest a set of property photos (typically 20-50 per inspection)
2. Classify each photo by room type and feature
3. Identify visible issues (water damage, structural cracks, appliance condition)
4. Cross-reference findings against the property's maintenance history
5. Generate a structured inspection report with severity ratings

We used a pipeline approach: a fine-tuned CLIP model for initial classification, GPT-4 Vision for detailed analysis of flagged images, and a reasoning agent that synthesized findings into the final report.

The key engineering challenge was handling image quality variance. Enterprise clients upload photos from phones in varying lighting conditions. We built a preprocessing pipeline that normalized exposure, detected blur, and rejected unusable images with explanations rather than producing unreliable analysis.

\`\`\`python
class ImageQualityGate:
    def __init__(self, blur_threshold=100.0, brightness_range=(40, 220)):
        self.blur_threshold = blur_threshold
        self.brightness_range = brightness_range

    def evaluate(self, image_path: str) -> QualityResult:
        img = cv2.imread(image_path)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        laplacian_var = cv2.Laplacian(gray, cv2.CV_64F).var()
        mean_brightness = gray.mean()

        issues = []
        if laplacian_var < self.blur_threshold:
            issues.append("Image is too blurry for reliable analysis")
        if not (self.brightness_range[0] <= mean_brightness <= self.brightness_range[1]):
            issues.append("Image lighting is outside acceptable range")

        return QualityResult(
            passed=len(issues) == 0,
            issues=issues,
            metrics={"blur_score": laplacian_var, "brightness": mean_brightness}
        )
\`\`\`

## Handling Enterprise Requirements

Building the agent logic was perhaps 40% of the work. The remaining 60% was enterprise infrastructure:

**Authentication and multi-tenancy.** Every API call flows through a tenant-aware middleware that enforces data isolation. Client A's documents are never accessible to Client B's agents, even at the vector store level. We partition Pinecone namespaces by tenant ID and encrypt embeddings at rest.

**Rate limiting and cost controls.** We implemented per-tenant token budgets with configurable alerts. When a client's monthly usage approaches their contracted limit, the system automatically downgrades to smaller models for non-critical tasks and notifies the account manager.

**Compliance logging.** Every LLM call is logged with full prompt, response, model version, latency, and token count. These logs are immutable (append-only to S3 with versioning) and retained for the contractually required period. Several clients in regulated industries required this for their own audit obligations.

**Graceful degradation.** When OpenAI or Anthropic APIs experience outages, the system falls back through a priority chain: primary provider, secondary provider, cached results for identical inputs, and finally a "manual review required" state that queues the task for human processing.

## The Reliability Stack

We deployed on AWS EKS with the following observability stack:

- **Tracing**: OpenTelemetry with Jaeger for end-to-end request tracing across agent hops
- **Metrics**: Prometheus + Grafana dashboards tracking latency percentiles, error rates, token usage, and agent-specific accuracy metrics
- **Alerting**: PagerDuty integration with tiered severity based on client SLA tier
- **Testing**: A regression test suite of 500+ document/image pairs with known correct outputs, run nightly

The regression suite was the most valuable investment. We caught three model-version-related regressions before they reached production, each of which would have produced incorrect financial figures in lease abstractions.

## Lessons Learned

**Start with the output schema, not the prompt.** Enterprise clients care about structured, predictable outputs they can feed into their existing systems. Define the exact JSON schema of every agent's output before writing a single prompt. This forces clarity on what the agent actually needs to produce.

**Build the human-in-the-loop path first.** No matter how good your agents are, some tasks will require human review. We built the escalation and review UI before the agents themselves. This meant we could ship a partially-automated solution immediately and increase automation coverage over time.

**Measure accuracy on real client data, not benchmarks.** Our agents performed beautifully on public datasets but struggled with the specific formatting conventions of certain law firms' lease documents. We built client-specific evaluation sets within the first week of every new engagement.

**Version everything.** Prompts, model versions, preprocessing pipelines, evaluation sets -- all versioned in git with automated promotion workflows. When a client reports an issue, we can reproduce exactly what the system did on that date with that configuration.

## What Comes Next

We are now building agents that can operate across multiple enterprise systems -- pulling data from Salesforce, cross-referencing against documents in SharePoint, and updating records in client-specific ERPs. The orchestration layer we built scales naturally to these multi-system workflows, but the authentication and permission challenges multiply significantly. That is the next frontier.`,
    },
    {
        _id: "mlops-kubernetes",
        _createdAt: "2025-10-05",
        title: "MLOps on Kubernetes: A Practical Guide",
        slug: "mlops-kubernetes",
        description: "Setting up a complete MLOps pipeline on Kubernetes with auto-scaling, model versioning, and monitoring.",
        tags: ["MLOps", "Kubernetes", "DevOps"],
        coverImage: {
            image: "",
            lqip: "",
            alt: "MLOps Pipeline",
        },
        featured: false,
        isPublished: true,
        readingTime: "4 min read",
        body: `## Why Kubernetes for ML Workloads?

Machine learning systems have unique infrastructure demands that do not map cleanly onto traditional web application deployment patterns. Training jobs need GPU nodes that should scale to zero when idle. Inference services need autoscaling based on request latency, not just CPU utilization. Feature pipelines need scheduled execution with complex dependency graphs. Data scientists want to experiment without breaking production.

Kubernetes handles all of these requirements -- but only if you set it up correctly. After building MLOps platforms at multiple organizations, I have converged on a set of patterns and tools that work reliably. This guide walks through the architecture end to end.

## The Reference Architecture

Our MLOps platform on Kubernetes consists of five layers:

1. **Compute Layer**: EKS/GKE cluster with heterogeneous node pools (CPU, GPU, high-memory)
2. **Orchestration Layer**: Argo Workflows for training pipelines, Argo CD for deployment
3. **Serving Layer**: KServe (formerly KFServing) for model inference with autoscaling
4. **Storage Layer**: S3-compatible object storage for artifacts, PostgreSQL for metadata
5. **Observability Layer**: Prometheus, Grafana, and custom ML-specific metrics

Let me walk through each layer and the decisions behind them.

## Compute: Node Pools and Scheduling

The cluster runs three node pools:

\`\`\`yaml
# GPU pool for training jobs
apiVersion: karpenter.sh/v1alpha5
kind: Provisioner
metadata:
  name: gpu-training
spec:
  requirements:
    - key: node.kubernetes.io/instance-type
      operator: In
      values: ["g5.xlarge", "g5.2xlarge"]
    - key: karpenter.sh/capacity-type
      operator: In
      values: ["spot", "on-demand"]
  limits:
    resources:
      nvidia.com/gpu: "8"
  ttlSecondsAfterEmpty: 300
\`\`\`

We use Karpenter instead of Cluster Autoscaler for GPU nodes. Karpenter provisions the right instance type for each workload and -- critically -- scales to zero when no training jobs are running. GPU instances are expensive, and idle GPU nodes are the single largest waste in most ML platforms. The \`ttlSecondsAfterEmpty: 300\` setting tears down nodes five minutes after their last pod completes.

For inference, we run a separate pool of CPU-optimized instances (c6i family) with the standard Kubernetes Horizontal Pod Autoscaler. Inference workloads have more predictable resource requirements and benefit from always-on capacity for low-latency responses.

## Training Pipelines with Argo Workflows

Every training pipeline is defined as an Argo Workflow DAG. A typical pipeline has these stages:

1. **Data validation**: Schema checks, drift detection against the training baseline
2. **Feature engineering**: Transformations executed as containerized steps
3. **Training**: The actual model training, potentially distributed across multiple GPUs
4. **Evaluation**: Automated metrics computation against held-out test sets
5. **Registration**: Pushing the model artifact and metadata to the model registry
6. **Promotion gate**: Automated check -- does this model beat the current production model on key metrics?

The promotion gate is essential. Without it, you end up with manual "looks good to me" approvals that either bottleneck the pipeline or get rubber-stamped. Our gate checks three conditions: the candidate model must exceed the production model's accuracy by a configurable threshold (typically 0.5%), must not regress on any monitored fairness metric, and must meet latency requirements when served on the target hardware.

\`\`\`yaml
- name: promotion-gate
  script:
    image: mlops/evaluator:latest
    command: [python]
    source: |
      from mlops.registry import get_production_model, get_candidate_model
      from mlops.evaluation import compare_models

      prod = get_production_model("{{workflow.parameters.model_name}}")
      candidate = get_candidate_model("{{workflow.parameters.run_id}}")

      result = compare_models(prod, candidate, metrics=["accuracy", "f1", "latency_p99"])

      if result.candidate_wins:
          print("PROMOTION: Candidate passes all gates")
      else:
          print(f"BLOCKED: {result.failure_reasons}")
          exit(1)
\`\`\`

## Model Serving with KServe

KServe provides a standardized inference protocol with powerful autoscaling. We define each model as an InferenceService custom resource:

\`\`\`yaml
apiVersion: serving.kserve.io/v1beta1
kind: InferenceService
metadata:
  name: fraud-detector
  annotations:
    serving.kserve.io/autoscalerClass: hpa
    serving.kserve.io/targetUtilizationPercentage: "70"
spec:
  predictor:
    minReplicas: 2
    maxReplicas: 20
    model:
      modelFormat:
        name: sklearn
      storageUri: "s3://models/fraud-detector/v12"
      resources:
        requests:
          cpu: "2"
          memory: "4Gi"
        limits:
          cpu: "4"
          memory: "8Gi"
\`\`\`

KServe handles canary deployments natively. When we promote a new model version, we roll it out to 10% of traffic, monitor for 30 minutes, then gradually increase to 100%. If error rates spike during canary, an automated rollback triggers.

The autoscaling configuration deserves attention. We scale on a custom metric -- inference latency p95 -- rather than CPU utilization. ML models can exhibit high latency before CPU saturates, especially with batch preprocessing. A custom HPA metric ensures we scale proactively.

## Feature Store Integration

Feature pipelines run on two cadences: batch (hourly/daily via Argo cron workflows) and real-time (Kafka consumers writing to Redis). The serving layer reads features from both stores at inference time.

The critical design decision was making feature computation deterministic and versioned. Every feature transformation is a pure function with a version hash. Training pipelines record which feature versions they used, and the serving layer serves the same versions. This eliminates training-serving skew, which is the most common source of silent model degradation in production.

## Observability: Beyond Standard Metrics

Standard Kubernetes metrics (CPU, memory, pod restarts) are necessary but insufficient for ML workloads. We add three categories of ML-specific monitoring:

**Data quality metrics**: Input feature distributions are monitored in real time. When the distribution of an input feature drifts beyond a configured threshold (measured by Population Stability Index), an alert fires. This catches upstream data pipeline issues before they corrupt model predictions.

**Model performance metrics**: We compute rolling accuracy, precision, and recall against delayed ground truth labels. These metrics are exported as Prometheus gauges and visualized in Grafana dashboards per model, per version.

**Business metrics**: Ultimately, model quality is measured by business outcomes. We instrument downstream systems to report business KPIs (conversion rate, fraud detection rate, recommendation click-through) and correlate them with model versions. This closes the feedback loop between ML engineering and business value.

## GitOps for Everything

Every configuration described above lives in git. Argo CD watches the repository and reconciles the cluster state. This means:

- Model deployments are pull requests, reviewed and auditable
- Rollbacks are \`git revert\` operations
- The entire platform state can be reconstructed from the repository
- New environments (staging, production) are directory copies with overrides

## Lessons and Pitfalls

**Do not share GPU nodes between training and inference.** Training jobs are bursty and will starve inference pods of resources. Use separate node pools with taints and tolerations.

**Invest in artifact storage early.** Model artifacts, training data snapshots, and evaluation results accumulate fast. Set up lifecycle policies and a clear naming convention from day one. We use the pattern \`s3://models/{model_name}/v{version}/\` with metadata stored in MLflow.

**Make the happy path easy.** If deploying a model requires 15 manual steps, people will skip steps. Our data scientists run a single command -- \`make deploy MODEL=fraud-detector VERSION=12\` -- which triggers the entire pipeline from evaluation through canary deployment.

**Plan for multi-tenancy from the start.** If you will ever serve multiple teams or products, namespace isolation, resource quotas, and RBAC should be in the initial design, not bolted on later.

## Conclusion

Kubernetes is not the simplest way to serve a single model. But when you need to support multiple models, multiple teams, heterogeneous hardware, and production-grade reliability, it becomes the most cost-effective platform. The key is investing in automation and guardrails so that the complexity of Kubernetes is hidden behind simple, safe interfaces that data scientists actually want to use.`,
    },
    {
        _id: "liveavatar-14b-parameter-system",
        _createdAt: "2026-01-18",
        title: "How I Built a 14B Parameter Avatar System That Runs at 20 FPS",
        slug: "liveavatar-14b-parameter-system",
        description: "A technical deep dive into deploying Alibaba's WanS2V-14B model on 5x H800 GPUs for real-time avatar generation, covering the streaming pipeline, LoRA fine-tuning, and inference optimization.",
        tags: ["Generative AI", "Deep Learning", "Infrastructure"],
        coverImage: {
            image: "",
            lqip: "",
            alt: "LiveAvatar 14B Parameter System",
        },
        featured: true,
        isPublished: true,
        readingTime: "6 min read",
        body: `## The Challenge: Real-Time Generative Avatars at Scale

When Sarathi Studio took on the LiveAvatar project, the brief was deceptively simple: generate photorealistic talking-head avatars from a single reference image, driven by audio input, at 20 frames per second. The model powering this was Alibaba's WanS2V-14B -- a 14-billion parameter video generation model that, out of the box, takes about 45 seconds to produce a single 2-second clip. We needed to make it run 900x faster.

This post documents how we got there: the hardware decisions, the model surgery, the streaming architecture, and the painful lessons about GPU memory management that no paper will teach you.

## Why WanS2V-14B?

We evaluated several video generation architectures before settling on WanS2V. The alternatives -- Stable Video Diffusion, AnimateDiff, SadTalker -- either lacked the lip-sync fidelity we needed or produced artifacts around jaw boundaries that were unacceptable for professional use cases. WanS2V-14B, despite its size, produced the most natural mouth movements and preserved identity consistency across long sequences.

The model uses a hybrid architecture: a frozen image encoder (based on a CLIP ViT-H variant) feeds into a temporal diffusion transformer with 14 billion parameters. The diffusion process runs in a compressed latent space, but even so, the compute requirements are enormous.

## Hardware: 5x H800 GPUs with Tensor Parallelism

Our inference cluster runs on 5 NVIDIA H800 GPUs (80GB HBM3 each) connected via NVLink. The model does not fit on a single GPU -- even in FP16, the parameters alone consume approximately 28GB, and the KV cache and intermediate activations push total memory requirements past 120GB during inference.

We use tensor parallelism across 4 GPUs for the diffusion transformer, with the 5th GPU dedicated to the image encoder and audio feature extraction pipeline. The parallelism strategy splits attention heads across GPUs rather than splitting layers, which minimizes inter-GPU communication during the attention computation.

\`\`\`python
# Tensor parallel configuration for WanS2V-14B
tp_config = {
    "tensor_parallel_size": 4,
    "pipeline_parallel_size": 1,
    "partition_strategy": "attention_heads",
    "communication_backend": "nccl",
    "encoder_device": "cuda:4",  # dedicated GPU for encoder
    "dtype": "bfloat16",
    "max_batch_size": 1,  # single-stream real-time
    "kv_cache_dtype": "fp8_e4m3",  # quantized KV cache
}
\`\`\`

The KV cache quantization to FP8 was critical. It reduced cache memory by 50% with negligible quality impact, freeing enough headroom for the temporal sliding window approach described below.

## LoRA Fine-Tuning for Domain-Specific Quality

The base WanS2V model generates excellent general video, but talking-head avatars have specific requirements: precise lip synchronization, stable head pose, and consistent skin texture across frames. We fine-tuned with LoRA (rank 64, alpha 128) on a curated dataset of 12,000 talking-head clips.

The fine-tuning targeted three specific attention layers in the temporal transformer -- the cross-attention layers that attend to audio features, and the first and last self-attention layers in the temporal stack. Freezing the spatial attention layers preserved the model's image quality while allowing the temporal dynamics to specialize.

\`\`\`python
# LoRA configuration for talking-head specialization
lora_config = {
    "target_modules": [
        "temporal_cross_attn.q_proj",
        "temporal_cross_attn.v_proj",
        "temporal_self_attn_0.q_proj",
        "temporal_self_attn_0.v_proj",
        "temporal_self_attn_last.q_proj",
        "temporal_self_attn_last.v_proj",
    ],
    "r": 64,
    "lora_alpha": 128,
    "lora_dropout": 0.05,
    "training_steps": 15000,
    "learning_rate": 2e-5,
    "warmup_ratio": 0.05,
}
\`\`\`

Training ran for 38 hours on 8x A100 GPUs. The resulting LoRA adapter adds only 180MB to the model but improved lip-sync accuracy (measured by LSE-D score) from 7.8 to 9.2.

## The Streaming Pipeline: From 45 Seconds to 50ms

The real engineering challenge was not model quality -- it was latency. A standard diffusion model runs 20-50 denoising steps per frame. At 14B parameters, each step takes roughly 90ms on our 4-GPU setup. That is 1.8 seconds per frame -- nowhere near 20 FPS.

We attacked this from three directions:

### 1. Temporal Sliding Window with Cached Denoising

Instead of generating each frame independently, we maintain a sliding window of 8 frames and only fully denoise the newest frame. Previous frames contribute their intermediate latents as conditioning context, and we reuse 70% of the computation from the previous window step.

### 2. Reduced Denoising Steps with Distilled Scheduler

We distilled the original 50-step DDPM scheduler into a 4-step consistency model scheduler. This required a separate distillation training run (about 20 hours on 4x A100s) but reduced per-frame denoising from 50 steps to 4 steps -- a 12.5x speedup.

### 3. Speculative Frame Generation

While the current frame is being finalized, we speculatively begin generating the next frame using predicted audio features from a lightweight lookahead model. If the prediction is accurate (which it is roughly 85% of the time), the next frame is already partially computed when its audio arrives.

\`\`\`python
class StreamingAvatarPipeline:
    def __init__(self, model, scheduler, window_size=8):
        self.model = model
        self.scheduler = scheduler  # 4-step consistency scheduler
        self.window_size = window_size
        self.frame_cache = LatentCache(maxlen=window_size)
        self.speculative_engine = SpeculativeGenerator(lookahead_ms=100)

    async def generate_frame(self, audio_chunk, reference_image_latent):
        # Get cached context from previous frames
        context = self.frame_cache.get_context()

        # Run 4-step denoising with temporal conditioning
        latent = torch.randn_like(reference_image_latent)
        for step in self.scheduler.timesteps:
            latent = self.model.denoise_step(
                latent, step, audio_chunk,
                reference_image_latent, context
            )

        # Decode to pixel space
        frame = self.model.decode(latent)
        self.frame_cache.push(latent)

        # Start speculative generation for next frame
        self.speculative_engine.begin(self.frame_cache)

        return frame
\`\`\`

Combined, these three optimizations brought per-frame latency to approximately 48ms -- just under our 50ms budget for 20 FPS.

## Memory Management: The Silent Killer

The most frustrating bugs were all memory-related. GPU memory fragmentation would cause OOM errors after 10-15 minutes of continuous generation, even though peak usage was well within limits. We solved this with three techniques:

- **Pre-allocated memory pools**: We reserve fixed-size tensors at startup and reuse them across frames, eliminating dynamic allocation entirely during inference.
- **Aggressive cache eviction**: The sliding window cache uses a strict FIFO policy with pre-allocated slots. No dynamic resizing.
- **Periodic defragmentation**: Every 1000 frames (roughly every 50 seconds), we run a lightweight defragmentation pass that consolidates fragmented allocations. This adds a single dropped frame but prevents the gradual memory leak that otherwise crashes the system.

## Deployment and Monitoring

The system runs behind a WebSocket API that accepts audio chunks and returns JPEG-encoded frames. We chose WebSockets over WebRTC for the initial deployment because the one-way video stream (server to client) did not need WebRTC's bidirectional negotiation complexity.

Monitoring tracks four critical metrics: frame latency p99, GPU memory utilization per device, lip-sync accuracy score (computed on a sampled frame every 5 seconds), and thermal throttling events. The H800 GPUs sustain boost clocks reliably at 70-75C, but we have seen thermal throttling cause latency spikes above 80C in our early deployments before we improved the cooling configuration.

## Results and What Comes Next

The production system generates avatars at 20 FPS with a p99 latency of 52ms, serving up to 8 concurrent sessions on a single 5-GPU node. Identity preservation (measured by face embedding cosine similarity) averages 0.94 across 10-minute sessions.

The next challenge is reducing the hardware requirements. We are experimenting with INT4 quantization of the diffusion transformer, which preliminary results suggest could cut the GPU count from 5 to 3 while maintaining acceptable quality. We are also exploring distillation into a smaller 3B parameter model specifically optimized for the talking-head use case. If successful, that could bring the system to a single GPU -- making it accessible for individual creators, not just studio deployments.`,
    },
    {
        _id: "rag-systems-zero-trust-ai",
        _createdAt: "2025-12-02",
        title: "RAG Systems That Don't Hallucinate: Engineering Zero-Trust AI",
        slug: "rag-systems-zero-trust-ai",
        description: "How we engineered the Aya Knowledge Base with grounding scores, provenance tracking, and hallucination detection to build enterprise RAG that clients actually trust.",
        tags: ["RAG", "Enterprise AI", "Security"],
        coverImage: {
            image: "",
            lqip: "",
            alt: "RAG Systems Zero Trust AI",
        },
        featured: true,
        isPublished: true,
        readingTime: "6 min read",
        body: `## The Trust Problem in Enterprise RAG

Every enterprise wants RAG. Very few trust the answers it produces. When we started building the Aya Knowledge Base at AlysAI -- a retrieval-augmented generation system for enterprise clients handling compliance-sensitive documents -- the primary concern from every stakeholder was the same: "How do I know this answer is not hallucinated?"

It is a fair question. Standard RAG implementations retrieve relevant chunks, stuff them into a prompt, and hope the LLM synthesizes a faithful answer. In practice, LLMs confabulate details, merge information from unrelated chunks, and present fabricated content with absolute confidence. For an enterprise dealing with regulatory filings, legal contracts, or medical protocols, a single hallucination can mean compliance violations and real financial damage.

This post describes the zero-trust architecture we built for Aya -- a system where every claim in every answer is verified, scored, and traceable to its source document.

## The Zero-Trust RAG Architecture

The core principle is simple: **treat the LLM as an untrusted component**. The LLM generates candidate answers, but a separate verification pipeline validates every factual claim before the answer reaches the user. The architecture has four stages:

1. **Retrieval** with relevance scoring and chunk provenance
2. **Generation** with inline citation requirements
3. **Verification** with grounding score computation
4. **Filtering** with hallucination threshold enforcement

### Stage 1: Retrieval with Provenance

We use a hybrid retrieval strategy combining dense embeddings (via a fine-tuned BGE-large model) and sparse BM25 scoring, fused with Reciprocal Rank Fusion. But retrieval alone is not enough -- we attach full provenance metadata to every chunk:

\`\`\`python
@dataclass
class RetrievedChunk:
    content: str
    document_id: str
    document_title: str
    page_number: int
    paragraph_index: int
    chunk_hash: str  # SHA-256 of content for integrity verification
    ingestion_timestamp: datetime
    relevance_score: float  # hybrid retrieval score
    source_classification: str  # "primary", "secondary", "derived"
    pii_redacted: bool
    redaction_log: list[str]  # which PII categories were redacted
\`\`\`

Every chunk carries its complete lineage. When the system produces an answer, a user can trace any claim back to a specific paragraph on a specific page of a specific document, ingested at a specific time. This is not just a nice feature -- for several of our clients in regulated industries, it is a compliance requirement.

### Stage 2: Constrained Generation

The generation prompt explicitly instructs the LLM to cite its sources using chunk identifiers. We format the prompt so that each retrieved chunk has a unique tag, and the model must reference these tags inline:

\`\`\`python
GENERATION_PROMPT = """
You are answering questions using ONLY the provided source documents.

RULES:
1. Every factual claim MUST include a citation tag [ChunkID].
2. If the sources do not contain information to answer the question, say "I cannot find this information in the provided documents."
3. Do NOT combine information from different chunks to infer new facts.
4. Do NOT add information beyond what is explicitly stated in the sources.

Sources:
{formatted_chunks}

Question: {user_question}

Answer (with citations):
"""
\`\`\`

This prompt engineering reduces hallucination rate significantly, but does not eliminate it. LLMs still occasionally fabricate citations or misattribute claims. That is why Stage 3 exists.

### Stage 3: Grounding Verification

After the LLM generates an answer, a separate verification pipeline decomposes the answer into individual claims and scores each claim against the cited source chunk. We use a fine-tuned NLI (Natural Language Inference) model for this -- specifically, a DeBERTa-v3-large model fine-tuned on a combination of MNLI, FEVER, and our own domain-specific entailment dataset.

\`\`\`python
class GroundingVerifier:
    def __init__(self, nli_model, threshold=0.7):
        self.nli_model = nli_model
        self.threshold = threshold

    def verify_answer(self, answer: str, chunks: dict[str, RetrievedChunk]):
        claims = self.decompose_claims(answer)
        results = []

        for claim in claims:
            cited_chunk = chunks.get(claim.citation_id)
            if cited_chunk is None:
                results.append(GroundingResult(
                    claim=claim, score=0.0, status="FABRICATED_CITATION"
                ))
                continue

            # NLI: does the chunk entail the claim?
            score = self.nli_model.entailment_score(
                premise=cited_chunk.content,
                hypothesis=claim.text
            )

            status = "GROUNDED" if score >= self.threshold else "UNGROUNDED"
            results.append(GroundingResult(
                claim=claim, score=score, status=status
            ))

        return results
\`\`\`

Each claim receives a grounding score between 0.0 and 1.0. Scores above 0.7 are considered grounded. Scores between 0.3 and 0.7 are flagged for review. Scores below 0.3 trigger automatic removal of the claim from the answer.

### Stage 4: Hallucination Filtering and Response Assembly

The final stage assembles the verified answer. Ungrounded claims are either removed or replaced with a disclaimer. The overall answer receives an aggregate grounding score -- the weighted average of its individual claim scores. If the aggregate score falls below our hallucination threshold of 0.3, the entire answer is rejected and the user receives a message explaining that the system could not produce a sufficiently reliable answer.

\`\`\`python
def assemble_verified_response(claims, grounding_results, threshold=0.3):
    verified_claims = []
    warnings = []

    for claim, result in zip(claims, grounding_results):
        if result.status == "GROUNDED":
            verified_claims.append(claim.text)
        elif result.status == "UNGROUNDED" and result.score >= 0.3:
            verified_claims.append(
                f"{claim.text} [Low confidence - verify against source]"
            )
            warnings.append(f"Claim partially supported: {claim.text[:80]}...")
        else:
            warnings.append(f"Removed unverified claim: {claim.text[:80]}...")

    aggregate_score = mean([r.score for r in grounding_results])

    if aggregate_score < threshold:
        return {
            "answer": None,
            "message": "Unable to produce a sufficiently reliable answer.",
            "grounding_score": aggregate_score,
            "warnings": warnings,
        }

    return {
        "answer": " ".join(verified_claims),
        "grounding_score": aggregate_score,
        "warnings": warnings,
        "provenance": [r.to_dict() for r in grounding_results],
    }
\`\`\`

## PII Redaction as a First-Class Concern

Enterprise documents contain personally identifiable information -- names, addresses, social security numbers, medical record numbers. Our ingestion pipeline runs PII detection before chunking, using a combination of Microsoft Presidio and custom regex patterns for domain-specific identifiers.

Redacted content is replaced with typed placeholders (\`[PERSON_NAME_1]\`, \`[SSN_REDACTED]\`) that preserve semantic structure while removing sensitive data. The redaction log is attached to each chunk's provenance metadata, so compliance teams can audit exactly what was redacted and why.

Critically, PII redaction happens before embeddings are computed. This means the vector store never contains PII in any form -- neither in the stored text nor in the embedding vectors that could theoretically be inverted.

## OWASP LLM Top 10 Compliance

We audited the Aya system against the OWASP Top 10 for LLM Applications:

- **LLM01 (Prompt Injection)**: Input sanitization layer strips known injection patterns. The generation prompt uses XML delimiters that are validated before LLM submission.
- **LLM02 (Insecure Output)**: All LLM outputs are treated as untrusted. HTML is escaped, and outputs are validated against expected schemas before rendering.
- **LLM06 (Sensitive Information Disclosure)**: PII redaction pipeline described above, plus output scanning that catches any PII that bypasses ingestion-time redaction.
- **LLM09 (Overreliance)**: The grounding score system explicitly communicates confidence levels to users, discouraging blind trust in AI outputs.

## Production Results

After three months in production with four enterprise clients, the system processes approximately 15,000 queries per day with the following metrics:

- **Average grounding score**: 0.82
- **Full rejection rate** (aggregate score below 0.3): 3.2% of queries
- **User-reported inaccuracies**: 0.4% of queries (down from 11% with standard RAG)
- **Average response latency**: 2.8 seconds (acceptable for the document analysis use case)

The latency cost of verification is real -- approximately 800ms is spent on claim decomposition and NLI scoring. But every client we have spoken to accepts this trade-off. In their words: "A slower correct answer is infinitely more valuable than a fast wrong one."

## Lessons Learned

**The NLI model is the linchpin.** Off-the-shelf NLI models work reasonably well, but fine-tuning on domain-specific entailment pairs improved grounding accuracy by 15 percentage points. Invest in building a high-quality entailment dataset for your domain.

**Chunk boundaries matter more than you think.** A claim that spans two chunks will fail grounding verification even if both chunks support it. We implemented a chunk merging strategy for adjacent chunks from the same document section, which reduced false-negative grounding failures by 22%.

**Users trust the system more when they can see the scores.** Exposing grounding scores and provenance links in the UI, rather than hiding them, dramatically increased user adoption. Transparency builds trust faster than accuracy alone.`,
    },
    {
        _id: "sarathi-voice-agent-31-million",
        _createdAt: "2026-01-05",
        title: "Voice AI for 31 Million Citizens: Building Sarathi",
        slug: "sarathi-voice-agent-31-million",
        description: "How we built the Sarathi Voice Agent to deliver government services in Assamese and Bodo using faster-whisper ASR, Bhashini TTS, and sub-second latency optimization for kiosk deployment.",
        tags: ["Voice AI", "NLP", "Social Impact"],
        coverImage: {
            image: "",
            lqip: "",
            alt: "Sarathi Voice Agent",
        },
        featured: true,
        isPublished: true,
        readingTime: "6 min read",
        body: `## The Problem: Government Services That No One Can Access

Assam has 31 million citizens. The majority speak Assamese; significant populations speak Bodo, Bengali, and other languages. Government services -- land records, welfare scheme enrollment, grievance filing -- are increasingly digitized, but the interfaces are in English or Hindi, behind forms that assume literacy and internet familiarity. The result is a digital divide where the people who need government services most are the least able to access them.

Sarathi was born from a simple idea: what if citizens could access any government service by simply speaking in their own language? At Sarathi Studio, we built a voice-first AI agent that understands Assamese and Bodo, navigates government service workflows, and responds with natural speech -- all running on kiosk hardware deployed in rural service centers.

This post covers the technical architecture, the unique challenges of low-resource language AI, and how we achieved sub-second response latency on modest hardware.

## Architecture Overview

The Sarathi pipeline has four stages:

1. **ASR (Automatic Speech Recognition)**: Convert citizen speech to text
2. **Intent Understanding**: Determine which government service the citizen needs and extract relevant parameters
3. **Service Orchestration**: Interact with government APIs to fulfill the request
4. **TTS (Text-to-Speech)**: Convert the response to natural speech in the citizen's language

Each stage presented unique challenges for low-resource languages.

## ASR: faster-whisper with Language-Specific Tuning

We evaluated several ASR options for Assamese. Google Speech-to-Text supports Assamese but with a word error rate (WER) around 35% in our testing -- unusable for a transactional system. Commercial alternatives performed even worse. OpenAI's Whisper large-v3, however, achieved 18% WER out of the box on our test set.

We deployed Whisper using the \`faster-whisper\` library, which uses CTranslate2 for optimized inference. This gave us 4x faster decoding compared to the original Whisper implementation, which was critical for our latency budget.

\`\`\`python
from faster_whisper import WhisperModel

class SarathiASR:
    def __init__(self):
        self.model = WhisperModel(
            "large-v3",
            device="cuda",
            compute_type="float16",
            num_workers=2,
        )
        # Language-specific VAD parameters
        self.vad_parameters = {
            "threshold": 0.4,
            "min_speech_duration_ms": 250,
            "max_speech_duration_s": 30,
            "min_silence_duration_ms": 600,  # Assamese has longer pauses
            "speech_pad_ms": 200,
        }

    def transcribe(self, audio_path: str, language: str = "as"):
        segments, info = self.model.transcribe(
            audio_path,
            language=language,
            beam_size=5,
            best_of=5,
            vad_filter=True,
            vad_parameters=self.vad_parameters,
        )
        return {
            "text": " ".join([s.text for s in segments]),
            "language": info.language,
            "language_probability": info.language_probability,
            "duration": info.duration,
        }
\`\`\`

To reduce WER further, we fine-tuned Whisper on 800 hours of Assamese speech data collected from All India Radio archives, local news broadcasts, and volunteer recordings. We also collected 200 hours of Bodo speech, making Sarathi one of the few AI systems with dedicated Bodo language support. Post-fine-tuning WER dropped to 12% for Assamese and 16% for Bodo.

### The Voice Activity Detection Challenge

Assamese conversational speech has different prosodic patterns than English. Speakers use longer pauses between phrases, and the pitch contours that signal sentence boundaries are different. The default VAD parameters in faster-whisper, tuned for English, would frequently cut off speakers mid-sentence or merge separate utterances.

We spent two weeks tuning VAD parameters on a 50-hour validation set of conversational Assamese recorded in actual government service center environments -- with background noise, multiple speakers, and the acoustic characteristics of the kiosk hardware.

## Intent Understanding: Structured Extraction over Classification

Rather than treating intent understanding as a classification problem (which would require training data for every possible intent), we use an LLM-based structured extraction approach. The citizen's transcribed speech is processed by a prompted Claude Haiku model that extracts a structured intent object:

\`\`\`python
INTENT_PROMPT = """
You are a government service assistant for Assam, India.

Given the citizen's request (translated to English), extract:
1. service_category: one of [land_records, welfare_schemes, grievance,
   certificate, pension, ration_card, utility, general_inquiry]
2. action: what the citizen wants to do (check_status, apply, download, update, inquire)
3. parameters: relevant details (name, ID numbers, dates, locations)
4. confidence: your confidence in the extraction (0.0-1.0)

If the request is ambiguous, set confidence below 0.6 and include
clarifying_question in the response.

Citizen request: {transcribed_text}
Translated request: {translated_text}

Respond in JSON format.
"""
\`\`\`

When confidence is below 0.6, the system generates a clarifying question in the citizen's language rather than guessing. This is crucial -- an incorrect government form submission can waste weeks of a citizen's time.

## Bhashini TTS: Making the System Speak

For text-to-speech, we integrate with India's Bhashini platform, which provides neural TTS voices for Indian languages including Assamese and Bodo. Bhashini's TTS is built on a modified VITS architecture trained on studio-quality recordings by native speakers.

The integration was straightforward, but latency was a concern. Bhashini's API adds 400-800ms of network latency depending on text length. For our kiosk deployment, we implemented two optimizations:

### Chunked Streaming TTS

We split the response text at sentence boundaries and begin TTS synthesis for the first sentence while the LLM is still generating subsequent sentences. This hides the TTS latency behind the generation latency.

### Local TTS Cache

Government services involve repetitive phrases ("Your application has been submitted", "Please provide your Aadhaar number", "The current status of your request is..."). We pre-synthesize the 500 most common response fragments and cache the audio locally on the kiosk. Cache hit rate in production averages 35%, which eliminates TTS latency entirely for those fragments.

\`\`\`yaml
# Kiosk TTS configuration
tts:
  provider: bhashini
  fallback: local_cache
  cache:
    max_entries: 500
    preload_common_phrases: true
    audio_format: opus
    sample_rate: 22050
  streaming:
    enabled: true
    chunk_by: sentence
    min_chunk_length: 10  # characters
  languages:
    - code: as
      voice: assamese_female_01
    - code: brx
      voice: bodo_female_01
\`\`\`

## Latency Optimization: The 2-Second Budget

Citizens expect conversational responsiveness. Our target was end-to-end latency under 2 seconds from when the citizen stops speaking to when the system begins responding audibly. Here is how the budget breaks down:

- **VAD end-of-speech detection**: 200ms (the silence threshold)
- **ASR transcription**: 400ms (for typical 5-10 second utterances)
- **Translation** (Assamese to English for the LLM): 150ms
- **Intent extraction** (Claude Haiku): 350ms
- **Service API call**: 300ms (cached responses for common queries)
- **Response translation** (English to Assamese): 150ms
- **TTS first chunk**: 200ms (from cache) or 500ms (from Bhashini API)

Total: **1.75 seconds** (cache hit) or **2.05 seconds** (cache miss). We hit our budget for the majority of interactions.

The key architectural insight was parallelizing where possible. Translation and intent extraction can begin before ASR is fully complete -- we stream partial transcriptions and begin translation on the first complete sentence while ASR continues on the remainder.

## Kiosk Deployment Challenges

Deploying AI in rural service centers introduced constraints that cloud-first architectures never consider:

**Intermittent connectivity.** Internet connectivity in rural Assam is unreliable. The kiosk maintains a local fallback mode with a smaller Whisper model (medium) and a cached subset of common service interactions. The fallback mode handles approximately 60% of queries without internet access.

**Power fluctuations.** We experienced corrupted model files from sudden power loss. The kiosk now stores models on a read-only partition with checksums verified at boot.

**Acoustic environment.** Service centers are noisy. We added a directional microphone array with beamforming to the kiosk hardware, which improved ASR accuracy in noisy environments by 8 WER points compared to a standard microphone.

**User patience.** Citizens unfamiliar with voice AI need explicit audio cues: a tone when the system is listening, a different tone when it is processing, spoken confirmation of what it understood before taking action. These UX details matter more than any model improvement.

## Impact and Metrics

Sarathi has been deployed in 12 service centers across 4 districts in Assam. In the first three months:

- **4,200+ citizen interactions** processed
- **78% task completion rate** (citizen successfully completed their intended service action)
- **Average interaction time**: 3.2 minutes (compared to 25+ minutes with human-assisted form filling)
- **Languages used**: 71% Assamese, 18% Bodo, 11% Hindi

The most requested services are ration card status checks (31%), land record queries (24%), and welfare scheme eligibility inquiries (19%).

## What Comes Next

We are working on three fronts: expanding language support to Mising and Karbi (two more indigenous languages of Assam), adding proactive outreach capabilities (the system calls citizens to notify them about scheme eligibility), and building an open-source toolkit so other states can deploy similar systems. The technology works. The challenge now is scaling the deployment and training local teams to maintain the kiosks.`,
    },
    {
        _id: "mcp-protocol-ai-agents",
        _createdAt: "2026-02-01",
        title: "The MCP Protocol Will Change How AI Agents Work Together",
        slug: "mcp-protocol-ai-agents",
        description: "What the Model Context Protocol is, why it matters for multi-agent systems, and what I learned building MCP-compatible tools at the Lost & Found hackathon.",
        tags: ["MCP", "AI Agents", "Open Source"],
        coverImage: {
            image: "",
            lqip: "",
            alt: "MCP Protocol AI Agents",
        },
        featured: false,
        isPublished: true,
        readingTime: "5 min read",
        body: `## The Interoperability Problem No One Talks About

AI agents are proliferating. Every SaaS product is adding an "AI agent" that can take actions on behalf of users. But here is the problem no one is solving well: these agents cannot talk to each other. Your coding agent cannot ask your research agent for context. Your calendar agent cannot check with your project management agent before scheduling. Each agent is a silo, and the integration burden falls on the user or the developer writing brittle glue code.

The Model Context Protocol (MCP), introduced by Anthropic, is the first serious attempt at solving this. After spending a weekend building MCP-compatible tools at the Lost & Found hackathon, I am convinced this protocol will fundamentally change how we build and compose AI systems.

## What Is MCP?

MCP is an open protocol that standardizes how AI models interact with external tools, data sources, and services. Think of it as a USB-C for AI -- a universal interface that any model can use to connect to any tool, without custom integration code for each combination.

The protocol defines three primitives:

### 1. Tools

Tools are functions that the AI can invoke. MCP standardizes how tools declare their capabilities, input schemas, and output formats. A tool server exposes a set of tools via a well-defined JSON-RPC interface:

\`\`\`python
from mcp.server import MCPServer
from mcp.types import Tool, TextContent

server = MCPServer("sarathi-tools")

@server.tool()
async def search_government_schemes(
    state: str,
    category: str,
    income_bracket: str | None = None,
) -> list[TextContent]:
    """Search for government welfare schemes available in a given state.

    Args:
        state: Indian state name (e.g., "Assam", "Kerala")
        category: Scheme category (e.g., "housing", "education", "agriculture")
        income_bracket: Optional income bracket filter
    """
    schemes = await scheme_database.search(
        state=state, category=category, income_bracket=income_bracket
    )
    return [TextContent(
        type="text",
        text=format_schemes(schemes)
    )]
\`\`\`

Any MCP-compatible model -- Claude, GPT, Gemini, or a local model -- can discover and invoke this tool without any model-specific integration code. The tool server does not need to know which model is calling it.

### 2. Resources

Resources are data that the AI can read. Unlike tools (which perform actions), resources provide context. An MCP server can expose files, database records, API responses, or any other data as resources:

\`\`\`python
@server.resource("scheme://{scheme_id}")
async def get_scheme_details(scheme_id: str) -> Resource:
    """Get detailed information about a specific government scheme."""
    scheme = await scheme_database.get(scheme_id)
    return Resource(
        uri=f"scheme://{scheme_id}",
        name=scheme.name,
        description=scheme.summary,
        mime_type="application/json",
        text=json.dumps(scheme.to_dict()),
    )
\`\`\`

### 3. Prompts

Prompts are reusable templates that guide the AI's behavior for specific tasks. They are optional but powerful for standardizing how agents interact with domain-specific tools.

## Why This Matters for Multi-Agent Systems

The real power of MCP emerges when you have multiple agents that need to collaborate. Consider a scenario from the hackathon project we built -- a lost-and-found system where multiple agents coordinate:

- **Intake Agent**: Processes reports of lost items (via text, voice, or image)
- **Matching Agent**: Compares lost item reports against found item reports
- **Notification Agent**: Contacts users when potential matches are found
- **Verification Agent**: Helps users confirm matches through follow-up questions

Without MCP, you would need to write custom integration code for each agent-to-agent interaction. With MCP, each agent exposes its capabilities as tools that other agents can discover and invoke:

\`\`\`yaml
# MCP server configuration for the Lost & Found system
servers:
  intake:
    command: python
    args: ["-m", "lost_found.intake_server"]
    tools:
      - report_lost_item
      - report_found_item
      - get_report_status

  matching:
    command: python
    args: ["-m", "lost_found.matching_server"]
    tools:
      - find_matches
      - get_match_confidence
      - update_match_status

  notification:
    command: python
    args: ["-m", "lost_found.notification_server"]
    tools:
      - send_match_notification
      - get_notification_history
      - update_contact_preferences
\`\`\`

The matching agent can call the intake agent's \`get_report_status\` tool to check if a report is still active before processing. The notification agent can call the matching agent's \`get_match_confidence\` to decide whether to send an immediate notification or queue it for human review. All through standardized MCP tool calls, with no custom glue code.

## What I Built at the Hackathon

At the Lost & Found hackathon, our team built a complete MCP-based lost-and-found system in 36 hours. The key architectural decisions:

**Each agent is an independent MCP server.** This means any agent can be replaced, upgraded, or scaled independently. We swapped the matching algorithm three times during the hackathon without touching any other component.

**Agent communication happens through MCP tool calls, not direct API calls.** The orchestrating agent (Claude, in our case) decides which tools to call and in what order. This means the coordination logic is in the model's reasoning, not hardcoded in our application code.

**We used MCP resources for shared state.** Instead of a shared database that all agents query directly, each agent exposes relevant state as MCP resources. The matching agent exposes \`match://pending\` as a resource that other agents can read to see the current queue of unresolved matches.

The most interesting outcome was that we could swap Claude for a local Llama model mid-demo and the entire system continued to work because the tool interfaces were model-agnostic.

## Building MCP-Compatible Tools: Practical Advice

After building several MCP servers, here is what I have learned:

**Keep tools atomic.** A tool should do one thing. \`search_items\` and \`create_report\` are good. \`search_and_create_if_not_found\` is bad. Let the model compose atomic tools into complex workflows.

**Invest in tool descriptions.** The model uses tool descriptions to decide when and how to use each tool. A vague description leads to incorrect tool selection. Include examples of when to use the tool and when NOT to use it.

**Return structured data, not prose.** Models work better with structured JSON responses that they can reason about, rather than pre-formatted text that limits how they can use the information.

**Handle errors gracefully.** Return error information in a structured format that the model can interpret and recover from, rather than throwing exceptions that crash the agent loop.

\`\`\`python
@server.tool()
async def search_items(query: str, category: str | None = None):
    """Search for lost or found item reports matching a description.

    Use this tool when:
    - A user wants to check if their lost item has been found
    - A user has found an item and wants to check for matching lost reports

    Do NOT use this tool for:
    - Creating new reports (use report_lost_item or report_found_item)
    - Checking the status of an existing report (use get_report_status)
    """
    try:
        results = await item_index.search(query, category=category, limit=10)
        return [TextContent(type="text", text=json.dumps({
            "matches": [r.to_dict() for r in results],
            "total_count": len(results),
            "query": query,
        }))]
    except SearchError as e:
        return [TextContent(type="text", text=json.dumps({
            "error": str(e),
            "error_type": "search_failed",
            "suggestion": "Try a broader search query or different category",
        }))]
\`\`\`

## The Bigger Picture

MCP is still early. The ecosystem of MCP servers is growing but remains small compared to traditional API integrations. The protocol itself is evolving -- authentication, authorization, and streaming are areas where the spec is still maturing.

But the direction is clear. Just as REST APIs standardized how web services communicate, MCP will standardize how AI agents interact with tools and with each other. The composability this enables is transformative. Instead of building monolithic AI applications, we can build ecosystems of specialized agents that discover and use each other's capabilities dynamically.

At Sarathi Studio, we are already building all new tool integrations as MCP servers. When a client needs a new capability, we build an MCP server for it once, and every agent in their system can use it immediately. The days of writing custom integration code for every model-tool combination are numbered.`,
    },
    {
        _id: "web3-to-ai-founders-journey",
        _createdAt: "2025-09-12",
        title: "Why I Left Web3 to Build AI: A Founder's Journey",
        slug: "web3-to-ai-founders-journey",
        description: "A personal reflection on transitioning from building Web3 products at MagicSquare and LunarCrush with 190k+ users to AI engineering and founding Sarathi Studio.",
        tags: ["Career", "AI", "Startups"],
        coverImage: {
            image: "",
            lqip: "",
            alt: "Web3 to AI Journey",
        },
        featured: false,
        isPublished: true,
        readingTime: "5 min read",
        body: `## The Moment I Knew

It was November 2023. I was deep in the Web3 world -- building full-stack applications at MagicSquare, a Web3 app store that had onboarded over 190,000 users. The product was live, growing, and technically sophisticated. We had built token-gated experiences, decentralized identity flows, and on-chain analytics dashboards. I should have been thrilled.

Instead, I found myself spending every evening reading papers about transformer architectures and watching Andrej Karpathy's neural network lectures. Not because my job required it, but because I could not stop thinking about what this technology would mean for the world. The Web3 products I was building solved real problems for a niche audience. The AI systems I was reading about had the potential to change how billions of people accessed information, education, and services.

That tension between what I was building and what I wanted to build became unbearable. So I made the leap.

## The Web3 Years: What I Built and What I Learned

My Web3 journey was not a detour -- it was a masterclass in building products under extreme constraints. At MagicSquare, I was a full-stack engineer responsible for both the consumer-facing app store and the backend infrastructure. At LunarCrush, I worked on social analytics for crypto assets, processing millions of social media signals in real time to generate sentiment scores.

The technical challenges were genuinely interesting. Blockchain applications demand a level of correctness that most web applications can skip. When your code handles financial transactions on an immutable ledger, there is no "we'll fix it in the next deploy." I learned to write exhaustive tests, to think adversarially about edge cases, and to design systems where failure modes were explicit and recoverable.

\`\`\`python
# A pattern from my Web3 days that I still use in AI systems:
# Explicit state machines with auditable transitions
class TransactionState:
    PENDING = "pending"
    VALIDATING = "validating"
    EXECUTING = "executing"
    CONFIRMED = "confirmed"
    FAILED = "failed"
    ROLLED_BACK = "rolled_back"

    VALID_TRANSITIONS = {
        PENDING: [VALIDATING, FAILED],
        VALIDATING: [EXECUTING, FAILED],
        EXECUTING: [CONFIRMED, FAILED],
        FAILED: [ROLLED_BACK],
    }

    @classmethod
    def validate_transition(cls, current: str, target: str) -> bool:
        allowed = cls.VALID_TRANSITIONS.get(current, [])
        if target not in allowed:
            raise InvalidTransitionError(
                f"Cannot transition from {current} to {target}. "
                f"Allowed: {allowed}"
            )
        return True
\`\`\`

This pattern -- explicit state machines with validated transitions -- has been invaluable in building AI agent systems where you need to track and audit every step of a complex workflow.

## The Decision to Leave

Three observations pushed me toward AI:

**The impact ceiling.** Web3 products, at least in 2023, served a relatively small audience. The total addressable market of crypto-native users willing to engage with decentralized applications was in the low millions globally. AI, meanwhile, was poised to transform how every person interacted with technology. I wanted to work on problems with a larger blast radius.

**The builder's dilemma.** In Web3, a significant portion of engineering effort goes toward the infrastructure layer -- wallets, gas optimization, cross-chain bridges -- rather than user-facing value. I spent more time working around blockchain limitations than building features users loved. In AI, the infrastructure was maturing rapidly (thanks to OpenAI, Anthropic, and the open-source community), which meant I could focus on the application layer.

**The personal calling.** I grew up in Nepal. I watched my family navigate government bureaucracies that were inaccessible, confusing, and exclusively in languages that excluded large portions of the population. When I saw what voice AI and multilingual NLP could do, I did not see a technical curiosity -- I saw a solution to a problem I had lived with my entire life.

## The Transition: Harder Than Expected

Leaving Web3 was not as simple as updating my LinkedIn title. The AI engineering landscape in late 2023 was simultaneously exciting and chaotic. Everyone was building "AI-powered" products, but few had production-grade engineering practices. The gap between a ChatGPT wrapper and a reliable AI system was enormous, and I needed to bridge it quickly.

I joined Fundora, a personalized investment advisory platform, as an AI engineer. This was deliberate -- it let me apply my fintech knowledge from Web3 while learning the AI stack in a production context. At Fundora, I built my first reinforcement learning system, my first RAG pipeline, and my first model evaluation framework. The learning curve was steep, but my Web3 background in building robust, auditable systems gave me an unexpected advantage.

Most AI engineers at the time came from research backgrounds and treated production concerns as afterthoughts. I came from a production engineering background and treated model performance as the concern. The combination turned out to be exactly what AI products needed: someone who cared equally about model accuracy and system reliability.

## Founding Sarathi Studio

The work at Fundora taught me the craft of AI engineering. But the spark that became Sarathi Studio came from a conversation with a government official in Assam during a visit home. He described the challenge of delivering digital services to citizens who spoke Assamese, Bodo, or other indigenous languages. "We have the services," he said. "We don't have the interface."

That conversation crystallized everything. I had the technical skills to build multilingual voice AI. I had the product sensibility from years of building user-facing applications. And I had a deeply personal motivation. Sarathi Studio was founded to build AI systems that serve populations traditionally excluded from the digital revolution.

The name Sarathi comes from Sanskrit -- it means "charioteer" or "guide." In the Mahabharata, Lord Krishna served as Arjuna's sarathi. Our AI serves as a guide for citizens navigating complex systems.

## Joining AlysAI: The Enterprise Dimension

While building Sarathi Studio, I joined AlysAI as an AI Engineer. AlysAI works on enterprise AI -- vision-aware agents, real estate automation, compliance systems. This dual role (startup founder and enterprise engineer) has been the most productive arrangement of my career.

At AlysAI, I learn how enterprise clients think about AI: reliability, auditability, cost predictability, and integration with existing systems. These lessons flow directly into how I build Sarathi's products. At Sarathi Studio, I push the boundaries of what is possible with low-resource languages and constrained deployment environments. Those innovations flow back into my AlysAI work as novel approaches to difficult problems.

## Lessons for Others Considering the Leap

**Your previous domain is an asset, not baggage.** Every industry I have worked in -- Web3, fintech, government tech -- has informed how I build AI systems. Domain expertise combined with AI skills is far more valuable than AI skills alone.

**Start building before you feel ready.** I did not wait until I had "mastered" AI to start building. My first RAG system was embarrassingly naive. My first model evaluation pipeline had bugs. But each project taught me things no course or paper could.

**Choose problems you care about personally.** The transition from Web3 to AI was hard. What made it sustainable was not the career opportunity -- it was the conviction that voice AI could genuinely improve people's lives. That conviction carries you through the late nights, the failed experiments, and the moments when you question whether you made the right choice.

\`\`\`python
# My career transition as code (tongue in cheek)
career = Pipeline([
    Stage("web3", skills=["full_stack", "blockchain", "fintech"]),
    Stage("transition", skills=["ml_fundamentals", "nlp", "rl"]),
    Stage("ai_engineering", skills=["rag", "voice_ai", "mlops"]),
    Stage("founder", skills=["product", "team", "vision"]),
])

# The key insight: it is not a linear path, it is a DAG
# Each stage feeds into all subsequent stages
for stage in career.stages:
    stage.connect_to(career.future_stages(stage))
\`\`\`

## Where I Am Now

Today, I split my time between AlysAI (building enterprise AI agents) and Sarathi Studio (building voice AI for underserved populations). The contrast keeps me sharp. Enterprise work teaches me rigor. Social impact work teaches me empathy. Together, they make me a better engineer than either alone.

If you are considering a similar transition -- from Web3, from traditional software engineering, from any other field into AI -- my advice is simple. The world does not need more AI researchers publishing papers. It needs more engineers who can build AI systems that work reliably for real people, solving real problems. If that describes you, the AI field needs you. Make the leap.`,
    },
];

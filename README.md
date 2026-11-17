# Harsh Bhardwaj — Staff SWE Portfolio

> **Staff Distributed Systems & AI Infrastructure Engineer**  
> Architecting ultra-low latency distributed engines, eBPF telemetry, Multi-Raft consensus, and high-throughput AI serving infrastructure at multi-million QPS scale.

---

## ⚡ Quick Start & Local Preview

You can run this portfolio locally with zero build steps or package installations:

### Option A: Using the Included Python Server
```bash
python3 serve.py
```
Then open your browser at **[http://localhost:8000](http://localhost:8000)**.

### Option B: Direct Browser Opening
Simply double-click [`index.html`](file:///Users/apple/SnAI/index.html) or open it with your favorite browser:
```bash
open index.html
```

---

## 🚀 Key Features & Highlights

### 1. 🛠️ Interactive Systems Architecture Blueprint
- **Live 5-Tier Ingestion Engine**:
  1. Global Ingress (eBPF XDP + Envoy)
  2. Zero-Copy Event Broker (Rust Tokio + io_uring)
  3. Multi-Raft Distributed Consensus Tier (512 sharded groups)
  4. Real-Time Stream Aggregation (Flink + RocksDB StateBackend)
  5. Tiered Storage (RocksDB LSM + ScyllaDB + S3 Parquet)
- **Component Inspector**: Click any node to inspect architectural trade-offs, protocols, verified metrics, and production Rust/Go/eBPF code snippets.
- **Traffic Surge Simulation**: Interactive simulation testing a 4.2M QPS surge through the pipeline.

### 2. 💻 Full-Featured Unix CLI Terminal Emulator
- Press **`~`** (tilde / backtick) or **`⌘K` / `Ctrl+K`** anywhere to summon the floating terminal.
- Commands supported:
  - `help` — Lists all commands
  - `whoami` — Professional engineering ethos & bio
  - `skills` — Categorized proficiency bars
  - `projects` — Lists all flagship distributed systems
  - `project <id>` — Deep inspection of a specific engine (e.g. `project aetherstream`)
  - `arch` — Renders ASCII distributed system topology
  - `metrics` — Production KPIs and tail latency stats
  - `experience` — Career timeline and Staff SWE achievements
  - `resume` — Terminal-formatted resume
  - `contact` — Contact channels, email & PGP key fingerprint
  - `curl harsh.dev/status` — Simulated HTTP/2 response with cluster telemetry
  - `sudo hire` — Recruiter easter egg with privileged access grant
  - `matrix` — Full-screen digital green rain animation
  - `theme` — Toggles between Dark and Light mode
  - `clear` — Clears shell screen

### 3. 📦 Flagship Distributed Systems Projects
- **AetherStream** (Rust, Tokio, io_uring, Arrow, Raft) — Ultra-high-throughput zero-copy stream broker (1.45M msg/sec/node, 4.8k ★).
- **KubePulse** (Go, C, eBPF, Cilium, ClickHouse) — Non-intrusive kernel-level telemetry agent eliminating 450+ sidecars (3.2k ★).
- **NexusKV** (Go, Multi-Raft, RocksDB, Redis Protocol) — Linearizable transactional distributed key-value store, Jepsen verified (2.6k ★).
- **SynapseLLM** (Python, CUDA, vLLM, Triton) — Speculative decoding & distributed KV-cache gateway (-45% TTFT, 1.9k ★).
- **ChronosCache** (Rust, AVX-512, Lock-free Atomics) — W-TinyLFU memory cache with 42ns access latency (1.4k ★).
- **TitanRPC** (C++20, DPDK, FlatBuffers) — Sub-millisecond kernel-bypass binary RPC framework (980 ★).

### 4. 📊 Empirical Benchmark Visualizer
- Interactive latency and memory footprint comparisons between legacy stacks and Harsh's optimized architectures.

### 5. 📄 ATS-Optimized Printable SWE Resume
- Click the **"Resume"** button in the header or footer to view the formatted resume.
- Features a built-in **"Print / Save as PDF"** button with dedicated `@media print` CSS for clean printing.

### 6. 🌓 Obsidian Dark / Minimalist Light Theme
- Defaults to a sleek "Obsidian & Cyan" cybernetic engineering palette.
- Switches seamlessly to a crisp, high-contrast light theme with `localStorage` state retention.

---

## 📁 File Structure

```text
SnAI/
├── index.html           # Main semantic HTML5 portfolio document
├── styles.css           # Custom CSS: Glassmorphism, animations, print stylesheet
├── projects.data.js     # Structured dataset for projects, skills, career & architecture
├── architecture.js      # Interactive architecture blueprint & simulation controller
├── terminal.js          # Interactive Unix CLI shell emulator & Easter eggs
├── app.js               # Application logic: filters, modals, counters, theme toggle
├── serve.py             # Lightweight local HTTP server
└── README.md            # Documentation and deployment instructions
```

---

## 🌐 Instant 1-Click Deployment

This project requires **zero build tooling** (no Webpack, Vite, or npm required). It can be deployed anywhere instantly:

### GitHub Pages
1. Push this repository to GitHub: `git push origin main`
2. Go to **Repository Settings > Pages**
3. Select `main` branch as the Source and `/ (root)` folder.
4. Your portfolio is live in seconds at `https://<your-username>.github.io/<repo-name>`!

### Vercel / Netlify / Cloudflare Pages
- Connect the Git repository and click **Deploy** with standard static site defaults (Build command: empty, Output directory: `.`).

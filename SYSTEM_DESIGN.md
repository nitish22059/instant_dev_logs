# 🧠 System Design: Instant Dev Logs
## 🔁 High-Level Flow

```
[ Applications ] 
      ⬇
[ Log Collector API (Node.js) ]
      ⬇
[ Message Queue (Redis Streams / Kafka) ]
      ⬇
[ Log Processor (Python) ]
      ⬇
[ Log Database (PostgreSQL / TimescaleDB) ]
      ⬇
[ Query Service API (FastAPI) ]
      ⬇
[ Optional: Dashboard UI (React) ]
```

# 🔍 Detailed Flow


| Step | Component                | Description                                                                  |
| ---- | ------------------------ | ---------------------------------------------------------------------------- |
| 1️⃣  | **Apps / Services**      | Any app or service (e.g. sample web app) sends logs via HTTP.                |
| 2️⃣  | **Collector API**        | Receives logs → pushes them to queue. Handles schema validation and retries. |
| 3️⃣  | **Queue** (Redis/Kafka)  | Buffers incoming logs → allows decoupling between collection and processing. |
| 4️⃣  | **Processor**            | Consumes logs in batches → transforms/validates → stores them in DB.         |
| 5️⃣  | **Database**             | Stores logs with indexes by time, app name, log level, etc.                  |
| 6️⃣  | **Query Service**        | Allows clients to query logs using filters: time range, level, app, etc.     |
| 7️⃣  | **Dashboard (optional)** | UI to explore logs, tail them live, show analytics/graphs.                   |




# 🧱 Microservices & Tech Stack
| Component        | Language     | Role                     | Tools                  |
| ---------------- | ------------ | ------------------------ | ---------------------- |
| `collector/`     | Node.js      | Accept logs              | Express, Redis/Kafka   |
| `processor/`     | Python       | Batch & store logs       | Redis client, psycopg2 |
| `query-service/` | Python       | Filter + return logs     | FastAPI, SQLAlchemy    |
| `db/`            | -            | Time-indexed log storage | PostgreSQL, Timescale  |
| `sample-app/`    | Node.js      | Generates fake logs      | Axios, Faker.js        |
| `dashboard/`     | React (opt.) | View logs in browser     | Chart.js, WebSocket    |



# ⚙️ Optional Future Additions
- 🔐 Auth (RBAC / API Keys)

- 📊 Grafana dashboard integration

- 📦 Docker Compose orchestration

- 🔁 Backpressure handling

- 🧪 Log replay/testing tools
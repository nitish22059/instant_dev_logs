# 📦 Instant Dev Logs – A Distributed Logging System

## 📝 Overview
**Instant Dev Logs** is a self-hosted, distributed logging platform designed to simulate the functionality of tools like Datadog Logs or ElasticSearch. It focuses on building a scalable pipeline to ingest, store, and query application logs.

---

## 🔧 Tech Stack

| Component         | Tech Used                |
|------------------|--------------------------|
| Log Collector     | Node.js / Go             |
| Message Queue     | Redis Streams / Kafka    |
| Batch Processor   | Python / Go              |
| Storage           | PostgreSQL / TimescaleDB / ClickHouse |
| Query API         | FastAPI / Express        |
| Dashboard (Optional) | React + WebSocket + Chart.js |
| Deployment        | Local Docker (no cloud)  |

---

## 📐 Architecture

![Architecture Diagram](instant_dev_logs_architecture.png)

---

## 🔍 Key Features

- **Log Ingestion**: Collector API accepts structured logs via HTTP.
- **Streaming**: Redis Streams or Kafka to enable durable, async log transport.
- **Processing**: Batch processor service with retry + dead-letter queue.
- **Storage**: Time-series database optimized for timestamped logs.
- **Querying**: Query API for filtered log retrieval.
- **Dashboard (Optional)**: Real-time tailing, filtering, and analytics UI.

---

## 🧪 Testing

To test locally:
- Use the included sample web app to generate logs.
- Monitor log ingestion via the processor and verify DB writes.
- Query logs via the API and visualize on the dashboard.

---

## 📦 Production Improvements

1. **Scalability**: Use Kafka, scale processors, and sharded DB writes.
2. **Durability**: Add retry, DLQ, replication, WAL.
3. **Observability**: Expose metrics, Prometheus + Grafana.
4. **Security**: API keys, mTLS, encryption at rest.
5. **Developer Experience**: Schema validation, streaming tail logs.

---

## 🧠 Interview Summary Line

> "I built a distributed log ingestion pipeline from scratch using queues, batch processing, and time-series storage — a simplified version of how real observability tools like Datadog Logs work."

---

## 📁 Files

- `collector/` – Log ingestion API
- `processor/` – Batch processing logic
- `db/` – DB schema and queries
- `sample-app/` – Generates logs for testing
- `dashboard/` – Optional frontend

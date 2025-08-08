# Distributed Log Processing Architecture

## Overview

This document outlines the distributed architecture for a real-time log processing system that collects, processes, and visualizes logs from multiple web applications.

## Architecture Components

### 1. Log Sources
- **Web App 1, 2, 3**: Multiple web applications that generate logs
- These applications send their logs to the collector API for centralized processing

### 2. Log Collection Layer

#### Collector API
- **Technology**: Node.js or Go service
- **Authentication**: mTLS or API Key based authentication
- **Scalability**: Multiple collectors can be deployed for high availability
- **Protocol**: HTTP-based log ingestion

### 3. Message Queue

#### Kafka Queue
- **Purpose**: Asynchronous, durable message queue for log streams
- **Topic**: Dedicated log topic/stream
- **Benefits**: 
  - Decouples log collection from processing
  - Ensures durability and fault tolerance
  - Enables horizontal scaling

### 4. Processing Layer

#### Log Processors
- **Scalability**: Horizontally scalable processors (Processor 1, Processor 2, etc.)
- **Features**:
  - Batch processing capabilities
  - Retry mechanisms for failed operations
  - Parallel processing for high throughput

### 5. Data Storage

#### Database Options
- **TimescaleDB**: Time-series database optimized for time-based data
- **ClickHouse**: Column-oriented database for analytical workloads
- **Purpose**: Long-term storage and efficient querying of processed logs

### 6. API Layer

#### Query API
- **Purpose**: Provides programmatic access to stored log data
- **Features**: RESTful API for data retrieval and analysis

### 7. Presentation Layer

#### Frontend Dashboard
- **Technology**: React application
- **Real-time Updates**: WebSocket connections for live data streaming
- **Features**: 
  - Interactive log visualization
  - Real-time monitoring capabilities
  - Custom dashboards and alerts

## Data Flow

```
┌──────────────┐
│  Web App 1   │
└──────┬───────┘
       │
┌──────▼───────┐
│  Web App 2   │
└──────┬───────┘
       │
┌──────▼───────┐
│  Web App 3   │
└──────┬───────┘
       │
  (Sends Logs)
       │
       ▼
┌────────────────────┐
│   Collector API    │  ◄───────┐
│ (Node/Go service)  │          │  (Multiple collectors possible)
└──────┬─────────────┘          │
       │                        │
HTTP + Auth (mTLS / API Key)    │
       ▼                        │
┌────────────────────┐          │
│    Kafka Queue     │◄─────────┘
│ (Log Topic/Stream) │  ← Async, durable queue
└──────┬─────────────┘
       │
┌──────┴──────────────────────┐
│                             │
┌─────────────┐      ┌─────────────┐
│ Processor 1 │      │ Processor 2 │  ← Can scale horizontally
└─────────────┘      └─────────────┘
│   Batch + Retry    │
▼                    ▼
┌────────────────────┐
│  TimescaleDB /     │
│   ClickHouse DB    │
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│   Query API        │
└────────┬───────────┘
         │
┌────────▼────────────┐
│  Frontend Dashboard │
│  (React + WebSocket)│
└─────────────────────┘
```

## Key Features

### Scalability
- **Horizontal scaling** at multiple layers (collectors, processors)
- **Load distribution** through Kafka partitioning
- **Database sharding** capabilities

### Reliability
- **Asynchronous processing** prevents data loss
- **Retry mechanisms** for failed operations
- **Durable message queue** ensures data persistence

### Performance
- **Batch processing** for efficient throughput
- **Time-series optimized** storage
- **Real-time streaming** to frontend

### Security
- **mTLS authentication** for secure communication
- **API key management** for access control
- **Encrypted data transmission**

## Technology Stack

| Component | Technology Options |
|-----------|-------------------|
| Collector API | Node.js, Go |
| Message Queue | Apache Kafka |
| Processors | Node.js, Go, Python |
| Database | TimescaleDB, ClickHouse |
| Query API | Node.js, Go, Python |
| Frontend | React, WebSocket |

## Deployment Considerations

- **Containerization**: Docker containers for easy deployment
- **Orchestration**: Kubernetes for container management
- **Monitoring**: Comprehensive logging and metrics collection
- **Backup**: Regular database backups and disaster recovery plans


# 🧠 TL;DR: Why It's a Distributed System

| Trait                       | How "Instant Dev Logs" Delivers      |
| --------------------------- | ------------------------------------ |
| Multiple nodes/services     | Collector, Processor, Query API, DB  |
| Networked communication     | Kafka/Redis Streams + HTTP           |
| Independent failure/scaling | Decoupled services + queues          |
| Shared external storage     | Centralized DB (Postgres/ClickHouse) |
| Asynchronous processing     | Queue-based log pipeline             |
| Horizontal scaling          | Processor + Collector scale easily   |





# Original one  === Distributed Architecture View



                            ┌──────────────┐
                            │  Web App 1   │
                            └──────┬───────┘
                                   │
                            ┌──────▼───────┐
                            │  Web App 2   │
                            └──────┬───────┘
                                   │
                            ┌──────▼───────┐
                            │  Web App 3   │
                            └──────┬───────┘
                                   │
                              (Sends Logs)
                                   │
                                   ▼
                        ┌────────────────────┐
                        │   Collector API    │  ◄───────┐
                        │ (Node/Go service)  │          │  (Multiple collectors possible)
                        └──────┬─────────────┘          │
                               │                        │
                      HTTP + Auth (mTLS / API Key)      │
                               ▼                        │
                    ┌────────────────────┐              │
                    │    Kafka Queue     │◄─────────────┘
                    │ (Log Topic/Stream) │  ← Async, durable queue
                    └──────┬─────────────┘
                           │
        ┌──────────────────┴──────────────────┐
        │                                     │
┌─────────────┐                      ┌─────────────┐
│ Processor 1 │◄────────────┐       │ Processor 2 │
└─────────────┘             │       └─────────────┘   ← Can scale horizontally
      │   Batch + Retry     │
      ▼                     ▼
               ┌────────────────────┐
               │  TimescaleDB /     │
               │   ClickHouse DB    │
               └────────┬───────────┘
                        │
                        ▼
               ┌────────────────────┐
               │   Query API        │
               └────────┬───────────┘
                        │
             ┌──────────▼────────────┐
             │  Frontend Dashboard   │
             │  (React + WebSocket)  │
             └───────────────────────┘

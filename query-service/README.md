# Query-service

This is the `query-service` component of Instant Dev Logs.

# 🎯 Goal of the Query Service

- A REST API that lets you search logs - from PostgreSQL based on:

- Timestamp range (from, to)

- Log level (info, error, etc.)

- App name

- Keywords in message

- Pagination



# 🧱 Tech Stack
| Part          | Choice                               |
| ------------- | ------------------------------------ |
| Language      | Node.js                              |
| Framework     | Express                              |
| DB Client     | `pg` (PostgreSQL)                    |
| Pagination    | Limit + Offset                       |
| Output Format | JSON                                 |
| Optional      | Add caching layer later (e.g. Redis) |



# 🗂️ Folder Structure
```
query-service/
├── index.js           ← Express app entry point
├── db.js              ← DB connection
├── queryBuilder.js    ← dynamic SQL filter builder
├── .env
└── package.json

```
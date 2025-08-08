# Collector

This is the `collector` component of Instant Dev Logs.




### ✅ The **Collector** is the **first service** in the entire pipeline.

---

### 🔁 Here's the flow again:

```
[ Apps / Services generating logs ]
            ⬇
🚀 **[ Collector Service ]**
  - Accepts logs via HTTP POST
  - Validates log payload
  - Pushes logs into a queue (Redis Stream or Kafka)
            ⬇
[ Processor Service ]
[ Database ]
[ Query Service ]
[ Dashboard (optional) ]
```

---

### 🔹 Why is Collector first?

Because:

* It's the **entry point** to the logging system
* It receives log events from other applications (like your `sample-app`)
* It makes the system **language-agnostic** — any app that can call HTTP can send logs

---
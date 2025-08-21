export function buildQuery(filters) {
  let base = `SELECT * FROM logs`;
  const conditions = [];
  const values = [];

  if (filters.level) {
    values.push(filters.level);
    conditions.push(`level = $${values.length}`);
  }

  if (filters.appName) {
    values.push(filters.appName);
    conditions.push(`app_name = $${values.length}`);
  }

  if (filters.search) {
    values.push(`%${filters.search}%`);
    conditions.push(`message ILIKE $${values.length}`);
  }

  if (filters.from) {
    values.push(filters.from);
    conditions.push(`timestamp >= $${values.length}`);
  }
  if (filters.to) {
    values.push(filters.to);
    conditions.push(`timestamp <= $${values.length}`);
  }
  let whereClause = conditions.length
    ? ` WHERE ` + conditions.join(" AND ")
    : "";
  const limit = parseInt(filters.limit) || 20;
  const offset = parseInt(filters.offset) || 0;

  const finalQuery = `${base}${whereClause} ORDER BY timestamp DESC LIMIT ${limit} OFFSET ${offset}`;

  return { text: finalQuery, values };
}

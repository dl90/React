# SQL vs NoSQL

## relational

* structured and have predefined, fixed schema
* tables, rows/columns
* scales vertically (improving hardware)

## non-relational

* unstructured, distributed, dynamic schema
  * key/value: Redis
  * document: group by collection, MongoDB
  * wide-column: column families, each row doesn't have to have the same number of columns, best suited for large datasets, Cassandra
* horizontally scalable (add more servers)
* faster to develop

## ACID (Atomicity, Consistency, Isolation, Durability)

* reduces anomalies, protects data integrity
* SQL dbs are ACID
* NoSQL sacrifice ACID for performance and scalability
* atomicity: integrity of the entire db transaction, partial data not processed
* consistency: data adheres to table schema
* isolation: concurrent transactions do not affect one another
* durability: safety of data after transactions

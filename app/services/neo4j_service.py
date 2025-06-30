from neo4j import GraphDatabase
from app.config import settings

driver = GraphDatabase.driver(
    settings.NEO4J_URI,
    auth=(settings.NEO4J_USER, settings.NEO4J_PASS)
)

# Add Neo4j helper functions here
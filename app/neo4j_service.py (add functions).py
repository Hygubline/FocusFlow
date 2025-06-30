from neo4j import AsyncGraphDatabase
from app.config import settings

_driver = AsyncGraphDatabase.driver(
    settings.NEO4J_URI,
    auth=(settings.NEO4J_USER, settings.NEO4J_PASS)
)

async def close_driver():
    await _driver.close()

async def create_relationship(from_id: int, to_id: int, rel_type: str):
    query = (
        f"MATCH (a:Task {{id: $from_id}}), (b:Task {{id: $to_id}}) "
        f"MERGE (a)-[r:{rel_type}]->(b) "
        "RETURN r"
    )

    async with _driver.session() as session:
        result = await session.run(query, from_id=from_id, to_id=to_id)  # type: ignore
        return await result.single()

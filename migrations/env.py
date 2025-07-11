import os, sys
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context


PROJECT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.insert(0, PROJECT_DIR)


from app.models import Base 


config = context.config
fileConfig(config.config_file_name)


target_metadata = Base.metadata

def run_migrations_online():
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata, 
 
        )
        with context.begin_transaction():
            context.run_migrations()
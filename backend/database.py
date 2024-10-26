from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Define your database URL here (this example uses SQLite)
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"  # Replace with your actual database URL

# Create the SQLAlchemy engine
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

# Create a configured "SessionLocal" class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Define the base class for the ORM models
Base = declarative_base()

# Dependency to provide a session per request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

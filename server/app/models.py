"""models.py
SQLAlchemy models for the application.

Classes:
    Books: SQLAlchemy model for the books table.
"""

import datetime

from sqlalchemy import Column, Integer, String, DateTime

from .DBConfig.database import Base


class Books(Base):
    """Books
    Book model for the books table.

    Args:
        Base (_type_): SQLAlchemy declarative base class.

    Attributes:
        id (int): Primary key for the table.
        title (str): Title of the book.
        author (str): Author of the book.
        year (int): Year the book was published.
        created_at (datetime): Date and time the record was created.
    """

    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(255), index=True, nullable=False)
    author = Column(String(50), index=True, nullable=False)
    year = Column(Integer, index=True, nullable=False)

    created_at = Column(DateTime, default=datetime.datetime.now)

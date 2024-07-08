"""schemas.py
Schema for the books table.

Classes:
    BookBase: Pydantic model for the books table.
    Book: Pydantic model for the books table.
    CreateBook: Pydantic model for creating a book.
    UpdateBook: Pydantic model for updating a book.
"""

from pydantic import BaseModel


class BookBase(BaseModel):
    """BookBase
    Book schema

    Args:
        BaseModel (BaseModel): Pydantic base model class.

    Attributes:
        title (str): Book title.
        author (str): Author of the book.
        year (int): Year of publication.
    """

    title: str
    author: str
    year: int


class Book(BookBase):
    """Book
    Book schema

    Args:
        BookBase (BookBase): Pydantic model for the books table.

    Attributes:
        id (int): Book ID.
    """

    id: int

    class Config:
        """Config to allow ORM mode."""

        from_attributes = True


class CreateBook(BaseModel):
    """CreateBook

    Args:
        BaseModel (BaseModel): Pydantic base model class.

    Attributes:
        id (int): Book ID.
    """

    id: int


class UpdateBook(Book):
    """UpdateBook
    Book schema

    Args:
        Book (Book): Pydantic model for the books table.
    """

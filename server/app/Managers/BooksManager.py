"""api.py
CRUD operations for the application.

Functions:
    get_books: Retrieves all books.
    get_book_by_id: Retrieves a book by ID.
    create_book: Creates a new book.
    update_book: Updates a book.
    delete_book: Deletes a book.
"""

from typing import List, Optional

from sqlalchemy.orm import Session

from .. import models


def get_books(db: Session) -> List[models.Books]:
    """Retrieves all books.

    Args:
        db (Session): Database session.

    Returns:
        List[models.Books]: List of books.
    """
    return db.query(models.Books).all()


def get_book_by_id(db: Session, book_id: int) -> Optional[models.Books]:
    """Retrieves a book by ID.

    Args:
        db (Session): Database session.
        book_id (int): ID of the book to retrieve.

    Returns:
        models.Books: Book matching the ID.
    """
    return db.query(models.Books).filter(models.Books.id == book_id).first()


def create_book(db: Session, title: str, author: str, year: int) -> models.Books.id:
    """Creates a new book.

    Args:
        db (Session): Database session.
        title (str): Book title
        author (str): Author of the book
        year (int): Year of publication

    Returns:
        models.Books.id: ID of the newly created book.
    """
    db_book = models.Books(title=title, author=author, year=year)
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book.id


def update_book(
    db: Session, book_id: int, title: str, author: str, year: int
) -> Optional[models.Books]:
    """Updates a book.

    Args:
        db (Session): Database session.
        book_id (int): ID of the book to update.
        title (str): Book title
        author (str): Author of the book
        year (int): Year of publication

    Returns:
        models.Books: Updated book. if the book is not found, returns None.
    """
    db_book = db.query(models.Books).filter(models.Books.id == book_id).first()
    if not db_book:
        return None

    if title:
        db_book.title = title
    if author:
        db_book.author = author
    if year:
        db_book.year = year
    db.commit()
    db.refresh(db_book)

    return db_book


def delete_book(db: Session, book_id: int) -> Optional[models.Books]:
    """Deletes a book.

    Args:
        db (Session): Database session.
        book_id (int): ID of the book to delete.

    Returns:
        models.Books: Deleted book. if the book is not found, returns None.
    """
    db_book = db.query(models.Books).filter(models.Books.id == book_id).first()
    if not db_book:
        return None

    db.delete(db_book)
    db.commit()

    return db_book

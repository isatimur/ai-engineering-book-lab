"""Adds the sibling book-mash package to sys.path.

Usage:
    import sys
    from pathlib import Path
    sys.path.insert(0, str(Path(__file__).resolve().parent / 'scripts'))
    import book_mash_path  # noqa
    book_mash_path.ensure_on_path()
"""
import sys
from pathlib import Path


def ensure_on_path() -> None:
    here = Path(__file__).resolve()
    candidate = here.parent.parent.parent.parent / "book-mash"
    if not candidate.exists():
        raise RuntimeError(f"book-mash not found at expected location: {candidate}")
    if str(candidate) not in sys.path:
        sys.path.insert(0, str(candidate))

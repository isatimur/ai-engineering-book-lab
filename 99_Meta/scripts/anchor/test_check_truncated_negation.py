"""Unit tests for check_truncated_negation — pure functions, no I/O.

Run:  cd 99_Meta/scripts/anchor && python3 -m unittest test_check_truncated_negation -v
"""
import unittest

from check_truncated_negation import NEGATIONS, negations_in
from vtt import normalize


def norm_words(text: str) -> list[str]:
    return [n for n in (normalize(w) for w in text.split()) if n]


class TestNegationDetection(unittest.TestCase):
    def test_finds_plain_negation(self):
        self.assertEqual(negations_in(norm_words("This is not a new problem.")), ["not"])

    def test_finds_contraction(self):
        # "doesn't" normalizes to "doesnt"; the set has to carry that form.
        self.assertEqual(negations_in(norm_words("code doesn't audit agents")), ["doesnt"])

    def test_finds_absence(self):
        # The 2026-11-13 case: the negation was the noun "absence", not "not".
        self.assertEqual(negations_in(norm_words("The absence of a human in the")), ["absence"])

    def test_clean_text_has_none(self):
        self.assertEqual(negations_in(norm_words("We have been sandboxing for decades")), [])

    def test_substring_does_not_false_positive(self):
        # "nothing" is a negation, "notion" and "another" are not, though both
        # contain "not". Matching is per-token, so this must hold.
        self.assertEqual(negations_in(norm_words("another notion entirely")), [])
        self.assertEqual(negations_in(norm_words("nothing here")), ["nothing"])


class TestTheCaseThisGateExistsFor(unittest.TestCase):
    """The real 2026-11-13 inversion, reduced to the two conditions."""

    QUOTE = "a human in the process equals very poor results."
    BEFORE = "The absence of"

    def test_quote_alone_carries_no_negation(self):
        self.assertEqual(negations_in(norm_words(self.QUOTE)), [])

    def test_preceding_words_do(self):
        self.assertTrue(negations_in(norm_words(self.BEFORE)))

    def test_so_the_pair_would_be_flagged(self):
        flagged = (not negations_in(norm_words(self.QUOTE))
                   and bool(negations_in(norm_words(self.BEFORE))))
        self.assertTrue(flagged)


class TestNegationSet(unittest.TestCase):
    def test_entries_are_normalized(self):
        # An entry with punctuation could never match, since the input is
        # normalized before lookup. This keeps the set honest.
        for term in NEGATIONS:
            self.assertEqual(term, normalize(term), f"{term!r} is not in normalized form")


if __name__ == "__main__":
    unittest.main()

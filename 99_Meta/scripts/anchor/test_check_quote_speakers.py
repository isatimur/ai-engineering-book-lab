import unittest

from check_quote_speakers import attribution_holds, credited_names

TANG = "fuzzing in the genai era leonard tang haize labs"
SOMAL = "scaling ai agents without breaking reliability preeti somal temporal"


class TestCreditedNames(unittest.TestCase):
    def test_name_before_attribution_verb(self):
        self.assertIn("Preeti Somal", credited_names("Preeti Somal says ", ""))

    def test_possessive_form(self):
        self.assertIn("Jack Morris", credited_names("Jack Morris's phrase puts ", ""))

    def test_trailing_says_name(self):
        self.assertIn("Quan Vuong", credited_names("", ", says Quan Vuong."))

    def test_parenthetical_attribution(self):
        self.assertIn("Alex Atallah", credited_names("", " (Alex Atallah, OpenRouter)"))

    def test_sentence_openers_are_not_names(self):
        self.assertEqual(credited_names("This says ", ""), [])


class TestAttributionHolds(unittest.TestCase):
    def test_correct_speaker_passes(self):
        self.assertTrue(attribution_holds("Leonard Tang says ", "", [TANG]))

    def test_wrong_speaker_is_flagged(self):
        self.assertFalse(attribution_holds("Preeti Somal says ", "", [TANG]))

    def test_second_speaker_in_same_sentence_passes(self):
        """The regression this function exists for.

        The book writes "Chowdhery describes X, and Leonard Tang at Haize Labs has
        Y". Only Chowdhery matches an attribution verb, so a nearest-verb rule
        credits her with Tang's quote. Any name in the window must count.
        """
        lead = ("Aakanksha Chowdhery describes majority voting, "
                "and Leonard Tang at Haize Labs has ")
        self.assertTrue(attribution_holds(lead, "", [TANG]))

    def test_unrelated_nearby_name_does_not_rescue_a_real_error(self):
        lead = "Preeti Somal says "
        self.assertFalse(attribution_holds(lead, "", [TANG]))
        self.assertTrue(attribution_holds(lead, "", [SOMAL]))


if __name__ == "__main__":
    unittest.main()

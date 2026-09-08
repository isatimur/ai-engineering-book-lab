import unittest

from check_questioner_quotes import questioner_hit

# The shape of the real defect, trimmed. An audience member asks a multi-part
# question; the claim was filed as if the speaker had asserted its premise.
FACTORY = (
    "let's go ahead and merge you a quick question. This factory building leaves "
    "us with a scattered ecosystem of a lot of markdown files. Is there an easy "
    "way to organize these files and to keep an overview of the factory you have "
    "actually built? As maintaining a factory would require you to have an "
    "overview of the processes you want your coding agents to go through. What "
    "tools do you use? What methods do you recommend? "
    ">> Yeah, it's it's a really good question. I think it's somewhat unsolved."
)
QUOTE = ("maintaining a factory would require you to have an overview of the "
         "processes you want your coding agents to go through.")


class TestQuestionerHit(unittest.TestCase):
    def test_catches_the_known_defect(self):
        """claims#12 and claims#16 both carried this quote as the speaker's."""
        hit = questioner_hit(FACTORY, QUOTE)
        self.assertIsNotNone(hit)
        _, gap, nxt = hit
        self.assertIn("What tools do you use?", gap)
        self.assertIn("really good question", nxt)

    def test_quote_absent_from_transcript(self):
        self.assertIsNone(questioner_hit(FACTORY, "a quote nobody said"))

    def test_transcript_without_turn_markers_is_never_a_hit(self):
        """Most of the corpus. The check must stay silent, not guess."""
        self.assertIsNone(questioner_hit(FACTORY.replace(">>", ""), QUOTE))

    def test_no_question_means_no_hit(self):
        """A quote that merely precedes a handover is not a questioner's."""
        flat = ("The speaker explains that caching cuts latency. "
                ">> Thanks, next up we have our second talk.")
        self.assertIsNone(questioner_hit(flat, "caching cuts latency"))

    def test_stage_direction_turn_is_not_an_answer(self):
        """'>> [laughter]' was the single false positive in validation."""
        flat = ("who has used an MCP server? challenges we've faced scaling it, "
                "show of hands, anyone? >> [laughter]")
        self.assertIsNone(questioner_hit(flat, "challenges we've faced scaling it"))

    def test_boundary_beyond_the_window_is_ignored(self):
        flat = ("Is there a way to do this? " + QUOTE + " and then " +
                "filler " * 120 + ">> Yeah, good question.")
        self.assertIsNone(questioner_hit(flat, QUOTE))

    def test_smart_punctuation_still_matches(self):
        self.assertIsNotNone(
            questioner_hit(FACTORY.replace("let's", "let’s"), QUOTE))


if __name__ == "__main__":
    unittest.main()

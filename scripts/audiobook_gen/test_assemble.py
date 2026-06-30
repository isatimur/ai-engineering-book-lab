from pathlib import Path

from audiobook_gen.assemble import assembly_sequence


def test_assembly_sequence_wraps_with_room_tone_and_gaps():
    head = Path("head.wav")
    gap = Path("gap.wav")
    tail = Path("tail.wav")
    chunks = [Path("c0.wav"), Path("c1.wav")]
    seq = assembly_sequence(chunks, head, gap, tail)
    assert seq == [head, Path("c0.wav"), gap, Path("c1.wav"), tail]


def test_assembly_sequence_single_chunk_has_no_gap():
    head, gap, tail = Path("h.wav"), Path("g.wav"), Path("t.wav")
    seq = assembly_sequence([Path("c0.wav")], head, gap, tail)
    assert seq == [head, Path("c0.wav"), tail]

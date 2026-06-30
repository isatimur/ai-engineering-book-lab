import zipfile
from pathlib import Path

from audiobook_gen.package import build_ffmetadata, zip_marketplace


def test_ffmetadata_has_chapter_blocks_with_cumulative_times():
    meta = build_ffmetadata([("Chapter 1", 1000), ("Chapter 2", 2000)])
    assert meta.startswith(";FFMETADATA1")
    assert "[CHAPTER]" in meta
    assert "TIMEBASE=1/1000" in meta
    # first chapter 0..1000, second 1000..3000
    assert "START=0" in meta and "END=1000" in meta
    assert "START=1000" in meta and "END=3000" in meta
    assert "title=Chapter 1" in meta and "title=Chapter 2" in meta


def test_zip_marketplace_contains_all_files(tmp_path):
    f1 = tmp_path / "Chapter-01.mp3"
    f2 = tmp_path / "Chapter-02.mp3"
    f1.write_bytes(b"a")
    f2.write_bytes(b"b")
    out = zip_marketplace([f1, f2], tmp_path / "acx-upload.zip")
    with zipfile.ZipFile(out) as z:
        assert sorted(z.namelist()) == ["Chapter-01.mp3", "Chapter-02.mp3"]

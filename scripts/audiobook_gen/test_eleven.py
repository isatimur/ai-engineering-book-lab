import json

from audiobook_gen import eleven


def test_cache_key_is_stable_and_provider_scoped():
    s = eleven.DEFAULT_SETTINGS
    k1 = eleven.cache_key("hello", eleven.DEFAULT_VOICE, eleven.DEFAULT_MODEL, s)
    k2 = eleven.cache_key("hello", eleven.DEFAULT_VOICE, eleven.DEFAULT_MODEL, s)
    k3 = eleven.cache_key("hello", "other-voice", eleven.DEFAULT_MODEL, s)
    assert k1 == k2
    assert k1 != k3  # voice change -> different key


def test_cache_key_includes_neighbor_context():
    s = eleven.DEFAULT_SETTINGS
    base = eleven.cache_key("chunk", eleven.DEFAULT_VOICE, eleven.DEFAULT_MODEL, s)
    with_prev = eleven.cache_key(
        "chunk", eleven.DEFAULT_VOICE, eleven.DEFAULT_MODEL, s, previous_text="before"
    )
    assert base != with_prev


def test_build_request_targets_voice_and_carries_v3_options():
    req = eleven.build_request(
        "[professional] hi there",
        eleven.DEFAULT_VOICE,
        eleven.DEFAULT_MODEL,
        eleven.DEFAULT_SETTINGS,
        "secret-key",
        previous_text="earlier",
        next_text="later",
    )
    assert req.full_url.startswith(f"{eleven.API_ROOT}/{eleven.DEFAULT_VOICE}")
    assert eleven.OUTPUT_FORMAT in req.full_url
    assert req.headers["Xi-api-key"] == "secret-key"
    body = json.loads(req.data.decode("utf-8"))
    assert body["text"] == "[professional] hi there"
    assert body["model_id"] == eleven.DEFAULT_MODEL
    assert body["apply_text_normalization"] == "on"
    assert body["language_code"] == eleven.LANGUAGE_CODE
    assert body["previous_text"] == "earlier"
    assert body["next_text"] == "later"


def test_synthesize_uses_cache_and_injected_post(tmp_path, monkeypatch):
    calls = {"n": 0}

    def fake_post(req):
        calls["n"] += 1
        return b"FAKEMP3BYTES"

    # avoid real ffmpeg: fake the mp3->wav decode by writing a nonempty wav
    def fake_to_wav(src, dst):
        from pathlib import Path
        Path(dst).write_bytes(b"RIFFwav")
        return dst

    monkeypatch.setattr(eleven.ff, "to_wav", fake_to_wav)

    out1 = eleven.synthesize(
        "hello",
        eleven.DEFAULT_VOICE,
        tmp_path,
        api_key="k",
        post=fake_post,
    )
    out2 = eleven.synthesize(
        "hello",
        eleven.DEFAULT_VOICE,
        tmp_path,
        api_key="k",
        post=fake_post,
    )

    assert out1 == out2
    assert out1.suffix == ".wav" and out1.exists()
    assert calls["n"] == 1  # second call served from cache, no network

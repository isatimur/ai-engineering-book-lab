from pathlib import Path

from audiobook_gen.tts import cache_key, synthesize, DEFAULT_VOICE


class _FakeResponse:
    def __init__(self, payload: bytes):
        self._payload = payload

    def write_to_file(self, path):
        Path(path).write_bytes(self._payload)


class _FakeSpeech:
    def __init__(self, counter):
        self._counter = counter

    def create(self, **kwargs):
        self._counter["calls"] += 1
        return _FakeResponse(b"RIFFfakewav")


class _FakeClient:
    def __init__(self):
        self.calls = {"calls": 0}
        self.audio = type("A", (), {"speech": _FakeSpeech(self.calls)})()


def test_cache_key_is_stable_and_content_sensitive():
    a = cache_key("hello", "onyx", "calm", "gpt-4o-mini-tts")
    b = cache_key("hello", "onyx", "calm", "gpt-4o-mini-tts")
    c = cache_key("hello", "sage", "calm", "gpt-4o-mini-tts")
    assert a == b and a != c


def test_synthesize_writes_file_and_caches(tmp_path):
    client = _FakeClient()
    out1 = synthesize("hello world", DEFAULT_VOICE, tmp_path, client=client)
    assert out1.exists() and out1.suffix == ".wav"
    assert client.calls["calls"] == 1

    out2 = synthesize("hello world", DEFAULT_VOICE, tmp_path, client=client)
    assert out2 == out1
    assert client.calls["calls"] == 1  # cache hit, no second API call

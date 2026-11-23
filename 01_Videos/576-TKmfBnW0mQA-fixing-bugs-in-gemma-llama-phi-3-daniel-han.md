---
video_id: "TKmfBnW0mQA"
playlist_index: 576
title: "Fixing bugs in Gemma, Llama, & Phi 3: Daniel Han"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=TKmfBnW0mQA"
duration: "17:42"
duration_seconds: 1062
view_count: 3225
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/TKmfBnW0mQA.txt"
themes:
  - "Models & Inference"
ingested_at: "2026-04-24T12:24:37+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Daniel Han, the day after his three-hour workshop, lists the bugs his open-source fine-tuning library found and now fixes automatically in Llama 3, with recaps for Gemma and Phi-3. Key traps: double BOS tokens from the chat template; untrained, zeroed special tokens in the Llama 3 base model that cause NaN gradients (so do not use the instruct template on base); and a pad token equal to EOS, which masks EOS and causes infinite generation. He then walks a free Colab notebook: LoRA rank and alpha choices, all linear layers as targets, column merging for CSV data, and export with an auto-built chat template."
---
# Fixing bugs in Gemma, Llama, & Phi 3: Daniel Han

## Summary
Daniel Han gives a short follow-up to his three-hour workshop from the day before. He is known for the Gemma bug fixes (for example, approximate GELU, not exact). He recaps Phi-3: the sliding window should be 2048, not 2047, and the fused QKV matrices should be unfused or LoRA fine-tuning works less well. The talk's focus is Llama 3. He says it has eight bugs, some not yet announced. His open-source fine-tuning library now detects and fixes most of them automatically.

**Llama 3 traps**
- Double BOS tokens. If the chat template already adds a BOS token and you add another, the fine-tune trains on two and infers on one, which lowers accuracy. Mistral and Gemma have the same risk.
- Untrained tokens in the base model. Reserved special tokens 0 to 250, end of turn, start header and end header have zero embeddings in Llama 3 base; the instruct model has them trained. Using them on base causes NaN gradients. So never use the Llama 3 instruct chat template on the base model. Fix: set them to the mean of the trained tokens only (mask the untrained ones out of the average), or train the LM head and embed tokens.
- Pad token equal to EOS. Pad tokens are masked out of the cross-entropy loss, so EOS gets masked too and the model generates forever. He notes Phi-3 has this problem. The library picks an unused untrained token or adds a new pad token.

**Community findings**
Conversion for llama.cpp should run on CPU, not GPU, because float16 conversion differs between them. llama.cpp now warns about double BOS tokens. Adding a system prompt at inference may improve Llama 3 instruct fine-tunes.

**Fine-tuning settings from the notebook**
- Set max sequence length to match your data. Keep 4-bit loading on; turning it off can push a free T4 to 16 GB.
- LoRA rank: 16, 32, 64 or 128; larger learns more but can overfit and uses more memory. Target all linear layers (q, k, v, gate, up, down). Alpha equal to rank or about twice it works well.
- Batch size 2 with gradient accumulation 4 (effective batch 8); raise accumulation, not batch size. Learning rate 2e-4 or lower.
- For continued pretraining, train the LM head and embeddings at a 5 to 10 times smaller learning rate.
- Offloaded gradient checkpointing to system RAM gives four times longer context at only 1-2% slower, if calls are non-blocking. Do not offload to disk.

**Export to a local runner**
The runner needs a chat template that exactly matches the fine-tune. The notebook merges multi-column CSVs (the Titanic dataset example) into an instruction and output, builds a custom template with two repetitions to avoid dangling newlines, saves several quantized files at once, and generates the model file automatically.

## Why it matters
- A checklist of silent fine-tuning failures (double BOS, untrained tokens, pad equal to EOS) that break results without any error message.
- Explains the mechanism behind each bug, for example why a shared pad and EOS token leads to infinite generation, so readers can spot it in other models.
- Concrete LoRA defaults (rank, alpha, target modules, effective batch, learning rate) from someone who fixes these models for a living.
- Shows that the chat template is part of the model contract: a mismatch between training and serving degrades output.

## Metadata
- Video: https://www.youtube.com/watch?v=TKmfBnW0mQA
- Duration: 17:42
- Playlist index: 576
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]

## Transcript excerpt
> [Music] hello everyone um so today I'm going to talk about how to fix bugs and open source models um thanks for coming again um we had a talk yesterday the 3-hour workshop um and thanks for coming again um so we have slides it's at tinyurl.com to for the workshop slides which we did yesterday um you can also access that now tinyurl.com unof as well so you might know me from like the Gemma bug fixes that we did so Gemma was an open source model by Google and there like a few bugs in there and we fixed a few of them um and we just did some tweets about this and you know like there's many bugs in there like you know the activation function had to be ex um approximate jel not exact jelo and...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/TKmfBnW0mQA.txt]]
- Description cue: The story behind our 8 bug fixes for Gemma, multiple tokenization fixes for Llama 3, a sliding window bug fix and Mistral-fying Phi-3, and learn about how we analyse and find and fix bugs in...

## Book angles
- Could support a chapter/section on **Models & Inference**.

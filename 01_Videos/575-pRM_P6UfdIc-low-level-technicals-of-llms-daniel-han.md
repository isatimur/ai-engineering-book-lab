---
video_id: "pRM_P6UfdIc"
playlist_index: 575
title: "Low Level Technicals of LLMs: Daniel Han"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=pRM_P6UfdIc"
duration: "2:52:26"
duration_seconds: 10346
view_count: 53886
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/pRM_P6UfdIc.txt"
themes:
  - "Models & Inference"
ingested_at: "2026-04-24T12:24:34+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Daniel Han, who co-founded an open-source fine-tuning library with his brother (2x faster, up to 80% less memory, no accuracy loss, via Triton kernels), runs a three-hour workshop on the math and code of the Transformer and on hunting bugs in open models. He derives attention, masking, RoPE, RMS layer norm, SwiGLU and cross-entropy, walks the Hugging Face Llama code, and shows how he found Gemma bugs (RoPE precision, approximate vs exact GELU) by comparing layer outputs against the reference. His thesis: model code is short once you strip the bloat, and you must match the original implementation exactly."
---
# Low Level Technicals of LLMs: Daniel Han

## Summary
Daniel Han, who arrived from Australia with his brother Michael, opens the AI Engineer World's Fair with a nearly three-hour, Q&A-heavy workshop. The brothers launched an open-source fine-tuning library the previous December. It makes fine-tuning Llama, Mistral or Gemma about two times faster with about 80% less memory and "no degradation" in accuracy, using Triton kernels instead of approximations. Han became known for tweeting bugs he found in Gemma's implementations. His goal: teach people to read new model code in minutes and find such bugs themselves.

**The Transformer as math**
He writes Llama's whole architecture on one slide and calls the modern recipe "Transformer++": GPT-2 plus RoPE, SwiGLU, RMS layer norm and no bias. He builds it up from a toy tokenizer, token IDs and an embedding table. Training shifts the sequence by one and predicts the next token. The causal mask in attention is why training costs O(n²), not O(n³). He prefers matrix algebra to the query-key-value story. Practical notes: subtract the row max for a stable softmax; upcast logits to float32; layer norms only keep scale stable, so "add everywhere"; RoPE derivatives become simple once rotate-half is written as a matrix. He warns against random large initializations and untrained token rows that cause NaNs. His library sets those rows to the mean embedding.

**Reading Hugging Face Llama code**
In the modeling file he shows which lines matter (RMS norm, rotary embedding, the one-line MLP, repeat-KV for grouped attention, the decoder layer, the LM head) and which are "bloat". He thinks Llama fits in about 50 lines. He recommends `torch.compile` over hand-written kernels for most people, and Triton over CUDA because CUDA only buys about 10% more and locks you to Nvidia.

**Gemma bug hunting**
The method: run the reference implementation and others (PyTorch, Hugging Face, Keras) layer by layer and plot the log L2 error. The largest gain came from computing RoPE positions in float32. In lower precision, positions near 8192 collapse to the same, out-of-range value. Approximate versus exact GELU mattered less. They picked the fix set that matched the original implementation, not the one with the lowest error. Gemma also needs a BOS token and float32 upcasts in its layer norm. He compares three implementations side by side and guesses, which is why he thinks this cannot be fully automated.

**Other tips**
- Precision: multiplier cost scales roughly with exponent plus fraction squared, so bfloat16 is about 10x cheaper than float32; Nvidia's sparsity doubles quoted FLOPs.
- Free Colab and Kaggle T4s beat P100s.
- Suspect any 98-100% accuracy result of future-data leakage.
- In another model's config he finds a 2047 sliding window that should be 2048 and a pad token equal to EOS. He also unfuses its fused QKV weights for LoRA.
- A new notebook merges multi-column CSVs into instruction-output pairs and exports with an auto-generated chat template for a local runner.

## Why it matters
- A rare end-to-end walk from equations to production Hugging Face code, useful for any chapter that explains what a Transformer layer computes.
- The layer-by-layer log L2 comparison against a reference is a reusable debugging method for any reimplemented model.
- Concrete evidence that precision choices, such as RoPE in float16, silently degrade open models, and that the fix must follow the original implementation.
- Practical fine-tuning hygiene: untrained token rows, pad versus EOS, fused weights and chat templates all break results before training starts.
- His skepticism of copied architectural gospel (layer-norm placement, gated MLPs, learning-rate schedules) is a good prompt for honest small-scale experiments.

## Metadata
- Video: https://www.youtube.com/watch?v=pRM_P6UfdIc
- Duration: 2:52:26
- Playlist index: 575
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]

## Transcript excerpt
> [Music] welcome to the AI Engineers worldair um this is the first Workshop um there's a few other running but like thanks for coming um we just arrived from like Australia with my brother um I think it's over there somewhere but yes we just came here um yes we didn't know a lot of stuff about SF and I think maybe the US is a bit different from Australia um but yeah we're very excited to be here so like we're going to stay here for like a few months so if you want to meet up you know you can just hit me off email or Twitter or wherever um so today I'm going to be talking about lowlevel technicals of language models um yes yes I'm Daniel um but so we do have a website called un. if you want...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/pRM_P6UfdIc.txt]]
- Description cue: This workshop will be split into 3x one hour blocks:

## Book angles
- Could support a chapter/section on **Models & Inference**.

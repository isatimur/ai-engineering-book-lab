---
video_id: "LJa1SjCkYas"
playlist_index: 488
title: "Insights from Snorkel AI running Azure AI Infrastructure: Humza Iqbal and Lachlan Ainley"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=LJa1SjCkYas"
duration: "20:46"
duration_seconds: 1246
view_count: 205
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/LJa1SjCkYas.txt"
themes:
  - "Models & Inference"
  - "Evals & Reliability"
ingested_at: "2026-04-24T12:20:25+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Humza Iqbal, an applied research scientist on Snorkel AI's computer vision team, talks with Lachlan Ainley of Microsoft Azure about why off-the-shelf LLMs rarely meet enterprise quality, latency and cost bars, and why targeted data development, not RAG alone, closes the last mile. Iqbal describes Snorkel's distributed training stack on Azure (PyTorch, Horovod, A100 and H100 VMs, a shared NFS), the traps of batch size, network distance and slow data reads, and a cost-matched test where two H100s beat four A100s on both training and inference."
---
# Insights from Snorkel AI running Azure AI Infrastructure: Humza Iqbal and Lachlan Ainley

## Summary
This is a 20-minute conversation. Lachlan Ainley of Microsoft Azure interviews Humza Iqbal, an applied research scientist on Snorkel AI's computer vision team, who fine-tunes foundation models for enterprise use. Iqbal's thesis: out-of-the-box LLMs "rarely meet Enterprise quality latency and cost" requirements for customers such as banks and insurers. Models like Claude, GPT-4 or Gemini get part of the way. The final mile comes from developing the right data to fine-tune them.

**Why data development is hard**
RAG "is just a starting point". Big public instruction-tuning sets lack the narrow slice an enterprise needs, such as a specific type of bank policy. Snorkel, spun out of the Stanford AI lab, frames its research around three goals:
- Keep subject matter experts in the loop while making the most of their time.
- Make data development programmatic, scalable and auditable.
- Evaluate continuously with domain-specific, dynamic benchmarks, because a bank does not care about grade-school math scores.

Active projects: fine-grained evaluation of long-context models, since needle-in-a-haystack tests do not show how models handle other domains; enterprise alignment with company goals and regulations; and multimodal alignment, where large vision-language models generate synthetic training data without manual annotation.

**The training stack**
PyTorch, Horovod for multi-node gradient exchange, A100 or H100 Azure VMs, and a single shared NFS that every machine reads data from and writes checkpoints to. Workloads range from one node to dozens: DPO and other preference optimization on instruction-response data, plus large multimodal training and inference jobs.

**Traps for young players**
- Size the node count to the batch size you want. Too many nodes means an oversized batch or idle GPUs. He learned this training CLIP-based models.
- Keep data and nodes close together. Gradient exchange across distant regions becomes a bottleneck.
- NFS read speed is critical. If loading cannot keep up with the forward and backward passes, the GPUs wait.
- Watch GPU utilization with the standard GPU monitoring tool. Low use on many nodes points to networking. Low use on a single node points to data loading.
- Flexibility matters. Some clouds only rent compute in fixed blocks of a month or two, which did not fit stop-start research.

**A100 to H100**
At equal cost, two H100s beat four A100s on both training and inference. Iqbal values a plain hardware swap that works while KV-cache and speculative-decoding work goes on. Faster inference means more synthetic data per hour, which speeds the whole research cycle. Ainley lists Azure's accelerator range (Microsoft's own first-party AI chip, the AMD MI300X, NVIDIA A100 and H100, Blackwell to come) and notes that NVIDIA now ships about twice a year.

**Next at Snorkel**
Use preference signals to synthesize and curate data, build entry points for data development through rationales and custom taxonomies, and evaluate multimodal retrieval on domain-specific datasets.

## Why it matters
- It states the enterprise case for fine-tuning plainly: RAG and frontier models get you most of the way, and curated domain data closes the gap.
- The list of distributed-training bottlenecks (batch size against node count, network distance, NFS read speed) comes with a simple diagnostic: low GPU use on many nodes means networking, on one node means data loading.
- The cost-matched comparison (two H100s against four A100s) is a clean way to judge hardware per dollar, not per chip.
- It links faster inference to faster synthetic-data generation and research speed, a useful point for a chapter on data flywheels.
- Domain-specific dynamic benchmarks and long-context evaluation beyond needle-in-a-haystack tests feed directly into an evals chapter.

## Metadata
- Video: https://www.youtube.com/watch?v=LJa1SjCkYas
- Duration: 20:46
- Playlist index: 488
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]
- [[Evals & Reliability]]

## Transcript excerpt
> [Music] hey everyone thanks so much for coming I'm Hamza from an applied research scientist at snorkel on the uh computer vision team uh working on fine-tuning you know Foundation models for Enterprise use cases thanks amza um I like the ears uh thank you why don't you start out by telling the folks a little bit about uh snorkel and what you do there it's a it's an interesting name any relation to like AI for scuba diving or anything like that uh well hot tubs actually because snorkel doccom once I joined the company I learned as a hot tub company but no actually we don't do anything for scuba diving or hot tubbing um and to give a little bit of context the main problem that we're trying to...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/LJa1SjCkYas.txt]]
- Description cue: Join us and hear from the Snorkel AI team about their experience and lessons learned using Azure AI infrastructure powered by NVIDIA GPUs. Learn about how Snorkel Researchers were able to run...

## Book angles
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **Evals & Reliability**.

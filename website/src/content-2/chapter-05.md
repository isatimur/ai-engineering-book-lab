# Chapter 5 — Robotics and the Physical World

Part I broke one assumption: that the model is a given. Every chapter in it was about building the model — training it, serving it, pushing it at the frontier, and pointing it at speech, media, and recommendation. Part II breaks a different one. Here the model is capable enough. What fails is the assumption that the generic agent playbook fits the domain you are working in. This is the long tail of AI engineering: the places strange enough that the standard harness has to be unlearned before it can be rebuilt. Robotics is the first, and the sharpest, because the domain is not a text box. It is physics.

Chapter 4 closed on the car and the humanoid as *foundation models* — Waymo's EMMA and Nvidia's GR00T N1, the driving stack and the robot's control policy each framed as one model to be trained rather than a pipeline to be engineered. That was the model layer reaching its last modality. This chapter enters the world those models have to survive. A chatbot that answers wrongly can be corrected on the next turn. A robot that moves wrongly has already knocked something over. The physical world adds constraints the text harness never has to handle: control loops that run in real time, sensor and actuator latency measured on the wire, the impossibility of a clean undo, and data that arrives as telemetry rather than text. Each one forces the playbook to give something up.

## One model for any robot

The frontier bet in robotics is framed the same way the frontier bet in language was: not a fleet of task-specific policies, but a single general model.

Physical Intelligence states the ambition without hedging. "Our mission is to make a model that can control any robot to do any task," says Quan Vuong. That is the foundation-model paradigm aimed at bodies: one model that generalizes across robots and tasks, replacing the bespoke controllers that made robotics work only inside constrained environments like a factory line. It is the same move that produced the general-purpose chatbot, now made in a domain where a wrong output has mass and momentum. The talk is careful about how far off this is — "this is not something that's ready today," Vuong says, with several scientific breakthroughs still needed to get there — which is exactly why it opens the chapter as a vision rather than a shipped result. The goal has flipped from writing a policy per robot to training one model for all of them; whether that goal is reached is the open bet the whole field is now making.

## The bug is the system, not the policy

The first thing the physical world makes you unlearn is where failure comes from. In a text agent, a bad output usually means a bad model. In a robot, it usually does not.

Rishabh Garg, who works on Tesla's Optimus, puts the diagnosis plainly: when a carefully trained control policy does not behave as expected, "the issue will look like it's the policy but it's actually the software system." His talk is about what happens between the controller and the wire — getting data from sensors into the system and commands out to the actuators, across a communication protocol with its own timing and electrical characteristics. A robot's behavior is shaped by the control policy, the software configuration, and the physics of that link, all at once. The failures that look like intelligence problems are, again and again, engineering problems: a timing skew, a dropped message, a protocol quirk. The lesson is uncomfortable for a field that likes to credit or blame the model. In embodiment, most of the intelligence you can actually ship lives in the system around the policy, not the policy itself.

## Physical data breaks agents that handle text fine

The second thing to unlearn is that data is data. The agent harness that works on text falls apart on the physical world's exhaust.

Dmitry Petrov of DataChain frames physical data as a different kind of matter entirely — video recordings, sensor readings, robot telemetry, often all combined in one project — and reports that agents handle it badly out of the box. He cites a published result to make the size of the gap concrete: "Anthropic published that accuracy for data projects on their agents is only 21% until you add specific data harnesses to them and provide context." The fix is not a better base model but a domain-specific data harness — layered context built around the model so it can reason over telemetry the way it reasons over prose. This is the same lesson Chapter 3 drew for codebases, transposed to a domain where the "codebase" is a stream of sensor readings. Text was legible to the agent by default; physical data is not, and making it legible is the work.

## A general-purpose robot can learn a trade

If the frontier bet is one model for any task, the near-term evidence is narrower and more concrete: a general-purpose robot trained into a single working role.

CloudChef is the case study. Nikhil Abraham describes taking a bimanual robot that "was not meant for cooking — it was just a robot with two hands," putting it "through culinary school," so that "it's now a professional chef that's working in various different kitchens." The claim that matters is not that a robot can cook; it is that a *general-purpose* body was trained into a skilled trade and that the skill transfers to kitchens it was never trained in. That is the domain's version of generalization — not answering an unseen question, but performing a physical task in an unseen environment. It is a single company's account of its own system, and the strongest figures (learning a recipe from one demonstration, working across novel kitchens) are the company's to prove. But it is the shape of the bet made real at small scale: the body is general, the training makes it a professional.

## Reaching most robots means going small

The third thing to unlearn is that more capability means a bigger model. For embodiment at scale, the constraint runs the other way.

Cormac Brick of Google draws the line by counting devices, not benchmarks. If intelligence is to reach not just a handful of expensive robots but the vast number of ordinary devices, "we are going to need tiny models." A cheap robot cannot host a frontier model; it has the compute, power, and latency budget it has, and that budget decides what can run on-device at the edge. So the number of robots that can be intelligent at all is bounded not by how good the largest model is, but by how capable the smallest useful one can be made. This is a different argument from the on-device economics of Chapter 2, which was about cost and access — turning a subscription into an energy bill, keeping data private, working offline. Here the point is reach: broad embodiment depends on small models because most bodies cannot carry a large one. Brick argues the edge case from inside Google's edge effort, so the framing is a builder's; the constraint it names is not.

## Cheap, open, hackable bodies

The fourth shift is about who gets to build at all. Robotics is starting to follow the path open models cut through text: from proprietary labs toward hardware a developer can actually buy and modify.

The humanoids that draw the hype — Tesla's Optimus, 1X, Unitree — are proprietary and expensive. K-Scale Labs offers the counter: an open-source humanoid, built hardware-to-software for developers, at $8,999. Hugging Face pushes the same idea further down the price curve with Reachy Mini, a $300 open-source robot that is designed to be hacked. Neither is a frontier machine, and both are early — the significance is not the spec sheet but the pattern. Open weights let a developer run, fine-tune, and inspect a model instead of renting it through an API; open, affordable, hackable hardware promises the same for the body. It is the same democratization argument the text ecosystem already made, now pointed at atoms, and it pairs naturally with the previous section's tiny models: cheap bodies and small models are two halves of the same push to move robotics out of the lab.

## What robotics makes the playbook unlearn

Put the chapter together and it is not a survey of robots. It is a list of things the generic playbook has to give up the moment the environment stops being a text box.

The goal is still one general model (#175) — that carries over from Part I intact. But the failure model inverts: the bug is the system between controller and wire, not the policy (#110). Data stops being legible by default; telemetry needs its own harness before an agent can reason over it at all (#890). Generalization stops meaning an unseen question and starts meaning an unseen kitchen (#229). Bigger stops being better, because reach is bounded by the smallest model a cheap body can run (#936). And the hardware itself is beginning to open the way the models did, which is what makes any of this reach past the lab (#276, #725). Real-time loops, latency on the wire, the missing undo, telemetry instead of text — every constraint in this chapter is one the text harness never had to handle, and each one forces a specific unlearning.

That is the pattern Part II will repeat. Each domain in the long tail takes the capable model as given and then breaks the playbook in its own particular way. Robotics breaks it on physics. The next chapters break it on stakes and on trust, where the domain that resists the playbook is not the physical world but the regulated one.

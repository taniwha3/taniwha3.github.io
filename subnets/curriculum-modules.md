# Subnetting Curriculum Modules - Complete Specification

Below is a self-contained, step-by-step curriculum that takes a complete beginner from "What is an IP address?" to confidently designing and verifying subnet schemes. Everything is organized as modules; each module contains:
- **Objectives** – what the learner must be able to do before moving on.
- **Key ideas & activities** – core content and suggested learning tasks.
- **Assessment (gate)** – an explicit check-point the learner must pass.
- **Likely sticking points & remedies** – issues a first-time learner almost always meets and how to address them early.

No prior programming is expected and only the arithmetic normally covered by high-school algebra is assumed. You may teach the program in 30–45 minute sessions or bundle two modules into a single 90-minute class depending on pace and schedule.

---

## Module 0: Orientation & Pre-Assessment (optional but recommended)

**Goal**: Make the student emotionally comfortable and capture a baseline

**Objectives**:
- Describe, in plain language, what "subnetting" achieves (divide a network, control broadcast domains, conserve addresses).
- Explain why even a home user benefits (e.g., IoT isolation).

**Activities**:
- Five-minute "tour" of an IP packet.
- Ask learner to write two things they hope to be able to do by the end.

**Assessment**: Short reflective paragraph: "Subnetting matters because…"

**Sticking points**: Intimidation. Emphasize: "We'll use only addition, subtraction, powers of 2, and some logical AND."

---

## Module 1: Positional Number Systems & Powers of Two

*Math foundation #1*

**Objectives**:
- Convert numbers 0 – 255 between decimal and binary without a calculator.
- List the values of 2⁰ through 2⁷ from memory.

**Key ideas & activities**:
1. Positional review – identical to decimal but base 2.
2. Eight-bit chart – learner fills a row of boxes labelled 128 64 32 16 8 4 2 1.
3. Mental game: "What is the highest power of two less than ___?"

**Assessment (gate)**: Worksheet: 10 random decimals → binary and 10 random binaries → decimal in < 10 min; ≥ 90% correct.

**Likely sticking points & remedies**:
- Dropping leading zeros – remind that each IP octet must keep all eight bits for clarity.
- Memorizing powers of two – create flash-cards; include 2⁸ (256) and 2¹⁶ (65,536) for later.

---

## Module 2: Bitwise Logic Without Programming

*Math foundation #2*

**Objectives**:
- Perform manual AND and OR operations on two eight-bit binary numbers.
- Explain why AND is used to discover "network portion".

**Key ideas & activities**:
- Truth table drill (1 & 1 = 1, everything else = 0).
- Colored-pen exercise: overlay mask and address, highlight.

**Assessment**: Given IP = 11000000 10101000 00000001 00100011 (192.168.1.35) and mask = 11111111 11111111 11111111 00000000 (255.255.255.0), hand-calculate the network address; must answer 192.168.1.0.

**Sticking points**:
- Writing long strings of 1s/0s incorrectly – teach grouping into nibbles (4 bits).
- Mixing AND vs OR – mnemonic: "AND narrows".

---

## Module 3: IPv4 Address Anatomy

**Objectives**:
- Break an address into four octets, show each in binary and decimal.
- Describe historical class A/B/C only for context, not as current design rule.

**Key ideas & activities**:
- "32-bit string-to-dotted-quad" mini-lab.
- Visual analogy: street (network) vs house (host).

**Assessment**: Label each part of 10.15.7.23/16 as network vs host.

**Sticking points**: Thinking classes still matter – stress that CIDR replaced them in 1993.

---

## Module 4: Subnet Masks & CIDR Notation

**Objectives**:
- Translate between dotted-decimal mask and slash notation up to /30.
- Explain why /31 and /32 behave specially.

**Key ideas & activities**:
- Build a "mask ladder":
  ```
  /8  = 255.0.0.0
  /9  = 255.128.0.0
  ...
  /24 = 255.255.255.0
  ```
- Paper exercise: slide the "bar" one bit at a time.

**Assessment**: Provide five masks in either form; learner must supply the other form and number of host bits.

**Sticking points**: /24 vs 255.255.255.0 confusion – repetitive drills; keep ladder sheet posted.

---

## Module 5: Fixed-Length Subnet Calculations

**Objectives**:
- Given network & new prefix, calculate: number of subnets, hosts per subnet, block size, first & last usable, broadcast.
- Recognize invalid host addresses.

**Key ideas & activities**:
1. Formula review – hosts = 2^(host bits) – 2, subnets = 2^(borrowed bits).
2. Step-by-step worksheet for 192.168.0.0/24 subdivided into /26, /28, etc.
3. Speed rounds: "What subnet does 172.22.37.129/20 belong to?"

**Assessment**: Comprehensive problem set (5 networks, graded by instructor or answer key). Must score ≥ 80% and self-explain any error.

**Sticking points**:
- Off-by-one: forgetting to reserve network & broadcast.
- Using decimal math on block size: always derive from binary boundary first.

---

## Module 6: Variable Length Subnet Masking (VLSM) & Address Planning

**Objectives**:
- Allocate subnets of different sizes from a single pool without overlap.
- Prioritize largest to smallest when carving.
- Produce a clean address plan table.

**Key ideas & activities**:
- Realistic scenario: HQ + 3 branches needing 250, 60, 30, 14 hosts.
- Draw visual binary tree to show split points.
- Spreadsheet lab so learner sees gaps.

**Assessment**: Design a VLSM plan for 10.10.0.0/22 given four department sizes; instructor checks for no overlap, correct ranges.

**Sticking points**:
- Forgetting to sort by size – enforce rule: "biggest networks first."
- Address wastage – calculate utilization % as feedback.

---

## Module 7: Subnetting in Practice: Routing & ACL Implications

**Objectives**:
- Explain how routers use the mask to make forwarding decisions (longest-prefix match).
- Predict which subnets a summarized route covers.
- Identify when two ACL entries overlap because of subnet math.

**Key ideas & activities**:
- Demo with a packet tracer / simulator (no coding).
- ACL overlap puzzle: which rule wins?

**Assessment**: Given a routing table, determine next-hop for three sample destinations.

**Sticking points**: Misreading "longest prefix" – analogy: exact street address vs only ZIP code.

---

## Module 8: IPv6 Subnet Fundamentals (Optional but Valuable)

**Objectives**:
- Recognize 128-bit address, hexadecimal quartet notation.
- Explain the concept "/64 is the normal host subnet."
- Calculate simple IPv6 sub-prefixes (/56 → /60, /64, /126).

**Key ideas & activities**:
- Compression rules ::/ etc.
- Compare IPv4 /30 to IPv6 /126 for point-to-point links.

**Assessment**: Convert 2001:0db8:0000:0000:0200:00ff:fe00:0042 to compressed form and list network vs interface ID for /64.

**Sticking points**: Hexadecimal unfamiliarity – quick refresher; show that hex-to-binary is 1:4 mapping.

---

## Module 9: Verification & Troubleshooting Tools

**Objectives**:
- Use ipcalc (Linux/WSL or web), ping, traceroute, and whois to verify subnet plans.
- Spot common misconfigurations (mask mismatch, overlapping ranges, wrong gateway).

**Key ideas & activities**:
- Live lab: mis-configured VM network adapter; student must fix.
- Checklist template for real deployments.

**Assessment**: Instructor deliberately breaks one parameter; learner diagnoses and documents fix.

**Sticking points**: Assuming the math is wrong when the config is – teach to check both.

---

## Graduation Capstone

Design a complete address plan for a fictitious 12-site company (HQ + 11 branches, VPN, guest Wi-Fi, management VLANs).

**Deliverables**: addressing spreadsheet, summarization map, and one-page rationale. Oral defense encouraged.

**Pass mark**: 100% routability, < 10% wastage in any /24-sized block, and correct masking throughout.

---

## General Study Tips

1. Paper first, software second – manual work cements intuition.
2. Flash cards for powers of two, masks, and slash equivalents.
3. Teach-back – have learner explain today's topic to a rubber duck or peer.

## Typical Timeline

| Week | Modules |
|------|---------|
| 1    | 0–2     |
| 2    | 3–4     |
| 3    | 5       |
| 4    | 6–7     |
| 5    | 8–9 + Capstone |

Learners can of course accelerate or decelerate; the assessment gates keep them from advancing with gaps.

---

## Anticipating & Unsticking

| Sticking Point | Quick Intervention |
|----------------|-------------------|
| Mixing decimal & binary columns | Always write both under each octet until fluent. |
| Forgetting network & broadcast reservations | "N-B rule" chant before every host-count calculation. |
| Off-by-one in block sizes | Draw boundaries on binary timeline; highlight first/last. |
| Mask ↔ slash memory lapse | Keep "mask ladder" card taped to monitor. |
| VLSM overlap | Print tree diagram; check that sibling ranges never mix. |

With these modules, clear gates, and targeted remedies, even a student with no prior programming experience will progress steadily from "What is a subnet?" to confidently building efficient, correct subnet designs in real networks.
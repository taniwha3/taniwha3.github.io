export const modules = [
  {
    id: 0,
    title: "Orientation & Pre-Assessment",
    goal: "Make the student emotionally comfortable and capture a baseline",
    objectives: [
      "Describe, in plain language, what 'subnetting' achieves (divide a network, control broadcast domains, conserve addresses)",
      "Explain why even a home user benefits (e.g., IoT isolation)"
    ],
    activities: [
      {
        type: "tour",
        title: "Five-minute tour of an IP packet",
        description: "Understand the basic structure and purpose of IP packets"
      },
      {
        type: "reflection",
        title: "Personal goals",
        description: "Write two things you hope to be able to do by the end"
      }
    ],
    assessment: {
      type: "reflection",
      prompt: "Subnetting matters because…",
      description: "Write a short reflective paragraph"
    },
    stickingPoints: [
      {
        issue: "Intimidation",
        remedy: "Emphasize: 'We'll use only addition, subtraction, powers of 2, and some logical AND.'"
      }
    ],
    estimatedTime: 30,
    prerequisites: []
  },
  
  {
    id: 1,
    title: "Positional Number Systems & Powers of Two",
    goal: "Math foundation #1",
    objectives: [
      "Convert numbers 0 – 255 between decimal and binary without a calculator",
      "List the values of 2⁰ through 2⁷ from memory"
    ],
    activities: [
      {
        type: "lesson",
        title: "Positional review",
        description: "Identical to decimal but base 2"
      },
      {
        type: "exercise",
        title: "Eight-bit chart",
        description: "Fill a row of boxes labelled 128 64 32 16 8 4 2 1"
      },
      {
        type: "game",
        title: "Mental math game",
        description: "What is the highest power of two less than ___?"
      }
    ],
    assessment: {
      type: "worksheet",
      prompt: "Complete conversion exercises",
      description: "10 random decimals → binary and 10 random binaries → decimal in < 10 min; ≥ 90% correct",
      passingScore: 90
    },
    stickingPoints: [
      {
        issue: "Dropping leading zeros",
        remedy: "Remind that each IP octet must keep all eight bits for clarity"
      },
      {
        issue: "Memorizing powers of two",
        remedy: "Create flash-cards; include 2⁸ (256) and 2¹⁶ (65,536) for later"
      }
    ],
    estimatedTime: 45,
    prerequisites: [0]
  },
  
  {
    id: 2,
    title: "Bitwise Logic Without Programming",
    goal: "Math foundation #2",
    objectives: [
      "Perform manual AND and OR operations on two eight-bit binary numbers",
      "Explain why AND is used to discover 'network portion'"
    ],
    activities: [
      {
        type: "drill",
        title: "Truth table drill",
        description: "Practice: 1 & 1 = 1, everything else = 0"
      },
      {
        type: "exercise",
        title: "Colored-pen exercise",
        description: "Overlay mask and address, highlight matching bits"
      }
    ],
    assessment: {
      type: "problem",
      prompt: "Calculate network address",
      description: "Given IP = 11000000 10101000 00000001 00100011 (192.168.1.35) and mask = 11111111 11111111 11111111 00000000 (255.255.255.0), hand-calculate the network address",
      answer: "192.168.1.0"
    },
    stickingPoints: [
      {
        issue: "Writing long strings of 1s/0s incorrectly",
        remedy: "Teach grouping into nibbles (4 bits)"
      },
      {
        issue: "Mixing AND vs OR",
        remedy: "Mnemonic: 'AND narrows'"
      }
    ],
    estimatedTime: 45,
    prerequisites: [1]
  },
  
  {
    id: 3,
    title: "IPv4 Address Anatomy",
    goal: "Understanding IP address structure",
    objectives: [
      "Break an address into four octets, show each in binary and decimal",
      "Describe historical class A/B/C only for context, not as current design rule"
    ],
    activities: [
      {
        type: "lab",
        title: "32-bit string-to-dotted-quad mini-lab",
        description: "Convert between binary string and dotted decimal notation"
      },
      {
        type: "visual",
        title: "Network vs Host analogy",
        description: "Visual analogy: street (network) vs house (host)"
      }
    ],
    assessment: {
      type: "labeling",
      prompt: "Identify network and host portions",
      description: "Label each part of 10.15.7.23/16 as network vs host"
    },
    stickingPoints: [
      {
        issue: "Thinking classes still matter",
        remedy: "Stress that CIDR replaced them in 1993"
      }
    ],
    estimatedTime: 30,
    prerequisites: [2]
  },
  
  {
    id: 4,
    title: "Subnet Masks & CIDR Notation",
    goal: "Master mask representations",
    objectives: [
      "Translate between dotted-decimal mask and slash notation up to /30",
      "Explain why /31 and /32 behave specially"
    ],
    activities: [
      {
        type: "reference",
        title: "Build a mask ladder",
        description: "Create reference: /8 = 255.0.0.0, /9 = 255.128.0.0, etc."
      },
      {
        type: "exercise",
        title: "Slide the bar",
        description: "Paper exercise: slide the 'bar' one bit at a time"
      }
    ],
    assessment: {
      type: "conversion",
      prompt: "Convert between mask formats",
      description: "Provide five masks in either form; learner must supply the other form and number of host bits"
    },
    stickingPoints: [
      {
        issue: "/24 vs 255.255.255.0 confusion",
        remedy: "Repetitive drills; keep ladder sheet posted"
      }
    ],
    estimatedTime: 45,
    prerequisites: [3]
  },
  
  {
    id: 5,
    title: "Fixed-Length Subnet Calculations",
    goal: "Core subnet math skills",
    objectives: [
      "Given network & new prefix, calculate: number of subnets, hosts per subnet, block size, first & last usable, broadcast",
      "Recognize invalid host addresses"
    ],
    activities: [
      {
        type: "formula",
        title: "Formula review",
        description: "hosts = 2^(host bits) – 2, subnets = 2^(borrowed bits)"
      },
      {
        type: "worksheet",
        title: "Step-by-step practice",
        description: "Work through 192.168.0.0/24 subdivided into /26, /28, etc."
      },
      {
        type: "drill",
        title: "Speed rounds",
        description: "What subnet does 172.22.37.129/20 belong to?"
      }
    ],
    assessment: {
      type: "problem-set",
      prompt: "Complete subnet calculations",
      description: "Comprehensive problem set (5 networks). Must score ≥ 80% and self-explain any error",
      passingScore: 80
    },
    stickingPoints: [
      {
        issue: "Off-by-one: forgetting to reserve network & broadcast",
        remedy: "Always subtract 2 from total addresses for usable hosts"
      },
      {
        issue: "Using decimal math on block size",
        remedy: "Always derive from binary boundary first"
      }
    ],
    estimatedTime: 60,
    prerequisites: [4]
  },
  
  {
    id: 6,
    title: "Variable Length Subnet Masking (VLSM) & Address Planning",
    goal: "Efficient network design",
    objectives: [
      "Allocate subnets of different sizes from a single pool without overlap",
      "Prioritize largest to smallest when carving",
      "Produce a clean address plan table"
    ],
    activities: [
      {
        type: "scenario",
        title: "Realistic network design",
        description: "HQ + 3 branches needing 250, 60, 30, 14 hosts"
      },
      {
        type: "visual",
        title: "Binary tree visualization",
        description: "Draw visual binary tree to show split points"
      },
      {
        type: "lab",
        title: "Spreadsheet planning",
        description: "Create address plan showing allocations and gaps"
      }
    ],
    assessment: {
      type: "design",
      prompt: "Create VLSM plan",
      description: "Design a VLSM plan for 10.10.0.0/22 given four department sizes; instructor checks for no overlap, correct ranges"
    },
    stickingPoints: [
      {
        issue: "Forgetting to sort by size",
        remedy: "Enforce rule: 'biggest networks first'"
      },
      {
        issue: "Address wastage",
        remedy: "Calculate utilization % as feedback"
      }
    ],
    estimatedTime: 60,
    prerequisites: [5]
  },
  
  {
    id: 7,
    title: "Subnetting in Practice: Routing & ACL Implications",
    goal: "Real-world applications",
    objectives: [
      "Explain how routers use the mask to make forwarding decisions (longest-prefix match)",
      "Predict which subnets a summarized route covers",
      "Identify when two ACL entries overlap because of subnet math"
    ],
    activities: [
      {
        type: "demo",
        title: "Packet tracer simulation",
        description: "Demo with a packet tracer / simulator (no coding)"
      },
      {
        type: "puzzle",
        title: "ACL overlap puzzle",
        description: "Determine which ACL rule wins in overlapping scenarios"
      }
    ],
    assessment: {
      type: "routing",
      prompt: "Routing decisions",
      description: "Given a routing table, determine next-hop for three sample destinations"
    },
    stickingPoints: [
      {
        issue: "Misreading 'longest prefix'",
        remedy: "Analogy: exact street address vs only ZIP code"
      }
    ],
    estimatedTime: 45,
    prerequisites: [6]
  },
  
  {
    id: 8,
    title: "IPv6 Subnet Fundamentals",
    goal: "Modern protocol skills",
    objectives: [
      "Recognize 128-bit address, hexadecimal quartet notation",
      "Explain the concept '/64 is the normal host subnet'",
      "Calculate simple IPv6 sub-prefixes (/56 → /60, /64, /126)"
    ],
    activities: [
      {
        type: "lesson",
        title: "Compression rules",
        description: "Learn :: compression and leading zero removal"
      },
      {
        type: "comparison",
        title: "IPv4 vs IPv6",
        description: "Compare IPv4 /30 to IPv6 /126 for point-to-point links"
      }
    ],
    assessment: {
      type: "conversion",
      prompt: "IPv6 address manipulation",
      description: "Convert 2001:0db8:0000:0000:0200:00ff:fe00:0042 to compressed form and list network vs interface ID for /64"
    },
    stickingPoints: [
      {
        issue: "Hexadecimal unfamiliarity",
        remedy: "Quick refresher; show that hex-to-binary is 1:4 mapping"
      }
    ],
    estimatedTime: 45,
    prerequisites: [7]
  },
  
  {
    id: 9,
    title: "Verification & Troubleshooting Tools",
    goal: "Practical validation skills",
    objectives: [
      "Use ipcalc (Linux/WSL or web), ping, traceroute, and whois to verify subnet plans",
      "Spot common misconfigurations (mask mismatch, overlapping ranges, wrong gateway)"
    ],
    activities: [
      {
        type: "lab",
        title: "Live troubleshooting",
        description: "Fix mis-configured VM network adapter"
      },
      {
        type: "checklist",
        title: "Deployment checklist",
        description: "Create template for real deployments"
      }
    ],
    assessment: {
      type: "troubleshooting",
      prompt: "Diagnose network issue",
      description: "Instructor deliberately breaks one parameter; learner diagnoses and documents fix"
    },
    stickingPoints: [
      {
        issue: "Assuming the math is wrong when the config is",
        remedy: "Teach to check both calculations and configuration"
      }
    ],
    estimatedTime: 45,
    prerequisites: [8]
  }
]

export const capstoneProject = {
  title: "Graduation Capstone",
  description: "Design a complete address plan for a fictitious 12-site company (HQ + 11 branches, VPN, guest Wi-Fi, management VLANs)",
  deliverables: [
    "Addressing spreadsheet",
    "Summarization map",
    "One-page rationale"
  ],
  evaluation: {
    criteria: [
      "100% routability",
      "< 10% wastage in any /24-sized block",
      "Correct masking throughout"
    ],
    format: "Oral defense encouraged"
  },
  prerequisites: [9]
}

export const studyTips = [
  {
    tip: "Paper first, software second",
    description: "Manual work cements intuition"
  },
  {
    tip: "Flash cards",
    description: "For powers of two, masks, and slash equivalents"
  },
  {
    tip: "Teach-back",
    description: "Have learner explain today's topic to a rubber duck or peer"
  }
]

export const timeline = {
  typical: [
    { week: 1, modules: [0, 1, 2] },
    { week: 2, modules: [3, 4] },
    { week: 3, modules: [5] },
    { week: 4, modules: [6, 7] },
    { week: 5, modules: [8, 9], includes: "Capstone" }
  ],
  note: "Learners can accelerate or decelerate; assessment gates keep them from advancing with gaps"
}

export const commonStickingPoints = [
  {
    issue: "Mixing decimal & binary columns",
    intervention: "Always write both under each octet until fluent"
  },
  {
    issue: "Forgetting network & broadcast reservations",
    intervention: "'N-B rule' chant before every host-count calculation"
  },
  {
    issue: "Off-by-one in block sizes",
    intervention: "Draw boundaries on binary timeline; highlight first/last"
  },
  {
    issue: "Mask ↔ slash memory lapse",
    intervention: "Keep 'mask ladder' card taped to monitor"
  },
  {
    issue: "VLSM overlap",
    intervention: "Print tree diagram; check that sibling ranges never mix"
  }
]

// Helper function to get module by ID
export const getModuleById = (id) => {
  return modules.find(module => module.id === parseInt(id))
}

// Helper function to get module prerequisites
export const getPrerequisites = (moduleId) => {
  const module = getModuleById(moduleId)
  if (!module) return []
  return module.prerequisites.map(id => modules[id])
}

// Helper function to check if prerequisites are met
export const arePrerequisitesMet = (moduleId, completedModules) => {
  const module = getModuleById(moduleId)
  if (!module) return false
  return module.prerequisites.every(prereqId => completedModules.includes(prereqId))
}
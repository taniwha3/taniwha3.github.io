// Quiz questions for each module
export const quizQuestions = {
  0: [
    {
      id: 'q0-1',
      type: 'multiple-choice',
      question: 'What is the primary purpose of subnetting?',
      options: [
        'To make networks faster',
        'To divide networks and control broadcast domains',
        'To encrypt network traffic',
        'To connect to the internet'
      ],
      correctAnswer: 1,
      explanation: 'Subnetting divides a network into smaller segments, controlling broadcast domains and conserving IP addresses.'
    },
    {
      id: 'q0-2',
      type: 'multiple-choice',
      question: 'Why might a home user benefit from subnetting?',
      options: [
        'Faster internet speeds',
        'Lower electricity bills',
        'IoT device isolation',
        'Better Wi-Fi range'
      ],
      correctAnswer: 2,
      explanation: 'Subnetting allows home users to isolate IoT devices on separate network segments for security.'
    },
    {
      id: 'q0-3',
      type: 'true-false',
      question: 'Subnetting requires advanced programming knowledge.',
      correctAnswer: false,
      explanation: 'Subnetting only requires basic math: addition, subtraction, powers of 2, and logical AND operations.'
    },
    {
      id: 'q0-4',
      type: 'multiple-choice',
      question: 'What does subnetting help conserve?',
      options: [
        'Bandwidth',
        'IP addresses',
        'CPU cycles',
        'Memory'
      ],
      correctAnswer: 1,
      explanation: 'Subnetting helps conserve IP addresses by allowing efficient allocation based on actual needs.'
    },
    {
      id: 'q0-5',
      type: 'true-false',
      question: 'Broadcast domains can be controlled through subnetting.',
      correctAnswer: true,
      explanation: 'Each subnet forms its own broadcast domain, limiting broadcast traffic to that subnet.'
    }
  ],
  
  1: [
    {
      id: 'q1-1',
      type: 'conversion',
      question: 'Convert 192 to binary (8 bits):',
      correctAnswer: '11000000',
      explanation: '192 = 128 + 64 = 11000000'
    },
    {
      id: 'q1-2',
      type: 'conversion',
      question: 'Convert 10101100 to decimal:',
      correctAnswer: '172',
      explanation: '10101100 = 128 + 32 + 8 + 4 = 172'
    },
    {
      id: 'q1-3',
      type: 'multiple-choice',
      question: 'What is 2^5?',
      options: ['16', '32', '64', '128'],
      correctAnswer: 1,
      explanation: '2^5 = 32'
    },
    {
      id: 'q1-4',
      type: 'fill-in',
      question: 'The highest power of 2 less than 200 is ___',
      correctAnswer: '128',
      acceptableAnswers: ['128', '2^7'],
      explanation: '2^7 = 128 < 200, while 2^8 = 256 > 200'
    },
    {
      id: 'q1-5',
      type: 'conversion',
      question: 'Convert 255 to binary (8 bits):',
      correctAnswer: '11111111',
      explanation: '255 = 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 11111111'
    }
  ],
  
  2: [
    {
      id: 'q2-1',
      type: 'calculation',
      question: 'Calculate: 11001100 AND 11110000',
      correctAnswer: '11000000',
      explanation: 'AND operation: 1 AND 1 = 1, all other combinations = 0'
    },
    {
      id: 'q2-2',
      type: 'multiple-choice',
      question: 'What is the result of 1 AND 0?',
      options: ['0', '1', '10', 'undefined'],
      correctAnswer: 0,
      explanation: 'In AND operation, 1 AND 0 = 0'
    },
    {
      id: 'q2-3',
      type: 'true-false',
      question: 'AND operation is used to find the network portion of an IP address.',
      correctAnswer: true,
      explanation: 'IP address AND subnet mask = network address'
    },
    {
      id: 'q2-4',
      type: 'calculation',
      question: 'What is 192.168.1.100 AND 255.255.255.0?',
      correctAnswer: '192.168.1.0',
      explanation: 'The AND operation with the mask zeros out the host portion'
    },
    {
      id: 'q2-5',
      type: 'multiple-choice',
      question: 'Which mnemonic helps remember AND vs OR?',
      options: [
        'AND adds',
        'AND narrows',
        'AND amplifies',
        'AND activates'
      ],
      correctAnswer: 1,
      explanation: 'AND narrows - it only outputs 1 when both inputs are 1'
    }
  ],
  
  3: [
    {
      id: 'q3-1',
      type: 'multiple-choice',
      question: 'How many octets are in an IPv4 address?',
      options: ['2', '3', '4', '8'],
      correctAnswer: 2,
      explanation: 'IPv4 addresses have 4 octets (e.g., 192.168.1.1)'
    },
    {
      id: 'q3-2',
      type: 'identification',
      question: 'In 10.15.7.23/16, which octets represent the network portion?',
      correctAnswer: '10.15',
      acceptableAnswers: ['10.15', 'first two', 'first 2'],
      explanation: '/16 means the first 16 bits (2 octets) are the network portion'
    },
    {
      id: 'q3-3',
      type: 'true-false',
      question: 'Class-based addressing (A, B, C) is still the primary method used today.',
      correctAnswer: false,
      explanation: 'CIDR (Classless Inter-Domain Routing) replaced class-based addressing in 1993'
    },
    {
      id: 'q3-4',
      type: 'multiple-choice',
      question: 'How many bits are in an IPv4 address?',
      options: ['8', '16', '32', '64'],
      correctAnswer: 2,
      explanation: 'IPv4 addresses are 32 bits (4 octets × 8 bits each)'
    },
    {
      id: 'q3-5',
      type: 'analogy',
      question: 'In the street/house analogy, the network portion is like the:',
      options: ['House number', 'Street name', 'City', 'Mailbox'],
      correctAnswer: 1,
      explanation: 'Network = street, Host = house number'
    }
  ],
  
  4: [
    {
      id: 'q4-1',
      type: 'conversion',
      question: 'Convert /24 to dotted decimal:',
      correctAnswer: '255.255.255.0',
      explanation: '/24 means first 24 bits are 1s: 11111111.11111111.11111111.00000000'
    },
    {
      id: 'q4-2',
      type: 'conversion',
      question: 'Convert 255.255.240.0 to CIDR notation:',
      correctAnswer: '/20',
      acceptableAnswers: ['/20', '20'],
      explanation: '255.255.240.0 has 20 consecutive 1s'
    },
    {
      id: 'q4-3',
      type: 'multiple-choice',
      question: 'How many host bits in a /28 network?',
      options: ['4', '8', '16', '28'],
      correctAnswer: 0,
      explanation: '32 total bits - 28 network bits = 4 host bits'
    },
    {
      id: 'q4-4',
      type: 'true-false',
      question: '/32 represents a single host address.',
      correctAnswer: true,
      explanation: '/32 means all 32 bits are network bits, leaving 0 host bits'
    },
    {
      id: 'q4-5',
      type: 'conversion',
      question: 'What is the next mask after /16?',
      correctAnswer: '/17',
      acceptableAnswers: ['/17', '255.128.0.0'],
      explanation: '/17 = 255.128.0.0 (one more bit than /16)'
    }
  ],
  
  5: [
    {
      id: 'q5-1',
      type: 'calculation',
      question: 'How many usable host addresses in a /27 network?',
      correctAnswer: '30',
      explanation: '2^5 - 2 = 32 - 2 = 30 usable hosts'
    },
    {
      id: 'q5-2',
      type: 'calculation',
      question: 'What is the block size for a /26 subnet?',
      correctAnswer: '64',
      explanation: '2^(32-26) = 2^6 = 64 addresses per block'
    },
    {
      id: 'q5-3',
      type: 'identification',
      question: 'What subnet does 172.16.37.129/25 belong to?',
      correctAnswer: '172.16.37.128',
      explanation: '/25 has blocks of 128. 129 falls in the 128-255 block'
    },
    {
      id: 'q5-4',
      type: 'calculation',
      question: 'If you subnet 192.168.1.0/24 into /26, how many subnets do you get?',
      correctAnswer: '4',
      explanation: '2^(26-24) = 2^2 = 4 subnets'
    },
    {
      id: 'q5-5',
      type: 'true-false',
      question: 'The first and last addresses in a subnet are always usable for hosts.',
      correctAnswer: false,
      explanation: 'First address is the network address, last is the broadcast address'
    }
  ],
  
  6: [
    {
      id: 'q6-1',
      type: 'ordering',
      question: 'When implementing VLSM, allocate subnets in which order?',
      options: [
        'Smallest to largest',
        'Largest to smallest',
        'Random order',
        'Alphabetical order'
      ],
      correctAnswer: 1,
      explanation: 'Always allocate largest subnets first to avoid fragmentation'
    },
    {
      id: 'q6-2',
      type: 'scenario',
      question: 'You need subnets for 60, 30, and 250 hosts. Which gets allocated first?',
      correctAnswer: '250',
      explanation: 'Largest requirement (250 hosts) must be allocated first'
    },
    {
      id: 'q6-3',
      type: 'calculation',
      question: 'What size subnet is needed for 60 hosts?',
      correctAnswer: '/26',
      acceptableAnswers: ['/26', '64'],
      explanation: '2^6 = 64 addresses, 62 usable hosts (sufficient for 60)'
    },
    {
      id: 'q6-4',
      type: 'true-false',
      question: 'VLSM allows different subnet sizes within the same network.',
      correctAnswer: true,
      explanation: 'Variable Length Subnet Masking enables efficient use of address space'
    },
    {
      id: 'q6-5',
      type: 'design',
      question: 'What is acceptable utilization percentage for a subnet?',
      options: [
        'Under 50%',
        'Over 50%',
        'Exactly 100%',
        'Doesn\'t matter'
      ],
      correctAnswer: 1,
      explanation: 'Good design aims for >50% utilization to avoid waste'
    }
  ],
  
  7: [
    {
      id: 'q7-1',
      type: 'multiple-choice',
      question: 'What does "longest prefix match" mean in routing?',
      options: [
        'The oldest route wins',
        'The most specific route wins',
        'The shortest route wins',
        'The newest route wins'
      ],
      correctAnswer: 1,
      explanation: 'Routers choose the route with the most specific (longest) prefix'
    },
    {
      id: 'q7-2',
      type: 'scenario',
      question: 'Routes exist for 10.0.0.0/8 and 10.1.0.0/16. Which matches 10.1.1.1?',
      correctAnswer: '10.1.0.0/16',
      explanation: '/16 is more specific (longer prefix) than /8'
    },
    {
      id: 'q7-3',
      type: 'true-false',
      question: 'ACL rules can overlap due to subnet boundaries.',
      correctAnswer: true,
      explanation: 'Overlapping subnets in ACLs can cause unexpected behavior'
    },
    {
      id: 'q7-4',
      type: 'calculation',
      question: 'What addresses does 192.168.0.0/22 summarize?',
      correctAnswer: '192.168.0.0 - 192.168.3.255',
      acceptableAnswers: ['192.168.0.0-192.168.3.255', '192.168.0.0 to 192.168.3.255'],
      explanation: '/22 covers 4 /24 networks (0, 1, 2, and 3)'
    },
    {
      id: 'q7-5',
      type: 'analogy',
      question: 'Longest prefix match is like using:',
      options: [
        'Only ZIP code',
        'Full street address',
        'Just the state',
        'Country code'
      ],
      correctAnswer: 1,
      explanation: 'More specific (longer) prefixes are like complete addresses'
    }
  ],
  
  8: [
    {
      id: 'q8-1',
      type: 'multiple-choice',
      question: 'How many bits in an IPv6 address?',
      options: ['32', '64', '128', '256'],
      correctAnswer: 2,
      explanation: 'IPv6 addresses are 128 bits long'
    },
    {
      id: 'q8-2',
      type: 'conversion',
      question: 'Compress: 2001:0db8:0000:0000:0000:0000:0000:0001',
      correctAnswer: '2001:db8::1',
      explanation: 'Remove leading zeros and compress consecutive zero groups with ::'
    },
    {
      id: 'q8-3',
      type: 'true-false',
      question: '/64 is the standard subnet size for IPv6 LANs.',
      correctAnswer: true,
      explanation: '/64 leaves 64 bits for the interface ID, standard for LANs'
    },
    {
      id: 'q8-4',
      type: 'identification',
      question: 'In 2001:db8::/32, how many bits are for subnetting?',
      correctAnswer: '32',
      acceptableAnswers: ['32', '32 bits', '/32 to /64 = 32 bits'],
      explanation: 'Between the /32 allocation and /64 subnets = 32 bits for subnetting'
    },
    {
      id: 'q8-5',
      type: 'comparison',
      question: 'IPv6 /126 is equivalent to IPv4:',
      options: ['/30', '/31', '/32', '/24'],
      correctAnswer: 0,
      explanation: 'Both /126 (IPv6) and /30 (IPv4) provide 2 usable addresses'
    }
  ],
  
  9: [
    {
      id: 'q9-1',
      type: 'tools',
      question: 'Which tool calculates subnet information from CIDR notation?',
      options: ['ping', 'traceroute', 'ipcalc', 'nslookup'],
      correctAnswer: 2,
      explanation: 'ipcalc is specifically designed for subnet calculations'
    },
    {
      id: 'q9-2',
      type: 'troubleshooting',
      question: 'A host with 192.168.1.100/24 cannot reach 192.168.1.200/25. Why?',
      correctAnswer: 'Subnet mask mismatch',
      acceptableAnswers: ['mask mismatch', 'different masks', 'different subnets'],
      explanation: '/25 creates two /25 subnets within the /24, causing isolation'
    },
    {
      id: 'q9-3',
      type: 'true-false',
      question: 'Always blame the subnet calculations before checking the configuration.',
      correctAnswer: false,
      explanation: 'Check both calculations AND configuration - often it\'s a config error'
    },
    {
      id: 'q9-4',
      type: 'identification',
      question: 'What indicates overlapping subnets?',
      options: [
        'Slow network speed',
        'Duplicate IP warnings',
        'High CPU usage',
        'DNS failures'
      ],
      correctAnswer: 1,
      explanation: 'Overlapping subnets often cause IP conflict warnings'
    },
    {
      id: 'q9-5',
      type: 'verification',
      question: 'Before deployment, verify subnet plans using:',
      options: [
        'Speed tests only',
        'Calculations and tools',
        'User feedback',
        'Management approval'
      ],
      correctAnswer: 1,
      explanation: 'Use both manual calculations and tools like ipcalc to verify'
    }
  ]
}

// Helper function to get quiz for a module
export const getModuleQuiz = (moduleId) => {
  return quizQuestions[moduleId] || []
}

// Helper function to check answer
export const checkAnswer = (question, userAnswer) => {
  if (question.type === 'multiple-choice' || question.type === 'true-false') {
    return userAnswer === question.correctAnswer
  }
  
  if (question.type === 'conversion' || question.type === 'calculation' || 
      question.type === 'identification' || question.type === 'fill-in') {
    const normalizedUser = userAnswer.toString().toLowerCase().trim()
    const normalizedCorrect = question.correctAnswer.toString().toLowerCase().trim()
    
    if (normalizedUser === normalizedCorrect) return true
    
    // Check acceptable answers if provided
    if (question.acceptableAnswers) {
      return question.acceptableAnswers.some(answer => 
        normalizedUser === answer.toString().toLowerCase().trim()
      )
    }
  }
  
  return false
}

// Get random quiz questions for practice
export const getRandomQuestions = (moduleId, count = 5) => {
  const moduleQuestions = quizQuestions[moduleId] || []
  const shuffled = [...moduleQuestions].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}
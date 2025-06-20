// Practice exercises for each module
export const exercises = {
  1: {
    title: "Binary Conversion Practice",
    exercises: [
      {
        type: "decimal-to-binary",
        problems: [
          { decimal: 10, binary: "00001010" },
          { decimal: 25, binary: "00011001" },
          { decimal: 100, binary: "01100100" },
          { decimal: 200, binary: "11001000" },
          { decimal: 255, binary: "11111111" },
          { decimal: 128, binary: "10000000" },
          { decimal: 192, binary: "11000000" },
          { decimal: 172, binary: "10101100" },
          { decimal: 16, binary: "00010000" },
          { decimal: 31, binary: "00011111" }
        ]
      },
      {
        type: "binary-to-decimal",
        problems: [
          { binary: "00001100", decimal: 12 },
          { binary: "00110011", decimal: 51 },
          { binary: "10000001", decimal: 129 },
          { binary: "11110000", decimal: 240 },
          { binary: "01010101", decimal: 85 },
          { binary: "11111110", decimal: 254 },
          { binary: "00100000", decimal: 32 },
          { binary: "10101010", decimal: 170 },
          { binary: "11000011", decimal: 195 },
          { binary: "00001111", decimal: 15 }
        ]
      },
      {
        type: "powers-of-two",
        problems: [
          { power: 0, value: 1 },
          { power: 1, value: 2 },
          { power: 2, value: 4 },
          { power: 3, value: 8 },
          { power: 4, value: 16 },
          { power: 5, value: 32 },
          { power: 6, value: 64 },
          { power: 7, value: 128 },
          { power: 8, value: 256 }
        ]
      }
    ]
  },
  
  2: {
    title: "Bitwise AND Operations",
    exercises: [
      {
        type: "and-operation",
        problems: [
          {
            operand1: "11001100",
            operand2: "11110000",
            result: "11000000"
          },
          {
            operand1: "10101010",
            operand2: "11111111",
            result: "10101010"
          },
          {
            operand1: "11111111",
            operand2: "00000000",
            result: "00000000"
          },
          {
            operand1: "10110011",
            operand2: "11111000",
            result: "10110000"
          },
          {
            operand1: "11000000",
            operand2: "11111111",
            result: "11000000"
          }
        ]
      },
      {
        type: "network-address",
        problems: [
          {
            ip: "192.168.1.100",
            mask: "255.255.255.0",
            network: "192.168.1.0"
          },
          {
            ip: "10.1.5.50",
            mask: "255.255.0.0",
            network: "10.1.0.0"
          },
          {
            ip: "172.16.20.100",
            mask: "255.255.240.0",
            network: "172.16.16.0"
          },
          {
            ip: "192.168.10.130",
            mask: "255.255.255.128",
            network: "192.168.10.128"
          },
          {
            ip: "10.0.0.200",
            mask: "255.0.0.0",
            network: "10.0.0.0"
          }
        ]
      }
    ]
  },
  
  3: {
    title: "IPv4 Address Structure",
    exercises: [
      {
        type: "identify-parts",
        problems: [
          {
            address: "192.168.1.100/24",
            network: "192.168.1",
            host: "100"
          },
          {
            address: "10.0.0.1/8",
            network: "10",
            host: "0.0.1"
          },
          {
            address: "172.16.50.25/16",
            network: "172.16",
            host: "50.25"
          },
          {
            address: "192.168.100.200/28",
            network: "192.168.100.192",
            host: "8"
          },
          {
            address: "10.20.30.40/20",
            network: "10.20.16.0",
            host: "14.40"
          }
        ]
      }
    ]
  },
  
  4: {
    title: "Subnet Mask Conversions",
    exercises: [
      {
        type: "cidr-to-mask",
        problems: [
          { cidr: "/8", mask: "255.0.0.0" },
          { cidr: "/16", mask: "255.255.0.0" },
          { cidr: "/24", mask: "255.255.255.0" },
          { cidr: "/25", mask: "255.255.255.128" },
          { cidr: "/26", mask: "255.255.255.192" },
          { cidr: "/27", mask: "255.255.255.224" },
          { cidr: "/28", mask: "255.255.255.240" },
          { cidr: "/29", mask: "255.255.255.248" },
          { cidr: "/30", mask: "255.255.255.252" },
          { cidr: "/20", mask: "255.255.240.0" }
        ]
      },
      {
        type: "mask-to-cidr",
        problems: [
          { mask: "255.255.255.0", cidr: "/24" },
          { mask: "255.255.0.0", cidr: "/16" },
          { mask: "255.255.255.128", cidr: "/25" },
          { mask: "255.255.255.192", cidr: "/26" },
          { mask: "255.255.240.0", cidr: "/20" },
          { mask: "255.255.255.224", cidr: "/27" },
          { mask: "255.255.248.0", cidr: "/21" },
          { mask: "255.255.252.0", cidr: "/22" },
          { mask: "255.255.255.240", cidr: "/28" },
          { mask: "255.255.255.252", cidr: "/30" }
        ]
      }
    ]
  },
  
  5: {
    title: "Subnet Calculations",
    exercises: [
      {
        type: "subnet-info",
        problems: [
          {
            network: "192.168.1.0/24",
            subnets: "/26",
            numSubnets: 4,
            hostsPerSubnet: 62,
            subnetList: [
              "192.168.1.0/26",
              "192.168.1.64/26",
              "192.168.1.128/26",
              "192.168.1.192/26"
            ]
          },
          {
            network: "10.0.0.0/16",
            subnets: "/20",
            numSubnets: 16,
            hostsPerSubnet: 4094,
            subnetList: [
              "10.0.0.0/20",
              "10.0.16.0/20",
              "10.0.32.0/20",
              "10.0.48.0/20"
            ]
          },
          {
            network: "172.16.0.0/16",
            subnets: "/24",
            numSubnets: 256,
            hostsPerSubnet: 254,
            subnetList: [
              "172.16.0.0/24",
              "172.16.1.0/24",
              "172.16.2.0/24",
              "172.16.3.0/24"
            ]
          }
        ]
      },
      {
        type: "find-subnet",
        problems: [
          {
            address: "192.168.1.100/26",
            subnet: "192.168.1.64/26",
            firstUsable: "192.168.1.65",
            lastUsable: "192.168.1.126",
            broadcast: "192.168.1.127"
          },
          {
            address: "10.1.5.200/24",
            subnet: "10.1.5.0/24",
            firstUsable: "10.1.5.1",
            lastUsable: "10.1.5.254",
            broadcast: "10.1.5.255"
          },
          {
            address: "172.20.100.50/28",
            subnet: "172.20.100.48/28",
            firstUsable: "172.20.100.49",
            lastUsable: "172.20.100.62",
            broadcast: "172.20.100.63"
          }
        ]
      }
    ]
  },
  
  6: {
    title: "VLSM Design Practice",
    exercises: [
      {
        type: "vlsm-planning",
        problems: [
          {
            network: "192.168.10.0/24",
            requirements: [
              { name: "Sales", hosts: 60 },
              { name: "Engineering", hosts: 30 },
              { name: "Management", hosts: 12 },
              { name: "Servers", hosts: 6 }
            ],
            solution: [
              { name: "Sales", subnet: "192.168.10.0/26", hosts: 62 },
              { name: "Engineering", subnet: "192.168.10.64/27", hosts: 30 },
              { name: "Management", subnet: "192.168.10.96/28", hosts: 14 },
              { name: "Servers", subnet: "192.168.10.112/29", hosts: 6 }
            ]
          },
          {
            network: "10.10.0.0/22",
            requirements: [
              { name: "Building A", hosts: 250 },
              { name: "Building B", hosts: 120 },
              { name: "Building C", hosts: 60 },
              { name: "DMZ", hosts: 14 }
            ],
            solution: [
              { name: "Building A", subnet: "10.10.0.0/24", hosts: 254 },
              { name: "Building B", subnet: "10.10.1.0/25", hosts: 126 },
              { name: "Building C", subnet: "10.10.1.128/26", hosts: 62 },
              { name: "DMZ", subnet: "10.10.1.192/28", hosts: 14 }
            ]
          }
        ]
      }
    ]
  },
  
  7: {
    title: "Routing and ACL Practice",
    exercises: [
      {
        type: "route-selection",
        problems: [
          {
            destination: "10.1.5.100",
            routes: [
              "10.0.0.0/8",
              "10.1.0.0/16",
              "10.1.5.0/24"
            ],
            selected: "10.1.5.0/24",
            reason: "Longest prefix match"
          },
          {
            destination: "192.168.1.50",
            routes: [
              "0.0.0.0/0",
              "192.168.0.0/16",
              "192.168.1.0/24",
              "192.168.1.32/27"
            ],
            selected: "192.168.1.32/27",
            reason: "Most specific route"
          }
        ]
      },
      {
        type: "summarization",
        problems: [
          {
            networks: [
              "192.168.0.0/24",
              "192.168.1.0/24",
              "192.168.2.0/24",
              "192.168.3.0/24"
            ],
            summary: "192.168.0.0/22"
          },
          {
            networks: [
              "10.1.0.0/24",
              "10.1.1.0/24"
            ],
            summary: "10.1.0.0/23"
          }
        ]
      }
    ]
  },
  
  8: {
    title: "IPv6 Practice",
    exercises: [
      {
        type: "ipv6-compression",
        problems: [
          {
            full: "2001:0db8:0000:0000:0000:0000:0000:0001",
            compressed: "2001:db8::1"
          },
          {
            full: "fe80:0000:0000:0000:0204:0061:0000:0001",
            compressed: "fe80::204:61:0:1"
          },
          {
            full: "2001:0db8:0000:0001:0000:0000:0000:0000",
            compressed: "2001:db8:0:1::"
          }
        ]
      },
      {
        type: "ipv6-subnetting",
        problems: [
          {
            network: "2001:db8::/32",
            subnet: "/48",
            numSubnets: 65536,
            examples: [
              "2001:db8:0::/48",
              "2001:db8:1::/48",
              "2001:db8:2::/48"
            ]
          },
          {
            network: "2001:db8:1234::/48",
            subnet: "/64",
            numSubnets: 65536,
            examples: [
              "2001:db8:1234:0::/64",
              "2001:db8:1234:1::/64",
              "2001:db8:1234:2::/64"
            ]
          }
        ]
      }
    ]
  },
  
  9: {
    title: "Troubleshooting Scenarios",
    exercises: [
      {
        type: "diagnose-issue",
        problems: [
          {
            scenario: "Host A (192.168.1.10/24) cannot ping Host B (192.168.1.200/25)",
            issue: "Subnet mask mismatch",
            solution: "Both hosts need the same subnet mask"
          },
          {
            scenario: "Router shows overlapping subnet errors",
            issue: "VLSM overlap",
            solution: "Redesign subnets to eliminate overlap"
          },
          {
            scenario: "New subnet 10.1.2.0/24 has no connectivity",
            issue: "Missing route",
            solution: "Add route to upstream router"
          }
        ]
      },
      {
        type: "verification-checklist",
        items: [
          "Verify IP address assignment",
          "Check subnet mask consistency",
          "Confirm default gateway",
          "Test with ping and traceroute",
          "Review routing table",
          "Check for overlapping subnets",
          "Verify VLAN configuration",
          "Confirm DNS settings"
        ]
      }
    ]
  }
}

// Generate random practice problems
export const generatePracticeSet = (moduleId, count = 5) => {
  const moduleExercises = exercises[moduleId]
  if (!moduleExercises) return []
  
  const problems = []
  const exerciseTypes = moduleExercises.exercises
  
  for (let i = 0; i < count && i < exerciseTypes.length; i++) {
    const exercise = exerciseTypes[i]
    if (exercise.problems && exercise.problems.length > 0) {
      const randomProblem = exercise.problems[
        Math.floor(Math.random() * exercise.problems.length)
      ]
      problems.push({
        type: exercise.type,
        problem: randomProblem
      })
    }
  }
  
  return problems
}

// Validate exercise answer
export const validateExercise = (exercise, userAnswer) => {
  // Implementation depends on exercise type
  // This is a placeholder that would need to be expanded
  return {
    correct: false,
    feedback: "Answer validation not yet implemented"
  }
}
// Module content with lessons, examples, and interactive elements
export const moduleContent = {
  0: {
    title: "Why Subnetting Matters",
    sections: [
      {
        type: "introduction",
        title: "Welcome to Subnetting",
        content: `
Imagine you're organizing a large office building. You wouldn't put everyone in one giant room - you'd create departments, meeting rooms, and private offices. That's exactly what subnetting does for computer networks.

**Subnetting** is the practice of dividing a network into smaller, more manageable pieces. It's like creating neighborhoods within a city, each with its own identity and boundaries.
        `
      },
      {
        type: "real-world",
        title: "Real-World Example: Your Home Network",
        content: `
Let's start with something familiar - your home network. Right now, all your devices (phones, laptops, smart TVs, IoT devices) are probably on the same network. This works fine for a home, but imagine if:

- Your smart doorbell could see all the files on your laptop
- A compromised IoT device could attack your work computer
- Your kids' gaming traffic slowed down your work video calls

With subnetting, you could create separate networks:
- **Main Network**: Your work devices and important computers
- **IoT Network**: Smart home devices (isolated for security)
- **Guest Network**: Visitors' devices (no access to your files)
- **Kids Network**: Gaming consoles and tablets (with parental controls)

Each subnet is like a gated community - devices can only talk to others in their community unless you specifically allow it.
        `
      },
      {
        type: "business-case",
        title: "Why Businesses Need Subnetting",
        content: `
For businesses, subnetting is essential:

**1. Security**: Isolate sensitive departments
- Finance subnet: Only accounting can access
- HR subnet: Protected employee data
- Guest subnet: Visitors can't access internal resources

**2. Performance**: Reduce network congestion
- Broadcast traffic stays within subnets
- Network problems don't affect everyone
- Better bandwidth management

**3. Organization**: Logical network structure
- Building 1: 192.168.1.0/24
- Building 2: 192.168.2.0/24
- Remote office: 192.168.3.0/24

**4. Cost Savings**: Efficient IP address usage
- IPv4 addresses are limited and expensive
- Subnetting prevents waste
- Right-sized networks for each need
        `
      },
      {
        type: "key-concepts",
        title: "Core Concepts You'll Master",
        content: `
**1. Binary Math** (Don't worry, it's easier than it sounds!)
- Computers think in 1s and 0s
- IP addresses are just binary numbers in disguise
- You'll learn simple tricks to convert quickly

**2. Network vs Host**
- Network part: The street name (shared by all)
- Host part: The house number (unique to each)
- Subnet mask: The divider between them

**3. CIDR Notation**
- Modern way to write subnets
- Example: 192.168.1.0/24
- The /24 tells us the network size

**4. Address Calculation**
- Finding network addresses
- Calculating broadcast addresses
- Determining usable host ranges
        `
      },
      {
        type: "interactive-demo",
        title: "See Subnetting in Action",
        content: `
Let's visualize how a network gets divided. Imagine you have the network 192.168.1.0/24 (256 addresses).

**Without Subnetting:**
- All 254 devices on one network
- Everyone hears everyone's broadcasts
- One compromised device can scan all others

**With Subnetting (into 4 subnets):**
1. **Admin**: 192.168.1.0/26 (62 hosts)
2. **Sales**: 192.168.1.64/26 (62 hosts)
3. **Guest**: 192.168.1.128/26 (62 hosts)
4. **Servers**: 192.168.1.192/26 (62 hosts)

Each subnet is isolated - Sales can't directly access Admin computers!
        `
      },
      {
        type: "common-misconceptions",
        title: "Common Myths Debunked",
        content: `
**Myth 1**: "Subnetting is only for large companies"
**Reality**: Even home users benefit from network segmentation

**Myth 2**: "You need to be a math genius"
**Reality**: Basic addition and pattern recognition is all you need

**Myth 3**: "It's all done automatically now"
**Reality**: Understanding subnetting helps troubleshoot and design better networks

**Myth 4**: "IPv6 makes subnetting obsolete"
**Reality**: IPv6 still uses subnetting, just with bigger numbers
        `
      },
      {
        type: "summary",
        title: "What's Next?",
        content: `
By the end of this course, you'll be able to:
- Design efficient network layouts
- Troubleshoot connectivity issues
- Secure networks through segmentation
- Optimize IP address usage
- Speak confidently about networking

Ready to start? Let's begin with Module 1: Binary Basics!
        `
      }
    ],
    practice: {
      title: "Check Your Understanding",
      questions: [
        {
          question: "Why might a coffee shop use subnetting?",
          hint: "Think about different types of users and security needs.",
          answer: "To separate customer WiFi from their point-of-sale systems and business network for security."
        },
        {
          question: "What's the main benefit of isolating IoT devices on their own subnet?",
          hint: "Consider what happens if a smart device gets hacked.",
          answer: "Security - if an IoT device is compromised, it can't access your main computers and files."
        },
        {
          question: "How is subnetting like organizing a filing cabinet?",
          hint: "Think about organization and access control.",
          answer: "Just like folders separate different types of documents, subnets separate different types of network traffic and devices."
        }
      ]
    },
    keyTakeaways: [
      "Subnetting divides networks into smaller, manageable pieces",
      "It improves security by isolating different device groups",
      "Reduces network congestion and improves performance",
      "Essential for both home and business networks",
      "Based on simple binary math and patterns"
    ]
  },
  
  1: {
    title: "Binary Basics",
    sections: [
      {
        type: "introduction",
        title: "Why Binary Matters for Networking",
        content: `
Computers don't understand "192.168.1.1" - they only understand 1s and 0s. Every IP address is actually a 32-bit binary number in disguise. To truly understand subnetting, we need to peek behind the curtain and see what computers see.

Don't worry - binary is simpler than you think. It's just another way of counting, and you'll learn quick tricks to convert without doing complex math.
        `
      },
      {
        type: "concept",
        title: "Understanding Number Systems",
        content: `
**Decimal (Base 10)**: What humans use
- Uses digits 0-9
- Each position is a power of 10
- Example: 192 = (1×100) + (9×10) + (2×1)

**Binary (Base 2)**: What computers use
- Uses only 0 and 1
- Each position is a power of 2
- Example: 11000000 = 192 in decimal

**The Key Insight**: Each binary digit (bit) represents a power of 2:
- Position 8: 128
- Position 7: 64
- Position 6: 32
- Position 5: 16
- Position 4: 8
- Position 3: 4
- Position 2: 2
- Position 1: 1
        `
      },
      {
        type: "method",
        title: "Quick Conversion Method",
        content: `
**Decimal to Binary - The Subtraction Method:**

Let's convert 192 to binary:
1. Start with 192
2. Find the largest power of 2 that fits: 128 ✓
3. Subtract: 192 - 128 = 64
4. Next power that fits: 64 ✓
5. Subtract: 64 - 64 = 0
6. We're done!

Result: 128 + 64 = 11000000 in binary

**Powers of 2 to Memorize:**
- 2^7 = 128
- 2^6 = 64
- 2^5 = 32
- 2^4 = 16
- 2^3 = 8
- 2^2 = 4
- 2^1 = 2
- 2^0 = 1

**Pro Tip**: In networking, we always use 8-bit groups (octets), so 15 = 00001111 (8 bits), not just 1111 (4 bits). Always pad with leading zeros!
        `
      },
      {
        type: "interactive-tool",
        title: "Binary Converter Tool",
        component: "BinaryConverter"
      },
      {
        type: "patterns",
        title: "Patterns to Recognize",
        content: `
**Common IP Octet Values in Binary:**
- 0 = 00000000 (all zeros)
- 128 = 10000000 (just the first bit)
- 192 = 11000000 (first two bits)
- 224 = 11100000 (first three bits)
- 240 = 11110000 (first four bits)
- 248 = 11111000 (first five bits)
- 252 = 11111100 (first six bits)
- 254 = 11111110 (first seven bits)
- 255 = 11111111 (all ones)

**Notice the Pattern?** These are common subnet mask values! Each adds one more "1" bit from the left.
        `
      },
      {
        type: "practice-examples",
        title: "Let's Practice Together",
        content: `
**Example 1: Convert 168 to binary**
- 168 > 128? Yes! Take 128, remainder: 40
- 40 > 64? No
- 40 > 32? Yes! Take 32, remainder: 8
- 8 > 16? No
- 8 > 8? Yes! Take 8, remainder: 0
- Result: 128 + 32 + 8 = 10101000

**Example 2: Convert 11110000 to decimal**
- 1×128 = 128
- 1×64 = 64
- 1×32 = 32
- 1×16 = 16
- 0×8 = 0
- 0×4 = 0
- 0×2 = 0
- 0×1 = 0
- Total: 128 + 64 + 32 + 16 = 240

**Example 3: Full IP address**
192.168.1.100 in binary:
- 192 = 11000000
- 168 = 10101000
- 1 = 00000001
- 100 = 01100100
- Full: 11000000.10101000.00000001.01100100
        `
      },
      {
        type: "tips-tricks",
        title: "Speed Tips",
        content: `
**1. The Half-Way Method**
- 128 is half of 256 (the range of one octet)
- If a number is ≥ 128, the first bit is 1
- Subtract 128 and repeat with 64, 32, etc.

**2. Common Patterns**
- 255 = all 1s (8 bits on)
- 0 = all 0s (8 bits off)
- Powers of 2 = only one bit on

**3. Subnet Mask Shortcuts**
- /24 = 255.255.255.0 (3 full octets)
- /16 = 255.255.0.0 (2 full octets)
- /8 = 255.0.0.0 (1 full octet)

**4. Quick Check Method**
- Even numbers end in 0
- Odd numbers end in 1
- Numbers ≥ 128 start with 1
        `
      },
      {
        type: "summary",
        title: "Binary Mastery Achieved! 🎉",
        content: `
You now understand:
- How decimal and binary relate
- Quick conversion techniques
- Common patterns in IP addresses
- Why binary matters for subnetting

Next up: Module 2 - The AND Operation, where we'll use binary to find network addresses!
        `
      }
    ],
    practice: {
      title: "Binary Conversion Practice",
      questions: [
        {
          question: "Convert 172 to binary (show all 8 bits)",
          hint: "Start with 128. Does it fit? Then try 64, 32, 16, 8, 4, 2, 1",
          answer: "10101100 (128 + 32 + 8 + 4 = 172)"
        },
        {
          question: "Convert 00110011 to decimal",
          hint: "Add up the place values where you see a 1",
          answer: "51 (32 + 16 + 2 + 1 = 51)"
        },
        {
          question: "What's the largest number you can represent with 8 bits?",
          hint: "All bits set to 1",
          answer: "255 (11111111 in binary)"
        },
        {
          question: "Convert 10 to binary (8 bits)",
          hint: "Which powers of 2 add up to 10?",
          answer: "00001010 (8 + 2 = 10)"
        },
        {
          question: "Why do subnet masks often use values like 128, 192, 224, 240, 248, 252, 254, 255?",
          hint: "Look at their binary representations",
          answer: "They represent consecutive 1s from the left: 10000000, 11000000, 11100000, etc. Perfect for defining network/host boundaries!"
        }
      ],
      exercises: [
        {
          title: "Quick Conversions - Try these yourself:",
          instructions: "Use the binary converter tool above to check your work",
          problems: [
            "Convert to binary (8 bits): 192, 168, 1, 100",
            "Convert to decimal: 11111110, 01010101, 10000001, 11110000",
            "Find the binary for all powers of 2 from 1 to 128",
            "What do you notice about even vs odd numbers in binary?"
          ]
        }
      ]
    },
    keyTakeaways: [
      "Binary uses only 0 and 1, with each position representing a power of 2",
      "IP addresses are 32-bit binary numbers shown in decimal for human readability",
      "The subtraction method makes decimal-to-binary conversion quick",
      "Common subnet mask values follow predictable binary patterns",
      "Memorizing powers of 2 (1, 2, 4, 8, 16, 32, 64, 128) is essential"
    ]
  },
  
  2: {
    title: "Bitwise AND Operation",
    sections: [
      {
        type: "introduction", 
        title: "The Magic Behind Finding Network Addresses",
        content: `
The AND operation is the secret sauce of subnetting. It's how routers instantly know which network an IP address belongs to. Understanding AND is like having X-ray vision for networks - you'll see through the decimal numbers to the binary logic underneath.

**The Golden Rule**: To find any network address, just AND the IP address with the subnet mask. That's it!
        `
      },
      {
        type: "concept",
        title: "How AND Works",
        content: `
The AND operation is beautifully simple:
- 1 AND 1 = 1
- 1 AND 0 = 0  
- 0 AND 1 = 0
- 0 AND 0 = 0

**Memory Trick**: "Both must be TRUE (1) for the result to be TRUE (1)"

Think of it like a security checkpoint that requires two keys:
- Both keys present (1 AND 1) = Door opens (1)
- One or no keys (any other combination) = Door stays closed (0)

**Real-World Analogy**: 
Imagine two switches in series controlling a light:
- Both switches ON = Light ON
- Any switch OFF = Light OFF
        `
      },
      {
        type: "visual-example",
        title: "Visual AND Operation",
        content: `
Let's see AND in action with a simple 8-bit example:

**Example 1: Basic AND**
\`\`\`
11001100  (204 in decimal)  AND
11110000  (240 in decimal)
--------
11000000  (192 in decimal)
\`\`\`

**Step-by-step breakdown:**
- Position 1: 1 AND 1 = 1 ✓
- Position 2: 1 AND 1 = 1 ✓
- Position 3: 0 AND 1 = 0 ✗
- Position 4: 0 AND 1 = 0 ✗
- Position 5: 1 AND 0 = 0 ✗
- Position 6: 1 AND 0 = 0 ✗
- Position 7: 0 AND 0 = 0 ✗
- Position 8: 0 AND 0 = 0 ✗

Notice how the AND operation "filters out" bits - only positions where BOTH inputs have a 1 will output a 1.
        `
      },
      {
        type: "networking-application",
        title: "Finding Network Addresses",
        content: `
Here's where it gets exciting - this is how we find network addresses!

**Example: Find the network address**
- IP Address: 192.168.1.100
- Subnet Mask: 255.255.255.0

**Step 1: Convert to binary**
- 192.168.1.100 = 11000000.10101000.00000001.01100100
- 255.255.255.0 = 11111111.11111111.11111111.00000000

**Step 2: Perform AND operation**
\`\`\`
11000000.10101000.00000001.01100100  (IP)  AND
11111111.11111111.11111111.00000000  (Mask)
------------------------------------
11000000.10101000.00000001.00000000  (Network)
\`\`\`

**Step 3: Convert back to decimal**
- Result: 192.168.1.0

**Why this works**: The subnet mask has 1s in the network portion and 0s in the host portion. When we AND:
- Network bits (1 AND original) = Original bits preserved
- Host bits (0 AND anything) = Always 0

This effectively "zeros out" the host portion, leaving only the network address!
        `
      },
      {
        type: "interactive-tool",
        title: "Network Calculator Tool",
        component: "NetworkCalculator"
      },
      {
        type: "interactive-tool",
        title: "AND Operation Visualizer",
        component: "AndVisualizer"
      },
      {
        type: "patterns",
        title: "Common Subnet Mask Patterns",
        content: `
Understanding how different subnet masks affect the AND operation:

**255.255.255.0 (/24)**
- Binary: 11111111.11111111.11111111.00000000
- Effect: Preserves first 3 octets, zeros out the 4th
- Example: 192.168.1.100 → 192.168.1.0

**255.255.0.0 (/16)**
- Binary: 11111111.11111111.00000000.00000000
- Effect: Preserves first 2 octets, zeros out last 2
- Example: 172.16.50.100 → 172.16.0.0

**255.255.255.128 (/25)**
- Binary: 11111111.11111111.11111111.10000000
- Effect: Preserves first 3 octets + 1 bit, zeros the rest
- Example: 192.168.1.200 → 192.168.1.128

**Pattern Recognition**: The more 1s in the mask, the smaller the network!
        `
      },
      {
        type: "practice-scenarios",
        title: "Real Network Examples",
        content: `
**Scenario 1: Home Network**
Your router's IP: 192.168.1.1/24
Your computer: 192.168.1.50/24

Both AND with 255.255.255.0:
- Router: 192.168.1.1 AND 255.255.255.0 = 192.168.1.0
- Computer: 192.168.1.50 AND 255.255.255.0 = 192.168.1.0
- Same network? YES! ✓

**Scenario 2: Office Network**
Server: 10.1.5.100/16
Printer: 10.1.20.5/16

Both AND with 255.255.0.0:
- Server: 10.1.5.100 AND 255.255.0.0 = 10.1.0.0
- Printer: 10.1.20.5 AND 255.255.0.0 = 10.1.0.0
- Same network? YES! ✓

**Scenario 3: Misconfigured Network**
PC1: 192.168.1.100/24 (255.255.255.0)
PC2: 192.168.1.200/25 (255.255.255.128)

- PC1: 192.168.1.100 AND 255.255.255.0 = 192.168.1.0
- PC2: 192.168.1.200 AND 255.255.255.128 = 192.168.1.128
- Same network? NO! ✗ (This is why they can't communicate!)
        `
      },
      {
        type: "tips",
        title: "Pro Tips & Shortcuts",
        content: `
**1. The 255 Shortcut**
- Any octet ANDed with 255 stays the same
- Any octet ANDed with 0 becomes 0
- This is why 255.255.255.0 is so common!

**2. Quick Mental Math**
For common masks, you can skip the binary:
- /24 (255.255.255.0): Just zero out the last octet
- /16 (255.255.0.0): Zero out the last two octets
- /8 (255.0.0.0): Zero out the last three octets

**3. The Boundary Check**
For /25, /26, /27, etc., check if the host octet is above or below the boundary:
- /25 boundary: 128 (below = .0 network, above = .128 network)
- /26 boundaries: 0, 64, 128, 192
- /27 boundaries: 0, 32, 64, 96, 128, 160, 192, 224

**4. Remember the Purpose**
AND doesn't change your IP - it just reveals which network it belongs to!
        `
      },
      {
        type: "summary",
        title: "AND Mastery Achieved!",
        content: `
You now understand:
- How the AND operation works at the bit level
- Why AND with a subnet mask gives the network address
- How to quickly identify if two IPs are on the same network
- Common patterns and shortcuts for mental calculations

The AND operation is your Swiss Army knife for subnetting. Every subnet calculation starts here!

Next up: Module 3 - IPv4 Address Anatomy, where we'll explore how IP addresses are structured and why they're divided into network and host portions.
        `
      }
    ],
    practice: {
      title: "AND Operation Practice",
      questions: [
        {
          question: "What is 11001100 AND 11110000?",
          hint: "Go bit by bit: both must be 1 for the result to be 1",
          answer: "11000000 (only the first two positions have 1 AND 1 = 1)"
        },
        {
          question: "Find the network address for 192.168.5.75/24",
          hint: "/24 means mask is 255.255.255.0",
          answer: "192.168.5.0 (last octet becomes 0 when ANDed with 0)"
        },
        {
          question: "Are 10.1.5.100/16 and 10.1.20.5/16 on the same network?",
          hint: "AND both with 255.255.0.0 and compare results",
          answer: "Yes! Both result in network address 10.1.0.0"
        },
        {
          question: "What's the network address for 172.16.50.100 with mask 255.255.240.0?",
          hint: "240 in binary is 11110000, so it preserves the first 4 bits of the third octet",
          answer: "172.16.48.0 (50 AND 240 = 48)"
        },
        {
          question: "Why does 192.168.1.100/24 AND 255.255.255.0 = 192.168.1.0?",
          hint: "Think about what happens when you AND with 0",
          answer: "The last octet of the mask is all 0s, and anything AND 0 = 0"
        }
      ],
      exercises: [
        {
          title: "Quick AND Calculations",
          instructions: "Use the Network Calculator tool to verify your answers",
          problems: [
            "Find network addresses for: 10.0.5.67/8, 172.16.100.200/16, 192.168.50.50/24",
            "Calculate: 11111111 AND 10101010, 11110000 AND 11001100",
            "Which pairs are on the same network? (192.168.1.50/24, 192.168.1.200/24), (10.1.1.1/16, 10.2.1.1/16)",
            "Find the network for 192.168.1.130/25 (hint: 128 is the boundary)"
          ]
        }
      ]
    },
    keyTakeaways: [
      "AND operation: Both inputs must be 1 for output to be 1",
      "IP Address AND Subnet Mask = Network Address",
      "Subnet masks use 1s for network portion, 0s for host portion",
      "Common masks (/8, /16, /24) make mental math easy",
      "The AND operation is the foundation of all subnet calculations"
    ]
  },
  
  3: {
    title: "IPv4 Address Anatomy",
    sections: [
      {
        type: "introduction",
        title: "Understanding IP Address Structure",
        content: `
Every device on a network needs a unique address - like a house needs a street address. IPv4 addresses are the most common addressing system, and understanding their structure is crucial for subnetting.

An IPv4 address isn't just a random number - it's carefully structured with two parts: the **network portion** (like a street name) and the **host portion** (like a house number). The subnet mask determines where one ends and the other begins.
        `
      },
      {
        type: "anatomy",
        title: "The Four Octets",
        content: `
An IPv4 address consists of 32 bits, divided into four octets (8-bit groups):

**Example: 192.168.1.100**
\`\`\`
Octet 1  |  Octet 2  |  Octet 3  |  Octet 4
   192   .    168    .     1     .    100
11000000 . 10101000  . 00000001  . 01100100
\`\`\`

**Why "Octet"?**
- Octet = 8 bits (octo = eight)
- Each octet can represent 0-255 (2^8 = 256 values)
- Separated by dots (dotted decimal notation)

**Key Facts:**
- Total address space: 2^32 = 4,294,967,296 addresses
- Format: X.X.X.X where X is 0-255
- All zeros (0.0.0.0) and all ones (255.255.255.255) are reserved
        `
      },
      {
        type: "network-vs-host",
        title: "Network vs Host Portions",
        content: `
Every IP address has two parts - but where's the dividing line?

**The Street Address Analogy:**
Think of an IP address like a street address:
- Network portion = Street name (shared by all houses)
- Host portion = House number (unique on that street)

**Example with /24 network (255.255.255.0):**
\`\`\`
192.168.1.100/24
│───────┘ └─┘
Network   Host
(Street) (House)
\`\`\`

**Different Subnet Masks = Different Divisions:**

**/8 (Class A):**
\`\`\`
10.1.2.3
│┘ └───┘
N    H
\`\`\`

**/16 (Class B):**
\`\`\`
172.16.5.10
│────┘ └──┘
  N      H
\`\`\`

**/24 (Class C):**
\`\`\`
192.168.1.50
│───────┘ └┘
    N      H
\`\`\`

The subnet mask determines this boundary!
        `
      },
      {
        type: "special-addresses",
        title: "Special IP Addresses",
        content: `
Not all IP addresses are created equal. Some have special meanings:

**Network Address (First Address):**
- All host bits are 0
- Identifies the network itself
- Cannot be assigned to a device
- Example: 192.168.1.0/24

**Broadcast Address (Last Address):**
- All host bits are 1
- Sends to all devices on the network
- Cannot be assigned to a device
- Example: 192.168.1.255/24

**Example for 192.168.1.0/24:**
\`\`\`
Network:     192.168.1.0    (00000000 host bits)
First Host:  192.168.1.1    (00000001)
...
Last Host:   192.168.1.254  (11111110)
Broadcast:   192.168.1.255  (11111111 host bits)
\`\`\`

**Other Special Addresses:**
- **127.0.0.0/8**: Loopback (localhost)
- **169.254.0.0/16**: Link-local (APIPA)
- **0.0.0.0/0**: Default route (all networks)
- **255.255.255.255**: Limited broadcast
        `
      },
      {
        type: "private-vs-public",
        title: "Private vs Public Addresses",
        content: `
IPv4 addresses are divided into public (internet-routable) and private (internal only) ranges.

**Private Address Ranges (RFC 1918):**
- **10.0.0.0/8** (10.0.0.0 - 10.255.255.255)
  - 16,777,216 addresses
  - Often used by large organizations
  
- **172.16.0.0/12** (172.16.0.0 - 172.31.255.255)
  - 1,048,576 addresses
  - Common in medium businesses
  
- **192.168.0.0/16** (192.168.0.0 - 192.168.255.255)
  - 65,536 addresses
  - Home routers use 192.168.1.0/24 or 192.168.0.0/24

**Why Private Addresses?**
- Not routable on the internet
- Can be reused in different networks
- Conserves public IP addresses
- NAT translates to public IPs

**Real-World Example:**
Your home network:
- Internal: Your PC has 192.168.1.100
- External: Your ISP assigns 74.125.224.72
- NAT handles the translation
        `
      },
      {
        type: "classful-legacy",
        title: "The Legacy of Classful Addressing",
        content: `
Before CIDR (1993), IP addresses were divided into rigid classes:

**Class A: /8 (255.0.0.0)**
- First octet: 1-126
- 126 networks, 16,777,214 hosts each
- Example: 10.0.0.0/8
- Problem: Way too many hosts!

**Class B: /16 (255.255.0.0)**
- First octet: 128-191
- 16,384 networks, 65,534 hosts each
- Example: 172.16.0.0/16
- Problem: Still too many hosts for most

**Class C: /24 (255.255.255.0)**
- First octet: 192-223
- 2,097,152 networks, 254 hosts each
- Example: 192.168.1.0/24
- Problem: Often too few hosts

**Why Classful Failed:**
- Rigid boundaries wasted addresses
- No flexibility for different sized networks
- Led to rapid IPv4 exhaustion

**CIDR to the Rescue:**
- Variable Length Subnet Masks (VLSM)
- Any mask length (/1 through /32)
- Right-sized networks
- Efficient address usage

Today, classful addressing is obsolete, but you'll still see its influence in default masks and private ranges!
        `
      },
      {
        type: "visual-breakdown",
        title: "Visual IP Breakdown",
        content: `
Let's visualize how different masks divide an IP address:

**192.168.10.50 with different masks:**

**/24 Mask (255.255.255.0):**
\`\`\`
IP: 192.168.10.50
Network: 192.168.10.0/24
Range: 192.168.10.0 - 192.168.10.255
50 falls in the single /24 network
\`\`\`

**/25 Mask (255.255.255.128):**
\`\`\`
IP: 192.168.10.50
Networks: 192.168.10.0/25 (0-127)
          192.168.10.128/25 (128-255)
50 falls in first network: 192.168.10.0/25
\`\`\`

**/26 Mask (255.255.255.192):**
\`\`\`
IP: 192.168.10.50
Networks: 192.168.10.0/26 (0-63)
          192.168.10.64/26 (64-127)
          192.168.10.128/26 (128-191)
          192.168.10.192/26 (192-255)
50 falls in first network: 192.168.10.0/26
\`\`\`

**/27 Mask (255.255.255.224):**
\`\`\`
IP: 192.168.10.50
Networks: 192.168.10.0/27 (0-31)
          192.168.10.32/27 (32-63)
          192.168.10.64/27 (64-95)
          ... and 5 more
50 falls in second network: 192.168.10.32/27
\`\`\`

**The Pattern:**
- Same IP, different mask = Different network membership
- Smaller masks = Larger networks (fewer divisions)
- Larger masks = Smaller networks (more divisions)
- The IP's network changes based on the mask boundaries
        `
      },
      {
        type: "interactive-tool",
        title: "Explore IP Structure",
        component: "NetworkCalculator"
      },
      {
        type: "summary",
        title: "IPv4 Mastery Unlocked!",
        content: `
You now understand:
- IPv4 addresses have 32 bits in 4 octets
- Network and host portions are divided by the subnet mask
- Special addresses (network, broadcast) can't be assigned
- Private ranges allow address reuse internally
- Classful addressing evolved into flexible CIDR

With this foundation, you're ready to start calculating subnets like a pro!

Next: Module 4 - CIDR Notation, where we'll master the modern way to write subnet masks.
        `
      }
    ],
    practice: {
      title: "IPv4 Structure Practice",
      questions: [
        {
          question: "In the address 172.16.5.100/16, which octets represent the network portion?",
          hint: "/16 means the first 16 bits (2 octets)",
          answer: "The first two octets: 172.16"
        },
        {
          question: "What's the broadcast address for 192.168.1.0/24?",
          hint: "All host bits set to 1",
          answer: "192.168.1.255"
        },
        {
          question: "How many usable host addresses in a /24 network?",
          hint: "Total addresses minus network and broadcast",
          answer: "254 (256 total - 2 reserved = 254 usable)"
        },
        {
          question: "Is 172.20.0.0 a private or public address?",
          hint: "Check if it falls within RFC 1918 ranges",
          answer: "Private (falls within 172.16.0.0/12 range)"
        },
        {
          question: "Why can't you assign 10.1.1.0/24 to a computer?",
          hint: "What type of address has all host bits as 0?",
          answer: "It's the network address (all host bits are 0)"
        }
      ],
      exercises: [
        {
          title: "Identify Address Components",
          instructions: "For each address, identify the network and host portions",
          problems: [
            "Break down 10.20.30.40/8 into network and host portions",
            "Break down 172.31.100.200/16 into network and host portions", 
            "Break down 192.168.50.75/24 into network and host portions",
            "What changes in 192.168.1.100 when the mask changes from /24 to /25?"
          ]
        }
      ]
    },
    keyTakeaways: [
      "IPv4 addresses have 32 bits arranged in 4 octets (X.X.X.X)",
      "Each address has a network portion (street) and host portion (house number)",
      "The subnet mask determines where the network/host boundary is",
      "Network (first) and broadcast (last) addresses cannot be assigned to hosts",
      "Private addresses (10/8, 172.16/12, 192.168/16) are for internal use only"
    ]
  },
  
  4: {
    title: "CIDR Notation and the Mask Ladder",
    sections: [
      {
        type: "introduction",
        title: "The Evolution to CIDR",
        content: `
Remember the rigid classful system from Module 3? It was like having only three sizes of pizza - too small, too big, or way too big. CIDR (Classless Inter-Domain Routing) changed everything by letting us slice networks to any size we need.

CIDR notation is the modern, elegant way to write subnet masks. Instead of writing 255.255.255.0, we simply write /24. It's cleaner, faster, and universally understood.

**The Big Idea**: The number after the slash tells you how many bits are used for the network portion. The rest are for hosts.
        `
      },
      {
        type: "concept",
        title: "Understanding CIDR Notation",
        content: `
**What Does /24 Mean?**

The slash notation (/) indicates the number of network bits:
- /24 = 24 network bits, 8 host bits
- /16 = 16 network bits, 16 host bits
- /30 = 30 network bits, 2 host bits

**Quick Conversion Examples:**
\`\`\`
/8  = 255.0.0.0       = 11111111.00000000.00000000.00000000
/16 = 255.255.0.0     = 11111111.11111111.00000000.00000000
/24 = 255.255.255.0   = 11111111.11111111.11111111.00000000
/25 = 255.255.255.128 = 11111111.11111111.11111111.10000000
/32 = 255.255.255.255 = 11111111.11111111.11111111.11111111
\`\`\`

**The Pattern**: Each octet can have 0-8 bits set, giving us masks from /0 to /32.
        `
      },
      {
        type: "mask-ladder",
        title: "The Subnet Mask Ladder",
        content: `
**The Complete CIDR Mask Reference**

Here's the famous "mask ladder" - memorize the patterns and you'll subnet like a pro!

\`\`\`
CIDR | Decimal Mask      | Binary (Last Octet) | Hosts  | Networks
-----|-------------------|--------------------|---------|---------
/8   | 255.0.0.0        | 00000000           | 16.7M   | 1
/9   | 255.128.0.0      | 10000000           | 8.4M    | 2
/10  | 255.192.0.0      | 11000000           | 4.2M    | 4
/11  | 255.224.0.0      | 11100000           | 2.1M    | 8
/12  | 255.240.0.0      | 11110000           | 1M      | 16
/13  | 255.248.0.0      | 11111000           | 524K    | 32
/14  | 255.252.0.0      | 11111100           | 262K    | 64
/15  | 255.254.0.0      | 11111110           | 131K    | 128
/16  | 255.255.0.0      | 00000000           | 65,534  | 256
/17  | 255.255.128.0    | 10000000           | 32,766  | 512
/18  | 255.255.192.0    | 11000000           | 16,382  | 1K
/19  | 255.255.224.0    | 11100000           | 8,190   | 2K
/20  | 255.255.240.0    | 11110000           | 4,094   | 4K
/21  | 255.255.248.0    | 11111000           | 2,046   | 8K
/22  | 255.255.252.0    | 11111100           | 1,022   | 16K
/23  | 255.255.254.0    | 11111110           | 510     | 32K
/24  | 255.255.255.0    | 00000000           | 254     | 65K
/25  | 255.255.255.128  | 10000000           | 126     | 131K
/26  | 255.255.255.192  | 11000000           | 62      | 262K
/27  | 255.255.255.224  | 11100000           | 30      | 524K
/28  | 255.255.255.240  | 11110000           | 14      | 1M
/29  | 255.255.255.248  | 11111000           | 6       | 2M
/30  | 255.255.255.252  | 11111100           | 2       | 4M
/31  | 255.255.255.254  | 11111110           | 0*      | 8M
/32  | 255.255.255.255  | 11111111           | 0       | 16M
\`\`\`

**/31 is special**: Used for point-to-point links (RFC 3021)
        `
      },
      {
        type: "patterns",
        title: "Patterns in the Mask Ladder",
        content: `
**Key Patterns to Remember:**

**1. The Block Size Pattern**
Each mask creates subnets of a specific size:
- /24 = blocks of 256 addresses
- /25 = blocks of 128 addresses  
- /26 = blocks of 64 addresses
- /27 = blocks of 32 addresses
- /28 = blocks of 16 addresses
- /29 = blocks of 8 addresses
- /30 = blocks of 4 addresses

**2. The Doubling Pattern**
- Each bit you borrow doubles the number of subnets
- Each bit you borrow halves the number of hosts
- It's always a trade-off!

**3. The Octet Boundaries**
- /8, /16, /24 are "clean" boundaries (full octets)
- These are easiest to work with mentally
- Other masks require bit-level thinking

**4. Common Real-World Masks**
- /24: Standard LAN (254 hosts)
- /25-/26: Department-sized networks
- /27-/28: Small offices
- /29: Small segments (6 hosts)
- /30: Point-to-point links (2 hosts)
- /32: Single host (host route)
        `
      },
      {
        type: "quick-math",
        title: "Quick CIDR Math Tricks",
        content: `
**Finding Network Boundaries**

For any /n mask, networks start at multiples of the block size:

**/25 (block size 128):**
- Networks: .0, .128

**/26 (block size 64):**
- Networks: .0, .64, .128, .192

**/27 (block size 32):**
- Networks: .0, .32, .64, .96, .128, .160, .192, .224

**The Magic Formula:**
\`\`\`
Block Size = 2^(32 - mask_length)
Usable Hosts = Block Size - 2
\`\`\`

**Examples:**
- /28: Block = 2^(32-28) = 2^4 = 16
- /28: Hosts = 16 - 2 = 14

**Quick Host Counting:**
- /24 = 2^8 - 2 = 254 hosts
- /25 = 2^7 - 2 = 126 hosts
- /26 = 2^6 - 2 = 62 hosts
- /27 = 2^5 - 2 = 30 hosts
- /28 = 2^4 - 2 = 14 hosts
- /29 = 2^3 - 2 = 6 hosts
- /30 = 2^2 - 2 = 2 hosts
        `
      },
      {
        type: "real-world",
        title: "CIDR in Practice",
        content: `
**Scenario 1: Office Network Design**
You have 192.168.1.0/24 and need:
- Main office: 100 devices
- Branch office: 50 devices  
- Guest WiFi: 25 devices
- Servers: 10 devices

**Solution using CIDR:**
- Main: 192.168.1.0/25 (126 hosts) ✓
- Branch: 192.168.1.128/26 (62 hosts) ✓
- Guest: 192.168.1.192/27 (30 hosts) ✓
- Servers: 192.168.1.224/28 (14 hosts) ✓

**Scenario 2: ISP Address Allocation**
ISP has 10.0.0.0/8 and needs to allocate:
- Large customer: 65,000 addresses → /16
- Medium customer: 1,000 addresses → /22
- Small customer: 250 addresses → /24

**Allocation:**
- Large: 10.1.0.0/16 (65,534 hosts)
- Medium: 10.2.0.0/22 (1,022 hosts)
- Small: 10.2.4.0/24 (254 hosts)

**Scenario 3: Point-to-Point Links**
Connecting routers needs only 2 addresses:
- Old way: Waste a /24 (254 addresses)
- CIDR way: Use /30 (2 usable addresses)
- Modern way: Use /31 (both addresses usable)
        `
      },
      {
        type: "interactive-tool",
        title: "CIDR Calculator",
        component: "NetworkCalculator"
      },
      {
        type: "common-mistakes",
        title: "CIDR Pitfalls to Avoid",
        content: `
**Mistake 1: Forgetting the -2**
- /24 has 256 addresses, but only 254 usable
- Always subtract network and broadcast addresses
- Exception: /31 and /32 have special rules

**Mistake 2: Overlapping Subnets**
\`\`\`
Wrong:
10.0.0.0/25 (10.0.0.0 - 10.0.0.127)
10.0.0.64/26 (10.0.0.64 - 10.0.0.127) ← Overlaps!

Right:
10.0.0.0/25 (10.0.0.0 - 10.0.0.127)
10.0.0.128/26 (10.0.0.128 - 10.0.0.191)
\`\`\`

**Mistake 3: Wrong Block Boundaries**
- 192.168.1.50/27 is INVALID
- /27 blocks start at 0, 32, 64, 96, 128, 160, 192, 224
- Must use 192.168.1.32/27 or 192.168.1.64/27

**Mistake 4: Mixing Notation**
- Don't write "192.168.1.0/255.255.255.0"
- Use either CIDR (/24) or dotted decimal
- CIDR is preferred in modern networking
        `
      },
      {
        type: "summary",
        title: "CIDR Mastery Achieved!",
        content: `
You now understand:
- CIDR notation represents network bits with /n
- The mask ladder shows all possible subnet masks
- Each mask creates specific block sizes
- Networks must align on block boundaries
- Quick math tricks for finding hosts and networks

CIDR gave us the flexibility to right-size every network. No more waste, no more rigid classes - just efficient, scalable networking.

**Pro tip**: Print the mask ladder and keep it handy. With practice, you'll memorize the common masks (/24, /25, /26, /27, /28, /29, /30) and their properties.

Next: Module 5 - Subnet Calculations, where we'll put CIDR to work solving real subnet problems!
        `
      }
    ],
    practice: {
      title: "CIDR Notation Practice",
      questions: [
        {
          question: "What subnet mask does /26 represent?",
          hint: "26 bits set to 1, starting from the left",
          answer: "255.255.255.192 (11111111.11111111.11111111.11000000)"
        },
        {
          question: "How many usable host addresses in a /28 network?",
          hint: "32 - 28 = 4 bits for hosts. Remember to subtract 2!",
          answer: "14 hosts (2^4 - 2 = 16 - 2 = 14)"
        },
        {
          question: "What CIDR notation represents subnet mask 255.255.248.0?",
          hint: "Count the consecutive 1s from the left",
          answer: "/21 (8 + 8 + 5 = 21 bits)"
        },
        {
          question: "What are the valid network addresses for /26 subnets in 172.16.1.0/24?",
          hint: "/26 has block size of 64",
          answer: "172.16.1.0, 172.16.1.64, 172.16.1.128, 172.16.1.192"
        },
        {
          question: "Why would you choose /30 for a point-to-point link?",
          hint: "How many hosts do you need between two routers?",
          answer: "It provides exactly 2 usable addresses, perfect for connecting two routers without waste"
        }
      ],
      exercises: [
        {
          title: "CIDR Conversion Practice",
          instructions: "Convert between CIDR and decimal notation",
          problems: [
            "Convert to CIDR: 255.255.255.128, 255.255.224.0, 255.252.0.0",
            "Convert to decimal: /27, /20, /14, /30",
            "List all /27 networks in 10.1.1.0/24",
            "Calculate hosts per subnet for: /23, /25, /28, /29"
          ]
        },
        {
          title: "Network Planning with CIDR",
          instructions: "Use CIDR to solve these network design problems",
          problems: [
            "You have 172.16.0.0/16. Divide it into 4 equal subnets. What mask?",
            "Need 500 hosts per subnet. What's the smallest mask you can use?",
            "Design: 192.168.10.0/24 for 3 departments (120, 60, 25 hosts)",
            "How many /29 subnets fit in a /24? How many hosts total?"
          ]
        }
      ]
    },
    keyTakeaways: [
      "CIDR notation (/n) indicates the number of network bits",
      "Each CIDR mask creates subnets of a specific block size",
      "Networks must start on block boundaries (multiples of block size)",
      "The mask ladder is your reference for all CIDR calculations",
      "Common masks: /24 (254 hosts), /25 (126), /26 (62), /27 (30), /28 (14), /29 (6), /30 (2)"
    ]
  }
}

// Helper function to get content for a specific module
export const getModuleContent = (moduleId) => {
  // Convert to string to handle both string and number keys
  return moduleContent[String(moduleId)] || moduleContent[moduleId] || null
}

// Helper function to check if module has content
export const hasModuleContent = (moduleId) => {
  // Check both string and number versions
  return String(moduleId) in moduleContent || moduleId in moduleContent
}
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
  },
  
  5: {
    title: "Subnet Calculations",
    sections: [
      {
        type: "introduction",
        title: "Putting It All Together",
        content: `
You've learned binary, the AND operation, IP structure, and CIDR notation. Now it's time to combine these skills and become a subnet calculation master!

Subnet calculations are the bread and butter of network engineering. Whether you're troubleshooting connectivity, designing a network, or taking a certification exam, these calculations are essential.

**The Core Questions We'll Answer:**
- What's the network address?
- What's the broadcast address?
- What's the usable host range?
- How many hosts can this subnet support?
- Is this IP in the same subnet as that IP?
        `
      },
      {
        type: "method",
        title: "The Universal Subnet Formula",
        content: `
**The 5-Step Process for Any Subnet Calculation:**

**Step 1: Convert CIDR to Binary Mask**
- /24 → 11111111.11111111.11111111.00000000
- Count the 1s to verify

**Step 2: Find the Block Size**
- Look at the last octet with both 1s and 0s
- Block size = 256 - decimal value of that octet
- Or use: Block size = 2^(host bits)

**Step 3: Find Network Address**
- IP AND Mask = Network
- Or find the block boundary below the IP

**Step 4: Find Broadcast Address**
- Network + Block Size - 1 = Broadcast
- All host bits set to 1

**Step 5: Find Usable Range**
- First Host = Network + 1
- Last Host = Broadcast - 1
- Total Hosts = Block Size - 2
        `
      },
      {
        type: "example-walkthrough",
        title: "Complete Example: 192.168.50.130/26",
        content: `
Let's work through a complete example step by step:

**Given:** 192.168.50.130/26

**Step 1: Convert /26 to Binary**
\`\`\`
/26 = 26 ones, 6 zeros
11111111.11111111.11111111.11000000
= 255.255.255.192
\`\`\`

**Step 2: Find Block Size**
\`\`\`
Last octet: 11000000 = 192
Block size = 256 - 192 = 64
Or: 2^6 = 64 (6 host bits)
\`\`\`

**Step 3: Find Network Address**
\`\`\`
/26 networks start at: 0, 64, 128, 192...
130 is between 128 and 192
Network: 192.168.50.128
\`\`\`

**Step 4: Find Broadcast**
\`\`\`
Network + Block Size - 1
128 + 64 - 1 = 191
Broadcast: 192.168.50.191
\`\`\`

**Step 5: Usable Range**
\`\`\`
First Host: 192.168.50.129
Last Host: 192.168.50.190
Total Hosts: 64 - 2 = 62
\`\`\`

**Summary for 192.168.50.130/26:**
- Network: 192.168.50.128
- Broadcast: 192.168.50.191
- Usable: 192.168.50.129 - 192.168.50.190
- Hosts: 62
        `
      },
      {
        type: "quick-methods",
        title: "Speed Tricks for Common Masks",
        content: `
**For /24, /16, /8 (Clean Boundaries):**
- Super easy - just zero out the host octets
- 172.16.50.100/16 → Network: 172.16.0.0
- Broadcast: Set host octets to 255
- 172.16.50.100/16 → Broadcast: 172.16.255.255

**For /25 (Half Networks):**
- Two networks: .0 and .128
- If IP < 128: Network = .0, Broadcast = .127
- If IP ≥ 128: Network = .128, Broadcast = .255

**For /26 (Quarter Networks):**
- Four networks: .0, .64, .128, .192
- Find which quarter your IP is in
- Add 63 for broadcast

**For /27 (Eighth Networks):**
- Eight networks: .0, .32, .64, .96, .128, .160, .192, .224
- Find which eighth, add 31 for broadcast

**The Pattern:**
- /25: Count by 128 (2 subnets)
- /26: Count by 64 (4 subnets)
- /27: Count by 32 (8 subnets)
- /28: Count by 16 (16 subnets)
- /29: Count by 8 (32 subnets)
- /30: Count by 4 (64 subnets)
        `
      },
      {
        type: "interactive-tool",
        title: "Subnet Calculator",
        component: "NetworkCalculator"
      },
      {
        type: "same-network",
        title: "Are These IPs in the Same Network?",
        content: `
**The Same-Network Test:**

To check if two IPs are in the same subnet:
1. Calculate the network address for each
2. If they match, they're in the same subnet
3. If different, they need a router to communicate

**Example 1: Can they talk directly?**
- Host A: 192.168.1.50/24
- Host B: 192.168.1.200/24

\`\`\`
Host A network: 192.168.1.0
Host B network: 192.168.1.0
Same network? YES ✓
\`\`\`

**Example 2: Can they talk directly?**
- Host A: 10.0.5.100/25
- Host B: 10.0.5.200/25

\`\`\`
Host A: 10.0.5.100 → Network: 10.0.5.0 (0-127)
Host B: 10.0.5.200 → Network: 10.0.5.128 (128-255)
Same network? NO ✗ (need router)
\`\`\`

**Example 3: Tricky one!**
- Host A: 172.16.100.50/22
- Host B: 172.16.99.200/22

\`\`\`
/22 = 255.255.252.0 (block size in 3rd octet = 4)
Host A: 172.16.100.x → Network: 172.16.100.0
Host B: 172.16.99.x → Network: 172.16.96.0
Same network? NO ✗
\`\`\`

**Remember:** The subnet mask determines the network boundary, not our human assumptions!
        `
      },
      {
        type: "variable-masks",
        title: "Working with Non-Octet Boundaries",
        content: `
When the mask doesn't fall on an octet boundary (/8, /16, /24), calculations get trickier:

**Example: 10.50.100.200/20**

**Step 1: Identify the "Interesting Octet"**
\`\`\`
/20 = 255.255.240.0
Third octet (240) is interesting
\`\`\`

**Step 2: Calculate Block Size**
\`\`\`
256 - 240 = 16
Networks increment by 16 in 3rd octet
\`\`\`

**Step 3: Find Network**
\`\`\`
3rd octet = 100
100 ÷ 16 = 6 remainder 4
Network starts at: 6 × 16 = 96
Network: 10.50.96.0/20
\`\`\`

**Step 4: Find Broadcast**
\`\`\`
Next network: 10.50.112.0
Broadcast: 10.50.111.255
\`\`\`

**Step 5: Summary**
\`\`\`
Network: 10.50.96.0
First Host: 10.50.96.1
Last Host: 10.50.111.254
Broadcast: 10.50.111.255
Hosts: 4094 (16 × 256 - 2)
\`\`\`

**Pro Tip:** The "interesting octet" is where the binary mask changes from 1s to 0s!
        `
      },
      {
        type: "practice-problems",
        title: "Guided Practice Problems",
        content: `
**Problem 1: 192.168.200.139/28**

Try it yourself first, then check the solution below.

**Solution:**
\`\`\`
/28 = 255.255.255.240
Block size = 16
139 ÷ 16 = 8 remainder 11
Network: 192.168.200.128
Broadcast: 192.168.200.143
Usable: .129 - .142 (14 hosts)
\`\`\`

**Problem 2: 172.31.80.201/21**

**Solution:**
\`\`\`
/21 = 255.255.248.0
Block size in 3rd octet = 8
80 ÷ 8 = 10 remainder 0
Network: 172.31.80.0
Broadcast: 172.31.87.255
Usable: 172.31.80.1 - 172.31.87.254 (2046 hosts)
\`\`\`

**Problem 3: Are 10.1.100.50/23 and 10.1.101.200/23 in the same subnet?**

**Solution:**
\`\`\`
/23 = 255.255.254.0
Block size in 3rd octet = 2
100 ÷ 2 = 50 (even) → Network: 10.1.100.0
101 ÷ 2 = 50 remainder 1 → Network: 10.1.100.0
Same network? YES ✓
\`\`\`
        `
      },
      {
        type: "common-exam-questions",
        title: "Exam-Style Questions",
        content: `
**Question Types You'll See:**

**1. "What is the valid host range?"**
- Calculate network and broadcast
- First host = Network + 1
- Last host = Broadcast - 1

**2. "Which subnet does this IP belong to?"**
- Find the network address using block size
- That's your answer!

**3. "How many subnets and hosts?"**
- Subnets = 2^(borrowed bits)
- Hosts per subnet = 2^(host bits) - 2

**4. "What is the next subnet?"**
- Current network + block size = Next network

**5. "Is this a valid host address?"**
- Cannot be network address (all host bits = 0)
- Cannot be broadcast (all host bits = 1)
- Must be within valid range

**Time-Saving Tip:** Memorize powers of 2 up to 2^10 (1024) for quick calculations!
        `
      },
      {
        type: "troubleshooting",
        title: "Real-World Troubleshooting",
        content: `
**Scenario: "I can't ping the server!"**

Your IP: 192.168.1.100/25
Server: 192.168.1.200/24

**Investigation:**
\`\`\`
Your network: 192.168.1.0/25 (0-127)
Your view: Server is in different subnet!

Server network: 192.168.1.0/24 (0-255)
Server view: You're in the same subnet!
\`\`\`

**Problem:** Mismatched subnet masks!
- You think server is in different network
- Server thinks you're in same network
- Result: Asymmetric routing issues

**Solution:** Fix subnet masks to match

**Lesson:** Always verify subnet masks match on all devices in the same network segment!
        `
      },
      {
        type: "summary",
        title: "Subnet Calculation Mastery!",
        content: `
You can now:
- Calculate any network and broadcast address
- Find usable host ranges quickly
- Determine if IPs are in the same subnet
- Work with any subnet mask (/8 to /30)
- Troubleshoot subnet mask mismatches

**Your Calculation Toolkit:**
1. Block size method for quick math
2. Binary AND for verification
3. Powers of 2 for host counting
4. Boundary checking for network membership

**Remember:** Practice makes perfect. The more calculations you do, the faster you'll become. Soon, you'll be doing /24 and /25 calculations in your head!

Next: Module 6 - VLSM Design, where we'll create efficient, scalable networks!
        `
      }
    ],
    practice: {
      title: "Subnet Calculation Practice",
      questions: [
        {
          question: "What is the network address for 192.168.75.150/27?",
          hint: "/27 has block size 32. Which multiple of 32 is 150 closest to?",
          answer: "192.168.75.128 (150 falls in the range 128-159)"
        },
        {
          question: "What is the broadcast address for 10.10.10.100/28?",
          hint: "Find the network first, then add block size minus 1",
          answer: "10.10.10.111 (Network is 10.10.10.96, block size 16, so 96+15=111)"
        },
        {
          question: "How many usable hosts in 172.16.0.0/22?",
          hint: "/22 means 10 host bits. Remember to subtract 2!",
          answer: "1022 hosts (2^10 - 2 = 1024 - 2 = 1022)"
        },
        {
          question: "Are 192.168.1.50/26 and 192.168.1.100/26 in the same subnet?",
          hint: "/26 divides the last octet into 4 parts",
          answer: "No. 50 is in 192.168.1.0/26 (0-63), 100 is in 192.168.1.64/26 (64-127)"
        },
        {
          question: "What's the last usable host in 10.20.30.0/29?",
          hint: "Find broadcast, then subtract 1",
          answer: "10.20.30.6 (Broadcast is .7, last host is .6)"
        }
      ],
      exercises: [
        {
          title: "Complete Subnet Analysis",
          instructions: "For each IP/mask, find network, broadcast, first host, last host, and total hosts",
          problems: [
            "Calculate all values for: 192.168.100.100/25",
            "Calculate all values for: 10.50.75.200/20",
            "Calculate all values for: 172.20.150.45/30",
            "Calculate all values for: 192.168.1.1/32"
          ]
        },
        {
          title: "Same Network Challenge",
          instructions: "Determine if these IP pairs can communicate without a router",
          problems: [
            "10.0.0.50/24 and 10.0.0.200/24",
            "172.16.50.100/23 and 172.16.51.200/23",
            "192.168.1.126/25 and 192.168.1.130/25",
            "10.10.10.10/30 and 10.10.10.11/30"
          ]
        }
      ]
    },
    keyTakeaways: [
      "The 5-step process works for any subnet calculation",
      "Block size is key - it determines network boundaries",
      "Network address = IP AND Mask (or find the block boundary)",
      "Broadcast = Network + Block Size - 1",
      "Usable hosts = First Host (.1) to Last Host (broadcast - 1)",
      "Same subnet mask ≠ same network - check the boundaries!"
    ]
  },
  
  6: {
    title: "VLSM Design and Implementation",
    sections: [
      {
        type: "introduction",
        title: "The Art of Efficient Network Design",
        content: `
Remember the old classful days? You'd get a Class C (/24) network with 254 hosts, even if you only needed 10. That's like buying a bus when you need a car!

VLSM (Variable Length Subnet Masking) lets you create different-sized subnets from a single network block. It's the key to efficient, scalable network design.

**Why VLSM Matters:**
- Prevents IP address waste
- Allows right-sized subnets
- Enables hierarchical network design
- Required for modern routing protocols (OSPF, EIGRP)
- Essential for IPv4 conservation
        `
      },
      {
        type: "concept",
        title: "VLSM Fundamentals",
        content: `
**The Golden Rules of VLSM:**

**Rule 1: Largest First**
Always allocate subnets from largest to smallest. This prevents fragmentation and ensures all subnets fit.

**Rule 2: Powers of 2**
Subnet sizes must be powers of 2 (2, 4, 8, 16, 32, 64, 128, 256...).

**Rule 3: Boundary Alignment**
Subnets must start on their natural boundaries:
- /25 subnets start at .0 or .128
- /26 subnets start at .0, .64, .128, or .192
- /27 subnets start at multiples of 32

**Rule 4: No Overlaps**
Once you allocate an address range, it's taken. No overlapping allowed!

**Rule 5: Document Everything**
Keep a subnet allocation table. Your future self will thank you.
        `
      },
      {
        type: "methodology",
        title: "The VLSM Design Process",
        content: `
**Step-by-Step VLSM Design:**

**Step 1: List Requirements**
- Identify all subnets needed
- Count hosts for each subnet
- Add growth margin (usually 20-50%)

**Step 2: Calculate Subnet Sizes**
- Round up to nearest power of 2
- Add 2 for network/broadcast
- Determine required mask

**Step 3: Order by Size**
- Sort subnets largest to smallest
- This is critical for success!

**Step 4: Allocate Sequentially**
- Start with your given network
- Assign largest subnet first
- Continue with next largest
- Track used/available space

**Step 5: Verify and Document**
- Check for overlaps
- Verify all subnets fit
- Create allocation table
        `
      },
      {
        type: "example-scenario",
        title: "Complete VLSM Example: Small Business Network",
        content: `
**Scenario:** Design network for 192.168.1.0/24

**Requirements:**
- Sales: 50 hosts
- Engineering: 25 hosts
- Management: 10 hosts
- Server Room: 10 hosts
- Link to ISP: 2 hosts
- Link to Branch: 2 hosts

**Step 1: Calculate Sizes with Growth**
\`\`\`
Sales: 50 + growth → 60 hosts → 64 addresses (/26)
Engineering: 25 + growth → 30 hosts → 32 addresses (/27)
Management: 10 + growth → 14 hosts → 16 addresses (/28)
Servers: 10 + growth → 14 hosts → 16 addresses (/28)
ISP Link: 2 hosts → 4 addresses (/30)
Branch Link: 2 hosts → 4 addresses (/30)
\`\`\`

**Step 2: Order by Size**
1. Sales: /26 (64 addresses)
2. Engineering: /27 (32 addresses)
3. Management: /28 (16 addresses)
4. Servers: /28 (16 addresses)
5. ISP Link: /30 (4 addresses)
6. Branch Link: /30 (4 addresses)

**Step 3: Allocate Subnets**
\`\`\`
Sales: 192.168.1.0/26 (0-63)
Engineering: 192.168.1.64/27 (64-95)
Management: 192.168.1.96/28 (96-111)
Servers: 192.168.1.112/28 (112-127)
ISP Link: 192.168.1.128/30 (128-131)
Branch Link: 192.168.1.132/30 (132-135)

Unused: 192.168.1.136/29 (136-143)
        192.168.1.144/28 (144-159)
        192.168.1.160/27 (160-191)
        192.168.1.192/26 (192-255)
\`\`\`

**Result:** Efficient use with room for 4 more subnets!
        `
      },
      {
        type: "visual-allocation",
        title: "Visualizing VLSM Allocation",
        content: `
**Visual Block Diagram of Our Example:**

\`\`\`
192.168.1.0/24 (256 addresses)
├── 0-63:    Sales (/26) ████████████████
├── 64-95:   Engineering (/27) ████████
├── 96-111:  Management (/28) ████
├── 112-127: Servers (/28) ████
├── 128-131: ISP Link (/30) █
├── 132-135: Branch Link (/30) █
└── 136-255: Available (120 addresses) ░░░░░░░░░░░░░░░░░░░░░░░░░░░░
\`\`\`

**Key Observations:**
- Largest subnets allocated first
- No wasted space between allocations
- Plenty of room for growth
- Easy to visualize and understand
        `
      },
      {
        type: "complex-scenario",
        title: "Enterprise VLSM Design",
        content: `
**Scenario:** Regional office with 10.10.0.0/16

**Requirements:**
- Headquarters: 2000 hosts
- Manufacturing: 1000 hosts
- Sales Floor: 500 hosts
- R&D Lab: 250 hosts
- Guest WiFi: 200 hosts
- DMZ Servers: 50 hosts
- Management: 25 hosts
- 10 Point-to-point links

**Solution Process:**

**1. Calculate Masks:**
\`\`\`
HQ: 2000 → 2048 → /21 (2046 hosts)
Mfg: 1000 → 1024 → /22 (1022 hosts)
Sales: 500 → 512 → /23 (510 hosts)
R&D: 250 → 256 → /24 (254 hosts)
Guest: 200 → 256 → /24 (254 hosts)
DMZ: 50 → 64 → /26 (62 hosts)
Mgmt: 25 → 32 → /27 (30 hosts)
Links: 10 × /30 (2 hosts each)
\`\`\`

**2. Allocation Table:**
\`\`\`
10.10.0.0/21   - Headquarters (0.0-7.255)
10.10.8.0/22   - Manufacturing (8.0-11.255)
10.10.12.0/23  - Sales Floor (12.0-13.255)
10.10.14.0/24  - R&D Lab
10.10.15.0/24  - Guest WiFi
10.10.16.0/26  - DMZ Servers
10.10.16.64/27 - Management
10.10.16.96/30 - Link 1
10.10.16.100/30 - Link 2
... (continuing for all links)
\`\`\`

**Summary:** Used only 10.10.0.0 - 10.10.16.135, leaving 10.10.16.136 - 10.10.255.255 available!
        `
      },
      {
        type: "interactive-tool",
        title: "VLSM Calculator",
        component: "NetworkCalculator"
      },
      {
        type: "common-mistakes",
        title: "VLSM Pitfalls to Avoid",
        content: `
**Mistake 1: Not Sorting by Size**
\`\`\`
Wrong: Allocating randomly
/24, /30, /26, /28... ❌ Creates gaps!

Right: Largest to smallest
/24, /26, /28, /30... ✓ Efficient packing
\`\`\`

**Mistake 2: Forgetting Growth**
- Current need: 50 hosts
- Allocate: /26 (62 hosts) ❌ No room!
- Better: /25 (126 hosts) ✓ Room to grow

**Mistake 3: Wrong Boundaries**
\`\`\`
Wrong: 192.168.1.50/27 ❌ Invalid start
Right: 192.168.1.32/27 ✓ Correct boundary
\`\`\`

**Mistake 4: Overlapping Subnets**
- Always check your math
- Use a subnet calculator to verify
- Keep detailed documentation

**Mistake 5: Wasting Point-to-Point Links**
- Don't use /24 for router links!
- Use /30 (or /31 for modern equipment)
- Save addresses for host subnets
        `
      },
      {
        type: "best-practices",
        title: "VLSM Best Practices",
        content: `
**1. Planning Standards**
- Always add 20-50% growth margin
- Reserve space for future subnets
- Group related subnets together
- Use consistent naming schemes

**2. Documentation Template**
\`\`\`
Subnet Name: [Department/Purpose]
Network: [Network Address]/[Mask]
Range: [First IP] - [Last IP]
Gateway: [Usually first or last host]
VLAN: [VLAN ID if applicable]
Purpose: [Detailed description]
Allocated: [Date]
\`\`\`

**3. Address Hierarchy**
\`\`\`
10.0.0.0/8 - Enterprise
├── 10.1.0.0/16 - Region 1
│   ├── 10.1.0.0/24 - Site A
│   └── 10.1.1.0/24 - Site B
└── 10.2.0.0/16 - Region 2
    ├── 10.2.0.0/24 - Site C
    └── 10.2.1.0/24 - Site D
\`\`\`

**4. Special Allocations**
- Reserve .1 for gateways
- Reserve last /24 for network infrastructure
- Keep management subnets separate
- Plan for summarization

**5. Tools and Verification**
- Use subnet calculators
- Verify with 'show ip route'
- Test with ping/traceroute
- Monitor utilization
        `
      },
      {
        type: "real-world-tips",
        title: "Tips from the Field",
        content: `
**Common Wisdom from the Field:**

These are typical practices and advice you'll hear from experienced network engineers:

**Always Leave Room**
Best practice: Allocate only 50% of available space initially. Networks grow faster than expected, and you'll need room for new subnets.

**Document Everything**
A VLSM design without documentation is a time bomb. Future engineers (including yourself) need to understand the allocation logic.

**Think in Blocks**
Visualize subnets as blocks that must fit together like Tetris pieces. Always place largest blocks first to avoid fragmentation.

**Plan for Summarization**
Good VLSM design enables efficient route summarization. Keep geographic regions and departments in contiguous address blocks.

**Test Before Production**
Always validate your design in a lab or with subnet calculators. Check for overlaps, verify routing, and test growth scenarios.
        `
      },
      {
        type: "summary",
        title: "VLSM Mastery Achieved!",
        content: `
You now have the skills to:
- Design efficient multi-subnet networks
- Allocate addresses without waste
- Plan for growth and changes
- Avoid common VLSM mistakes
- Document designs professionally

**Your VLSM Toolkit:**
1. Requirements gathering template
2. Largest-first allocation method
3. Boundary alignment rules
4. Documentation standards
5. Verification procedures

**Remember:** VLSM is about efficient resource use. Every saved address matters in our IPv4-constrained world!

Next: Module 7 - Routing and Subnets, where we'll see how routers use our subnet designs!
        `
      }
    ],
    practice: {
      title: "VLSM Design Practice",
      questions: [
        {
          question: "You have 172.16.1.0/24. Which subnet should you allocate first: 30 hosts or 60 hosts?",
          hint: "Remember the largest-first rule",
          answer: "60 hosts first. Allocate 172.16.1.0/26 (64 addresses), then 172.16.1.64/27 (32 addresses) for the 30 hosts."
        },
        {
          question: "How many /30 subnets can you create from a /27 network?",
          hint: "/27 has 32 addresses, /30 has 4 addresses",
          answer: "8 subnets (/27 = 32 addresses, /30 = 4 addresses, 32÷4 = 8)"
        },
        {
          question: "What's wrong with this allocation: 10.1.1.0/26, then 10.1.1.32/27?",
          hint: "Check the ranges for overlap",
          answer: "Overlap! /26 uses 0-63, but the /27 starts at 32. The /27 should start at 64."
        },
        {
          question: "You need subnets for 100, 50, and 25 hosts from 192.168.10.0/24. What masks?",
          hint: "Round up to powers of 2, add 2 for network/broadcast",
          answer: "/25 for 100 hosts (128 addresses), /26 for 50 hosts (64 addresses), /27 for 25 hosts (32 addresses)"
        },
        {
          question: "Why is documentation critical in VLSM?",
          hint: "Think about troubleshooting and future changes",
          answer: "Without documentation, it's nearly impossible to know which addresses are allocated, available, or reserved. This leads to conflicts and inefficient use."
        }
      ],
      exercises: [
        {
          title: "VLSM Design Challenge",
          instructions: "Design a complete VLSM scheme for these scenarios",
          problems: [
            "Design for 192.168.100.0/24: Admin (25), Sales (50), Guest (15), 3 router links",
            "Design for 10.50.0.0/22: Building A (200), Building B (150), Building C (100), DMZ (25)",
            "Design for 172.20.0.0/23: Main Office (120), Branch 1 (60), Branch 2 (40), 5 WAN links",
            "Create a growth plan: Current 192.168.1.0/24 with 3 subnets, expect to double in 2 years"
          ]
        },
        {
          title: "VLSM Troubleshooting",
          instructions: "Find and fix the problems in these VLSM designs",
          problems: [
            "Overlapping subnets: 10.1.0.0/25 and 10.1.0.64/26 - what's wrong?",
            "Inefficient design: /24 for 5 hosts, /30 for 100 hosts - how to fix?",
            "Can't add new subnet: Used /24, /25, /26 randomly - why is space fragmented?",
            "Route summarization broken: Sites at 10.1.1.0/24, 10.1.5.0/24, 10.1.3.0/24 - better design?"
          ]
        }
      ]
    },
    keyTakeaways: [
      "VLSM allows different-sized subnets from one network block",
      "Always allocate from largest to smallest subnet",
      "Subnets must align on proper boundaries (powers of 2)",
      "Good documentation is essential for VLSM success",
      "Plan for 20-50% growth to avoid future problems",
      "Efficient VLSM design conserves precious IPv4 addresses"
    ]
  },
  
  7: {
    title: "Routing and Subnets",
    sections: [
      {
        type: "introduction",
        title: "How Routers Use Your Subnet Design",
        content: `
You've mastered subnet calculations and VLSM design. But how do routers actually use this information? Understanding routing is the bridge between subnet theory and real-world networking.

Routers are like smart postal workers - they look at destination addresses and decide the best path for delivery. Your subnet design directly impacts how efficiently they can do their job.

**What You'll Learn:**
- How routers make forwarding decisions
- The relationship between subnets and routing tables
- Route summarization for efficiency
- How subnet design affects network performance
- Common routing protocols and subnets
        `
      },
      {
        type: "concept",
        title: "Routing Fundamentals",
        content: `
**How Routers Think:**

**1. Destination-Based Forwarding**
Routers don't care about source addresses for forwarding. They only look at where packets are going.

**2. Longest Match Wins**
When multiple routes match, the most specific (longest prefix) wins:
\`\`\`
10.1.1.0/24 (more specific) beats
10.1.0.0/16 (less specific) beats  
10.0.0.0/8  (least specific)
\`\`\`

**3. The Routing Table**
A router's brain - contains:
- Destination networks
- Next-hop addresses
- Exit interfaces
- Metrics (distance/cost)

**4. Connected vs Remote**
- Connected: Subnets directly attached to router interfaces
- Remote: Subnets learned via routing protocols or static routes

**5. The Forwarding Process**
1. Packet arrives
2. Extract destination IP
3. Search routing table for match
4. Use longest match if multiple
5. Forward to next-hop or drop
        `
      },
      {
        type: "routing-table",
        title: "Understanding Routing Tables",
        content: `
**Sample Routing Table:**
\`\`\`
C    192.168.1.0/24  is directly connected, GigabitEthernet0/0
C    192.168.2.0/24  is directly connected, GigabitEthernet0/1
S    192.168.3.0/24  [1/0] via 192.168.2.2
O    10.0.0.0/8      [110/10] via 192.168.1.254
S    0.0.0.0/0       [1/0] via 203.0.113.1
\`\`\`

**Reading the Table:**
- **C** = Connected (directly attached subnet)
- **S** = Static (manually configured route)
- **O** = OSPF (dynamically learned route)
- **[110/10]** = [Administrative Distance/Metric]
- **via** = Next-hop IP address

**How Subnets Appear:**
\`\`\`
# Your subnet design becomes routing entries:
Subnet Design:           Routing Table:
192.168.1.0/26    →     C  192.168.1.0/26
192.168.1.64/26   →     C  192.168.1.64/26
192.168.1.128/25  →     C  192.168.1.128/25
\`\`\`

**The router knows exactly which interface serves each subnet!**
        `
      },
      {
        type: "route-summarization",
        title: "Route Summarization Magic",
        content: `
**What is Route Summarization?**

Combining multiple smaller routes into one larger route. It's like saying "all houses on Elm Street" instead of listing each house number.

**Example: Summarizing Four Subnets**
\`\`\`
Detailed Routes:
172.16.0.0/24
172.16.1.0/24
172.16.2.0/24
172.16.3.0/24

Summarized Route:
172.16.0.0/22 (covers all four!)
\`\`\`

**How to Find the Summary:**
1. Convert to binary
2. Find common bits from left
3. Count common bits for mask
4. Set remaining bits to 0

**Binary Analysis:**
\`\`\`
172.16.0.0  = 10101100.00010000.00000000.00000000
172.16.1.0  = 10101100.00010000.00000001.00000000
172.16.2.0  = 10101100.00010000.00000010.00000000
172.16.3.0  = 10101100.00010000.00000011.00000000
                                  ↑
Common bits: 22 (stops here)
Summary: 172.16.0.0/22
\`\`\`

**Benefits:**
- Smaller routing tables
- Faster lookups
- Less memory usage
- Reduced routing updates
- Better scalability
        `
      },
      {
        type: "interactive-tool",
        title: "Route Calculator",
        component: "NetworkCalculator"
      },
      {
        type: "subnet-routing-relationship",
        title: "How Subnet Design Affects Routing",
        content: `
**Good Design = Efficient Routing**

**Scenario 1: Hierarchical Design (Good)**

\`\`\`
Region 1: 10.1.0.0/16
├── Site A: 10.1.0.0/24
├── Site B: 10.1.1.0/24
└── Site C: 10.1.2.0/24

Region 2: 10.2.0.0/16
├── Site D: 10.2.0.0/24
├── Site E: 10.2.1.0/24
└── Site F: 10.2.2.0/24
\`\`\`

**Result:** Can advertise just 10.1.0.0/16 and 10.2.0.0/16!

**Scenario 2: Random Design (Bad)**
\`\`\`
Site A: 10.1.0.0/24
Site B: 10.5.7.0/24
Site C: 10.2.15.0/24
Site D: 10.9.3.0/24
Site E: 10.3.22.0/24
Site F: 10.7.18.0/24
\`\`\`

**Result:** Must advertise all 6 routes individually!

**Impact on Routing:**
- Good design: 2 routes in core routing table
- Bad design: 6 routes in core routing table
- 3x more memory, processing, and updates!
        `
      },
      {
        type: "routing-decisions",
        title: "Router Decision Examples",
        content: `
**Example 1: Where Does This Packet Go?**

Packet destination: 192.168.1.100

\`\`\`
Routing Table:
192.168.1.0/24   via 10.0.0.2
192.168.1.0/25   via 10.0.0.3
192.168.0.0/16   via 10.0.0.4
0.0.0.0/0        via 10.0.0.1
\`\`\`

**Router's Decision Process:**
1. Does 192.168.1.100 match 192.168.1.0/24? YES ✓
2. Does 192.168.1.100 match 192.168.1.0/25? YES ✓
3. Does 192.168.1.100 match 192.168.0.0/16? YES ✓
4. Does 192.168.1.100 match 0.0.0.0/0? YES ✓

**Winner: 192.168.1.0/25** (longest match - /25 beats /24 beats /16 beats /0)
**Forward to: 10.0.0.3**

**Example 2: No Specific Route**

Packet destination: 8.8.8.8

\`\`\`
Routing Table:
192.168.1.0/24   via 10.0.0.2
10.0.0.0/8       via 10.0.0.3
0.0.0.0/0        via 10.0.0.1
\`\`\`

**Decision:** Only 0.0.0.0/0 matches → Forward to 10.0.0.1 (default gateway)
        `
      },
      {
        type: "routing-protocols",
        title: "Routing Protocols and Subnets",
        content: `
**How Different Protocols Handle Subnets:**

**RIP (Routing Information Protocol)**
- Classful by default (RIPv1)
- RIPv2 supports VLSM
- Advertises all known subnets
- Limited to 15 hops

**OSPF (Open Shortest Path First)**
- Full VLSM support
- Understands subnet masks
- Can summarize at area boundaries
- Scales to large networks

**EIGRP (Enhanced Interior Gateway Routing Protocol)**
- Full VLSM support
- Automatic summarization (can be disabled)
- Very efficient updates
- Cisco proprietary

**BGP (Border Gateway Protocol)**
- Internet's routing protocol
- Full CIDR support
- Aggregates routes for efficiency
- Policy-based routing

**Static Routing**
- Manual subnet configuration
- No automatic updates
- Perfect for small, stable networks
- You control every route

**Important:** Modern protocols (OSPF, EIGRP, BGP) understand VLSM. Old protocols (RIPv1) don't!
        `
      },
      {
        type: "troubleshooting-routing",
        title: "Troubleshooting Subnet Routing Issues",
        content: `
**Common Problems and Solutions:**

**Problem 1: Asymmetric Routing**
\`\`\`
Host A: 192.168.1.10/24
Host B: 192.168.1.200/25

A → B: Works (B is in A's subnet)
B → A: Fails (A is not in B's subnet)
\`\`\`
**Fix:** Ensure matching subnet masks

**Problem 2: Missing Routes**
\`\`\`
Can't reach 172.16.5.0/24
Routing table missing entry
\`\`\`
**Fix:** Add static route or fix routing protocol

**Problem 3: Overlapping Subnets**
\`\`\`
Router1: 10.1.0.0/24
Router2: 10.1.0.0/25
Conflict!
\`\`\`
**Fix:** Redesign to eliminate overlap

**Problem 4: Summarization Gone Wrong**
\`\`\`
Summarizing:
192.168.1.0/24
192.168.2.0/24
192.168.4.0/24 (missing .3!)

Wrong: 192.168.0.0/22 (includes .3)
Right: Advertise individually
\`\`\`
**Fix:** Only summarize contiguous blocks

**Troubleshooting Commands:**
- \`show ip route\` - View routing table
- \`traceroute\` - Follow packet path
- \`ping\` - Test connectivity
- \`show ip interface brief\` - Check interfaces
        `
      },
      {
        type: "best-practices",
        title: "Routing Best Practices",
        content: `
**Design for Routing Efficiency:**

**1. Hierarchical Addressing**
- Assign addresses geographically
- Group related subnets
- Plan for summarization

**2. Document Routes**
\`\`\`
# Route Documentation Template
Network: 10.1.0.0/16
Purpose: Region 1 Summary
Advertised by: Core-Router-1
Received by: ISP, Region-2
\`\`\`

**3. Reserve Space**
- Keep gaps for growth
- Don't use every subnet
- Plan for new sites

**4. Consistent Masking**
- Use same mask for similar purposes
- /30 for all point-to-point
- /24 for all user LANs

**5. Monitor and Optimize**
- Regular routing table audits
- Remove outdated routes
- Summarize where possible
- Track table size growth

**6. Security Considerations**
- Filter private addresses at borders
- Don't advertise internal structure
- Use route authentication
- Implement bogon filtering
        `
      },
      {
        type: "summary",
        title: "Routing and Subnet Mastery!",
        content: `
You now understand:
- How routers use subnet information for forwarding
- The longest-match rule for route selection
- Route summarization for efficiency
- How subnet design impacts routing performance
- Common routing protocols and their subnet handling
- Troubleshooting subnet-related routing issues

**Key Insights:**
1. Good subnet design = efficient routing
2. Hierarchical addressing enables summarization
3. Longest match always wins
4. Document your routing design
5. Plan for growth and changes

**Remember:** Subnets and routing are two sides of the same coin. Master both for network excellence!

Next: Module 8 - IPv6 Subnetting, where we'll apply these concepts to the future of networking!
        `
      }
    ],
    practice: {
      title: "Routing and Subnets Practice",
      questions: [
        {
          question: "A packet to 10.1.5.100 arrives. Which route wins: 10.0.0.0/8, 10.1.0.0/16, or 10.1.5.0/24?",
          hint: "Remember the longest match rule",
          answer: "10.1.5.0/24 wins (longest match - /24 is more specific than /16 or /8)"
        },
        {
          question: "Can you summarize 192.168.0.0/24, 192.168.1.0/24, 192.168.2.0/24, 192.168.3.0/24?",
          hint: "Check if they're contiguous and share common bits",
          answer: "Yes! 192.168.0.0/22 covers all four networks (they share the first 22 bits)"
        },
        {
          question: "Why might 172.16.1.0/24 and 172.16.1.0/25 in the same routing table cause problems?",
          hint: "Think about overlapping address space",
          answer: "They overlap! The /25 is a subset of the /24. This causes ambiguous routing - which path should packets take?"
        },
        {
          question: "What happens if a router has no route to 8.8.8.8?",
          hint: "What's the last resort route?",
          answer: "It uses the default route (0.0.0.0/0) if one exists, otherwise drops the packet"
        },
        {
          question: "Why is hierarchical addressing important for large networks?",
          hint: "Think about routing table size and updates",
          answer: "It enables route summarization, reducing routing table size, memory usage, and update traffic"
        }
      ],
      exercises: [
        {
          title: "Route Selection Challenge",
          instructions: "Determine which route the router will choose for each destination",
          problems: [
            "Destination: 192.168.1.50, Routes: 192.168.0.0/16, 192.168.1.0/24, 192.168.1.0/28",
            "Destination: 10.5.5.5, Routes: 10.0.0.0/8, 10.5.0.0/16, 0.0.0.0/0",
            "Destination: 172.16.50.100, Routes: 172.16.0.0/12, 172.16.48.0/22, 172.16.50.0/24",
            "Build a routing table that efficiently handles 8 /24 subnets in the 10.1.x.x range"
          ]
        },
        {
          title: "Summarization Practice",
          instructions: "Find the best summary route for these subnet groups",
          problems: [
            "Summarize: 10.1.0.0/24 through 10.1.7.0/24",
            "Summarize: 192.168.16.0/24, 192.168.17.0/24, 192.168.18.0/24, 192.168.19.0/24",
            "Can you summarize: 172.16.0.0/24, 172.16.2.0/24, 172.16.4.0/24? Why or why not?",
            "Design a hierarchical scheme for a company with 3 regions, 4 sites per region, using 10.0.0.0/8"
          ]
        }
      ]
    },
    keyTakeaways: [
      "Routers forward based on destination IP and longest match wins",
      "Routing tables contain destination networks, next-hops, and metrics",
      "Route summarization reduces table size and improves efficiency",
      "Hierarchical subnet design enables better route aggregation",
      "Different routing protocols handle subnets differently (classful vs classless)",
      "Good subnet design directly impacts routing performance and scalability"
    ]
  },
  
  8: {
    title: "IPv6 Subnetting",
    sections: [
      {
        type: "introduction",
        title: "Welcome to the Future of Networking",
        content: `
IPv4 is running out. With only 4.3 billion addresses and a global population of 8 billion (plus billions of devices), we need a bigger solution. Enter IPv6 - with 340 undecillion addresses, that's enough to assign 100 addresses to every atom on Earth!

But IPv6 isn't just about more addresses. It's a complete reimagining of how IP addressing works, with built-in security, simplified headers, and no more NAT.

**Key Differences from IPv4:**
- 128-bit addresses (vs 32-bit)
- Hexadecimal notation (vs decimal)
- No broadcast addresses
- Simplified subnetting
- Built-in IPsec support
- Automatic address configuration
        `
      },
      {
        type: "concept",
        title: "IPv6 Address Structure",
        content: `
**IPv6 Address Format:**

An IPv6 address is 128 bits long, written as 8 groups of 4 hexadecimal digits:

\`\`\`
2001:0db8:85a3:0000:0000:8a2e:0370:7334
│    │    │    │    │    │    │    │
└────┴────┴────┴────┴────┴────┴────┘
        8 groups of 16 bits each
\`\`\`

**Each hexadecimal digit represents 4 bits:**
- 0-9: Values 0-9
- A-F: Values 10-15
- Case insensitive (A = a)

**Address Parts:**
\`\`\`
Global Routing Prefix | Subnet ID | Interface ID
      (48 bits)       | (16 bits) |  (64 bits)
\`\`\`

**Common Prefixes:**
- 2000::/3 - Global Unicast (Internet routable)
- FE80::/10 - Link-Local (like 169.254.x.x)
- FC00::/7 - Unique Local (like RFC 1918)
- FF00::/8 - Multicast
- ::1/128 - Loopback (like 127.0.0.1)
        `
      },
      {
        type: "compression",
        title: "IPv6 Address Compression Rules",
        content: `
**Making IPv6 Addresses Human-Friendly**

IPv6 addresses are long! Fortunately, we have two compression rules:

**Rule 1: Leading Zeros**
Remove leading zeros from each group:
\`\`\`
2001:0db8:0000:0042:0000:8a2e:0370:7334
                ↓
2001:db8:0:42:0:8a2e:370:7334
\`\`\`

**Rule 2: Consecutive Zeros (::)**
Replace the longest run of all-zero groups with ::
\`\`\`
2001:db8:0:0:0:0:0:1
         ↓
2001:db8::1
\`\`\`

**Important:** You can only use :: once per address!

**Compression Examples:**
\`\`\`
Full:       2001:0db8:0000:0000:0000:0000:0000:0001
Rule 1:     2001:db8:0:0:0:0:0:1
Rule 2:     2001:db8::1

Full:       fe80:0000:0000:0000:0204:61ff:fe9d:f156
Rule 1:     fe80:0:0:0:204:61ff:fe9d:f156
Rule 2:     fe80::204:61ff:fe9d:f156

Full:       0000:0000:0000:0000:0000:0000:0000:0001
Compressed: ::1 (loopback)

Full:       0000:0000:0000:0000:0000:0000:0000:0000
Compressed: :: (all zeros)
\`\`\`

**Decompression:**
To expand ::, count existing groups and fill to 8 total:
\`\`\`
2001:db8::1
= 2001:db8:(missing groups):1
= 2001:db8:0:0:0:0:0:1 (6 groups of zeros)
\`\`\`
        `
      },
      {
        type: "subnetting",
        title: "IPv6 Subnetting Simplified",
        content: `
**The Beauty of IPv6 Subnetting**

IPv6 subnetting is actually easier than IPv4! Here's why:

**Standard Allocation:**
- ISP gives you a /48 prefix
- You create /64 subnets
- That's 65,536 possible subnets!
- Each subnet has 2^64 addresses

**No More Host Calculation:**
- Always use /64 for LANs
- Interface ID is always 64 bits
- No subnet/broadcast addresses
- All addresses are usable

**Example: Subnetting 2001:db8:1234::/48**

\`\`\`
Your allocation: 2001:db8:1234::/48
                               ││└─ 16 bits for subnets
                               │└── Subnet boundary
                               └─── Your prefix

Possible subnets:
2001:db8:1234:0::/64    (Subnet 0)
2001:db8:1234:1::/64    (Subnet 1)
2001:db8:1234:2::/64    (Subnet 2)
...
2001:db8:1234:ffff::/64 (Subnet 65535)
\`\`\`

**Subnet Planning Example:**
\`\`\`
2001:db8:1234:1::/64   - Building 1
2001:db8:1234:2::/64   - Building 2
2001:db8:1234:10::/64  - Servers
2001:db8:1234:20::/64  - Guest WiFi
2001:db8:1234:30::/64  - IoT Devices
2001:db8:1234:99::/64  - Management
\`\`\`

**Pro Tip:** Use hex patterns for easy identification:
- :10xx: for servers
- :20xx: for users
- :30xx: for IoT
- :99xx: for management
        `
      },
      {
        type: "address-types",
        title: "IPv6 Address Types",
        content: `
**Understanding IPv6 Address Types**

**1. Link-Local (FE80::/10)**
\`\`\`
fe80::1234:5678:9abc:def0
│└─┘
│ └── Always fe80 for link-local
└──── Automatically configured
\`\`\`
- Always present on every interface
- Not routable beyond local link
- Used for neighbor discovery
- Like 169.254.x.x in IPv4

**2. Unique Local (FC00::/7)**
\`\`\`
fd12:3456:789a:1::/64
│└──┘
│ └── Random 40-bit global ID
└──── fd = locally assigned
\`\`\`
- Private addresses (like RFC 1918)
- Not internet routable
- Globally unique (with high probability)

**3. Global Unicast (2000::/3)**
\`\`\`
2001:db8:1234:5678::1
│    │   │    │
│    │   │    └── Interface ID
│    │   └────── Subnet ID
│    └────────── ISP allocation
└─────────────── Global routing
\`\`\`
- Internet routable addresses
- Assigned by ISPs
- Globally unique

**4. Multicast (FF00::/8)**
\`\`\`
ff02::1     - All nodes on link
ff02::2     - All routers on link
ff02::1:2   - All DHCP servers
\`\`\`
- Replaces broadcast
- Scoped delivery
- More efficient than broadcast
        `
      },
      {
        type: "practical-examples",
        title: "Real-World IPv6 Deployment",
        content: `
**Scenario: Small Business IPv6 Migration**

ISP Assignment: 2001:db8:cafe::/48

**Step 1: Plan Your Subnets**
\`\`\`
Departments:
2001:db8:cafe:1::/64   - Sales (VLAN 10)
2001:db8:cafe:2::/64   - Engineering (VLAN 20)
2001:db8:cafe:3::/64   - Management (VLAN 30)

Infrastructure:
2001:db8:cafe:10::/64  - Servers
2001:db8:cafe:20::/64  - Network Equipment
2001:db8:cafe:99::/64  - Point-to-Point Links

Guest/DMZ:
2001:db8:cafe:100::/64 - Guest WiFi
2001:db8:cafe:200::/64 - DMZ Services
\`\`\`

**Step 2: Address Assignment Examples**
\`\`\`
Router Interface:
2001:db8:cafe:1::1/64  (Sales gateway)

DHCPv6 Range:
2001:db8:cafe:1::1000 to
2001:db8:cafe:1::9999

Static Server:
2001:db8:cafe:10::53   (DNS)
2001:db8:cafe:10::80   (Web)
2001:db8:cafe:10::25   (Mail)
\`\`\`

**Step 3: Dual-Stack Configuration**
\`\`\`
Interface GigabitEthernet0/1
 Description Sales Network
 IPv4: 192.168.1.1/24
 IPv6: 2001:db8:cafe:1::1/64
\`\`\`
        `
      },
      {
        type: "common-patterns",
        title: "IPv6 Addressing Patterns",
        content: `
**Smart IPv6 Address Planning**

**Pattern 1: Memorable Addresses**
\`\`\`
2001:db8:cafe:1::d:e:a:d    (Memorable)
2001:db8:cafe:2::bad:c0de   (Hexspeak)
2001:db8:cafe:10::80        (Port-based)
2001:db8:cafe:53::53        (Service-based)
\`\`\`

**Pattern 2: Sequential Numbering**
\`\`\`
Routers:    ::1
Switches:   ::2-::9
Servers:    ::10-::99
Printers:   ::100-::199
DHCP Start: ::1000
\`\`\`

**Pattern 3: Embed IPv4**
\`\`\`
IPv4: 192.168.1.10
IPv6: 2001:db8:cafe:1::192:168:1:10
      (Easy to remember!)
\`\`\`

**Pattern 4: VLAN Matching**
\`\`\`
VLAN 10: 2001:db8:cafe:10::/64
VLAN 20: 2001:db8:cafe:20::/64
VLAN 30: 2001:db8:cafe:30::/64
\`\`\`

**Pattern 5: Geographic/Building**
\`\`\`
Building A: 2001:db8:cafe:a00::/56
  Floor 1:  2001:db8:cafe:a01::/64
  Floor 2:  2001:db8:cafe:a02::/64
  
Building B: 2001:db8:cafe:b00::/56
  Floor 1:  2001:db8:cafe:b01::/64
  Floor 2:  2001:db8:cafe:b02::/64
\`\`\`
        `
      },
      {
        type: "transition",
        title: "IPv4 to IPv6 Transition",
        content: `
**Transition Strategies**

**1. Dual Stack (Recommended)**
\`\`\`
Interface Configuration:
  IPv4: 192.168.1.1/24
  IPv6: 2001:db8:cafe:1::1/64
  
Both protocols run simultaneously
\`\`\`

**2. Tunneling (6in4, 6to4)**
\`\`\`
IPv6 packets encapsulated in IPv4
Useful for crossing IPv4-only networks
\`\`\`

**3. Translation (NAT64/DNS64)**
\`\`\`
Allows IPv6-only clients to reach IPv4 services
2001:db8:cafe:64::192.168.1.10
\`\`\`

**Migration Checklist:**
- [ ] Get IPv6 allocation from ISP
- [ ] Plan addressing scheme
- [ ] Update firewall rules
- [ ] Configure routing protocols
- [ ] Enable on internal networks
- [ ] Test thoroughly
- [ ] Monitor dual-stack traffic
- [ ] Phase out IPv4 (eventually)

**Common Mistakes:**
- Forgetting to update firewall rules
- Not planning address scheme
- Ignoring IPv6 security
- Using transitional addresses permanently
- Not monitoring IPv6 traffic
        `
      },
      {
        type: "summary",
        title: "IPv6 Mastery Achieved!",
        content: `
You now understand:
- IPv6 address structure and notation
- Address compression and expansion rules
- Simplified /64 subnetting model
- Different IPv6 address types and their uses
- Real-world deployment strategies
- Transition mechanisms from IPv4

**Key Takeaways:**
1. IPv6 addresses are 128 bits in hexadecimal
2. Use :: to compress consecutive zeros (once only)
3. Standard practice: /64 for all LAN subnets
4. No broadcast, no subnet/network addresses
5. Plan your addressing scheme thoughtfully
6. Dual-stack is the preferred transition method

**Your IPv6 Toolkit:**
- Compression rules for readable addresses
- Standard /48 allocation, /64 subnets
- Address patterns for easy management
- Transition strategies for migration

IPv6 isn't the future - it's the present. Major providers report 40%+ IPv6 traffic. Time to join the revolution!

Next: Module 9 - Network Troubleshooting, where we'll apply everything you've learned!
        `
      }
    ],
    practice: {
      title: "IPv6 Practice",
      questions: [
        {
          question: "Compress this IPv6 address: 2001:0db8:0000:0000:0008:0800:200c:417a",
          hint: "Apply both compression rules: remove leading zeros and use :: for consecutive zero groups",
          answer: "2001:db8::8:800:200c:417a"
        },
        {
          question: "How many /64 subnets can you create from a /48 prefix?",
          hint: "48 to 64 is how many bits?",
          answer: "65,536 subnets (2^16 = 65,536, because 64-48=16 bits for subnetting)"
        },
        {
          question: "What type of address is fe80::1234:5678:9abc:def0?",
          hint: "Look at the first few hex digits",
          answer: "Link-local address (fe80::/10 prefix)"
        },
        {
          question: "Expand this compressed address: 2001:db8::1",
          hint: "Count the groups and fill in zeros to make 8 groups total",
          answer: "2001:0db8:0000:0000:0000:0000:0000:0001"
        },
        {
          question: "If you have 2001:db8:cafe::/48, what would be the 5th /64 subnet?",
          hint: "Subnets start at 0, so the 5th is index 4",
          answer: "2001:db8:cafe:4::/64"
        }
      ],
      exercises: [
        {
          title: "IPv6 Compression Practice",
          instructions: "Compress these IPv6 addresses to their shortest form",
          problems: [
            "Compress: 2001:0db8:0000:0042:0000:0000:0000:0001",
            "Compress: fe80:0000:0000:0000:0202:b3ff:fe1e:8329",
            "Compress: 0000:0000:0000:0000:0000:0000:0000:0001",
            "Compress: 2001:0db8:0000:0001:0002:0003:0004:0005"
          ]
        },
        {
          title: "IPv6 Subnet Planning",
          instructions: "Design an IPv6 addressing scheme",
          problems: [
            "You have 2001:db8:abcd::/48. Plan subnets for: HQ (3 VLANs), Branch1 (2 VLANs), Branch2 (2 VLANs)",
            "Create memorable addresses for: DNS server, Web server, Mail server in subnet 2001:db8:1234:10::/64",
            "Design a hierarchical scheme for a campus with 4 buildings, 5 floors each, using 2001:db8:campus::/48",
            "Plan dual-stack addressing: IPv4 192.168.0.0/16 and IPv6 2001:db8::/48 for 10 departments"
          ]
        }
      ]
    },
    keyTakeaways: [
      "IPv6 uses 128-bit addresses written in hexadecimal",
      "Compress addresses by removing leading zeros and using :: for consecutive zero groups",
      "Standard practice is to use /64 for all LAN subnets",
      "IPv6 has no broadcast addresses - multicast is used instead",
      "Link-local addresses (fe80::/10) are automatically configured",
      "Dual-stack (running IPv4 and IPv6 together) is the recommended transition approach"
    ]
  },
  
  9: {
    title: "Network Troubleshooting",
    sections: [
      {
        type: "introduction",
        title: "Putting It All Together",
        content: `
You've mastered binary, subnetting, VLSM, routing, and IPv6. Now let's apply these skills to real-world network troubleshooting. This module teaches you to think like a network engineer when problems arise.

Most network issues come down to one of these:
- IP addressing conflicts or errors
- Subnet mask mismatches
- Routing problems
- VLAN misconfigurations
- Firewall rules

With your subnet knowledge, you can quickly identify and fix these issues!
        `
      },
      {
        type: "methodology",
        title: "The Troubleshooting Method",
        content: `
**The 7-Layer Troubleshooting Approach**

Always start at Layer 1 and work up:

**1. Physical (Layer 1)**
- Is the cable plugged in?
- Link lights green?
- Cable damaged?

**2. Data Link (Layer 2)**
- VLAN configured correctly?
- Switch port enabled?
- Spanning tree blocking?

**3. Network (Layer 3) - Our Focus!**
- IP address correct?
- Subnet mask correct?
- In the same subnet?
- Gateway configured?
- Routes exist?

**4. Transport (Layer 4)**
- Port open?
- Service running?

**5-7. Application Layers**
- Application-specific issues

**The Subnet Checklist:**
□ IP address valid for subnet?
□ Subnet mask matches other devices?
□ Default gateway in same subnet?
□ No duplicate IPs?
□ Routing table has path?
        `
      },
      {
        type: "common-problems",
        title: "Common Subnet-Related Problems",
        content: `
**Problem 1: Can't Communicate on Same Network**

**Symptom:** Two devices on same switch can't ping

**Check:**

\`\`\`
Device A: 192.168.1.50/24
Device B: 192.168.1.200/25

Analysis:
A thinks network is: 192.168.1.0-255
B thinks network is: 192.168.1.128-255
A thinks B is local, B thinks A is remote!
\`\`\`

**Fix:** Ensure matching subnet masks

**Problem 2: Asymmetric Routing**

**Symptom:** Traffic works one way only

**Check:**

\`\`\`
PC: 10.1.1.100/24, GW: 10.1.1.1
Server: 10.1.1.200/25, GW: 10.1.1.129

PC→Server: Goes to 10.1.1.1 (thinks remote)
Server→PC: Direct (thinks local)
Return path different = Firewall drops!
\`\`\`

**Problem 3: Wrong Gateway**

**Symptom:** Can't reach internet/other subnets

**Check:**

\`\`\`
IP: 172.16.50.100/24
Gateway: 172.16.51.1  ← Wrong subnet!
\`\`\`

**Fix:** Gateway must be in same subnet

**Problem 4: IP Conflict**

**Symptom:** Intermittent connectivity

**Check:**

\`\`\`
ARP cache shows:
192.168.1.100 = MAC-1 (sometimes)
192.168.1.100 = MAC-2 (sometimes)
\`\`\`

**Fix:** Find duplicate, change one IP
        `
      },
      {
        type: "diagnostic-commands",
        title: "Essential Diagnostic Commands",
        content: `
**Windows Commands:**

\`\`\`
ipconfig /all              # Show all network config
arp -a                     # Show ARP cache
route print               # Show routing table
nslookup                  # Test DNS
ping -t                   # Continuous ping
tracert                   # Trace route to destination
pathping                  # Combination ping/tracert
netstat -an               # Show connections
\`\`\`

**Linux/Mac Commands:**

\`\`\`
ip addr show              # Show interfaces (Linux)
ifconfig                  # Show interfaces (older/Mac)
ip route show            # Show routes (Linux)
netstat -rn              # Show routes (Mac)
arp -n                   # Show ARP cache
dig                      # DNS lookup
mtr                      # Better traceroute
ss -an                   # Socket statistics
\`\`\`

**Cisco IOS Commands:**

\`\`\`
show ip interface brief   # Quick interface status
show ip route            # Routing table
show ip arp              # ARP table
show vlan                # VLAN assignments
show running-config      # Current configuration
show mac address-table   # Switch MAC table
ping                     # Test connectivity
traceroute              # Trace path
\`\`\`

**Quick Subnet Verification:**

\`\`\`
# Is .100 in same subnet as .200 with /25?
ping 192.168.1.200

# Check your IP and mask
ipconfig (Windows) or ip addr (Linux)

# Verify gateway is reachable
ping <gateway-ip>

# Check routing table for destination
route -n (Linux) or route print (Windows)
\`\`\`
        `
      },
      {
        type: "interactive-tool",
        title: "Practice Network Calculations",
        component: "NetworkCalculator"
      },
      {
        type: "troubleshooting-scenarios",
        title: "Real-World Troubleshooting Scenarios",
        content: `
**Scenario 1: The New Printer**

"The new printer (192.168.1.250) can't be reached from accounting!"

**Investigation:**

\`\`\`
Accounting PC: 192.168.1.50/25
Printer: 192.168.1.250/24
Gateway: 192.168.1.1

Analysis:
PC subnet: 192.168.1.0-127 (/25)
Printer: 192.168.1.250 (outside PC's subnet)
PC will send to gateway, but printer thinks PC is local!
\`\`\`

**Solution:** Change printer to /25 or PC to /24

**Scenario 2: The Slow Application**

"Application is slow between offices!"

**Investigation:**

\`\`\`
Office A: 10.1.0.0/16
Office B: 10.2.0.0/16

Traceroute shows:
10.1.0.100 → 10.1.0.1 → 172.16.0.1 → 
8.8.8.8 → 4.4.4.4 → 172.16.0.2 → 10.2.0.100

Going through internet instead of private WAN!
\`\`\`

**Solution:** Add static routes for private networks

**Scenario 3: The Monday Morning Mystery**

"Nobody can connect after the weekend!"

**Investigation:**

\`\`\`
DHCP scope exhausted
Scope: 192.168.1.100-200 (/24)
Leases: 101 active (scope full)

Weekend: IoT devices auto-updated, grabbed IPs
\`\`\`

**Solution:** 
- Expand DHCP scope
- Shorten lease time
- Create IoT VLAN
        `
      },
      {
        type: "subnet-design-review",
        title: "Subnet Design Problems",
        content: `
**Common Design Mistakes to Spot:**

**1. Wasted Address Space**

\`\`\`
Bad:
/24 for 2 servers
/24 for point-to-point link

Good:
/29 for 2 servers (6 hosts)
/30 for point-to-point (2 hosts)
\`\`\`

**2. No Growth Room**

\`\`\`
Bad:
50 users → /26 (62 hosts) ← No growth!

Good:
50 users → /25 (126 hosts) ← Room to grow
\`\`\`

**3. Poor Summarization**

\`\`\`
Bad:
Site A: 10.1.1.0/24
Site B: 10.1.3.0/24  ← Can't summarize!
Site C: 10.1.5.0/24

Good:
Site A: 10.1.0.0/24
Site B: 10.1.1.0/24  ← Summarizes to
Site C: 10.1.2.0/24  ← 10.1.0.0/22
\`\`\`

**4. Overlapping Subnets**

\`\`\`
VLAN 10: 192.168.1.0/24
VLAN 20: 192.168.1.128/25  ← Overlap!

Always check for overlaps when adding subnets
\`\`\`

**5. Wrong Mask for Purpose**

\`\`\`
Bad:
User LAN: /30 (too small)
P2P Link: /24 (too large)

Good:
User LAN: /24 (254 hosts)
P2P Link: /30 (2 hosts)
\`\`\`
        `
      },
      {
        type: "documentation",
        title: "Network Documentation",
        content: `
**Essential Documentation for Troubleshooting**

**1. IP Address Spreadsheet**

\`\`\`
Network     | Purpose      | VLAN | Gateway      | DHCP Range
------------|-------------|------|--------------|-------------
10.1.1.0/24 | Sales       | 10   | 10.1.1.1     | .100-.199
10.1.2.0/24 | Engineering | 20   | 10.1.2.1     | .100-.199
10.1.3.0/24 | Guest       | 30   | 10.1.3.1     | .50-.250
\`\`\`

**2. Network Diagram**
- Show all subnets
- Label IP ranges
- Mark VLANs
- Include routing paths

**3. Change Log**

\`\`\`
Date       | Change              | By    | Reason
-----------|--------------------|---------|---------
2024-01-15 | Added 10.1.4.0/24  | John  | New dept
2024-01-20 | Changed DHCP scope | Sarah | Full
\`\`\`

**4. Standard Configurations**

\`\`\`
# Standard User VLAN Config
interface vlan X
 ip address 10.1.X.1 255.255.255.0
 ip helper-address 10.1.10.10
 description User_VLAN_X
\`\`\`

**5. Emergency Contacts**
- ISP support: 1-800-XXX-XXXX
- Account #: 12345
- Circuit ID: XXXXX

**Documentation Saves Time!**
        `
      },
      {
        type: "best-practices",
        title: "Troubleshooting Best Practices",
        content: `
**Professional Troubleshooting Approach**

**1. Gather Information First**
- When did it start?
- What changed?
- Who is affected?
- Error messages?
- Intermittent or constant?

**2. Document Everything**
- What you checked
- Results of tests
- Configuration changes
- Create tickets

**3. Use Systematic Approach**
- Don't randomly change things
- Test one change at a time
- Have rollback plan
- Verify fix works

**4. Common Quick Checks**
- Ping gateway
- Check subnet mask
- Verify VLAN
- Check routing table
- Review recent changes

**5. Communication**
- Keep users informed
- Set realistic expectations
- Document root cause
- Plan prevention

**Remember:**
"It's always DNS... except when it's the subnet mask!"
        `
      },
      {
        type: "summary",
        title: "Troubleshooting Mastery!",
        content: `
Congratulations! You've completed the Subnet Pro course!

**You've Learned:**
- Binary and decimal conversion
- How subnet masks work
- IP address structure
- CIDR notation
- Subnet calculations
- VLSM design
- Routing concepts
- IPv6 addressing
- Troubleshooting methodology

**Your Subnet Toolkit:**
1. Binary/decimal conversion skills
2. Subnet calculation formulas
3. VLSM design principles
4. Diagnostic commands
5. Troubleshooting methodology
6. Documentation templates

**Key Troubleshooting Wisdom:**
- Most problems are simple (check the mask!)
- Document everything
- Verify changes work
- Learn from every issue
- Build better designs

**Next Steps:**
- Practice with real networks
- Get hands-on experience
- Study for certifications (CCNA, Network+)
- Keep learning and growing

Remember: Every expert was once a beginner. You've built a solid foundation - now go apply it!
        `
      }
    ],
    practice: {
      title: "Troubleshooting Practice",
      questions: [
        {
          question: "PC (192.168.1.100/25) can't ping Server (192.168.1.200/24). Why?",
          hint: "Compare their subnet ranges",
          answer: "Different subnet views. PC thinks server is in different subnet (128-255), but server thinks PC is local (0-255). Asymmetric routing issue."
        },
        {
          question: "Users report 'Destination Host Unreachable' when pinging 8.8.8.8. Local pings work. What's wrong?",
          hint: "What device provides access to external networks?",
          answer: "Missing or incorrect default gateway. Check if gateway is configured and in the same subnet as the host."
        },
        {
          question: "DHCP clients getting 169.254.x.x addresses. What's happening?",
          hint: "What does this address range indicate?",
          answer: "APIPA/link-local addresses. DHCP server unreachable - check DHCP server, VLAN config, or ip helper-address."
        },
        {
          question: "Traceroute shows: 10.1.1.1 → 10.1.1.1 → 10.1.1.1 (repeating). What's wrong?",
          hint: "What would cause a packet to loop?",
          answer: "Routing loop. Two routers pointing to each other for the destination network."
        },
        {
          question: "New subnet 172.16.5.0/24 added but unreachable from 172.16.1.0/24. Same router. What's missing?",
          hint: "How do other networks know about the new subnet?",
          answer: "Missing route advertisement or static routes on other routers. The subnet exists but isn't in the routing tables."
        }
      ],
      exercises: [
        {
          title: "Troubleshooting Scenarios",
          instructions: "Diagnose and solve these network issues",
          problems: [
            "Printer (10.1.50.200/24) unreachable from PC (10.1.50.100/23). Find the issue and solution.",
            "Website loads slowly. Traceroute shows 15 hops through internet for internal server. What's wrong?",
            "After power outage, some devices connect, others don't. DHCP scope shows 90% utilization. Diagnose.",
            "New VLAN can't reach internet. Can ping local gateway but not remote networks. What to check?"
          ]
        },
        {
          title: "Design Review",
          instructions: "Find the problems in these subnet designs",
          problems: [
            "Branch 1: 10.1.1.0/24, Branch 2: 10.1.100.0/24, Branch 3: 10.1.2.0/24 - What's wrong?",
            "DHCP: 192.168.1.50-250, Servers: 192.168.1.10-20, Gateway: 192.168.1.1 - Potential issue?",
            "P2P Links: All using /24 masks. 50 links total. Calculate address waste.",
            "Growth plan: Current 100 users in /25. Expecting 50% growth. Will it fit?"
          ]
        }
      ]
    },
    keyTakeaways: [
      "Most network issues involve IP addressing, subnet masks, or routing",
      "Always verify subnet masks match between communicating devices",
      "Use systematic troubleshooting: Physical → Data Link → Network → Transport → Application",
      "Document everything: configurations, changes, and solutions",
      "Common issues: wrong mask, wrong gateway, IP conflicts, routing loops",
      "Good subnet design prevents many problems before they occur"
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
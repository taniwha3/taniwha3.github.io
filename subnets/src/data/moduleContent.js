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
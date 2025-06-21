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
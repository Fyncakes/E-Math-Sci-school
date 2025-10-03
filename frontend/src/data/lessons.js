export const lessons = [
  {
    id: 1,
    title: "Introduction to Algebra",
    subject: "Mathematics",
    grade: "Grade 7-8",
    duration: "45 minutes",
    difficulty: "Beginner",
    description: "Learn the fundamentals of algebra including variables, expressions, and basic equations.",
    objectives: [
      "Understand what variables are and how to use them",
      "Learn to write and evaluate algebraic expressions",
      "Solve simple linear equations",
      "Apply algebraic thinking to real-world problems"
    ],
    content: {
      introduction: "Algebra is like a puzzle where we use letters to represent unknown numbers. Today we'll learn how to work with these letters and solve problems step by step.",
      topics: [
        {
          title: "What are Variables?",
          content: "Variables are letters (like x, y, z) that represent unknown numbers. Think of them as empty boxes waiting to be filled with numbers.",
          examples: [
            "x + 5 = 10 (x is the variable)",
            "2y - 3 = 7 (y is the variable)",
            "z ÷ 4 = 2 (z is the variable)"
          ]
        },
        {
          title: "Writing Expressions",
          content: "We can write mathematical expressions using variables. These expressions show relationships between numbers.",
          examples: [
            "3x + 2 (three times x plus two)",
            "y - 5 (y minus five)",
            "2a + 3b (two times a plus three times b)"
          ]
        },
        {
          title: "Solving Simple Equations",
          content: "To solve an equation, we need to find the value of the variable that makes the equation true.",
          examples: [
            "x + 3 = 7 → x = 4",
            "2y = 10 → y = 5",
            "z - 2 = 8 → z = 10"
          ]
        }
      ],
      practice: [
        {
          question: "If x + 4 = 9, what is the value of x?",
          answer: "x = 5",
          explanation: "Subtract 4 from both sides: x + 4 - 4 = 9 - 4, so x = 5"
        },
        {
          question: "Write an expression for 'three times a number plus seven'",
          answer: "3x + 7",
          explanation: "Let x be the number. Three times the number is 3x, plus seven makes it 3x + 7"
        }
      ]
    },
    resources: [
      "Algebra Basics Worksheet",
      "Interactive Practice Problems",
      "Video Tutorial: Introduction to Variables"
    ],
    homework: "Complete exercises 1-10 on page 45 of your textbook"
  },
  {
    id: 2,
    title: "Photosynthesis: How Plants Make Food",
    subject: "Science",
    grade: "Grade 6-7",
    duration: "50 minutes",
    difficulty: "Intermediate",
    description: "Explore the amazing process of photosynthesis and understand how plants convert sunlight into energy.",
    objectives: [
      "Understand the process of photosynthesis",
      "Identify the reactants and products of photosynthesis",
      "Explain the importance of photosynthesis for life on Earth",
      "Recognize the role of chlorophyll in the process"
    ],
    content: {
      introduction: "Have you ever wondered how plants grow? They don't eat food like animals do - they make their own food using sunlight! This process is called photosynthesis.",
      topics: [
        {
          title: "What is Photosynthesis?",
          content: "Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to make glucose (sugar) and oxygen.",
          formula: "6CO₂ + 6H₂O + sunlight → C₆H₁₂O₆ + 6O₂"
        },
        {
          title: "The Ingredients (Reactants)",
          content: "Plants need three main ingredients to make food:",
          ingredients: [
            "Sunlight - provides energy",
            "Water (H₂O) - absorbed through roots",
            "Carbon Dioxide (CO₂) - absorbed from air through leaves"
          ]
        },
        {
          title: "The Products",
          content: "After photosynthesis, plants produce:",
          products: [
            "Glucose (C₆H₁₂O₆) - the sugar that plants use for energy",
            "Oxygen (O₂) - released into the atmosphere for us to breathe"
          ]
        },
        {
          title: "The Role of Chlorophyll",
          content: "Chlorophyll is the green pigment in leaves that captures sunlight. It's like a solar panel that converts light energy into chemical energy."
        }
      ],
      experiment: {
        title: "Testing for Starch in Leaves",
        materials: ["Fresh leaf", "Iodine solution", "Beaker", "Hot water"],
        steps: [
          "Boil the leaf in water for 2 minutes",
          "Place the leaf in alcohol to remove chlorophyll",
          "Add iodine solution to the leaf",
          "Observe the color change (blue-black indicates starch)"
        ]
      }
    },
    resources: [
      "Photosynthesis Diagram",
      "Interactive Plant Cell Model",
      "Video: Time-lapse of Plant Growth"
    ],
    homework: "Draw and label a diagram of photosynthesis showing all reactants and products"
  },
  {
    id: 3,
    title: "Forces and Motion",
    subject: "Physics",
    grade: "Grade 8-9",
    duration: "55 minutes",
    difficulty: "Intermediate",
    description: "Discover the fundamental concepts of forces and how they affect the motion of objects.",
    objectives: [
      "Define force and identify different types of forces",
      "Understand Newton's First Law of Motion",
      "Calculate net force and its effects on motion",
      "Apply force concepts to real-world situations"
    ],
    content: {
      introduction: "Forces are pushes or pulls that can change how objects move. Today we'll explore the invisible forces that shape our world!",
      topics: [
        {
          title: "What is a Force?",
          content: "A force is any push or pull that can cause an object to change its motion. Forces have both magnitude (size) and direction.",
          examples: [
            "Pushing a door to open it",
            "Pulling a wagon",
            "Gravity pulling objects down",
            "Friction slowing down a sliding object"
          ]
        },
        {
          title: "Types of Forces",
          content: "There are many different types of forces:",
          types: [
            "Gravitational Force - pulls objects toward Earth",
            "Frictional Force - opposes motion between surfaces",
            "Applied Force - force applied by a person or object",
            "Normal Force - support force from a surface",
            "Tension Force - force in ropes, strings, or cables"
          ]
        },
        {
          title: "Newton's First Law (Law of Inertia)",
          content: "An object at rest stays at rest, and an object in motion stays in motion at constant speed in a straight line, unless acted upon by an unbalanced force.",
          examples: [
            "A ball rolling on a smooth floor eventually stops due to friction",
            "A book on a table stays at rest until you push it",
            "Passengers in a car lurch forward when the car stops suddenly"
          ]
        },
        {
          title: "Net Force",
          content: "When multiple forces act on an object, we can find the net force by adding all forces together (considering direction).",
          example: "If you push a box with 10N to the right and friction pushes back with 3N to the left, the net force is 7N to the right."
        }
      ],
      activities: [
        {
          title: "Force Tug-of-War",
          description: "Students work in pairs to demonstrate balanced and unbalanced forces",
          materials: ["Rope", "Spring scale"]
        },
        {
          title: "Friction Investigation",
          description: "Test how different surfaces affect the motion of objects",
          materials: ["Wooden block", "Sandpaper", "Wax paper", "Ruler"]
        }
      ]
    },
    resources: [
      "Force and Motion Simulation",
      "Newton's Laws Video",
      "Interactive Force Diagrams"
    ],
    homework: "Identify 5 different forces acting on objects in your home and describe their effects"
  },
  {
    id: 4,
    title: "Chemical Reactions and Equations",
    subject: "Chemistry",
    grade: "Grade 9-10",
    duration: "60 minutes",
    difficulty: "Advanced",
    description: "Learn about chemical reactions, how to write chemical equations, and the different types of reactions.",
    objectives: [
      "Identify signs of chemical reactions",
      "Write and balance chemical equations",
      "Classify different types of chemical reactions",
      "Understand the law of conservation of mass"
    ],
    content: {
      introduction: "Chemical reactions are happening all around us! From cooking food to rusting metal, chemical reactions change substances into new materials.",
      topics: [
        {
          title: "Signs of Chemical Reactions",
          content: "Chemical reactions often show visible signs that a change has occurred:",
          signs: [
            "Color change - substances change color",
            "Gas formation - bubbles or fizzing",
            "Precipitate formation - solid particles form in liquid",
            "Temperature change - gets hotter or colder",
            "Light emission - glowing or burning"
          ]
        },
        {
          title: "Writing Chemical Equations",
          content: "Chemical equations show what happens in a reaction using chemical formulas and symbols.",
          example: "2H₂ + O₂ → 2H₂O",
          explanation: "Two hydrogen molecules react with one oxygen molecule to form two water molecules"
        },
        {
          title: "Balancing Equations",
          content: "The law of conservation of mass states that matter cannot be created or destroyed. We must balance equations so the same number of atoms are on both sides.",
          steps: [
            "Write the correct formulas for reactants and products",
            "Count atoms on each side",
            "Add coefficients to balance atoms",
            "Check that all atoms are balanced"
          ]
        },
        {
          title: "Types of Chemical Reactions",
          content: "There are several main types of chemical reactions:",
          types: [
            "Synthesis - A + B → AB (two substances combine)",
            "Decomposition - AB → A + B (one substance breaks apart)",
            "Single Replacement - A + BC → AC + B (one element replaces another)",
            "Double Replacement - AB + CD → AD + CB (ions switch partners)",
            "Combustion - Fuel + O₂ → CO₂ + H₂O (burning with oxygen)"
          ]
        }
      ],
      lab: {
        title: "Observing Chemical Reactions",
        safety: "Wear safety goggles and follow all instructions carefully",
        experiments: [
          {
            name: "Baking Soda and Vinegar",
            materials: ["Baking soda", "Vinegar", "Balloon", "Bottle"],
            procedure: "Mix baking soda and vinegar in a bottle, quickly cover with balloon",
            observation: "Balloon inflates due to CO₂ gas production"
          },
          {
            name: "Iron and Copper Sulfate",
            materials: ["Iron nail", "Copper sulfate solution", "Beaker"],
            procedure: "Place iron nail in copper sulfate solution",
            observation: "Iron nail turns copper-colored, solution changes color"
          }
        ]
      }
    },
    resources: [
      "Chemical Equation Balancer Tool",
      "Types of Reactions Video",
      "Virtual Chemistry Lab"
    ],
    homework: "Balance these equations: 1) H₂ + Cl₂ → HCl, 2) Ca + O₂ → CaO, 3) Al + HCl → AlCl₃ + H₂"
  },
  {
    id: 5,
    title: "Introduction to Geometry: Shapes and Angles",
    subject: "Mathematics",
    grade: "Grade 5-6",
    duration: "40 minutes",
    difficulty: "Beginner",
    description: "Explore basic geometric shapes, learn about angles, and discover the properties of different polygons.",
    objectives: [
      "Identify and classify basic geometric shapes",
      "Understand different types of angles",
      "Learn about the properties of polygons",
      "Apply geometric concepts to solve problems"
    ],
    content: {
      introduction: "Geometry is the study of shapes, sizes, and positions. Today we'll explore the beautiful world of shapes and angles that surround us!",
      topics: [
        {
          title: "Basic Shapes",
          content: "Let's start with the fundamental shapes:",
          shapes: [
            "Circle - all points are the same distance from center",
            "Triangle - 3 sides and 3 angles",
            "Square - 4 equal sides and 4 right angles",
            "Rectangle - 4 sides with opposite sides equal",
            "Pentagon - 5 sides",
            "Hexagon - 6 sides"
          ]
        },
        {
          title: "Types of Angles",
          content: "Angles are formed when two lines meet. We measure angles in degrees:",
          angles: [
            "Right Angle - exactly 90° (like corner of a square)",
            "Acute Angle - less than 90° (sharp and pointy)",
            "Obtuse Angle - more than 90° but less than 180° (wide)",
            "Straight Angle - exactly 180° (like a straight line)"
          ]
        },
        {
          title: "Properties of Triangles",
          content: "Triangles can be classified by their sides and angles:",
          classifications: [
            "By sides: Equilateral (all equal), Isosceles (two equal), Scalene (all different)",
            "By angles: Right (one 90° angle), Acute (all angles < 90°), Obtuse (one angle > 90°)"
          ]
        },
        {
          title: "Polygons",
          content: "A polygon is a closed shape with straight sides. Regular polygons have all equal sides and angles.",
          examples: [
            "Triangle (3 sides) - sum of angles = 180°",
            "Quadrilateral (4 sides) - sum of angles = 360°",
            "Pentagon (5 sides) - sum of angles = 540°",
            "Hexagon (6 sides) - sum of angles = 720°"
          ]
        }
      ],
      activities: [
        {
          title: "Shape Hunt",
          description: "Find examples of different shapes around the classroom",
          materials: ["Shape identification sheet", "Pencil"]
        },
        {
          title: "Angle Measurement",
          description: "Use a protractor to measure angles in different shapes",
          materials: ["Protractor", "Various geometric shapes"]
        },
        {
          title: "Polygon Creation",
          description: "Use toothpicks and clay to build different polygons",
          materials: ["Toothpicks", "Modeling clay"]
        }
      ]
    },
    resources: [
      "Interactive Shape Explorer",
      "Angle Measurement Tool",
      "Geometry Games and Puzzles"
    ],
    homework: "Draw and label 5 different polygons, measure their angles, and identify their types"
  }
];

export const getLessonById = (id) => {
  return lessons.find(lesson => lesson.id === id);
};

export const getLessonsBySubject = (subject) => {
  return lessons.filter(lesson => lesson.subject.toLowerCase() === subject.toLowerCase());
};

export const getLessonsByGrade = (grade) => {
  return lessons.filter(lesson => lesson.grade === grade);
};

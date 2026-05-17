import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const users = [
  { name: "Aarav Sharma", email: "aarav@demo.com", location: "Mumbai, India" },
  { name: "Sofia Garcia", email: "sofia@demo.com", location: "Barcelona, Spain" },
  { name: "Liam Chen", email: "liam@demo.com", location: "Singapore" },
  { name: "Emma Rossi", email: "emma@demo.com", location: "Milan, Italy" },
];

const skills = [
  // Technology
  { title: "HTML & CSS Basics", description: "Learn the building blocks of web design with hands-on projects.", category: "Technology", level: "BEGINNER", isOffering: true },
  { title: "React.js Development", description: "Build scalable single-page applications with React and modern tooling.", category: "Technology", level: "INTERMEDIATE", isOffering: true },
  { title: "System Design", description: "Master distributed systems, scalability, and high-performance architecture.", category: "Technology", level: "ADVANCED", isOffering: true },
  { title: "Kubernetes & DevOps", description: "Container orchestration, CI/CD pipelines, and cloud-native deployments.", category: "Technology", level: "EXPERT", isOffering: true },

  // Design
  { title: "Figma for Beginners", description: "Get started with the world's most popular UI design tool.", category: "Design", level: "BEGINNER", isOffering: true },
  { title: "UI/UX Principles", description: "Design intuitive, beautiful interfaces with proven UX methods.", category: "Design", level: "INTERMEDIATE", isOffering: true },
  { title: "Motion Design", description: "Animate interactions and bring interfaces to life with After Effects.", category: "Design", level: "ADVANCED", isOffering: false },
  { title: "Design Systems Mastery", description: "Architect scalable design systems used by Fortune 500 companies.", category: "Design", level: "EXPERT", isOffering: true },

  // Music
  { title: "Guitar Basics", description: "Learn your first chords and play your favorite songs in 4 weeks.", category: "Music", level: "BEGINNER", isOffering: true },
  { title: "Piano Improvisation", description: "Jazz piano improvisation techniques for intermediate players.", category: "Music", level: "INTERMEDIATE", isOffering: true },
  { title: "Music Production", description: "Produce professional tracks in Ableton Live or FL Studio.", category: "Music", level: "ADVANCED", isOffering: true },
  { title: "Classical Composition", description: "Compose orchestral pieces using counterpoint and music theory.", category: "Music", level: "EXPERT", isOffering: false },

  // Languages
  { title: "Spanish Conversation", description: "Practice everyday Spanish with a native speaker. Beginner-friendly.", category: "Languages", level: "BEGINNER", isOffering: true },
  { title: "Business English", description: "Improve your professional English for meetings and presentations.", category: "Languages", level: "INTERMEDIATE", isOffering: true },
  { title: "Japanese Kanji", description: "Master advanced kanji reading and writing for fluent literacy.", category: "Languages", level: "ADVANCED", isOffering: false },
  { title: "Latin & Greek", description: "Read classical texts in their original form. PhD-level instruction.", category: "Languages", level: "EXPERT", isOffering: true },

  // Cooking
  { title: "Home Cooking 101", description: "Essential cooking techniques and 20 must-know recipes.", category: "Cooking", level: "BEGINNER", isOffering: true },
  { title: "Italian Pasta Making", description: "Make fresh pasta from scratch — tagliatelle, ravioli, gnocchi.", category: "Cooking", level: "INTERMEDIATE", isOffering: true },
  { title: "French Pastry", description: "Croissants, macarons, and fine pâtisserie techniques.", category: "Cooking", level: "ADVANCED", isOffering: true },
  { title: "Molecular Gastronomy", description: "Modernist cuisine techniques used in Michelin-star kitchens.", category: "Cooking", level: "EXPERT", isOffering: false },

  // Fitness
  { title: "Beginner Yoga", description: "Daily yoga flows to build flexibility, balance, and calm.", category: "Fitness", level: "BEGINNER", isOffering: true },
  { title: "Strength Training", description: "Compound lifts, progressive overload, and proper form coaching.", category: "Fitness", level: "INTERMEDIATE", isOffering: true },
  { title: "Marathon Training", description: "Prepare for your first marathon with a structured 16-week plan.", category: "Fitness", level: "ADVANCED", isOffering: true },
  { title: "Olympic Weightlifting", description: "Snatch and clean & jerk technique from a certified coach.", category: "Fitness", level: "EXPERT", isOffering: false },

  // Art
  { title: "Sketching Basics", description: "Learn to draw from observation — anyone can learn this.", category: "Art", level: "BEGINNER", isOffering: true },
  { title: "Watercolor Painting", description: "Loose, expressive watercolor landscapes and florals.", category: "Art", level: "INTERMEDIATE", isOffering: true },
  { title: "Oil Painting Portraits", description: "Classical portrait painting in oils — Bouguereau-style realism.", category: "Art", level: "ADVANCED", isOffering: true },
  { title: "Fine Art Mastery", description: "Atelier-style instruction for serious artists. 10+ years experience.", category: "Art", level: "EXPERT", isOffering: true },

  // Business
  { title: "Startup Fundamentals", description: "Learn to validate ideas and build your first MVP.", category: "Business", level: "BEGINNER", isOffering: true },
  { title: "Digital Marketing", description: "SEO, paid ads, content marketing — the full growth stack.", category: "Business", level: "INTERMEDIATE", isOffering: true },
  { title: "Financial Modeling", description: "Build investor-grade financial models in Excel.", category: "Business", level: "ADVANCED", isOffering: false },
  { title: "Strategic Consulting", description: "Top-tier consulting frameworks — McKinsey/BCG methodology.", category: "Business", level: "EXPERT", isOffering: true },
];

async function main() {
  console.log("🌱 Seeding database...");

  const hashedPassword = await bcrypt.hash("demo1234", 12);

  const createdUsers = [];
  for (const u of users) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: { ...u, password: hashedPassword, bio: `Hi, I'm ${u.name}!` },
    });
    createdUsers.push(user);
  }
  console.log(`✓ ${createdUsers.length} users ready`);

  await prisma.skill.deleteMany({
    where: { user: { email: { in: users.map((u) => u.email) } } },
  });

  for (let i = 0; i < skills.length; i++) {
    const skill = skills[i];
    const user = createdUsers[i % createdUsers.length];
    await prisma.skill.create({
      data: { ...skill, level: skill.level as any, userId: user.id },
    });
  }
  console.log(`✓ ${skills.length} skills seeded`);
  console.log("✅ Done!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

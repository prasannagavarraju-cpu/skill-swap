import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const level = searchParams.get("level");
  const search = searchParams.get("search");

  const skills = await prisma.skill.findMany({
    where: {
      ...(category && { category }),
      ...(level && { level: level as any }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }),
    },
    include: {
      user: { select: { id: true, name: true, avatar: true, location: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(skills);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, description, category, level, isOffering } = await req.json();

  const skill = await prisma.skill.create({
    data: {
      title,
      description,
      category,
      level,
      isOffering,
      userId: session.user.id,
    },
  });

  return NextResponse.json(skill, { status: 201 });
}

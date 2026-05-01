import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  // Security Check: Sirf Admin hi project bana sakta hai
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { name, description } = await req.json();

  const project = await prisma.project.create({
    data: {
      name,
      description,
      adminId: (session.user as any).id, // Admin ki ID connect kar di
    },
  });

  return NextResponse.json(project);
}

// Saare projects dekhne ke liye GET method
export async function GET() {
  const projects = await prisma.project.findMany({
    include: { tasks: true, admin: true },
  });
  return NextResponse.json(projects);
}
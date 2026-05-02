import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, projectId, assigneeId, dueDate } = await req.json();

    const task = await prisma.task.create({
      data: {
        title,
        projectId,
        assigneeId,
        dueDate: dueDate ? new Date(dueDate) : null,
        status: "TODO",
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: "Task create nahi ho paya" }, { status: 500 });
  }
}

// Saare tasks dekhne ke liye
export async function GET() {
  const tasks = await prisma.task.findMany({
    include: { project: true, assignee: true },
  });
  return NextResponse.json(tasks);
}
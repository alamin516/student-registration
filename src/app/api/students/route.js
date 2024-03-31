import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const usersData = [
      {
        first_name: "Md",
        last_name: "Alamin",
        roll: "14",
        age: 15,
        grade: 5,
      },
      {
        first_name: "John",
        last_name: "Doe",
        roll: "15",
        age: 16,
        grade: 5,
      },
      {
        first_name: "Jane",
        last_name: "Smith",
        roll: "16",
        age: 17,
        grade: 5,
      },
      {
        first_name: "Alice",
        last_name: "Johnson",
        roll: "17",
        age: 18,
        grade: 5,
      },
      {
        first_name: "Bob",
        last_name: "Brown",
        roll: "18",
        age: 19,
        grade: 5,
      },
    ];

    const prisma = new PrismaClient();

    const createdUsers = await prisma.user.createMany({
      data: usersData,
    });

    const users = await prisma.user.findMany({
      include: {courses: true}
    });

    return NextResponse.json({
      status: "Success",
      data: { createdUsers, users },
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      status: "error",
      message: "An error occurred while processing the request",
    });
  }
}

export async function GET(req, res) {
  try {
    const prisma = new PrismaClient();

    const users = await prisma.user.findMany({
      include: { courses: true },
    });

    return NextResponse.json({
      status: "Success",
      data: users,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.error("Internal Server Error");
  }
}

export async function DELETE(req, res) {
  try {
    const prisma = new PrismaClient();

    await prisma.user.deleteMany();

    return NextResponse.json({
      status: "Success",
      message: "User were deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.error("Internal Server Error");
  }
}

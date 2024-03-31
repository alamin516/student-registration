import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { first_name, last_name, roll, age, grade, course } =
      await req.json();

    const prisma = new PrismaClient();

    const user = await prisma.user.create({
      data: {
        first_name,
        last_name,
        roll,
        age: parseInt(age),
        grade: parseInt(grade),
        courses: {
          create: {
            name: course,
          },
        },
      },
      include: {
        courses: true,
      },
    });

    return NextResponse.json({
      status: "Success",
      data: user,
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
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const prisma = new PrismaClient();

    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: { courses: true },
    });

    if (user === null) {
      return NextResponse.json({ data: "User does not exist." });
    }

    return NextResponse.json({
      status: "Success",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.error("Internal Server Error");
  }
}

export async function PUT(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const { first_name, last_name, roll, age, grade } = await req.json();
    const id = searchParams.get("id");

    const prisma = new PrismaClient();

    const updateUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        first_name,
        last_name,
        roll,
        age: parseInt(age),
        grade: parseInt(grade),
      },
      include: { courses: true },
    });

    return NextResponse.json({
      status: "Success",
      data: updateUser,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.error("Internal Server Error");
  }
}

export async function DELETE(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const prisma = new PrismaClient();

    const existUser = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    console.log(existUser);

    if (!existUser) {
      return NextResponse.json({
        message: "User does not exist",
      });
    }

    const deleteUser = await prisma.user.delete({
      where: { id: parseInt(id) },
      include: { courses: true },
    });

    return NextResponse.json({
      status: "Success",
      message: "User was deleted successfully",
      data: deleteUser,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: "Internal Server Error",
    });
  }
}

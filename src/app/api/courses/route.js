import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    const { searchParams } = new URL(req.url);
    try {
      const id = searchParams.get("id");

  
      const prisma = new PrismaClient();
  
      const course = await prisma.course.findUnique({
        where: { id: parseInt(id) }
      });
  
      if (course === null) {
        return NextResponse.json({ data: "Course does not exist." });
      }
  
      return NextResponse.json({
        status: "Success",
        data: course,
      });
    } catch (error) {
      console.log(error);
      return NextResponse.error("Internal Server Error");
    }
  }

export async function PUT(req, res) {
    try {
      const { searchParams } = new URL(req.url);
      const {name} = await req.json();
      const id = searchParams.get("id");
  
      const prisma = new PrismaClient();
  
      const updateUser = await prisma.course.update({
        where: { id: parseInt(id) },
        data: {
            name
        }
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
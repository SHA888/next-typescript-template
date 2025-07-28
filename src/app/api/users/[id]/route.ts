import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { ApiResponse } from '../route';

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const response: ApiResponse<typeof user> = { data: user };
    return NextResponse.json(response);
  } catch (error: unknown) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();

    // Don't allow updating the email or ID
    const { email, id, ...updateData } = body;

    const user = await prisma.user.update({
      where: { id: params.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const response: ApiResponse<typeof user> = { data: user };
    return NextResponse.json(response);
  } catch (error: unknown) {
    console.error('Error updating user:', error);

    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as { code: string };

      if (prismaError.code === 'P2025') {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      if (prismaError.code === 'P2002') {
        return NextResponse.json(
          { error: 'A user with this email already exists' },
          { status: 409 }
        );
      }
    }

    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.user.delete({
      where: { id: params.id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error: unknown) {
    console.error('Error deleting user:', error);

    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as { code: string };

      if (prismaError.code === 'P2025') {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
    }

    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}

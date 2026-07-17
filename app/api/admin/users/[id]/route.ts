import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'lib/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (typeof body.isBlocked !== 'boolean') {
      return NextResponse.json({ error: 'Некоректні дані' }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { isBlocked: body.isBlocked },
      select: { id: true, email: true, username: true, firstName: true, lastName: true, isBlocked: true, createdAt: true }
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Помилка при оновленні користувача' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.user.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Помилка при видаленні користувача' }, { status: 500 });
  }
}

import prisma from '@/lib/db';

export async function GET() {
  const profiles = await prisma.profile.findMany();

  return new Response(JSON.stringify(profiles));
}

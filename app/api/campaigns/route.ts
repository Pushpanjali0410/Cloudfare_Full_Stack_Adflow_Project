import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse, Campaign, PaginatedResponse } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');

    // Mock campaigns data
    const mockCampaigns: Campaign[] = [
      {
        id: 'camp_1',
        userId: 'user_123',
        name: 'Summer Sale Campaign',
        objective: 'conversion',
        description: 'Multi-platform summer promotion',
        budget: 5000,
        startDate: new Date().toISOString(),
        status: 'active',
        platforms: ['meta', 'google_ads', 'tiktok'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'camp_2',
        userId: 'user_123',
        name: 'Brand Awareness Q2',
        objective: 'awareness',
        description: 'Brand awareness campaign',
        budget: 8000,
        startDate: new Date().toISOString(),
        status: 'active',
        platforms: ['meta', 'linkedin'],
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ];

    const total = mockCampaigns.length;
    const start = (page - 1) * pageSize;
    const paginatedData = mockCampaigns.slice(start, start + pageSize);

    return NextResponse.json(
      {
        success: true,
        data: {
          data: paginatedData,
          total,
          page,
          pageSize,
          hasMore: start + pageSize < total,
        } as PaginatedResponse<Campaign>,
      } as ApiResponse<PaginatedResponse<Campaign>>,
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch campaigns',
      } as ApiResponse<null>,
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newCampaign: Campaign = {
      id: 'camp_' + Date.now(),
      userId: 'user_123',
      name: body.name,
      objective: body.objective,
      description: body.description,
      budget: body.budget,
      startDate: body.startDate,
      status: 'draft',
      platforms: body.platforms,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        data: newCampaign,
      } as ApiResponse<Campaign>,
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create campaign',
      } as ApiResponse<null>,
      { status: 500 }
    );
  }
}

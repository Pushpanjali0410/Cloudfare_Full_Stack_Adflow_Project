import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse, CampaignTemplate, PaginatedResponse } from '@/lib/types';

const mockTemplates: CampaignTemplate[] = [
  {
    id: 'tmpl_1',
    userId: 'user_123',
    name: 'E-commerce Conversion',
    description: 'High-performing template for e-commerce businesses',
    objective: 'conversion',
    platforms: ['meta', 'google_ads', 'tiktok'],
    budget: 2000,
    adVariantTemplates: [
      {
        id: 'avar_1',
        templateId: 'tmpl_1',
        platform: 'meta',
        headline: 'Shop Now & Save 30%',
        description: 'Limited time offer on our best products',
        callToAction: 'Shop Now',
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tmpl_2',
    userId: 'user_123',
    name: 'SaaS Product Launch',
    description: 'Template for launching new SaaS products',
    objective: 'consideration',
    platforms: ['linkedin', 'google_ads'],
    budget: 5000,
    adVariantTemplates: [
      {
        id: 'avar_2',
        templateId: 'tmpl_2',
        platform: 'linkedin',
        headline: 'Meet the Future of Productivity',
        description: 'Enterprise-grade solution for modern teams',
        callToAction: 'Learn More',
      },
    ],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');

    const total = mockTemplates.length;
    const start = (page - 1) * pageSize;
    const paginatedData = mockTemplates.slice(start, start + pageSize);

    return NextResponse.json(
      {
        success: true,
        data: {
          data: paginatedData,
          total,
          page,
          pageSize,
          hasMore: start + pageSize < total,
        } as PaginatedResponse<CampaignTemplate>,
      } as ApiResponse<PaginatedResponse<CampaignTemplate>>,
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch templates',
      } as ApiResponse<null>,
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newTemplate: CampaignTemplate = {
      id: 'tmpl_' + Date.now(),
      userId: 'user_123',
      name: body.name,
      description: body.description,
      objective: body.objective,
      platforms: body.platforms,
      budget: body.budget,
      adVariantTemplates: body.adVariantTemplates || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        data: newTemplate,
      } as ApiResponse<CampaignTemplate>,
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create template',
      } as ApiResponse<null>,
      { status: 500 }
    );
  }
}

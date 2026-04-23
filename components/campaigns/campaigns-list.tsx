import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2, Play, Pause } from 'lucide-react';
import { PLATFORMS, CAMPAIGN_STATUS } from '@/lib/constants';
import type { Campaign } from '@/lib/types';

interface CampaignsListProps {
  campaigns: Campaign[];
}

export default function CampaignsList({ campaigns }: CampaignsListProps) {
  const getStatusColor = (status: string) => {
    const statusConfig = CAMPAIGN_STATUS.find((s) => s.value === status);
    return statusConfig?.color || 'bg-gray-100';
  };

  return (
    <div className="space-y-3">
      {campaigns.map((campaign) => (
        <Card key={campaign.id} className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold">{campaign.name}</h3>
                <Badge className={`${getStatusColor(campaign.status)} text-gray-800`}>
                  {campaign.status}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground mb-4">{campaign.description}</p>

              {/* Platforms */}
              <div className="flex flex-wrap gap-2 mb-4">
                {campaign.platforms.map((platform) => {
                  const platformInfo = PLATFORMS[platform];
                  return (
                    <Badge key={platform} variant="secondary">
                      {platformInfo.icon} {platformInfo.name}
                    </Badge>
                  );
                })}
              </div>

              {/* Stats */}
              <div className="flex gap-6 text-sm">
                <div>
                  <span className="text-muted-foreground">Budget: </span>
                  <span className="font-semibold">${campaign.budget}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Platforms: </span>
                  <span className="font-semibold">{campaign.platforms.length}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Created: </span>
                  <span className="font-semibold">
                    {new Date(campaign.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {campaign.status === 'draft' && (
                <Link href={`/campaigns/${campaign.id}`}>
                  <Button size="sm" variant="outline">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </Link>
              )}
              {campaign.status === 'draft' && (
                <Button size="sm" variant="outline" className="text-green-600 border-green-200">
                  <Play className="w-4 h-4" />
                </Button>
              )}
              {campaign.status === 'active' && (
                <Button size="sm" variant="outline" className="text-yellow-600 border-yellow-200">
                  <Pause className="w-4 h-4" />
                </Button>
              )}
              <Button size="sm" variant="outline" className="text-red-600 border-red-200">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

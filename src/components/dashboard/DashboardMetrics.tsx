import { Package, CheckCircle, AlertTriangle, XCircle, FileText } from 'lucide-react';
import { MetricCard } from '@/components/ui/metric-card';
import { useComponentStore } from '@/store/useComponentStore';

export function DashboardMetrics() {
  const { getMetrics } = useComponentStore();
  const metrics = getMetrics();

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      <MetricCard
        title="Total Components"
        value={metrics.totalComponents}
        description="All registered components"
        icon={Package}
        trend={{
          value: 12,
          label: "from last month",
          direction: "up"
        }}
      />
      
      <MetricCard
        title="Active Components"
        value={metrics.activeComponents}
        description="Currently in service"
        icon={CheckCircle}
        variant="success"
        trend={{
          value: 8,
          label: "from last month",
          direction: "up"
        }}
      />
      
      <MetricCard
        title="Warranty Expiring"
        value={metrics.warrantyExpiring}
        description="Within 90 days"
        icon={AlertTriangle}
        variant="warning"
        trend={{
          value: 5,
          label: "from last month",
          direction: "up"
        }}
      />
      
      <MetricCard
        title="Defective Components"
        value={metrics.defectiveComponents}
        description="Requiring attention"
        icon={XCircle}
        variant="danger"
        trend={{
          value: 2,
          label: "from last month",
          direction: "down"
        }}
      />
      
      <MetricCard
        title="Pending Claims"
        value={metrics.pendingClaims}
        description="Awaiting review"
        icon={FileText}
        trend={{
          value: 3,
          label: "from last week",
          direction: "up"
        }}
      />
    </div>
  );
}
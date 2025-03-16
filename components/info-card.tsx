import React from "react";

import { cn } from "@/lib/utils";

interface InfoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
}

/**
 * InfoCard component that displays an icon and text with a gradient background.
 *
 * @example
 * ```tsx
 * import { InformationCircleIcon } from "@heroicons/react/24/solid";
 *
 * <InfoCard icon={<InformationCircleIcon />}>
 *   Important information goes here
 * </InfoCard>
 * ```
 */
const InfoCard = ({ icon, children, className }: InfoCardProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-5 rounded-2xl bg-gradient-to-r from-secondary/90 via-secondary to-secondary/90 p-6 text-xl",
        className,
      )}
    >
      <div className="text-2xl text-primary">{icon}</div>
      <div className="font-bold text-white">{children}</div>
    </div>
  );
};

export default InfoCard;

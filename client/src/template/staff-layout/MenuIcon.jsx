import { useMemo } from "react";
import {
  LayoutDashboard,
  CircleHelp,
  MessageCircleReply,
  Layers,
  Users,
  MessageCircleQuestion,
  ClipboardCheck,
  Store,
  Newspaper
} from "lucide-react";

export const MenuIcon = ({
  name,
  size,
  color,
  strokeWidth,
  absoluteStrokeWidth,
}) => {
  const icon = useMemo(() => {
    const iconProps = {
      size: size || 24,
      color: color || "#000",
      strokeWidth: strokeWidth || 2,
      absoluteStrokeWidth: absoluteStrokeWidth || false,
    };
    switch (name) {
      case "LayoutDashboard":
        return <LayoutDashboard {...iconProps} />;
      case "Newspaper":
        return <Newspaper {...iconProps} />;
      case "CircleHelp":
        return <CircleHelp {...iconProps} />;
      case "MessageCircleReply":
        return <MessageCircleReply {...iconProps} />;
      case "Layers":
        return <Layers {...iconProps} />;
      case "Users":
        return <Users {...iconProps} />;
      case "MessageCircleQuestion":
        return <MessageCircleQuestion {...iconProps} />;
      case "ClipboardCheck":
        return <ClipboardCheck {...iconProps} />;
      case "Store":
        return <Store {...iconProps} />;
      default:
        break;
    }
  }, [name, size, color, strokeWidth, absoluteStrokeWidth]);

  return icon;
};

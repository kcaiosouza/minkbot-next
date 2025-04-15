import { ReactNode } from "react";

import { useMediaQuery } from "@/hooks/use-media-query"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

type FormKYCProps = {
  title: string;
  description?: string;
  isOpen: boolean
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export default function FormKYC({title, description, isOpen, onOpenChange, children}: FormKYCProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl text-[#142F54]">{title}</DialogTitle>
            <DialogDescription>
              {description}
            </DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="font-bold text-2xl text-[#142F54]">{title}</DrawerTitle>
          <DrawerDescription>
            {description}
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex w-full px-4 pb-4">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
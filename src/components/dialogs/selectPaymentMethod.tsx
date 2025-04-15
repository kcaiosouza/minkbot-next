import { ReactNode, useState } from "react";

import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

type SelectPaymentMethodProps = {
  label: string;
  title: string;
  description: string;
  disabled?: boolean
  children: ReactNode | (({ close }: { close: () => void }) => ReactNode);
}

export default function SelectPaymentMethod({label, title, description, disabled, children}: SelectPaymentMethodProps) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const close = () => setOpen(false);
  const childrenWithProps = typeof children === "function"
    ? children({ close })
    : children

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button disabled={disabled} type="submit" className="bg-[#142F54] hover:bg-[#3B67A4] hover:cursor-pointer text-white hover:text-white w-full" variant="outline">{label}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl text-[#142F54]">{title}</DialogTitle>
            <DialogDescription>
              {description}
            </DialogDescription>
          </DialogHeader>
          {childrenWithProps}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button disabled={disabled} type="submit" className="bg-[#142F54] hover:bg-[#3B67A4] hover:cursor-pointer text-white hover:text-white w-full" variant="outline">{label}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="font-bold text-2xl text-[#142F54]">{title}</DrawerTitle>
          <DrawerDescription>
            {description}
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex w-full px-4 pb-4">
          {childrenWithProps}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
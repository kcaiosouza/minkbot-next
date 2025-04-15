import { FaCircleCheck } from "react-icons/fa6";

import { useMediaQuery } from "@/hooks/use-media-query"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

type PaymentPIXProps = {
  title: string;
  isOpen: boolean;
  selectedPlan: string | null;
  onOpenChange: (open: boolean) => void;
}

export default function PaymentVerified({title, isOpen, onOpenChange, selectedPlan}: PaymentPIXProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl text-[#142F54]">{title}</DialogTitle>
          </DialogHeader>
          <div className="bg-[#142F54] w-full rounded-lg relative flex items-center justify-center pb-4 mt-8">
            <FaCircleCheck className="absolute -top-2 left-1/2 -translate-x-1/2" fill="#39B00A" size={28} />
            <div className="flex flex-col px-4">
              <h2 className="text-center text-[#EAEBFF] text-xl mt-5">Agora você é<br/><b className="text-3xl">{selectedPlan == "1" ? "Premium" : "Ultimate"}!</b></h2>
              <span className="text-[#EAEBFF] text-justify mt-8">Obrigado por apoiar nosso projeto! Agora você já pode aproveitar todos os comandos do bot no seu grupo de WhatsApp. Para ver a lista de comandos disponíveis, digite "-comandos". Divirtas-se!</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="font-bold text-2xl text-[#142F54]">{title}</DrawerTitle>
        </DrawerHeader>
        <div className="pt-8 flex w-full">
          <div className="bg-[#142F54] w-full rounded-t-lg relative flex items-center justify-center pb-4">
            <FaCircleCheck className="absolute -top-2 left-1/2 -translate-x-1/2" fill="#39B00A" size={28} />
            <div className="flex flex-col px-4">
              <h2 className="text-center text-[#EAEBFF] text-xl mt-5">Agora você é<br/><b className="text-3xl">{selectedPlan == "1" ? "Premium" : "Ultimate"}!</b></h2>
              <span className="text-[#EAEBFF] text-justify mt-8">Obrigado por apoiar nosso projeto! Agora você já pode aproveitar todos os comandos do bot no seu grupo de WhatsApp. Para ver a lista de comandos disponíveis, digite "-comandos". Divirtas-se!</span>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
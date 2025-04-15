// import Image from "next/image";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";

import AddMinkbotNumber from "@/components/dialogs/addMinkbotNumber";

export default function Home() {
  const handleDownload = () => {
    const vCard = `
BEGIN:VCARD
VERSION:3.0
FN:MinkBot
TEL;TYPE=CELL:+55 83 99699-2365
END:VCARD
    `.trim();
  
    const blob = new Blob([vCard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = "minkbot.vcf";
    a.click();
  
    URL.revokeObjectURL(url);
  };

  return (
    <div className="overflow-hidden flex items-center justify-center gap-44 h-dvh w-full p-10 bg-[url('/background_pattern.png')] bg-cover bg-center flex-col md:flex-row">
      <div className="flex flex-col max-w-[350px]">
        <h1 className="text-[30px] font-semibold text-[#142F54] leading-6 md:text-[36px]">Conheça o</h1>
        <h1 className="text-[72px] font-black text-[#142F54] leading-18 md:text-[78px]">MinkBot</h1>
        <h1 className="text-[14px] font-regular text-[#142F54] leading-5 md:text-[20px]">O assitente virtual mais completo para o seu grupo de whatsapp!</h1>
        <div className="mt-4">
          <AddMinkbotNumber label="Adicionar ao grupo" title="Adicione o MinkBot em seu grupo" description="Você pode acionar ele agora mesmo, você pode salvar o número dele clicando no botão abaixo ou copiando o número você mesmo.">
            <div className="flex flex-col gap-2 w-full">
              <Input disabled value="(83) 9 9699-2365" type="tel" />
              <Button 
                onClick={() => {
                  try {
                    navigator.clipboard.writeText("(83) 9 9699-2365")
                      .then(() => toast.success("Número copiado com sucesso!"))
                      .catch(() => toast.error("Erro ao copiar número!"))
                  }
                  catch {
                    toast.error("Erro ao copiar número!")
                  }
                }}
                className="w-full cursor-pointer">Copiar número</Button>
              <Button onClick={handleDownload} className="w-full cursor-pointer">Adicionar</Button>
            </div>
          </AddMinkbotNumber>
          <Toaster position="top-center" />
        </div>
      </div>
      <div className="w-[192px] h-[192px] flex items-center justify-center">
        <img className="animate-bounce" draggable={false} src="/minkbot.png" alt="MinkBot Logo" width={192} height={192} />
      </div>

    </div>
  );
}

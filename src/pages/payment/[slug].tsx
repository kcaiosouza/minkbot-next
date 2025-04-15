import { GetStaticProps, GetStaticPaths } from 'next';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cpf as cpfValidator } from "cpf-cnpj-validator";
import { QRCodeSVG } from 'qrcode.react';

import { api } from '@/services/api';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import SelectPaymentMethod from '@/components/dialogs/selectPaymentMethod';
import FormKYC from '@/components/dialogs/formsKYC';
import PaymentPIX from '@/components/dialogs/paymentPIX';
import PaymentVerified from '@/components/dialogs/paymentVerified';

import { MdOutlinePix } from "react-icons/md";
import { IoCard } from "react-icons/io5";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
// import Image from 'next/image';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import CPFInput from '@/components/ui/cpfInput';
import { Textarea } from '@/components/ui/textarea';
import ConfettiScreen from '@/components/others/confettiScreen';

type Group = {
  id: string;
	group_id: string;
	plan_id: number;
	created_at: string;
  updated_at: string;
}

type GroupProps = {
  group: Group;
}

const FormSchema = z.object({
  plan: z
    .string({
      required_error: "Por favor, escolha um plano.",
    }),
});

const KYCFormSchema = z.object({
  cpf: z
    .string()
    .nonempty("CPF é obrigatório.")
    .refine((val) => cpfValidator.isValid(val), {
      message: "CPF inválido.",
    }),
    fullName: z
    .string()
    .nonempty("Nome completo é obrigatório.")
    .refine((val) => val.trim().split(" ").length >= 2, {
      message: "Digite seu nome completo.",
    }),
});

export default function Payment({ group }: GroupProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [formKYCOpen, setFormKYCOpen] = useState<boolean>(false);
  const [paymentPIXOpen, setPaymentPIXOpen] = useState<boolean>(false);
  const [paymentCheckedOpen, setPaymentCheckedOpen] = useState<boolean>(false);
  const [pixCopiaCola, setPixCopiaCola] = useState<string>('');
  const [responsePaymentData, setResponsePaymentData] = useState<any>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const kycForm = useForm<z.infer<typeof KYCFormSchema>>({
    resolver: zodResolver(KYCFormSchema),
    defaultValues: {
      cpf: '',
      fullName: '',
    }
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.success(`Plano ${data.plan == "1" ? "PREMIUM" : "ULTIMATE"} escolhido com sucesso!`)
    // console.log(data)
  }

  function onKYCSubmit(data: z.infer<typeof KYCFormSchema>) {
    toast.success("Dados KYC enviados com sucesso!");
    // console.log("KYC:", data);
    // aqui você pode prosseguir com a lógica de pagamento...
    setFormKYCOpen(false);
    api.post("/payment", {
      id: group.id,
      plan: selectedPlan,
      fullName: data.fullName,
      cpf: (data.cpf).replaceAll(".", "").replaceAll("-", "")
    }).then((result: any) => {
      // console.log(result);
      setResponsePaymentData(result.data);
      setPixCopiaCola(result.data.pixCopiaECola);
      startPIXInterval();
    }).catch((err: any) => {
      console.log(err);
    })
    setPaymentPIXOpen(true);
  }

  function verifyPayment() {
    api.get(`/payment/${responsePaymentData.txid}`).then((result: any) => {
      if(result.data.status == "CONCLUIDA") {
        toast.success("Pagamento realizado com sucesso!");
        setPaymentPIXOpen(false);
        setPaymentCheckedOpen(true);
        return
      }
      
      console.log(result.data);
      toast.error("Pagamento ainda nao foi realizado!");
    })
  }

  function autoVerifyPayment() {
    api.get(`/payment/${responsePaymentData.txid}`).then((result: any) => {
      if(result.data.status == "CONCLUIDA") {
        toast.success("Pagamento realizado com sucesso!");
        setPaymentPIXOpen(false);
        setPaymentCheckedOpen(true);
        return
      }
    })
  }

  function copyToClipboard(value: string): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(value)
        .then(() => {
          toast.success("Copiado com sucesso para a area de transferência!");
        })
        .catch((err: any) => {
          console.error("Erro ao copiar com clipboard API:", err);
          fallbackCopy(value);
        });
    } else {
      fallbackCopy(value);
    }
  
    function fallbackCopy(text: string) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      toast.success("Copiado com sucesso para a area de transferência!");
    }
  }

  let intervalId: ReturnType<typeof setInterval> | null = null;

  function startPIXInterval() {
    if (paymentPIXOpen && !intervalId) {
      intervalId = setInterval(() => {
        autoVerifyPayment();
        console.log("Executando enquanto paymentPIXOpen === true");
  
        // Verifica se paymentPIXOpen virou false e cancela o intervalo
        if (!paymentPIXOpen && intervalId) {
          clearInterval(intervalId);
          intervalId = null;
          console.log("Intervalo parado porque paymentPIXOpen virou false");
        }
      }, 3000); // intervalo de 1 segundo (ajuste como quiser)
    }
  }

  return (
    <div className="overflow-hidden flex items-center justify-center gap-28 h-dvh w-full p-10 bg-[url('/background_pattern.png')] bg-cover bg-center flex-col md:flex-row">
      {paymentCheckedOpen && (
        <ConfettiScreen />
      )}
      <div className="flex flex-col max-w-[350px]">
        <h1 className="text-[30px] font-semibold text-[#142F54] leading-0 md:text-[28px]">+Comandos</h1>
        <h1 className="text-[30px] font-semibold text-[#142F54] leading-14 md:text-[28px]">+Diversão</h1>
        <h1 className="text-[30px] font-semibold text-[#142F54] leading-6 md:text-[36px]">Conheça o</h1>
        <h1 className="text-[72px] font-black text-[#142F54] leading-18 md:text-[78px]">MinkBot</h1>
        <h1 className="text-[14px] font-regular text-[#142F54] leading-5 md:text-[20px]">O assistente que já é divertido, ainda mais completo!</h1>
        <div className="mt-4">
        </div>
      </div>
      <div className="flex items-center justify-center min-w-[300px]">
        {/* <h1>{group.id}</h1>
        <h1>{group.group_id}</h1>
        <h1>{group.plan_id}</h1> */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <FormField
              control={form.control}
              name="plan"
              render={({ field }) => (
                <FormItem className="w-full text-[#142F54]">
                  <FormLabel>Plano</FormLabel>
                  <Select onValueChange={(value) => {field.onChange(value); setSelectedPlan(value)}} defaultValue={field.value}>
                    <FormControl className='border-2 border-[#142F54] w-full'>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um plano" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Premium</SelectItem>
                      <SelectItem value="2">Ultimate</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            { selectedPlan && (
              <div className='bg-gradient-to-br from-[#142F54] to-[#3B67A4] w-full min-h-[132px] rounded-3xl relative overflow-hidden'>
                <img src="/minkhead.png" alt="Minkbot Head" width={120} height={120} className='absolute top-0 -right-6 -translate-x-2 -translate-y-4' />
                <div className='flex flex-col justify-center gap-6 p-4'>
                  <div className='bg-[#3B67A4] max-w-fit px-3 rounded-md'>
                    <span className='font-bold text-white text-4xl'><span className='text-sm'>R$ </span>{selectedPlan == "1" ? "9,99" : "39,99"}</span>
                  </div>
                  <span className='text-white text-3xl'><b>MinkBot</b> {selectedPlan == "1" ? "Premium" : "Ultimate"}</span>
                </div>
              </div>
            )}
            {/* <Button className='w-full bg-[#142F54] hover:bg-[#3B67A4] cursor-pointer' type="submit">Pagar agora</Button> */}
            <SelectPaymentMethod
            title="Forma de pagamento"
            label="Pagar agora"
            disabled={selectedPlan ? false : true}
            description="Escolha uma das forma de pagamento a baixo e siga com os passo para realizar a compra.">
              {({ close }) => (
                <div className="flex flex-col gap-2 w-full">
                  <Button onClick={() => { close(); setFormKYCOpen(true); }} className="w-full bg-[#142F54] hover:bg-[#3B67A4] cursor-pointer">
                    <div className="flex flex-1 relative items-center justify-center">
                      <MdOutlinePix className='absolute left-0' />
                      <span>PIX</span>
                    </div>
                  </Button>
                  <Button onClick={() => { close(); setFormKYCOpen(true); }} disabled className="w-full bg-[#142F54] hover:bg-[#3B67A4] cursor-pointer">
                    <div className="flex flex-1 relative items-center justify-center">
                      <IoCard className='absolute left-0' />
                      <span>CARTÃO</span>
                    </div>
                  </Button>
                </div>
              )}
            </SelectPaymentMethod>
          </form>
        </Form>
        <FormKYC
          isOpen={formKYCOpen}
          onOpenChange={setFormKYCOpen}
          title="Preencha o formulário"
          description="Agora basta preencher o formulário com seus dados e prosseguir com o pagamento."
        >
          {/* Aqui começa o form KYC */}
          <Form {...kycForm}>
            <form
              onSubmit={kycForm.handleSubmit(onKYCSubmit)}
              className="flex flex-col gap-4 w-full"
            >
              <FormField
                control={kycForm.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <CPFInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={kycForm.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-[#142F54] hover:bg-[#3B67A4] cursor-pointer"
              >
                Próximo
              </Button>
            </form>
          </Form>
        </FormKYC>
        <PaymentPIX
          isOpen={paymentPIXOpen}
          onOpenChange={setPaymentPIXOpen}
          title="Realize o pagamento"
          description="Escaneie o QRCode ou copie o código e realize o pagamento."
        >
          {pixCopiaCola !== "" ? (
            <>
              <div className="flex gap-2">
                <QRCodeSVG
                  value={pixCopiaCola}
                  fgColor="#142F54"
                  size={164} />
                <div className='flex flex-col gap-2 w-[206px]'>
                  <Textarea className='resize-none h-[130px]' disabled value={pixCopiaCola} />
                  <Button onClick={() => copyToClipboard(pixCopiaCola)} className='bg-[#142F54] hover:bg-[#3B67A4] cursor-pointer'>Copiar</Button>
                </div>
              </div>
              <Button onClick={() => verifyPayment()} className='bg-[#142F54] hover:bg-[#3B67A4] cursor-pointer'>Já paguei!</Button>
            </>
          ) : (
            <>
              <div className="flex gap-2">
                <Skeleton className="h-[174px] w-[164px] rounded-xl" />
                <div className='flex flex-col gap-2 w-[206px]'>
                  <Skeleton className="h-[130px] rounded-xl" />
                  <Skeleton className="h-[36px] rounded-xl" />
                </div>
              </div>
              <Skeleton className="h-[36px] rounded-xl" />
            </>
          )}
        </PaymentPIX>
        <PaymentVerified selectedPlan={selectedPlan} isOpen={paymentCheckedOpen} onOpenChange={setPaymentCheckedOpen} title="Pagamento aprovado!" />
        <Toaster position="top-center" />
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await api.get<Group[]>('/groups', {
    params: {
      _limit: 2,
      _sort: 'published_at',
      _order: 'desc',
    }
  })

  const paths = data.map((group: any) => {
    return {
      params: {
        slug: group.id,
      }
    }
  })
  
  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params as { slug: string };
  const { data } = await api.get<Group>(`/group/${slug}`)

  const group = {
    id: data.id,
    group_id: data.group_id,
    plan_id: data.plan_id,
  };

  return {
    props: {
      group,
    },
    revalidate: 60 * 60 * 24 * 3, // 3 days
  }
}
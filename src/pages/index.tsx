// import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import { IoMenu } from "react-icons/io5";
import {
  BiSolidMessageSquareCheck,
  BiSolidMessageSquareX,
} from "react-icons/bi";

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
    <>
      <Head>
        <title>MinkBot | Mais funções para seu grupo</title>
        <meta
          name="description"
          content="Transforme qualquer grupo de WhatsApp com o MinkBot! Crie figurinhas, jogue adedonha, 'eu nunca', receba sugestões de filmes e explore dezenas de comandos interativos para animar suas conversas. Rápido, divertido e fácil de usar."
        ></meta>
        <meta
          name="keywords"
          content="bot para WhatsApp, bot de figurinhas, bot WhatsApp 2025, comandos para WhatsApp, figurinhas WhatsApp, criar figurinhas no grupo, MinkBot, adedonha WhatsApp, bot eu nunca, remover fundo imagem WhatsApp, jogos para WhatsApp, diversão no WhatsApp, bot para grupos, WhatsApp bot comandos, bot com jogos WhatsApp, bot gratuito para WhatsApp, entretenimento no WhatsApp, bot engraçado WhatsApp, bot que indica filmes, bot interativo, automação WhatsApp divertida, bot em português para WhatsApp"
        ></meta>

        <meta
          property="og:title"
          content="MinkBot – O Bot para WhatsApp que Deixa seus Grupos Mais Divertidos e Interativos"
        />
        <meta
          property="og:description"
          content="O assistente perfeito para seus grupos de WhatsApp. Crie figurinhas, jogue com amigos e descubra dezenas de comandos divertidos."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.minkbot.com.br" />
        <meta
          property="og:image"
          content="https://www.minkbot.com.br/og-image.png"
        />
      </Head>
      <main className="overflow-x-hidden flex items-center min-h-dvh w-full flex-col">
        <div className="h-2 w-full bg-gradient-to-r to-[#142F54] from-[#3B67A4]"></div>
        <Toaster position="top-center" />
        <header className="flex flex-col items-center w-full h-full bg-[url('/background_pattern.png')] bg-cover bg-center p-10">
          <div className="w-full">
            <nav className="flex items-center justify-end w-full">
              <Sheet>
                <SheetTrigger>
                  <IoMenu size={32} color="#142F54" />
                </SheetTrigger>
                <SheetContent className="bg-[#EAEBFF]">
                  <SheetHeader>
                    <SheetDescription>
                      <ul className="flex flex-col items-center justify-center gap-10 h-[calc(100dvh-10px)]">
                        <SheetTrigger className="w-full text-end">
                          <li className="font-bold w-full text-4xl text-end">
                            <span
                              onClick={() => {
                                const el = document.getElementById("sobre");
                                if (el) {
                                  el.scrollIntoView({ behavior: "smooth" });
                                }
                              }}
                            >
                              Sobre
                            </span>
                          </li>
                        </SheetTrigger>
                        <SheetTrigger className="w-full text-end">
                          <li className="font-bold w-full text-4xl text-end">
                            <span
                              onClick={() => {
                                const el = document.getElementById("comandos");
                                if (el) {
                                  el.scrollIntoView({ behavior: "smooth" });
                                }
                              }}
                            >
                              Comandos
                            </span>
                          </li>
                        </SheetTrigger>
                        <SheetTrigger className="w-full text-end">
                          <li className="font-bold w-full text-4xl text-end">
                            <span
                              onClick={() => {
                                const el = document.getElementById("adicionar");
                                if (el) {
                                  el.scrollIntoView({ behavior: "smooth" });
                                }
                              }}
                            >
                              Como adicionar
                            </span>
                          </li>
                        </SheetTrigger>
                        <SheetTrigger className="w-full text-end">
                          <li className="font-bold w-full text-4xl text-end">
                            <span
                              onClick={() => {
                                const el = document.getElementById("planos");
                                if (el) {
                                  el.scrollIntoView({ behavior: "smooth" });
                                }
                              }}
                            >
                              Planos
                            </span>
                          </li>
                        </SheetTrigger>
                      </ul>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </nav>

            <div className="flex flex-col items-center mt-6 justify-center">
              <div className="w-fit">
                <div className="flex font-semibold text-[#142F54] justify-between w-full px-2 -mb-2 md:text-lg lg:text-xl">
                  <span>+comandos</span>
                  <span>+diversão</span>
                </div>
                <h1 className="mb-1 font-bold text-5xl text-center text-[#142F54] md:text-7xl md:mb-2 lg:text-8xl lg:mb-3">
                  Conheça o MinkBot
                </h1>
              </div>
              <h3 className="font-light text-xl text-center text-[#142F54] md:text-2xl lg:text-3xl">
                O assistente virtual que vai trazer diversão para o seu grupo!
              </h3>
              <Button
                onClick={() => {
                  const el = document.getElementById("sobre");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="text-xl w-full md:px-6 py-5 bg-gradient-to-r from-[#142F54] to-[#3B67A4] mt-5 md:w-fit hover:cursor-pointer hover:to-[#142F54] hover:from-[#3B67A4]"
              >
                Saiba mais
              </Button>
            </div>

            <div className="flex justify-center w-full relative h-auto">
              <img
                src="/MinkMockupPhone.png"
                alt="MinkBot placeholder"
                className="w-full max-w-[420px] min-w-24 opacity-0"
              />
              <img
                src="/MinkMockupPhone.png"
                alt="MinkBot"
                className="w-full max-w-[420px] absolute top-1/3 left-1/2 -translate-x-1/2"
              />
              <img src="/pollWhatsapp.png" alt="poll" className="opacity-0 md:opacity-100 absolute z-10 w-full max-w-[300px] h-auto top-1/2 left-1/5 -translate-x-1/2 -rotate-6 lg:top-1/2 lg:left-4/12" />
              <img src="/whatsappAudio.png" alt="audio" className="opacity-0 md:opacity-100 absolute z-10 w-full max-w-[300px] h-auto top-10/12 right-1/5 translate-x-1/2 rotate-12 lg:top-10/12 lg:right-4/12" />
            </div>
          </div>
        </header>
        <section
          id="sobre"
          className="flex flex-col items-center justify-center w-full mt-[390px] text-justify py-10 px-10 md:px-40 lg:px-64"
        >
          <h2 className="font-bold text-3xl text-center text-[#142F54] mb-8 md:text-left md:w-full">
            Sobre o MinkBot
          </h2>
          <p className="text-[#142F54] mb-4 md:text-left md:w-full">
            Olá! Sou o MinkBot, um assistente virtual criado para tornar seus
            grupos do WhatsApp muito mais interativos e cheios de vida.
          </p>
          <p className="text-[#142F54] mb-4 md:text-left md:w-full">
            Do grupo da família ao grupo da firma, meu objetivo é trazer leveza,
            entretenimento e praticidade para as conversas do dia a dia. Comigo,
            você pode:
          </p>
          <ul className="list-disc text-[#142F54] pl-8 mb-4 md:text-left md:w-full">
            <li>
              💬 Criar figurinhas (estáticas e animadas) diretamente pelo grupo
            </li>
            <li>
              🎮 Jogar adedonha, "eu nunca" e outros jogos em tempo real com
              seus amigos
            </li>
            <li>🎬 Receber sugestões de filmes para assistir</li>
            <li>
              🎲 Se surpreender com comandos aleatórios, piadas, curiosidades e
              muito mais
            </li>
          </ul>
          <p className="text-[#142F54] mb-4 md:text-left md:w-full">
            São dezenas de funcionalidades pensadas para entreter, levar mais
            interação, criatividade e diversão para qualquer grupo.
          </p>
          <p className="text-[#142F54] mb-4 md:text-left md:w-full">
            Fácil de usar, rápido nas respostas e sempre atualizado com
            novidades, o MinkBot é o parceiro ideal para deixar sua conversa
            mais divertida e dinâmica — sem complicação.
          </p>
        </section>
        <section
          id="comandos"
          className="flex flex-col items-center justify-center w-full mt-16 text-justify py-10 px-10 md:px-40 lg:px-64"
        >
          <h2 className="font-bold text-3xl text-center text-[#142F54] mb-8 md:text-left md:w-full">
            Meus comandos
          </h2>
          <div className="mb-4 text-left w-full">
            <p className="text-[#142F54] font-bold">🖼️ Figurinha</p>
            <p className="text-[#142F54]">
              Comando:{" "}
              <code className="bg-[#142F54da] text-white p-[1px] px-1 rounded italic">
                -s
              </code>
            </p>
            <p className="text-[#142F54]">
              O bot irá transformar o conteúdo enviado em uma figurinha.
            </p>
          </div>
          <div className="mb-4 text-left w-full">
            <p className="text-[#142F54] font-bold">💥 Roleta Russa</p>
            <p className="text-[#142F54]">
              Comando:{" "}
              <code className="bg-[#142F54da] text-white p-[1px] px-1 rounded italic">
                -roletarussa
              </code>
            </p>
            <p className="text-[#142F54]">
              O bot escolhe aleatoriamente um dos membros… e expulsa!
            </p>
          </div>
          <div className="mb-4 text-left w-full">
            <p className="text-[#142F54] font-bold">✂️ Remover Fundo</p>
            <p className="text-[#142F54]">
              Comando:{" "}
              <code className="bg-[#142F54da] text-white p-[1px] px-1 rounded italic">
                -removerbg
              </code>
            </p>
            <p className="text-[#142F54]">
              O bot retorna a imagem enviada, mas com o fundo removido.
            </p>
          </div>
          <div className="mb-4 text-left w-full">
            <p className="text-[#142F54] font-bold">🎲 Adedonha</p>
            <p className="text-[#142F54]">
              Comando:{" "}
              <code className="bg-[#142F54da] text-white p-[1px] px-1 rounded italic">
                -adedonha
              </code>
            </p>
            <p className="text-[#142F54]">
              O bot escolhe uma letra e um tema aleatório. A diversão começa aí,
              e o resto é com o grupo!
            </p>
          </div>

          <div className="mb-4 text-left w-full">
            <p className="text-[#142F54] font-bold">😳 Eu Nunca</p>
            <p className="text-[#142F54]">
              Comando:{" "}
              <code className="bg-[#142F54da] text-white p-[1px] px-1 rounded italic">
                -eununca
              </code>
            </p>
            <p className="text-[#142F54]">
              O clássico jogo de "Eu Nunca"! O bot gera uma frase aleatória do
              tipo "Eu nunca...", e o pessoal no grupo pode compartilhar se já
              fez ou não. Perfeito para uma diversão descontraída!
            </p>
          </div>

          <div className="mb-4 text-left w-full">
            <p className="text-[#142F54] font-bold">🎞️ WhatWatch</p>
            <p className="text-[#142F54]">
              Comando:{" "}
              <code className="bg-[#142F54da] text-white p-[1px] px-1 rounded italic">
                -ww
              </code>
            </p>
            <p className="text-[#142F54]">
              O bot recomenda um filme aleatório. É perfeito(ou não) para quem
              está indeciso sobre o que assistir.
            </p>
          </div>

          <div className="mb-4 text-left w-full">
            <p className="text-[#142F54]">E isso é só o começo! 😎</p>
            <p className="text-[#142F54]">
              Tenho dezenas de outros comandos para animar seus grupos. Me
              adicione e envie{" "}
              <code className="bg-[#142F54da] text-white p-[1px] px-1 rounded italic">
                -comandos
              </code>{" "}
              para descobrir tudo o que posso fazer!
            </p>
          </div>
        </section>
        <section
          id="adicionar"
          className="flex flex-col items-center justify-center w-full mt-16 text-justify py-10 px-10 md:px-40 lg:px-64"
        >
          <h2 className="font-bold text-3xl text-center text-[#142F54] mb-8 md:text-left md:w-full">
            Como me adicionar
          </h2>
          <div className="mb-4 md:text-left md:w-full">
            <p className="text-[#142F54]">
              Simples, é só escolher uma das opções abaixo
            </p>
            <div className="flex flex-row gap-2 mt-4 flex-wrap">
              <Button onClick={() => window.open("https://wa.me/5583996992365", "_blank")} className="bg-gradient-to-r from-[#142F54] to-[#3B67A4] flex-1 hover:cursor-pointer hover:to-[#142F54] hover:from-[#3B67A4]">
                Abrir WhatsApp
              </Button>
              <Button onClick={handleDownload} className="bg-gradient-to-r from-[#142F54] to-[#3B67A4] flex-1 hover:cursor-pointer hover:to-[#142F54] hover:from-[#3B67A4]">
                Salvar Número
              </Button>
              <Button onClick={() => { navigator.clipboard.writeText("+5583996992365").then(() => {toast.success("Número copiado com sucesso!")}).catch(() => {toast.error("Erro ao copiar o número")}) ; }} className="bg-gradient-to-r from-[#142F54] to-[#3B67A4] flex-1 hover:cursor-pointer hover:to-[#142F54] hover:from-[#3B67A4]">
                Copiar Número
              </Button>
            </div>
          </div>
        </section>
        <section
          id="planos"
          className="flex flex-col items-center justify-center w-full mt-16 text-justify py-10 px-10 md:px-40 lg:px-64"
        >
          <h2 className="font-bold text-3xl text-center text-[#142F54] mb-8">
            Planos
          </h2>
          <div className="mb-4 w-full">
            <div className="flex flex-row items-center justify-center gap-2 mt-4 flex-wrap w-full">
              <div className="flex flex-col w-full max-w-64 h-80 bg-[#3B67A4] rounded-lg p-4">
                <h3 className="text-white font-bold text-2xl text-center">
                  Gratuito
                </h3>
                <div className="mt-4">
                  <span className="text-white text-4xl font-black">
                    <small className="font-light text-white text-lg">R$</small>0
                  </span>
                  <small className="font-light text-white text-lg">
                    ,00/mês
                  </small>
                </div>
                <div className="mt-4">
                  <div className="flex flex-row items-center gap-2">
                    <BiSolidMessageSquareCheck color="#dbeafe" />
                    <p className="text-blue-100">Gerar Figurinhas</p>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <BiSolidMessageSquareCheck color="#dbeafe" />
                    <p className="text-blue-100">Solicitar Filmes</p>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <BiSolidMessageSquareCheck color="#dbeafe" />
                    <p className="text-blue-100">Comandos de Jogos</p>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <BiSolidMessageSquareX color="#dbeafe" />
                    <p className="text-blue-100">Acesso limitado</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full max-w-64 h-80 bg-[#142F54] rounded-lg p-4">
                <h3 className="text-white font-bold text-2xl text-center">
                  Premium
                </h3>
                <div className="mt-4">
                  <span className="text-white text-4xl font-black">
                    <small className="font-light text-white text-lg">R$</small>
                    14
                  </span>
                  <small className="font-light text-white text-lg">
                    ,99/mês
                  </small>
                </div>
                <div className="mt-4">
                  <div className="flex flex-row items-center gap-2">
                    <BiSolidMessageSquareCheck color="#dbeafe" />
                    <p className="text-blue-100">Gerar Figurinhas</p>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <BiSolidMessageSquareCheck color="#dbeafe" />
                    <p className="text-blue-100">Solicitar Filmes</p>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <BiSolidMessageSquareCheck color="#dbeafe" />
                    <p className="text-blue-100">Comandos de Jogos</p>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <BiSolidMessageSquareCheck color="#dbeafe" />
                    <p className="text-blue-100">Comandos de IA</p>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <BiSolidMessageSquareCheck color="#dbeafe" />
                    <p className="text-blue-100">Comandos de imagens</p>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <BiSolidMessageSquareCheck color="#dbeafe" />
                    <p className="text-blue-100">Comandos de voz</p>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <BiSolidMessageSquareCheck color="#dbeafe" />
                    <p className="text-blue-100">e MUITO MAIS</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="h-2 w-full bg-gradient-to-r from-[#142F54] to-[#3B67A4]"></div>
      </main>
    </>
  );
}

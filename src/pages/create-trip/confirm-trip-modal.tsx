import { X, User, Mail, Plus } from "lucide-react";
import Button from "../../components/button";
import { FormEvent } from "react";

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void
  createTrip: (event: FormEvent<HTMLFormElement>) => Promise<void>
  setOwnerName: (name: string) => void
  setOwnerEmail: (email: string) => void  
}

function ConfirmTripModal({ 
  closeConfirmTripModal,
  createTrip,
  setOwnerEmail,
  setOwnerName
}: ConfirmTripModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-lg font-semibold">
              Confirmar criação de viagem
            </h2>
            <button>
              <X
                className="size-5 text-zinc-400"
                onClick={closeConfirmTripModal}
              />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Para concluir a criação da viagem para{" "}
            <span className="text-zinc-200">Florianópolis, Brasil</span> nas
            datas de
            <span className="text-zinc-200">
              16 a 27 de Agosto de 2024
            </span>{" "}
            preencha os seus dados abaixo:
          </p>
        </div>

        <form onSubmit={createTrip} className="space-y-3">
          <div className="py-2 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />

            <input
              type="text"
              onChange={(event) => setOwnerName(event.target.value)}
              placeholder="Seu nome completo"
              className="h-14 bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <div className="py-2 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Mail className="text-zinc-400 size-5" />

            <input
              type="email"
              onChange={(event) => setOwnerEmail(event.target.value)}
              placeholder="Seu email pessoal"
              className="h-14 bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <Button type="submit">
            Confirmar criação da viagem
            <Plus className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ConfirmTripModal;

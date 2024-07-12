import { X, User, Mail, Plus } from "lucide-react";
import Button from "../../components/button";
import { FormEvent } from "react";
import Modal from "../../components/modal";

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  setOwnerName: (name: string) => void;
  setOwnerEmail: (email: string) => void;
}

function ConfirmTripModal({ closeConfirmTripModal, createTrip, setOwnerEmail, setOwnerName }: ConfirmTripModalProps) {
  return (
    <Modal
      title="Confirmar criação de viagem"
      description=""
      onClose={closeConfirmTripModal}
    >
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
    </Modal>
  );
}

export default ConfirmTripModal;

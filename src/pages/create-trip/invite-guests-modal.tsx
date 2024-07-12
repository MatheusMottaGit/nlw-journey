import { X, AtSign, Plus } from "lucide-react";
import { FormEvent } from "react";
import Button from "../../components/button";
import Modal from "../../components/modal";

interface InviteGuestsModalProps {
  closeGuestsModal: () => void;
  emailsToInvite: string[];
  addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void;
  removeEmailFromInvite: (email: string) => void;
}

function InviteGuestsModal({ addNewEmailToInvite, closeGuestsModal, emailsToInvite, removeEmailFromInvite }: InviteGuestsModalProps) {
  return (
    <Modal
      title="Selecionar convidados"
      description="Os convidados irão receber e-mails para confirmar a participação na viagem."
      onClose={closeGuestsModal}
    >
      <div className="flex flex-wrap gap-2">
        {emailsToInvite.map((email) => {
          return (
            <div
              key={email}
              className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
            >
              <span className="text-zinc-300">{email}</span>

              <button
                onClick={() => removeEmailFromInvite(email)}
                type="button"
              >
                <X className="size-4 text-zinc-400" />
              </button>
            </div>
          );
        })}
      </div>

      <div className="w-full h-px bg-zinc-800" />

      <form
        onSubmit={addNewEmailToInvite}
        className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2"
      >
        <div className="px-2 flex items-center flex-1 gap-2">
          <AtSign className="text-zinc-400 size-5" />
          <input
            type="email"
            name="email"
            placeholder="Digite o email do convidado"
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          />
        </div>

        <Button type="submit">
          Convidar
          <Plus className="size-5" />
        </Button>
      </form>
    </Modal>
  );
}

export default InviteGuestsModal;

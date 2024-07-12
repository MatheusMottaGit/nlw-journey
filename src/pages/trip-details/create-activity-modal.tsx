import { Calendar, CircleCheck, Tag } from "lucide-react";
import Button from "../../components/button";
import { FormEvent } from "react";
import { api } from "../../utils/api";
import { toast } from "sonner";
import Modal from "../../components/modal";

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void;
  tripId?: string;
}

export function CreateActivityModal({ closeCreateActivityModal, tripId }: CreateActivityModalProps) {
  async function createNewActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const title = formData.get("title")?.toString();

    const occurs_at = formData.get("occurs_at")?.toString();

    if (!title || !occurs_at) return;

    const createNewActivityPromise = api.post(`/trips/${tripId}/activities`, {
      title: title,
      occurs_at: title,
    });

    toast.promise(createNewActivityPromise, {
      loading: "Cadastrando atividade...",
      success: "Atividade registrada!",
      error: "Ops! Ocorreu um erro ao cadastrar sua atividade...",
    });

    await createNewActivityPromise;

    window.document.location.reload();
  }

  return (
    <Modal
      title="Cadastrar atividade"
      description="Todos convidados podem visualizar as atividades."
      onClose={closeCreateActivityModal}
    >
      <form onSubmit={createNewActivity} className="space-y-3">
        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <Tag className="text-zinc-400 size-5" />
          <input
            name="title"
            placeholder="Qual a atividade?"
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          />
        </div>

        <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <Calendar className="text-zinc-400 size-5" />
          <input
            type="datetime-local"
            name="occurs_at"
            placeholder="Data e horário da atividade"
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          />
        </div>

        <Button type="submit" size="full">
          Salvar atividade
          <CircleCheck className="size-5" />
        </Button>
      </form>
    </Modal>
  );
}

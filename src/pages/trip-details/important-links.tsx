import { CircleAlert, Link2, Link2Icon, Plus, Tag, X } from "lucide-react";
import Button from "../../components/button";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../../utils/api";
import Modal from "../../components/modal";
import { Link, LinksApiResponse } from "../../types/link";
import { toast } from "sonner";

interface ImportantLinksProps {
  tripId?: string;
}

export function ImportantLinks({ tripId }: ImportantLinksProps) {
  const [isImportantLinksModalOpen, setIsImportantLinksModalOpen] = useState(false);
  const [links, setLinks] = useState<Link[]>([]);

  async function getImportantLinks() {
    const response = await api.get<LinksApiResponse>(`/trips/${tripId}/activities`);
    setLinks(response.data.links);
  }

  useEffect(() => {
    getImportantLinks();
  }, [tripId]);

  async function createImportantLinks(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const title = formData.get('title')?.toString()

    const url = formData.get('url')?.toString()

    if(!title || !url) return

    const createNewLinkPromise = api.post(`/trips/${tripId}/links`, { title, url })

    toast.promise(createNewLinkPromise, {
      loading: "Adicionando link...",
      success: "Link adicionado!",
      error: "Ops! Ocorreu um erro ao adicionar um novo link..."
    })

    await createNewLinkPromise

    window.document.location.reload()
  }

  function openImportantLinksModal() {
    setIsImportantLinksModalOpen(true);
  }

  function closeImportantLinksModal() {
    setIsImportantLinksModalOpen(false);
  }

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-xl">Links importantes</h2>

      <div className="space-y-5 h-32 overflow-auto">
        {links.length > 0 ? (
          <>
            {links.map((link) => {
              return (
                <div
                  key={link.id}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <span className="block font-medium text-zinc-100">
                      {link.title}
                    </span>
                    <a
                      href="#"
                      className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
                    >
                      {link.url}
                    </a>
                  </div>

                  <Link2 className="text-zinc-400 size-5 shrink-0" />
                </div>
              );
            })}
          </>
        ) : (
          <div className="flex items-center gap-1 text-zinc-600 ">
            <CircleAlert className="size-4" />
            <p className="text-sm">Nenhum link adicionado no momento.</p>
          </div>
        )}
      </div>

      <Button onClick={openImportantLinksModal} variant="secondary" size="full">
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>

      {isImportantLinksModalOpen && (
        <Modal
          title="Cadastrar link"
          description="Todos convidados podem visualizar os links importantes."
          onClose={closeImportantLinksModal}
        >
          <form onSubmit={createImportantLinks} className="space-y-3">
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <Tag className="text-zinc-400 size-5" />
              <input
                name="title"
                placeholder="Título do link"
                className="bg-transparent placeholder-zinc-400 outline-none flex-1"
              />
            </div>

            <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <Link2Icon className="text-zinc-400 size-5" />
              <input
                type="text"
                name="url"
                placeholder="URL"
                className="bg-transparent placeholder-zinc-400 outline-none flex-1"
              />
            </div>

            <Button type="submit" size="full">
              Salvar Link
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
}

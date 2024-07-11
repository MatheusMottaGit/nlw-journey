import { FormEvent, useState } from "react";
import logo from "../../assets/logo.svg";
import InviteGuestsModal from "./invite-guests-modal";
import ConfirmTripModal from "./confirm-trip-modal";
import { useNavigate } from "react-router-dom";
import DestinationAndDateStep from "./steps/destination-and-date-step";
import InviteGuestsStep from "./steps/invite-guests-step";
import { DateRange } from "react-day-picker";
import { api } from "../../utils/api";
import { toast, Toaster } from "sonner";

type CreateTripApiResponse = {
  tripId: string
}

function CreateTripPage() {
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);
  const [destination, setDestination] = useState('')
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>()
  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')

  const navigate = useNavigate();

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if(!selectedDateRange?.from || !selectedDateRange?.to) return

    // console.log({
    //   destination: destination,
    //   starts_at: selectedDateRange.from,
    //   ends_at: selectedDateRange.to,
    //   emails_to_invite: emailsToInvite,
    //   owner_name: ownerName,
    //   owner_email: ownerEmail
    // })
      
    const newTripData = {
      destination: destination,
      starts_at: selectedDateRange.from,
      ends_at: selectedDateRange.to,
      emails_to_invite: emailsToInvite,
      owner_name: ownerName,
      owner_email: ownerEmail
    }

    const createNewTripPromise = api.post<CreateTripApiResponse>('/trips', newTripData)

    toast.promise(createNewTripPromise, {
      loading: 'Criando viagem...',
      success: 'Viagem registrada com sucesso!',
      error: 'Ops! Ocorreu algum erro ao cadastrar sua viagem...'
    })

    const response = await createNewTripPromise

    const { tripId } = response.data

    navigate(`/trips/${tripId}`)
  }


  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const email = data.get("email")?.toString();

    if (!email) return;

    if (emailsToInvite.includes(email)) return;

    setEmailsToInvite([...emailsToInvite, email]);

    event.currentTarget.reset();
  }

  function removeEmailFromInvite(emailToRemove: string) {
    const nonRemovedEmails = emailsToInvite.filter(
      (email) => email !== emailToRemove
    );

    setEmailsToInvite(nonRemovedEmails);
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true);
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false);
  }

  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true);
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false);
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src={logo} alt="plann.er" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep
            closeGuestsInput={closeGuestsInput}
            isGuestsInputOpen={isGuestsInputOpen}
            openGuestsInput={openGuestsInput}
            setDestination={setDestination}
            selectedDateRange={selectedDateRange}
            setSelectedDateRange={setSelectedDateRange}
          />

          {isGuestsInputOpen && (
            <InviteGuestsStep
              emailsToInvite={emailsToInvite}
              openConfirmTripModal={openConfirmTripModal}
              openGuestsModal={openGuestsModal}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
          com nossos{" "}
          <a className="text-zinc-300 underline" href="#">
            termos de uso
          </a>
          {" "} e {" "}
          <a className="text-zinc-300 underline" href="#">
            políticas de privacidade
          </a>
          .
        </p>
      </div>

      {isGuestsModalOpen && (
        <InviteGuestsModal
          addNewEmailToInvite={addNewEmailToInvite}
          closeGuestsModal={closeGuestsModal}
          emailsToInvite={emailsToInvite}
          removeEmailFromInvite={removeEmailFromInvite}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          closeConfirmTripModal={closeConfirmTripModal}
          createTrip={createTrip}
          setOwnerEmail={setOwnerEmail}
          setOwnerName={setOwnerName}
        />
      )}

      <Toaster position="top-center" />
    </div>
  );
}

export default CreateTripPage;

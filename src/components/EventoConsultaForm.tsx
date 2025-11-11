import { component$, useSignal, useVisibleTask$, type QRL } from "@builder.io/qwik";
import { Form } from '@builder.io/qwik-city';
import { Label } from '@qwik-ui/headless';
import { useEventoConsulta } from "~/routes/[locale]/eventos/[slug]/index";
import { _ } from "compiled-i18n";

interface EventoConsultaFormProps {
  onCloseModal$?: QRL<() => void>;
  onShowToast$?: QRL<(p: { type: 'success' | 'error'; message: string }) => void>;
  eventoTitle: string;
}

export default component$<EventoConsultaFormProps>(({ onCloseModal$, onShowToast$, eventoTitle }) => {
  const action = useEventoConsulta();
  const handled = useSignal<any>(null);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    const value = track(() => action.value);
    track(() => action.isRunning);

    if (!action.isRunning && value && value !== handled.value) {
      handled.value = value;

      const type = value.success ? 'success' : 'error';
      const message = value.message ?? (value.success ? _`¡Consulta enviada!` : _`Ocurrió un error`);

      if (value.success) onCloseModal$?.();
      onShowToast$?.({ type, message });
    }
  });

  return (
    <Form action={action}>
      <input type="hidden" name="eventoTitle" value={eventoTitle} />
      
      <div>
        <Label class="label" for="nombre">{_`Nombre completo`}</Label>
        <input
          id="nombre"
          name="nombre"
          placeholder={_`Tu nombre completo`}
          type="text"
          class="w-full rounded-md border px-3 py-2"
          required
        />
      </div>

      <div class="mt-3">
        <Label class="label" for="email">{_`Email`}</Label>
        <input
          id="email"
          name="email"
          placeholder={_`tu@email.com`}
          type="email"
          class="w-full rounded-md border px-3 py-2"
          required
        />
      </div>

      <div class="mt-3">
        <Label class="label" for="telefono">{_`Teléfono`}</Label>
        <input
          id="telefono"
          name="telefono"
          placeholder={_`Tu teléfono`}
          type="tel"
          class="w-full rounded-md border px-3 py-2"
        />
      </div>

      <div class="mt-3">
        <Label class="label" for="mensaje">{_`Mensaje o consulta`}</Label>
        <textarea
          id="mensaje"
          name="mensaje"
          placeholder={_`Escribe tu consulta sobre el evento...`}
          rows={4}
          class="w-full rounded-md border px-3 py-2"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={action.isRunning}
        class="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all border-2 border-green-700 px-8 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {action.isRunning ? _`Enviando consulta...` : _`Enviar consulta`}
      </button>

      <p class="mt-2 text-xs text-gray-500 text-center">
        🔒 {_`Tus datos están seguros. Solo usaremos tu información para responder tu consulta.`}
      </p>
    </Form>
  );
});


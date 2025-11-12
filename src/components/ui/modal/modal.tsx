import { component$, Slot, type Signal } from '@builder.io/qwik';
import { Modal as HeadlessModal } from '@qwik-ui/headless';
import { cn } from '@qwik-ui/utils';

interface ModalProps {
  cancelButtonText?: string;
  description?: string;
  saveButtonText?: string;
  showFooter?: boolean;
  title: string;
  triggerClass?: string;
  triggerText: string;
  showSig?: Signal<boolean>;
}

export const Modal = component$<ModalProps>((props) => {
  return (
    <>
      {props.showSig ? (
        <HeadlessModal.Root bind:show={props.showSig}>
          <HeadlessModal.Trigger class={cn(props.triggerClass || 'modal-trigger')}>
            {props.triggerText}
          </HeadlessModal.Trigger>

          <HeadlessModal.Panel class="modal-panel modal-animation">
            <HeadlessModal.Title class="modal-title">{props.title}</HeadlessModal.Title>
            {props.description && (
              <HeadlessModal.Description class="modal-description">
                {props.description}
              </HeadlessModal.Description>
            )}
            <Slot />
            {props.showFooter && (
              <footer class="modal-footer">
                <HeadlessModal.Close class="modal-close">
                  {props.cancelButtonText || 'Cancelar'}
                </HeadlessModal.Close>
                <HeadlessModal.Close class="modal-close modal-close-primary">
                  {props.saveButtonText || 'Guardar cambios'}
                </HeadlessModal.Close>
              </footer>
            )}
          </HeadlessModal.Panel>
        </HeadlessModal.Root>
      ) : (
        <HeadlessModal.Root>
          <HeadlessModal.Trigger class={cn(props.triggerClass || 'modal-trigger')}>
            {props.triggerText}
          </HeadlessModal.Trigger>

          <HeadlessModal.Panel class="modal-panel modal-animation">
            <HeadlessModal.Title class="modal-title">{props.title}</HeadlessModal.Title>
            {props.description && (
              <HeadlessModal.Description class="modal-description">
                {props.description}
              </HeadlessModal.Description>
            )}
            <Slot />
            {props.showFooter && (
              <footer class="modal-footer">
                <HeadlessModal.Close class="modal-close">
                  {props.cancelButtonText || 'Cancelar'}
                </HeadlessModal.Close>
                <HeadlessModal.Close class="modal-close modal-close-primary">
                  {props.saveButtonText || 'Guardar cambios'}
                </HeadlessModal.Close>
              </footer>
            )}
          </HeadlessModal.Panel>
        </HeadlessModal.Root>
      )}
    </>
  );
});

// Exportar también los componentes individuales para compatibilidad
export const ModalRoot = HeadlessModal.Root;
export const ModalTrigger = HeadlessModal.Trigger;
export const ModalClose = HeadlessModal.Close;
export const ModalPanel = HeadlessModal.Panel;
export const ModalTitle = HeadlessModal.Title;
export const ModalDescription = HeadlessModal.Description;

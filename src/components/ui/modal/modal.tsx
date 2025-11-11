import { component$, Slot, useStyles$, type Signal } from '@builder.io/qwik';
import { Modal } from '@qwik-ui/headless';
import styles from './modal.css?inline';

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

export default component$<ModalProps>((props) => {
  useStyles$(styles);
  useStyles$(`
    .modal-animation[open]::backdrop {
      animation: backdropFadeIn 0.75s ease-in-out forwards;
    }
    @keyframes backdropFadeIn {
      from { background-color: rgba(0,0,0,0); }
      to   { background-color: rgba(0,0,0,0.65); }
    }
  `);

  return (
    <>
      {props.showSig ? (
        <Modal.Root bind:show={props.showSig}>
          <Modal.Trigger class={`${props.triggerClass || 'modal-trigger'}`}>
            {props.triggerText}
          </Modal.Trigger>

          <Modal.Panel class="modal-panel modal-animation">
            <Modal.Title>{props.title}</Modal.Title>
            <Modal.Description>{props.description}</Modal.Description>
            <Slot />
            {props.showFooter && (
              <footer class="mt-4">
                <Modal.Close class="modal-close">
                  {props.cancelButtonText || 'Cancelar'}
                </Modal.Close>
                <Modal.Close class="modal-close">
                  {props.saveButtonText || 'Guardar cambios'}
                </Modal.Close>
              </footer>
            )}
          </Modal.Panel>
        </Modal.Root>
      ) : (
        <Modal.Root>
          <Modal.Trigger class={`${props.triggerClass || 'modal-trigger'}`}>
            {props.triggerText}
          </Modal.Trigger>

          <Modal.Panel class="modal-panel modal-animation">
            <Modal.Title>{props.title}</Modal.Title>
            <Modal.Description>{props.description}</Modal.Description>
            <Slot />
            {props.showFooter && (
              <footer class="mt-4">
                <Modal.Close class="modal-close">
                  {props.cancelButtonText || 'Cancelar'}
                </Modal.Close>
                <Modal.Close class="modal-close">
                  {props.saveButtonText || 'Guardar cambios'}
                </Modal.Close>
              </footer>
            )}
          </Modal.Panel>
        </Modal.Root>
      )}
    </>
  );
});


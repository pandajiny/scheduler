interface ModalProps<T> {
  handleSubmit: (args: T) => Promise<void>;
  handleCancel: () => Promise<void>;
}

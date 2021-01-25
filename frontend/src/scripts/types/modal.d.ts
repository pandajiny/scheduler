interface ActionModalProps<T> {
  handleSubmit: (args: T) => Promise<void>;
  handleCancel: () => Promise<void>;
}

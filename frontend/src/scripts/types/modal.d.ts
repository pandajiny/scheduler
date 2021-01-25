interface ActionModalProps<T> {
  user: User;
  handleSubmit: (args: T) => Promise<void>;
  handleCancel: () => Promise<void>;
}

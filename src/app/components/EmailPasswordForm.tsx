export const EmailPasswordForm = ({
  buttonAction,
  text,
  noPassword = false,
}: {
  buttonAction: any;
  text: string;
  noPassword?: boolean;
}) => {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      {!noPassword && <>
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
      </>}
      <button formAction={buttonAction}>{text}</button>
    </form>
  );
};

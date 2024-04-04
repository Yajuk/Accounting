import LoginForm from "./loginForm";
export interface LoginPageProps {
  children: React.ReactNode;
}

const LoginPage = ({ children }: LoginPageProps) => {
  return (
    <main className="flex min-h-screen flex-col  items-center justify-between p-24">
      <LoginForm />
    </main>
  );
};

export default LoginPage;

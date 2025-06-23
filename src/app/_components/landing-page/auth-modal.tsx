import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, } from "@/components/ui/dialog";
import { providers } from "@/server/auth/providers";
import { VStack } from "@/components/ui/stack";
import { Logo } from "@/components/ui/logo";

import { AuthButtons } from "../auth/auth-buttons";


interface AuthModalProps {
  children: React.ReactNode;
}

export const AuthModal = ({ children }: AuthModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent showCloseButton={false} className="gap-6">
        <DialogHeader className="items-center gap-2">
          <Logo className="size-16" />
          <VStack>
            <DialogTitle className="text-primary text-xl">
              Se connecter à to m-IA-ou
            </DialogTitle>
            <DialogDescription className="hidden">
              Sign in to your account to get started with Toolkit.
            </DialogDescription>
          </VStack>
        </DialogHeader>
        <AuthButtons
          providers={providers.map((provider) => ({
            name: provider.name,
            id: provider.id,
          }))}
        />
      </DialogContent>
    </Dialog>
  );
};

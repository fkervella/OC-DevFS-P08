"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactElement, useState, useTransition } from "react";

import { LoginAction } from "@/actions/auth";
import Button from "@/app/_components/Common/Button";
import LabelInput from "@/app/_components/Common/LabelInput";

/**
 * Register Page de connexion utilisateur
 *
 * @return {string} Code HTML d'affichage de la page de connexion utilisateur
 */

export default function LoginPage(): ReactElement {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    // Enregistrement des données dans un nouvel objet qui sera utilisé pour le backend
    const form = new FormData(e.currentTarget as HTMLFormElement);

    startTransition(async () => {
      try {
        const loginStatus = await LoginAction(form);

        if (!loginStatus.success) {
          setLoginError(loginStatus.error ?? "Une erreur est survenue");
        } else {
          router.push("/properties");
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Erreur inconnue";
        setLoginError(`Erreur lors de la connexion : ${errorMessage}`);
      }
    });
  };

  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="flex-1 flex flex-col gap-4 items-center justify-center bg-white max-w-185 pt-10 pr-10 pb-10 pl-10">
        <h1 className="font-inter text-center text-mainRed text-3xl font-bold mt-2 mb-2">
          Heureux de vous revoir
        </h1>
        <p className="font-inter text-center text-sm font-normal max-w-100">
          Connectez-vous pour retrouver vos réservations, vos annonces et tout
          ce qui rend vos séjours uniques.
        </p>
        <form
          onSubmit={
            handleSubmit as unknown as React.SubmitEventHandler<HTMLFormElement>
          }
          className="flex flex-col gap-2 w-full max-w-sm items-center"
        >
          <LabelInput
            name="email"
            text="Adresse Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            labelInputClassName="w-88"
          />
          <LabelInput
            name="password"
            text="Mot de passe"
            type="password"
            value={formData.password}
            onChange={handleChange}
            labelInputClassName="w-88"
          />
          <Button
            text={isPending ? "Connexion en cours ..." : "Se connecter"}
            type="submit"
            disabled={isPending}
            aria-live="polite"
            aria-busy={isPending}
            className="bg-mainRed text-white mt-8"
          />
          {loginError && (
            <div
              className="p-4 mt-4 text-redFont bg-lightOrange rounded-lg"
              role="alert"
              aria-live="assertive"
            >
              {loginError}
            </div>
          )}
          <Link
            href="/forgotPassword"
            className="text-mainRed font-inter font-normal text-sm mt-4"
          >
            Mot de passe oublié
          </Link>
        </form>
        <div className="font-inter text-mainRed font-normal text-sm">
          Pas encore de compte ?{" "}
          <span>
            <Link
              href="/signin"
              className="text-mainRed font-inter font-medium text-sm"
            >
              Inscrivez-vous
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

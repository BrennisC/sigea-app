"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import Link from "next/link";

interface RegisterForm {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  dni: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

interface RegisterErrors {
  nombre?: string;
  apellido?: string;
  email?: string;
  telefono?: string;
  dni?: string;
  password?: string;
  confirmPassword?: string;
  acceptTerms?: string;
  general?: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [formData, setFormData] = useState<RegisterForm>({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    dni: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const validateForm = (): boolean => {
    const newErrors: RegisterErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    } else if (formData.nombre.trim().length < 2) {
      newErrors.nombre = "El nombre debe tener al menos 2 caracteres";
    }

    if (!formData.apellido.trim()) {
      newErrors.apellido = "El apellido es requerido";
    } else if (formData.apellido.trim().length < 2) {
      newErrors.apellido = "El apellido debe tener al menos 2 caracteres";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Por favor ingresa un correo válido";
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es requerido";
    } else if (!/^\d{9}$/.test(formData.telefono.replace(/\D/g, ""))) {
      newErrors.telefono = "El teléfono debe tener 9 dígitos";
    }

    if (!formData.dni.trim()) {
      newErrors.dni = "El DNI es requerido";
    } else if (!/^\d{8}$/.test(formData.dni)) {
      newErrors.dni = "El DNI debe tener 8 dígitos";
    }

    if (!formData.password.trim()) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Debes aceptar los términos y condiciones";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));

    if (errors[name as keyof RegisterErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Register attempt:", formData);
      setIsLoading(false);
      router.push("/participante/dashboard");
    }, 1500);
  };

  const handleGoogleRegister = () => {
    setIsLoading(true);
    // TODO: Implement Google OAuth
    // window.location.href = `/api/auth/google/register`;
    console.log("Google register clicked");
    setTimeout(() => {
      setIsLoading(false);
      router.push("/participante/dashboard");
    }, 1000);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-primary via-primary to-primary-light px-4 py-12">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animation-delay-4000 animate-blob"></div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/">
            <div className="inline-block mb-4">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-primary font-bold text-3xl shadow-lg hover:shadow-xl transition-shadow">
                S
              </div>
            </div>
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">
            Únete a SIGEA
          </h1>
          <p className="text-blue-100">
            Crea tu cuenta y comienza tu viaje de aprendizaje
          </p>
        </div>

        {/* Register Card */}
        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Nombres"
                name="nombre"
                placeholder="Juan"
                value={formData.nombre}
                onChange={handleChange}
                error={errors.nombre}
                required
              />

              <Input
                label="Apellidos"
                name="apellido"
                placeholder="García López"
                value={formData.apellido}
                onChange={handleChange}
                error={errors.apellido}
                required
              />
            </div>

            <Input
              label="Correo Electrónico"
              type="email"
              name="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Teléfono/WhatsApp"
                name="telefono"
                placeholder="987654321"
                value={formData.telefono}
                onChange={handleChange}
                error={errors.telefono}
                helpText="9 dígitos"
                required
              />

              <Input
                label="DNI"
                name="dni"
                placeholder="12345678"
                value={formData.dni}
                onChange={handleChange}
                error={errors.dni}
                helpText="8 dígitos"
                required
              />
            </div>

            <Input
              label="Contraseña"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              helpText="Mínimo 6 caracteres"
              required
            />

            <Input
              label="Confirmar Contraseña"
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
            />

            <label className="flex items-start gap-3 cursor-pointer p-3 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="w-5 h-5 rounded mt-0.5 accent-primary"
              />
              <span className="text-sm text-gray-700">
                Acepto los{" "}
                <a
                  href="/terminos"
                  className="text-primary hover:underline font-medium"
                >
                  Términos y Condiciones
                </a>{" "}
                y la{" "}
                <a
                  href="/privacidad"
                  className="text-primary hover:underline font-medium"
                >
                  Política de Privacidad
                </a>
              </span>
            </label>

            {errors.acceptTerms && (
              <p className="text-sm text-red-600 font-medium">
                {errors.acceptTerms}
              </p>
            )}

            {errors.general && (
              <div className="bg-red-100 border-l-4 border-red-500 p-3 rounded">
                <p className="text-sm text-red-800">{errors.general}</p>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              Crear Cuenta
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-500">O regístrate con</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google Register */}
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full"
            onClick={handleGoogleRegister}
            disabled={isLoading}
          >
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Registrarse con Google
          </Button>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              ¿Ya tienes cuenta?{" "}
              <Link
                href="/login"
                className="text-primary hover:text-primary-light font-bold transition-colors"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

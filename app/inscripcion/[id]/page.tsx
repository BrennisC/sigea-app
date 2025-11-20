"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Link from "next/link";

interface FormData {
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  dni: string;
}

interface FormErrors {
  nombre?: string;
  apellido?: string;
  correo?: string;
  telefono?: string;
  dni?: string;
}

export default function InscripcionPage() {
  const params = useParams();
  const eventId = params.id as string;
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    dni: "",
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

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

    if (!formData.correo.trim()) {
      newErrors.correo = "El correo es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = "Por favor ingresa un correo válido";
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
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

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <main className="w-full min-h-screen">
        <Navbar />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Card className="text-center bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
            <div className="text-6xl mb-6">✅</div>

            <h1 className="text-4xl font-bold text-green-700 mb-4">
              ¡Inscripción Confirmada!
            </h1>

            <p className="text-lg text-green-600 mb-6">
              Gracias por inscribirte en nuestro evento
            </p>

            <div className="bg-white rounded-lg p-6 mb-8 text-left space-y-3 border border-green-200">
              <div>
                <p className="text-sm text-gray-600">Nombre Completo</p>
                <p className="font-semibold text-gray-800">
                  {formData.nombre} {formData.apellido}
                </p>
              </div>

              <div className="border-t pt-3">
                <p className="text-sm text-gray-600">Correo Electrónico</p>
                <p className="font-semibold text-gray-800">{formData.correo}</p>
              </div>

              <div className="border-t pt-3">
                <p className="text-sm text-gray-600">Teléfono/WhatsApp</p>
                <p className="font-semibold text-gray-800">
                  +51 {formData.telefono}
                </p>
              </div>

              <div className="border-t pt-3">
                <p className="text-sm text-gray-600">DNI</p>
                <p className="font-semibold text-gray-800">{formData.dni}</p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-primary p-4 rounded mb-8 text-left">
              <h3 className="font-bold text-primary mb-2">
                📧 ¿Qué sucede ahora?
              </h3>

              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="text-primary font-bold">1.</span>
                  <span>
                    Recibirás un correo de confirmación en{" "}
                    <strong>{formData.correo}</strong>
                  </span>
                </li>

                <li className="flex gap-2">
                  <span className="text-primary font-bold">2.</span>
                  <span>
                    Te enviaremos un mensaje por WhatsApp al{" "}
                    <strong>+51 {formData.telefono}</strong>
                  </span>
                </li>

                <li className="flex gap-2">
                  <span className="text-primary font-bold">3.</span>
                  <span>
                    Podrás acceder a tu panel de participante para ver detalles
                    del evento
                  </span>
                </li>

                <li className="flex gap-2">
                  <span className="text-primary font-bold">4.</span>
                  <span>
                    Después del evento, recibirás tu certificado digital
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mb-8 text-left">
              <h3 className="font-bold text-yellow-700 mb-2">
                📱 Importante
              </h3>

              <p className="text-sm text-yellow-700">
                Asegúrate de revisar tu carpeta de spam/promociones si no
                recibes el correo en los próximos 5 minutos.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/" className="flex-1">
                <Button className="w-full">Ir a Inicio</Button>
              </Link>

              <Link href="/eventos" className="flex-1">
                <Button variant="secondary" className="w-full">
                  Ver Más Eventos
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        <Footer />
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-background-light">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary-light py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/eventos" className="text-blue-100 hover:text-white mb-4 inline-block">
            ← Volver a Eventos
          </Link>

          <h1 className="text-4xl font-bold text-white mb-3">
            Formulario de Inscripción
          </h1>

          <p className="text-blue-100">
            Completa tus datos para confirmar tu participación
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Form */}
          <div className="md:col-span-2">
            <Card>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Nombre(s)"
                    name="nombre"
                    placeholder="Juan"
                    value={formData.nombre}
                    onChange={handleChange}
                    error={errors.nombre}
                    required
                  />

                  <Input
                    label="Apellido(s)"
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
                  name="correo"
                  type="email"
                  placeholder="juan@example.com"
                  value={formData.correo}
                  onChange={handleChange}
                  error={errors.correo}
                  required
                />

                <Input
                  label="Teléfono / WhatsApp"
                  name="telefono"
                  placeholder="987654321"
                  value={formData.telefono}
                  onChange={handleChange}
                  error={errors.telefono}
                  helpText="9 dígitos sin el +51"
                  required
                />

                <Input
                  label="Documento de Identidad (DNI)"
                  name="dni"
                  placeholder="12345678"
                  value={formData.dni}
                  onChange={handleChange}
                  error={errors.dni}
                  helpText="8 dígitos"
                  required
                />

                <div className="bg-blue-50 border-l-4 border-primary p-4 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>📋 Nota importante:</strong> La inscripción se
                    confirmará por correo electrónico o WhatsApp. Asegúrate de
                    que tus datos sean correctos.
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="flex-1"
                    isLoading={isLoading}
                  >
                    Confirmar Inscripción
                  </Button>

                  <Link href={`/eventos/${eventId}`} className="flex-1">
                    <Button
                      type="button"
                      variant="secondary"
                      size="lg"
                      className="w-full"
                    >
                      Cancelar
                    </Button>
                  </Link>
                </div>
              </form>
            </Card>
          </div>

          {/* Info Sidebar */}
          <div className="md:col-span-1 space-y-6">
            <Card>
              <h3 className="text-lg font-bold text-primary mb-4">
                📝 Información
              </h3>

              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <p className="font-semibold text-primary">Campos Requeridos</p>
                  <p>Todos los campos deben ser completados</p>
                </div>

                <div className="border-t pt-3">
                  <p className="font-semibold text-primary">Validación</p>
                  <p>Tus datos serán validados automáticamente</p>
                </div>

                <div className="border-t pt-3">
                  <p className="font-semibold text-primary">Confirmación</p>
                  <p>
                    Recibirás confirmación por correo y WhatsApp en minutos
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-primary-light to-primary text-white">
              <h3 className="font-bold mb-3">✓ Requisitos</h3>

              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Mayor de 18 años</span>
                </li>

                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Documento válido</span>
                </li>

                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Email válido</span>
                </li>

                <li className="flex gap-2">
                  <span>✓</span>
                  <span>WhatsApp activo</span>
                </li>
              </ul>
            </Card>

            <Card>
              <h3 className="font-bold text-primary mb-3">❓ Preguntas</h3>

              <p className="text-sm text-gray-600 mb-4">
                ¿Necesitas ayuda? Contacta con nuestro equipo de soporte
              </p>

              <Button variant="secondary" size="sm" className="w-full">
                Contactar Soporte
              </Button>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

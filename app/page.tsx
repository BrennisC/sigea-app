"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Card from "./components/Card";
import Button from "./components/Button";
import Input from "./components/Input";
import Badge from "./components/Badge";
import Link from "next/link";

export default function Home() {
  const [certificateCode, setCertificateCode] = useState("");
  const [validateResult, setValidateResult] = useState<{
    valid: boolean;
    message: string;
  } | null>(null);

  const handleValidateCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (certificateCode.trim()) {
      const isValid = certificateCode.length === 10;
      setValidateResult({
        valid: isValid,
        message: isValid
          ? "Certificado válido y verificado"
          : "Certificado no encontrado o inválido",
      });
    }
  };

  const featuredEvents = [
    {
      id: 1,
      title: "Conferencia: IA en la Educación",
      date: "15 de Marzo, 2024",
      type: "Conferencia",
      image: "🎓",
      speakers: "Dr. Carlos Mendez",
    },
    {
      id: 2,
      title: "Taller de Desarrollo Web",
      date: "22 de Marzo, 2024",
      type: "Taller",
      image: "💻",
      speakers: "Ing. María García",
    },
    {
      id: 3,
      title: "Diplomado en Agricultura Sostenible",
      date: "30 de Marzo, 2024",
      type: "Diplomado",
      image: "🌱",
      speakers: "Dr. Juan López",
    },
    {
      id: 4,
      title: "Workshop: Transformación Digital",
      date: "10 de Abril, 2024",
      type: "Workshop",
      image: "🚀",
      speakers: "Equipo UNAS",
    },
  ];

  return (
    <main className="w-full">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary-light min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Transforma tu futuro con conocimiento innovador
          </h1>

          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Únete a eventos académicos de excelencia, obtén certificados
            reconocidos y desarrolla tus habilidades profesionales
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/eventos">
              <Button size="lg" className="w-full sm:w-auto">
                Ver Eventos
              </Button>
            </Link>

            <a href="#validador">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Validar Certificado
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                150+
              </div>
              <p className="text-blue-100">Eventos Realizados</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                5,000+
              </div>
              <p className="text-blue-100">Participantes</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                95%
              </div>
              <p className="text-blue-100">Satisfacción</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-primary mb-4 text-center">
            ¿Quiénes Somos?
          </h2>

          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto text-lg">
            SIGEA es la plataforma de gestión de eventos académicos de la
            Universidad Nacional Agraria de la Selva (UNAS)
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-primary mb-3">Misión</h3>
              <p className="text-gray-600">
                Facilitar la formación continua y el desarrollo profesional de
                estudiantes y profesionales a través de eventos académicos de
                calidad.
              </p>
            </Card>

            <Card className="text-center">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-primary mb-3">Visión</h3>
              <p className="text-gray-600">
                Ser la plataforma líder en gestión de eventos académicos,
                reconocida por su innovación y excelencia.
              </p>
            </Card>

            <Card className="text-center">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-xl font-bold text-primary mb-3">Valores</h3>
              <p className="text-gray-600">
                Excelencia, integridad, inclusión y compromiso con la educación
                superior de calidad.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-primary mb-4 text-center">
            Eventos Destacados
          </h2>

          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto text-lg">
            Descubre nuestros próximos eventos y únete a una comunidad de
            aprendizaje
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredEvents.map((event) => (
              <Card key={event.id} hoverable>
                <div className="text-6xl mb-4 text-center">{event.image}</div>

                <h3 className="text-lg font-bold text-primary mb-2">
                  {event.title}
                </h3>

                <p className="text-sm text-gray-600 mb-3">{event.speakers}</p>

                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="primary">{event.type}</Badge>
                </div>

                <p className="text-sm text-gray-500 mb-4">📅 {event.date}</p>

                <Link href={`/eventos/${event.id}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    Más Información
                  </Button>
                </Link>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/eventos">
              <Button size="lg">Ver Todos los Eventos</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Certificate Validator Section */}
      <section
        id="validador"
        className="py-20 bg-gradient-to-br from-primary-light to-primary"
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4 text-center">
            Validador de Certificados
          </h2>

          <p className="text-center text-blue-100 mb-12 text-lg">
            Verifica la autenticidad de tus certificados ingresando el código
          </p>

          <Card className="bg-white">
            <form onSubmit={handleValidateCertificate} className="space-y-6">
              <Input
                label="Código de Certificado"
                placeholder="Ej: CERT-2024-001"
                value={certificateCode}
                onChange={(e) => setCertificateCode(e.target.value)}
                required
              />

              <Button type="submit" size="lg" className="w-full">
                Validar Certificado
              </Button>

              {validateResult && (
                <div
                  className={`p-4 rounded-lg text-center font-medium ${
                    validateResult.valid
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  ✓ {validateResult.message}
                </div>
              )}

              <p className="text-sm text-gray-600 text-center">
                🔒 Tus datos están protegidos y encriptados
              </p>
            </form>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-primary mb-6">
            ¿Listo para comenzar?
          </h2>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Regístrate ahora y accede a todos nuestros eventos, certificados y
            recursos educativos
          </p>

          <Link href="/eventos">
            <Button size="lg" className="mx-auto">
              Explorar Eventos
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

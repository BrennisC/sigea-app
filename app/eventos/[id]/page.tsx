"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Badge from "../../components/Badge";
import Link from "next/link";

interface Speaker {
  name: string;
  title: string;
  bio: string;
  avatar: string;
}

interface EventDetail {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location: string;
  type: "Conferencia" | "Taller" | "Diplomado" | "Workshop";
  capacity: number;
  inscribed: number;
  image: string;
  speakers: Speaker[];
  programUrl: string;
  qrCode: string;
  duration: string;
  modality: "Presencial" | "Virtual" | "Híbrido";
  cost: number;
  requirements: string[];
}

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;
  const [showInscriptionForm, setShowInscriptionForm] = useState(false);

  // Mock event data - in a real app, this would come from an API
  const eventDetails: Record<string, EventDetail> = {
    "1": {
      id: 1,
      title: "Conferencia: IA en la Educación",
      description:
        "Explora cómo la inteligencia artificial está transformando el sector educativo",
      longDescription:
        "Esta conferencia magistral abordará los últimos avances en inteligencia artificial aplicada a la educación. Descubrirás cómo las tecnologías de IA están revolucionando el aprendizaje personalizado, la evaluación automática y la accesibilidad educativa. Incluye casos de estudio reales y sesión de Q&A con expertos.",
      startDate: "15 de Marzo, 2024",
      endDate: "15 de Marzo, 2024",
      startTime: "09:00 AM",
      endTime: "12:00 PM",
      location: "Auditorio Central - UNAS",
      type: "Conferencia",
      capacity: 200,
      inscribed: 156,
      image: "🎓",
      duration: "3 horas",
      modality: "Presencial",
      cost: 50,
      speakers: [
        {
          name: "Dr. Carlos Mendez",
          title: "Experto en IA y Educación",
          bio: "Profesor investigador con 15 años de experiencia en aplicaciones de IA en educación",
          avatar: "👨‍🎓",
        },
        {
          name: "Ing. María García",
          title: "Especialista en Educación Digital",
          bio: "Directora de proyectos educativos digitales en instituciones de renombre",
          avatar: "👩‍💼",
        },
      ],
      programUrl: "/pdf/programa-ia-educacion.pdf",
      qrCode:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23fff' width='200' height='200'/%3E%3Crect fill='%23003366' x='30' y='30' width='140' height='140'/%3E%3C/svg%3E",
      requirements: [
        "Conocimientos básicos de tecnología",
        "Computadora o dispositivo móvil",
        "Conexión a internet",
      ],
    },
    "2": {
      id: 2,
      title: "Taller de Desarrollo Web",
      description:
        "Aprende las mejores prácticas en desarrollo web con tecnologías modernas",
      longDescription:
        "Un taller práctico donde aprenderás a desarrollar aplicaciones web modernas usando React, TypeScript y Tailwind CSS. Incluye ejercicios prácticos, proyectos en equipo y retroalimentación personalizada de expertos.",
      startDate: "22 de Marzo, 2024",
      endDate: "24 de Marzo, 2024",
      startTime: "02:00 PM",
      endTime: "05:00 PM",
      location: "Sala 101 - UNAS",
      type: "Taller",
      capacity: 50,
      inscribed: 48,
      image: "💻",
      duration: "3 días (9 horas totales)",
      modality: "Presencial",
      cost: 100,
      speakers: [
        {
          name: "Ing. Fernando López",
          title: "Desarrollador Senior",
          bio: "Desarrollador web con experiencia en startups y empresas Fortune 500",
          avatar: "👨‍💻",
        },
      ],
      programUrl: "/pdf/programa-desarrollo-web.pdf",
      qrCode:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23fff' width='200' height='200'/%3E%3Crect fill='%23003366' x='30' y='30' width='140' height='140'/%3E%3C/svg%3E",
      requirements: [
        "Conocimientos de HTML/CSS básico",
        "Node.js instalado",
        "Editor de código (VS Code recomendado)",
      ],
    },
  };

  const event = eventDetails[eventId];

  if (!event) {
    return (
      <main className="w-full min-h-screen">
        <Navbar />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Evento no encontrado
          </h1>

          <p className="text-gray-600 mb-8">
            Lo sentimos, el evento que buscas no existe o ha sido eliminado
          </p>

          <Link href="/eventos">
            <Button size="lg">Volver a Eventos</Button>
          </Link>
        </div>

        <Footer />
      </main>
    );
  }

  const inscriptionPercentage = (event.inscribed / event.capacity) * 100;
  const availableSpots = event.capacity - event.inscribed;

  return (
    <main className="w-full min-h-screen">
      <Navbar />

      {/* Header Banner */}
      <section className="bg-gradient-to-r from-primary to-primary-light py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/eventos" className="text-blue-100 hover:text-white mb-4 inline-block">
            ← Volver a Eventos
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            {event.title}
          </h1>

          <div className="flex flex-wrap gap-3">
            <Badge variant="primary" className="bg-white/20 text-white">
              {event.type}
            </Badge>

            <Badge variant="primary" className="bg-white/20 text-white">
              {event.modality}
            </Badge>

            <Badge variant="primary" className="bg-white/20 text-white">
              {event.duration}
            </Badge>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Image */}
            <div className="text-center p-12 bg-background-light rounded-lg">
              <div className="text-9xl">{event.image}</div>
            </div>

            {/* Description */}
            <Card>
              <h2 className="text-2xl font-bold text-primary mb-4">
                Sobre el Evento
              </h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                {event.longDescription}
              </p>

              <h3 className="text-xl font-bold text-primary mb-3">
                ¿Qué aprenderás?
              </h3>

              <ul className="space-y-2 text-gray-700">
                {event.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">✓</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Event Details Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <h3 className="text-lg font-bold text-primary mb-4">
                  📅 Fechas y Horarios
                </h3>

                <div className="space-y-3 text-gray-700">
                  <div>
                    <p className="text-sm text-gray-600">Inicio</p>
                    <p className="font-medium">{event.startDate}</p>
                    <p className="text-sm">{event.startTime}</p>
                  </div>

                  <div className="border-t pt-3">
                    <p className="text-sm text-gray-600">Fin</p>
                    <p className="font-medium">{event.endDate}</p>
                    <p className="text-sm">{event.endTime}</p>
                  </div>

                  <div className="border-t pt-3">
                    <p className="text-sm text-gray-600">Duración Total</p>
                    <p className="font-medium">{event.duration}</p>
                  </div>
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-bold text-primary mb-4">
                  📍 Ubicación
                </h3>

                <div className="space-y-4">
                  <p className="text-gray-700 font-medium">{event.location}</p>

                  <div className="bg-gray-200 h-32 rounded-lg flex items-center justify-center">
                    <p className="text-gray-600">Mapa será mostrado aquí</p>
                  </div>

                  <Button variant="secondary" size="sm" className="w-full">
                    Ver en Google Maps
                  </Button>
                </div>
              </Card>
            </div>

            {/* Speakers */}
            <Card>
              <h2 className="text-2xl font-bold text-primary mb-6">Ponentes</h2>

              <div className="grid md:grid-cols-2 gap-6">
                {event.speakers.map((speaker, idx) => (
                  <div key={idx} className="border-l-4 border-primary pl-4">
                    <div className="text-4xl mb-2">{speaker.avatar}</div>

                    <h3 className="font-bold text-lg text-gray-800">
                      {speaker.name}
                    </h3>

                    <p className="text-sm text-primary font-medium mb-2">
                      {speaker.title}
                    </p>

                    <p className="text-sm text-gray-600">{speaker.bio}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Inscription Card */}
            <Card className="bg-gradient-to-br from-primary to-primary-light text-white">
              <h3 className="text-2xl font-bold mb-4">Inscripción</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-blue-100 text-sm mb-2">Cupos disponibles</p>
                  <p className="text-3xl font-bold">{availableSpots}</p>
                  <p className="text-blue-100 text-xs">
                    de {event.capacity} lugares
                  </p>
                </div>

                <div className="w-full bg-blue-900 rounded-full h-3">
                  <div
                    className="bg-white h-3 rounded-full transition-all duration-300"
                    style={{ width: `${inscriptionPercentage}%` }}
                  ></div>
                </div>

                <div className="border-t border-blue-400 pt-4">
                  <p className="text-blue-100 text-sm mb-1">Precio</p>
                  <p className="text-2xl font-bold">S/.{event.cost}</p>
                </div>

                {availableSpots > 0 ? (
                  <Button
                    size="lg"
                    className="w-full bg-white text-primary hover:bg-gray-100"
                    onClick={() => setShowInscriptionForm(true)}
                  >
                    Inscribirme Ahora
                  </Button>
                ) : (
                  <Button size="lg" className="w-full" disabled>
                    Evento Lleno
                  </Button>
                )}
              </div>
            </Card>

            {/* Program Card */}
            <Card>
              <h3 className="text-lg font-bold text-primary mb-4">
                📄 Programa
              </h3>

              <Button variant="secondary" className="w-full" size="sm">
                Descargar PDF
              </Button>

              <p className="text-xs text-gray-500 mt-2 text-center">
                PDF de 2.4 MB
              </p>
            </Card>

            {/* QR Code Card */}
            <Card>
              <h3 className="text-lg font-bold text-primary mb-4">
                📱 Código QR
              </h3>

              <div className="bg-gray-100 p-4 rounded-lg mb-3 flex justify-center">
                <img
                  src={event.qrCode}
                  alt="QR Code"
                  className="w-32 h-32"
                />
              </div>

              <p className="text-xs text-gray-600 text-center">
                Escanea con tu teléfono para registrar asistencia
              </p>
            </Card>

            {/* Share Card */}
            <Card>
              <h3 className="text-lg font-bold text-primary mb-4">Compartir</h3>

              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm">
                  Facebook
                </Button>

                <Button variant="outline" size="sm">
                  Twitter
                </Button>

                <Button variant="outline" size="sm">
                  WhatsApp
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Inscription Modal/Form */}
      {showInscriptionForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary">Inscripción</h2>

              <button
                onClick={() => setShowInscriptionForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <p className="text-gray-600 mb-4">
              Redirigiendo a la página de inscripción...
            </p>

            <Link href={`/inscripcion/${event.id}`}>
              <Button className="w-full">Continuar con Inscripción</Button>
            </Link>

            <Button
              variant="secondary"
              className="w-full mt-3"
              onClick={() => setShowInscriptionForm(false)}
            >
              Cancelar
            </Button>
          </Card>
        </div>
      )}

      <Footer />
    </main>
  );
}

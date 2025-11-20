"use client";

import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Link from "next/link";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  type: "Conferencia" | "Taller" | "Diplomado" | "Workshop";
  status: "vigente" | "finalizado";
  capacity: number;
  inscribed: number;
  image: string;
  location: string;
}

export default function EventosPage() {
  const [selectedType, setSelectedType] = useState<string>("todos");
  const [selectedStatus, setSelectedStatus] = useState<string>("todos");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const events: Event[] = [
    {
      id: 1,
      title: "Conferencia: IA en la Educación",
      description:
        "Explora cómo la inteligencia artificial está transformando el sector educativo",
      date: "15 de Marzo, 2024",
      type: "Conferencia",
      status: "vigente",
      capacity: 200,
      inscribed: 156,
      image: "🎓",
      location: "Auditorio Central",
    },
    {
      id: 2,
      title: "Taller de Desarrollo Web",
      description:
        "Aprende las mejores prácticas en desarrollo web con tecnologías modernas",
      date: "22 de Marzo, 2024",
      type: "Taller",
      status: "vigente",
      capacity: 50,
      inscribed: 48,
      image: "💻",
      location: "Sala 101",
    },
    {
      id: 3,
      title: "Diplomado en Agricultura Sostenible",
      description:
        "Programa completo para dominar técnicas de agricultura sostenible",
      date: "30 de Marzo, 2024",
      type: "Diplomado",
      status: "vigente",
      capacity: 100,
      inscribed: 87,
      image: "🌱",
      location: "Centro de Capacitación",
    },
    {
      id: 4,
      title: "Workshop: Transformación Digital",
      description:
        "Descubre estrategias para transformar digitalmente tu organización",
      date: "10 de Abril, 2024",
      type: "Workshop",
      status: "vigente",
      capacity: 80,
      inscribed: 72,
      image: "🚀",
      location: "Sala 201",
    },
    {
      id: 5,
      title: "Conferencia: Investigación Científica",
      description: "Tendencias actuales en investigación científica en UNAS",
      date: "5 de Febrero, 2024",
      type: "Conferencia",
      status: "finalizado",
      capacity: 150,
      inscribed: 150,
      image: "🔬",
      location: "Auditorio Central",
    },
    {
      id: 6,
      title: "Taller de Fotografía Digital",
      description:
        "Domina las técnicas de fotografía digital y edición de imágenes",
      date: "12 de Febrero, 2024",
      type: "Taller",
      status: "finalizado",
      capacity: 40,
      inscribed: 40,
      image: "📸",
      location: "Sala 102",
    },
    {
      id: 7,
      title: "Workshop: Marketing Digital",
      description: "Estrategias efectivas de marketing para tu negocio",
      date: "20 de Abril, 2024",
      type: "Workshop",
      status: "vigente",
      capacity: 60,
      inscribed: 55,
      image: "📱",
      location: "Sala 202",
    },
    {
      id: 8,
      title: "Taller: Python para Data Science",
      description:
        "Aprende Python y librerías especializadas para análisis de datos",
      date: "25 de Abril, 2024",
      type: "Taller",
      status: "vigente",
      capacity: 45,
      inscribed: 42,
      image: "🐍",
      location: "Laboratorio 1",
    },
    {
      id: 9,
      title: "Diplomado: Gestión Ambiental",
      description: "Certificación en gestión ambiental empresarial",
      date: "1 de Mayo, 2024",
      type: "Diplomado",
      status: "vigente",
      capacity: 120,
      inscribed: 95,
      image: "🌍",
      location: "Centro de Capacitación",
    },
    {
      id: 10,
      title: "Conferencia: Sostenibilidad Agrícola",
      description: "Perspectivas sobre agricultura sostenible en el Perú",
      date: "28 de Febrero, 2024",
      type: "Conferencia",
      status: "finalizado",
      capacity: 180,
      inscribed: 180,
      image: "🌾",
      location: "Auditorio Central",
    },
    {
      id: 11,
      title: "Workshop: Liderazgo Organizacional",
      description:
        "Desarrolla habilidades de liderazgo para equipos modernos",
      date: "15 de Mayo, 2024",
      type: "Workshop",
      status: "vigente",
      capacity: 70,
      inscribed: 60,
      image: "👥",
      location: "Sala 301",
    },
    {
      id: 12,
      title: "Taller: Diseño Gráfico Profesional",
      description: "Aprende diseño gráfico con herramientas profesionales",
      date: "22 de Mayo, 2024",
      type: "Taller",
      status: "vigente",
      capacity: 35,
      inscribed: 28,
      image: "🎨",
      location: "Sala 103",
    },
  ];

  // Filter events
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const typeMatch =
        selectedType === "todos" || event.type === selectedType;
      const statusMatch =
        selectedStatus === "todos" || event.status === selectedStatus;
      return typeMatch && statusMatch;
    });
  }, [selectedType, selectedStatus]);

  // Paginate
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const statusColor = {
    vigente: "primary",
    finalizado: "gray",
  } as const;

  return (
    <main className="w-full min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary-light py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Eventos Disponibles
          </h1>

          <p className="text-blue-100 text-lg">
            Descubre nuestros eventos y eventos académicos de calidad
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Type Filter */}
          <div>
            <label className="block text-sm font-bold text-primary mb-3">
              Tipo de Evento
            </label>

            <div className="space-y-2">
              {["todos", "Conferencia", "Taller", "Diplomado", "Workshop"].map(
                (type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                  >
                    <input
                      type="radio"
                      name="type"
                      value={type}
                      checked={selectedType === type}
                      onChange={(e) => {
                        setSelectedType(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-4 h-4 cursor-pointer accent-primary"
                    />
                    <span className="text-gray-700 capitalize">
                      {type === "todos" ? "Todos" : type}
                    </span>
                  </label>
                )
              )}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-bold text-primary mb-3">
              Estado
            </label>

            <div className="space-y-2">
              {[
                { value: "todos", label: "Todos" },
                { value: "vigente", label: "Vigentes" },
                { value: "finalizado", label: "Finalizados" },
              ].map((status) => (
                <label
                  key={status.value}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input
                    type="radio"
                    name="status"
                    value={status.value}
                    checked={selectedStatus === status.value}
                    onChange={(e) => {
                      setSelectedStatus(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-4 h-4 cursor-pointer accent-primary"
                  />
                  <span className="text-gray-700">{status.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Results info */}
          <div className="flex items-end">
            <div>
              <p className="text-sm text-gray-600 mb-2">
                Mostrando <span className="font-bold">{paginatedEvents.length}</span> de{" "}
                <span className="font-bold">{filteredEvents.length}</span> eventos
              </p>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSelectedType("todos");
                  setSelectedStatus("todos");
                  setCurrentPage(1);
                }}
                className="w-full"
              >
                Limpiar Filtros
              </Button>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {paginatedEvents.length > 0 ? (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {paginatedEvents.map((event) => (
                <Card key={event.id} hoverable>
                  <div className="text-5xl mb-4 text-center">{event.image}</div>

                  <div className="flex items-center justify-between mb-3">
                    <Badge
                      variant={
                        event.status === "vigente" ? "primary" : "gray"
                      }
                    >
                      {event.status === "vigente" ? "Vigente" : "Finalizado"}
                    </Badge>

                    <Badge variant="primary">{event.type}</Badge>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {event.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="space-y-2 text-sm text-gray-600 mb-4 border-t pt-4">
                    <p>📅 {event.date}</p>
                    <p>📍 {event.location}</p>
                    <p>
                      👥{" "}
                      <span className="font-medium">
                        {event.inscribed}/{event.capacity}
                      </span>{" "}
                      inscritos
                    </p>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(event.inscribed / event.capacity) * 100}%`,
                      }}
                    ></div>
                  </div>

                  <Link href={`/eventos/${event.id}`}>
                    <Button className="w-full">
                      Ver Detalles
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  ← Anterior
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "primary" : "outline"}
                      onClick={() => handlePageChange(page)}
                      className="w-10 h-10 p-0"
                    >
                      {page}
                    </Button>
                  )
                )}

                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Siguiente →
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">
              No se encontraron eventos con los filtros seleccionados
            </p>

            <Button
              variant="secondary"
              onClick={() => {
                setSelectedType("todos");
                setSelectedStatus("todos");
                setCurrentPage(1);
              }}
            >
              Ver Todos los Eventos
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}

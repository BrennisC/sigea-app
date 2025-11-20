"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Badge from "../../components/Badge";
import Link from "next/link";

interface CertificateRecord {
  id: number;
  participantName: string;
  event: string;
  status: "emitido" | "pendiente" | "rechazado";
  issueDate: string;
  code: string;
  sentVia: string;
}

export default function AdminCertificatesPage() {
  const [certificates, setCertificates] = useState<CertificateRecord[]>([
    {
      id: 1,
      participantName: "Juan García López",
      event: "Conferencia: IA en la Educación",
      status: "emitido",
      issueDate: "16 de Marzo, 2024",
      code: "CERT-2024-001",
      sentVia: "Email + WhatsApp",
    },
    {
      id: 2,
      participantName: "María Rodriguez",
      event: "Taller de Desarrollo Web",
      status: "pendiente",
      issueDate: "-",
      code: "-",
      sentVia: "-",
    },
    {
      id: 3,
      participantName: "Carlos López",
      event: "Diplomado en Agricultura Sostenible",
      status: "emitido",
      issueDate: "20 de Abril, 2024",
      code: "CERT-2024-003",
      sentVia: "Email",
    },
    {
      id: 4,
      participantName: "Ana Fernández",
      event: "Workshop: Transformación Digital",
      status: "rechazado",
      issueDate: "22 de Abril, 2024",
      code: "CERT-2024-004",
      sentVia: "-",
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState("todos");
  const [selectedStatus, setSelectedStatus] = useState("todos");

  const events = [
    "todos",
    "Conferencia: IA en la Educación",
    "Taller de Desarrollo Web",
    "Diplomado en Agricultura Sostenible",
    "Workshop: Transformación Digital",
  ];

  const filteredCertificates = certificates.filter((c) => {
    const eventMatch = selectedEvent === "todos" || c.event === selectedEvent;
    const statusMatch = selectedStatus === "todos" || c.status === selectedStatus;
    return eventMatch && statusMatch;
  });

  const stats = {
    total: certificates.length,
    emitidos: certificates.filter((c) => c.status === "emitido").length,
    pendientes: certificates.filter((c) => c.status === "pendiente").length,
  };

  return (
    <main className="w-full min-h-screen bg-background-light">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary-light py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/admin/dashboard" className="text-blue-100 hover:text-white mb-2 inline-block">
            ← Volver al Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-white">Módulo de Certificados</h1>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <p className="text-blue-100 text-sm">Total de Certificados</p>
            <p className="text-3xl font-bold">{stats.total}</p>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <p className="text-green-100 text-sm">Emitidos</p>
            <p className="text-3xl font-bold">{stats.emitidos}</p>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
            <p className="text-yellow-100 text-sm">Pendientes</p>
            <p className="text-3xl font-bold">{stats.pendientes}</p>
          </Card>
        </div>

        {/* Actions */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Acciones Rápidas
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            <Button className="w-full">Generar Certificados</Button>
            <Button variant="secondary" className="w-full">
              Enviar por Email
            </Button>
            <Button variant="secondary" className="w-full">
              Enviar por WhatsApp
            </Button>
          </div>
        </Card>

        {/* Filters */}
        <Card className="mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-bold text-primary mb-2 block">
                Filtrar por Evento
              </label>
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary"
              >
                {events.map((event) => (
                  <option key={event} value={event}>
                    {event === "todos" ? "Todos" : event}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-bold text-primary mb-2 block">
                Filtrar por Estado
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary"
              >
                <option value="todos">Todos</option>
                <option value="emitido">Emitidos</option>
                <option value="pendiente">Pendientes</option>
                <option value="rechazado">Rechazados</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Certificates List */}
        <Card>
          <h2 className="text-2xl font-bold text-primary mb-6">
            Listado de Certificados
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-bold text-gray-800">
                    Participante
                  </th>
                  <th className="text-left py-3 px-4 font-bold text-gray-800">
                    Evento
                  </th>
                  <th className="text-center py-3 px-4 font-bold text-gray-800">
                    Estado
                  </th>
                  <th className="text-center py-3 px-4 font-bold text-gray-800">
                    Código
                  </th>
                  <th className="text-left py-3 px-4 font-bold text-gray-800">
                    Enviado Via
                  </th>
                  <th className="text-left py-3 px-4 font-bold text-gray-800">
                    Fecha de Emisión
                  </th>
                  <th className="text-center py-3 px-4 font-bold text-gray-800">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCertificates.map((cert) => (
                  <tr
                    key={cert.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {cert.participantName}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{cert.event}</td>
                    <td className="py-3 px-4 text-center">
                      <Badge
                        variant={
                          cert.status === "emitido"
                            ? "success"
                            : cert.status === "pendiente"
                            ? "warning"
                            : "error"
                        }
                      >
                        {cert.status === "emitido"
                          ? "Emitido"
                          : cert.status === "pendiente"
                          ? "Pendiente"
                          : "Rechazado"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-center font-mono text-sm">
                      {cert.code}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {cert.sentVia}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {cert.issueDate}
                    </td>
                    <td className="py-3 px-4 text-center space-x-2">
                      {cert.status === "emitido" && (
                        <>
                          <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                            ✓
                          </button>
                          <button className="text-green-600 hover:text-green-800 font-medium text-sm">
                            📧
                          </button>
                          <button className="text-green-600 hover:text-green-800 font-medium text-sm">
                            💬
                          </button>
                        </>
                      )}
                      {cert.status === "pendiente" && (
                        <Button variant="secondary" size="sm">
                          Generar
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <Footer />
    </main>
  );
}

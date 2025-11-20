"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Badge from "../../components/Badge";
import Link from "next/link";

interface Attendee {
  id: number;
  name: string;
  dni: string;
  event: string;
  session: string;
  attended: boolean;
}

export default function AdminAttendancePage() {
  const [attendees, setAttendees] = useState<Attendee[]>([
    {
      id: 1,
      name: "Juan García López",
      dni: "12345678",
      event: "Conferencia: IA en la Educación",
      session: "Sesión 1",
      attended: true,
    },
    {
      id: 2,
      name: "María Rodriguez",
      dni: "87654321",
      event: "Conferencia: IA en la Educación",
      session: "Sesión 1",
      attended: true,
    },
    {
      id: 3,
      name: "Carlos López",
      dni: "45678912",
      event: "Taller de Desarrollo Web",
      session: "Día 1",
      attended: true,
    },
    {
      id: 4,
      name: "Ana Fernández",
      dni: "98765432",
      event: "Taller de Desarrollo Web",
      session: "Día 1",
      attended: false,
    },
    {
      id: 5,
      name: "Pedro Sánchez",
      dni: "11223344",
      event: "Diplomado en Agricultura Sostenible",
      session: "Semana 1",
      attended: true,
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState("todos");
  const [qrCode, setQrCode] = useState("");

  const events = [
    "todos",
    "Conferencia: IA en la Educación",
    "Taller de Desarrollo Web",
    "Diplomado en Agricultura Sostenible",
  ];

  const filteredAttendees =
    selectedEvent === "todos"
      ? attendees
      : attendees.filter((a) => a.event === selectedEvent);

  const toggleAttendance = (id: number) => {
    setAttendees(
      attendees.map((a) => (a.id === id ? { ...a, attended: !a.attended } : a))
    );
  };

  const attendancePercentage =
    attendees.length > 0
      ? Math.round(
          (attendees.filter((a) => a.attended).length / attendees.length) * 100
        )
      : 0;

  const handleQRScan = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate QR scan processing
    if (qrCode.trim()) {
      alert(`QR escaneado: ${qrCode}`);
      setQrCode("");
    }
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
          <h1 className="text-4xl font-bold text-white">Módulo de Asistencia</h1>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <p className="text-green-100 text-sm">Total Asistentes</p>
            <p className="text-3xl font-bold">{attendees.length}</p>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <p className="text-blue-100 text-sm">Registrados</p>
            <p className="text-3xl font-bold">
              {attendees.filter((a) => a.attended).length}
            </p>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <p className="text-purple-100 text-sm">Tasa Asistencia</p>
            <p className="text-3xl font-bold">{attendancePercentage}%</p>
          </Card>
        </div>

        {/* QR Scanner */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Escáner de Código QR
          </h2>

          <form onSubmit={handleQRScan} className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                value={qrCode}
                onChange={(e) => setQrCode(e.target.value)}
                placeholder="Escanea un código QR aquí..."
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                autoFocus
              />
              <Button type="submit" size="lg">
                Procesar
              </Button>
            </div>
            <p className="text-sm text-gray-600">
              🔍 El código se procesará automáticamente al escanear
            </p>
          </form>
        </Card>

        {/* Attendance List */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-primary">
              Registro de Asistencia
            </h2>

            <div>
              <label className="text-sm text-gray-600 mr-3">Evento:</label>
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary"
              >
                {events.map((event) => (
                  <option key={event} value={event}>
                    {event === "todos" ? "Todos" : event}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-bold text-gray-800">
                    Participante
                  </th>
                  <th className="text-left py-3 px-4 font-bold text-gray-800">
                    DNI
                  </th>
                  <th className="text-left py-3 px-4 font-bold text-gray-800">
                    Evento
                  </th>
                  <th className="text-left py-3 px-4 font-bold text-gray-800">
                    Sesión
                  </th>
                  <th className="text-center py-3 px-4 font-bold text-gray-800">
                    Asistencia
                  </th>
                  <th className="text-center py-3 px-4 font-bold text-gray-800">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendees.map((attendee) => (
                  <tr
                    key={attendee.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {attendee.name}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{attendee.dni}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {attendee.event}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {attendee.session}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge
                        variant={attendee.attended ? "success" : "warning"}
                      >
                        {attendee.attended ? "Presente" : "Ausente"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => toggleAttendance(attendee.id)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                          attendee.attended
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                        }`}
                      >
                        {attendee.attended ? "Marcar Ausente" : "Marcar Presente"}
                      </button>
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

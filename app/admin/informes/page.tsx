"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Badge from "../../components/Badge";
import Link from "next/link";

interface Report {
  id: number;
  event: string;
  type: "inicial" | "final";
  uploadDate: string;
  uploadedBy: string;
  fileName: string;
  status: "revisado" | "pendiente" | "rechazado";
  images: number;
  attendees: number;
}

export default function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>([
    {
      id: 1,
      event: "Conferencia: IA en la Educación",
      type: "inicial",
      uploadDate: "15 de Marzo, 2024",
      uploadedBy: "Dr. Carlos Mendez",
      fileName: "informe_ia_inicial.pdf",
      status: "revisado",
      images: 12,
      attendees: 156,
    },
    {
      id: 2,
      event: "Conferencia: IA en la Educación",
      type: "final",
      uploadDate: "16 de Marzo, 2024",
      uploadedBy: "Dr. Carlos Mendez",
      fileName: "informe_ia_final.pdf",
      status: "revisado",
      images: 25,
      attendees: 154,
    },
    {
      id: 3,
      event: "Taller de Desarrollo Web",
      type: "inicial",
      uploadDate: "22 de Marzo, 2024",
      uploadedBy: "Ing. Fernando López",
      fileName: "informe_web_inicial.pdf",
      status: "pendiente",
      images: 0,
      attendees: 0,
    },
  ]);

  const [showUploadForm, setShowUploadForm] = useState(false);
  const [newReport, setNewReport] = useState({
    event: "",
    type: "inicial" as const,
    file: null as File | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewReport({ ...newReport, file });
    }
  };

  const handleUploadReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReport.event && newReport.file) {
      setReports([
        ...reports,
        {
          id: Math.max(...reports.map((r) => r.id)) + 1,
          event: newReport.event,
          type: newReport.type,
          uploadDate: new Date().toLocaleDateString("es-PE"),
          uploadedBy: "Usuario Actual",
          fileName: newReport.file.name,
          status: "pendiente",
          images: 0,
          attendees: 0,
        },
      ]);
      setNewReport({
        event: "",
        type: "inicial",
        file: null,
      });
      setShowUploadForm(false);
    }
  };

  const events = [
    "Conferencia: IA en la Educación",
    "Taller de Desarrollo Web",
    "Diplomado en Agricultura Sostenible",
    "Workshop: Transformación Digital",
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "revisado":
        return "success";
      case "pendiente":
        return "warning";
      case "rechazado":
        return "error";
      default:
        return "gray" as const;
    }
  };

  return (
    <main className="w-full min-h-screen bg-background-light">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary-light py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/admin/dashboard" className="text-blue-100 hover:text-white mb-2 inline-block">
                ← Volver al Dashboard
              </Link>
              <h1 className="text-4xl font-bold text-white">
                Módulo de Informes
              </h1>
            </div>

            <Button
              size="lg"
              onClick={() => setShowUploadForm(!showUploadForm)}
            >
              {showUploadForm
                ? "Cancelar"
                : "+ Subir Informe"}
            </Button>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Upload Form */}
        {showUploadForm && (
          <Card className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-6">
              Subir Nuevo Informe
            </h2>

            <form onSubmit={handleUploadReport} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-primary mb-2">
                    Evento
                  </label>
                  <select
                    value={newReport.event}
                    onChange={(e) =>
                      setNewReport({
                        ...newReport,
                        event: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                    required
                  >
                    <option value="">Selecciona un evento</option>
                    {events.map((event) => (
                      <option key={event} value={event}>
                        {event}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-primary mb-2">
                    Tipo de Informe
                  </label>
                  <select
                    value={newReport.type}
                    onChange={(e) =>
                      setNewReport({
                        ...newReport,
                        type: e.target.value as any,
                      })
                    }
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                  >
                    <option value="inicial">Inicial</option>
                    <option value="final">Final</option>
                  </select>
                </div>
              </div>

              {/* File Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
                onClick={() =>
                  document.querySelector('input[type="file"]')?.click()
                }
              >
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                />

                <div className="text-4xl mb-3">📄</div>
                <p className="font-bold text-gray-800 mb-1">
                  Arrastra tu archivo aquí o haz clic
                </p>
                <p className="text-sm text-gray-600">
                  Formatos soportados: PDF, DOC, DOCX
                </p>

                {newReport.file && (
                  <p className="mt-3 text-sm font-medium text-primary">
                    ✓ {newReport.file.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-primary mb-2">
                  Imágenes del Evento (Opcional)
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="w-full"
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  Subir Informe
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowUploadForm(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Reports List */}
        <Card>
          <h2 className="text-2xl font-bold text-primary mb-6">
            Informes Registrados
          </h2>

          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-gray-800">
                        {report.event}
                      </h3>
                      <Badge
                        variant={
                          report.type === "inicial" ? "primary" : "success"
                        }
                      >
                        {report.type === "inicial" ? "Inicial" : "Final"}
                      </Badge>
                      <Badge variant={getStatusColor(report.status)}>
                        {report.status === "revisado"
                          ? "✓ Revisado"
                          : report.status === "pendiente"
                          ? "⏳ Pendiente"
                          : "✗ Rechazado"}
                      </Badge>
                    </div>

                    <p className="text-gray-600 text-sm mb-3">
                      📄 {report.fileName}
                    </p>

                    <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <p className="font-medium">Subido por</p>
                        <p>{report.uploadedBy}</p>
                      </div>
                      <div>
                        <p className="font-medium">Fecha de Carga</p>
                        <p>{report.uploadDate}</p>
                      </div>
                      <div>
                        <p className="font-medium">Imágenes/Asistentes</p>
                        <p>
                          {report.images} imágenes • {report.attendees} asistentes
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm">
                      Ver
                    </Button>
                    <Button size="sm">Descargar</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Report Templates */}
        <Card className="mt-8">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Plantillas de Informe
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6">
              <h3 className="font-bold text-lg text-gray-800 mb-3">
                📋 Informe Inicial
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Documento que describe la planificación y preparación del evento
              </p>
              <Button variant="secondary" className="w-full" size="sm">
                Descargar Plantilla
              </Button>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="font-bold text-lg text-gray-800 mb-3">
                📊 Informe Final
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Reporte completo con resultados, asistencia y evaluaciones
              </p>
              <Button variant="secondary" className="w-full" size="sm">
                Descargar Plantilla
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <Footer />
    </main>
  );
}

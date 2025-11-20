"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Badge from "../../components/Badge";
import Link from "next/link";

interface Activity {
  id: number;
  title: string;
  type: string;
  startDate: string;
  endDate: string;
  responsible: string;
  capacity: number;
  inscribed: number;
  status: "plazo_registro" | "en_ejecución" | "finalizado";
}

export default function AdminActivityPage() {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 1,
      title: "Conferencia: IA en la Educación",
      type: "Conferencia",
      startDate: "15 de Marzo, 2024",
      endDate: "15 de Marzo, 2024",
      responsible: "Dr. Carlos Mendez",
      capacity: 200,
      inscribed: 156,
      status: "en_ejecución",
    },
    {
      id: 2,
      title: "Taller de Desarrollo Web",
      type: "Taller",
      startDate: "22 de Marzo, 2024",
      endDate: "24 de Marzo, 2024",
      responsible: "Ing. Fernando López",
      capacity: 50,
      inscribed: 48,
      status: "plazo_registro",
    },
    {
      id: 3,
      title: "Diplomado en Agricultura Sostenible",
      type: "Diplomado",
      startDate: "30 de Marzo, 2024",
      endDate: "15 de Abril, 2024",
      responsible: "Dr. Juan López",
      capacity: 100,
      inscribed: 87,
      status: "plazo_registro",
    },
  ]);

  const [showNewActivityForm, setShowNewActivityForm] = useState(false);
  const [newActivity, setNewActivity] = useState({
    title: "",
    type: "Conferencia",
    startDate: "",
    endDate: "",
    responsible: "",
    capacity: 0,
  });

  const handleCreateActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (newActivity.title && newActivity.responsible) {
      setActivities([
        ...activities,
        {
          id: Math.max(...activities.map((a) => a.id)) + 1,
          ...newActivity,
          inscribed: 0,
          status: "plazo_registro" as const,
        },
      ]);
      setNewActivity({
        title: "",
        type: "Conferencia",
        startDate: "",
        endDate: "",
        responsible: "",
        capacity: 0,
      });
      setShowNewActivityForm(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "plazo_registro":
        return "primary";
      case "en_ejecución":
        return "warning";
      case "finalizado":
        return "gray";
      default:
        return "primary";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "plazo_registro":
        return "Plazo de Registro";
      case "en_ejecución":
        return "En Ejecución";
      case "finalizado":
        return "Finalizado";
      default:
        return status;
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
                Módulo de Actividades/Eventos
              </h1>
            </div>

            <Button
              size="lg"
              onClick={() => setShowNewActivityForm(!showNewActivityForm)}
            >
              {showNewActivityForm ? "Cancelar" : "+ Nueva Actividad"}
            </Button>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* New Activity Form */}
        {showNewActivityForm && (
          <Card className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-6">
              Crear Nueva Actividad
            </h2>

            <form onSubmit={handleCreateActivity} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Título"
                  value={newActivity.title}
                  onChange={(e) =>
                    setNewActivity({ ...newActivity, title: e.target.value })
                  }
                  required
                />

                <div>
                  <label className="block text-sm font-bold text-primary mb-2">
                    Tipo
                  </label>
                  <select
                    value={newActivity.type}
                    onChange={(e) =>
                      setNewActivity({ ...newActivity, type: e.target.value })
                    }
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                  >
                    <option>Conferencia</option>
                    <option>Taller</option>
                    <option>Diplomado</option>
                    <option>Workshop</option>
                  </select>
                </div>

                <Input
                  label="Fecha de Inicio"
                  type="date"
                  value={newActivity.startDate}
                  onChange={(e) =>
                    setNewActivity({
                      ...newActivity,
                      startDate: e.target.value,
                    })
                  }
                  required
                />

                <Input
                  label="Fecha de Fin"
                  type="date"
                  value={newActivity.endDate}
                  onChange={(e) =>
                    setNewActivity({ ...newActivity, endDate: e.target.value })
                  }
                  required
                />

                <Input
                  label="Responsable"
                  value={newActivity.responsible}
                  onChange={(e) =>
                    setNewActivity({
                      ...newActivity,
                      responsible: e.target.value,
                    })
                  }
                  required
                />

                <Input
                  label="Capacidad"
                  type="number"
                  value={newActivity.capacity || ""}
                  onChange={(e) =>
                    setNewActivity({
                      ...newActivity,
                      capacity: parseInt(e.target.value) || 0,
                    })
                  }
                  required
                />
              </div>

              <div className="bg-blue-50 border-l-4 border-primary p-4 rounded">
                <p className="text-sm text-gray-700">
                  Se requiere programa en PDF para activar la inscripción
                </p>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  Crear Actividad
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowNewActivityForm(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Activities List */}
        <Card>
          <h2 className="text-2xl font-bold text-primary mb-6">
            Actividades Registradas
          </h2>

          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-800">
                        {activity.title}
                      </h3>
                      <Badge variant={getStatusColor(activity.status)}>
                        {getStatusLabel(activity.status)}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <p className="font-medium text-gray-800">
                          {activity.type}
                        </p>
                        <p>📍 Responsable: {activity.responsible}</p>
                      </div>

                      <div>
                        <p>📅 {activity.startDate} al {activity.endDate}</p>
                        <p>
                          👥{" "}
                          <span className="font-medium">
                            {activity.inscribed}/{activity.capacity}
                          </span>{" "}
                          inscritos
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{
                          width: `${(activity.inscribed / activity.capacity) *
                            100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm">
                      Editar
                    </Button>
                    <Button variant="secondary" size="sm">
                      Ver Detalles
                    </Button>
                    <Button size="sm">Inscritos</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Activity Details Template */}
        <Card className="mt-8">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Panel de Actividad
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Programa (PDF)</p>
                <Button variant="secondary" size="sm" className="w-full">
                  📄 Cargar Programa
                </Button>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Ponentes Asignados</p>
                <Button variant="secondary" size="sm" className="w-full">
                  + Agregar Ponentes
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  Acciones Rápidas
                </p>
                <div className="space-y-2">
                  <Button variant="secondary" size="sm" className="w-full">
                    Ver Inscritos
                  </Button>
                  <Button variant="secondary" size="sm" className="w-full">
                    Generar QR
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Footer />
    </main>
  );
}

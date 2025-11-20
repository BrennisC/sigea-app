"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Link from "next/link";

interface ChartDataPoint {
  date: string;
  value: number;
}

interface NotificationItem {
  id: number;
  title: string;
  description: string;
  timestamp: string;
  type: "success" | "warning" | "info";
}

const SimpleBarChart: React.FC<{ data: ChartDataPoint[] }> = ({ data }) => {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="flex items-end gap-3 h-48 justify-center">
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center flex-1">
          <div className="w-full bg-gradient-to-t from-primary to-primary-light rounded-t-lg transition-all hover:opacity-80"
            style={{ height: `${(d.value / maxValue) * 120}px` }}
          ></div>
          <p className="text-xs text-gray-600 mt-2 text-center">{d.date}</p>
        </div>
      ))}
    </div>
  );
};

const SimpleLineChart: React.FC<{ data: ChartDataPoint[] }> = ({ data }) => {
  const maxValue = Math.max(...data.map((d) => d.value));
  const normalized = data.map((d) => (d.value / maxValue) * 100);

  const points = normalized
    .map((y, i) => `${(i / (normalized.length - 1)) * 200},${100 - y}`)
    .join(" ");

  return (
    <svg className="w-full h-48" viewBox="0 0 200 100" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke="#003366"
        strokeWidth="2"
      />
      <polyline
        points={points}
        fill="url(#gradient)"
        opacity="0.1"
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#003366", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#003366", stopOpacity: 0 }} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default function AdminDashboard() {
  const [selectedDateRange, setSelectedDateRange] = useState("week");

  const adminModules = [
    {
      id: "actividades",
      name: "Actividades/Eventos",
      description: "Crear y gestionar eventos",
      icon: "📅",
      href: "/admin/actividades",
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: "pagos",
      name: "Pagos",
      description: "Registrar y validar pagos",
      icon: "💳",
      href: "/admin/pagos",
      color: "bg-green-100 text-green-700",
    },
    {
      id: "asistencia",
      name: "Asistencia",
      description: "Registrar asistencia",
      icon: "✓",
      href: "/admin/asistencia",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      id: "certificados",
      name: "Certificados",
      description: "Generar certificados",
      icon: "🎓",
      href: "/admin/certificados",
      color: "bg-purple-100 text-purple-700",
    },
    {
      id: "notificaciones",
      name: "Notificaciones",
      description: "Enviar mensajes",
      icon: "📬",
      href: "/admin/notificaciones",
      color: "bg-red-100 text-red-700",
    },
    {
      id: "informes",
      name: "Informes",
      description: "Subir reportes",
      icon: "📊",
      href: "/admin/informes",
      color: "bg-indigo-100 text-indigo-700",
    },
  ];

  const chartDataInscriptions: ChartDataPoint[] = [
    { date: "Lun", value: 45 },
    { date: "Mar", value: 62 },
    { date: "Mié", value: 58 },
    { date: "Jue", value: 73 },
    { date: "Vie", value: 85 },
    { date: "Sáb", value: 70 },
    { date: "Dom", value: 51 },
  ];

  const chartDataPayments: ChartDataPoint[] = [
    { date: "Lun", value: 2000 },
    { date: "Mar", value: 3500 },
    { date: "Mié", value: 2800 },
    { date: "Jue", value: 4200 },
    { date: "Vie", value: 5000 },
    { date: "Sáb", value: 3800 },
    { date: "Dom", value: 2500 },
  ];

  const notifications: NotificationItem[] = [
    {
      id: 1,
      title: "Nueva inscripción",
      description: "50 nuevas inscripciones en el evento de IA",
      timestamp: "Hace 2 horas",
      type: "info",
    },
    {
      id: 2,
      title: "Pago completado",
      description: "S/.5,000 en pagos procesados hoy",
      timestamp: "Hace 4 horas",
      type: "success",
    },
    {
      id: 3,
      title: "Certificado emitido",
      description: "Certificados de Diplomado emitidos",
      timestamp: "Hace 6 horas",
      type: "success",
    },
    {
      id: 4,
      title: "Advertencia",
      description: "Evento sin ponentes asignados",
      timestamp: "Hace 8 horas",
      type: "warning",
    },
  ];

  const widgets = [
    {
      title: "Eventos Activos",
      value: 12,
      subtitle: "En ejecución",
      icon: "📅",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Inscripciones del Día",
      value: 247,
      subtitle: "Nuevos participantes",
      icon: "👥",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Pagos Registrados",
      value: "S/.28,750",
      subtitle: "Hoy",
      icon: "💰",
      color: "from-yellow-500 to-yellow-600",
    },
    {
      title: "Certificados Generados",
      value: 856,
      subtitle: "Este mes",
      icon: "🎓",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Notificaciones Enviadas",
      value: 3245,
      subtitle: "Esta semana",
      icon: "📬",
      color: "from-pink-500 to-pink-600",
    },
    {
      title: "Tasa de Satisfacción",
      value: "95%",
      subtitle: "Promedio",
      icon: "⭐",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <main className="w-full min-h-screen bg-background-light">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary-light py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-2">Panel Administrativo</h1>
          <p className="text-blue-100">
            Bienvenido al centro de control de SIGEA
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Widgets Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {widgets.map((widget, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${widget.color} rounded-lg p-6 text-white shadow-lg`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{widget.icon}</div>
              </div>

              <h3 className="text-blue-100 text-sm font-medium">{widget.title}</h3>
              <p className="text-3xl font-bold mt-2">{widget.value}</p>
              <p className="text-blue-100 text-sm mt-1">{widget.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {/* Inscriptions Chart */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-primary">
                Inscritos por Día
              </h2>
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary"
              >
                <option value="week">Esta Semana</option>
                <option value="month">Este Mes</option>
                <option value="year">Este Año</option>
              </select>
            </div>

            <SimpleBarChart data={chartDataInscriptions} />

            <div className="mt-4 pt-4 border-t text-sm text-gray-600">
              <p>
                <strong>Total:</strong> 444 inscritos esta semana
              </p>
            </div>
          </Card>

          {/* Payments Chart */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-primary">
                Pagos por Día (Soles)
              </h2>
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary"
              >
                <option value="week">Esta Semana</option>
                <option value="month">Este Mes</option>
                <option value="year">Este Año</option>
              </select>
            </div>

            <SimpleLineChart data={chartDataPayments} />

            <div className="mt-4 pt-4 border-t text-sm text-gray-600">
              <p>
                <strong>Total:</strong> S/.23,850 esta semana
              </p>
            </div>
          </Card>
        </div>

        {/* Admin Modules */}
        <Card>
          <h2 className="text-2xl font-bold text-primary mb-6">
            Módulos Administrativos
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminModules.map((module) => (
              <Link key={module.id} href={module.href}>
                <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all cursor-pointer">
                  <div className={`text-4xl mb-3 inline-block p-3 rounded-lg ${module.color}`}>
                    {module.icon}
                  </div>

                  <h3 className="font-bold text-lg text-gray-800 mb-1">
                    {module.name}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4">
                    {module.description}
                  </p>

                  <Button variant="secondary" size="sm" className="w-full">
                    Acceder
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        {/* Notifications */}
        <Card>
          <h2 className="text-2xl font-bold text-primary mb-6">
            Notificaciones Recientes
          </h2>

          <div className="space-y-4">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`border-l-4 p-4 rounded-lg ${
                  notif.type === "success"
                    ? "border-green-500 bg-green-50"
                    : notif.type === "warning"
                    ? "border-yellow-500 bg-yellow-50"
                    : "border-blue-500 bg-blue-50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4
                      className={`font-bold ${
                        notif.type === "success"
                          ? "text-green-800"
                          : notif.type === "warning"
                          ? "text-yellow-800"
                          : "text-blue-800"
                      }`}
                    >
                      {notif.title}
                    </h4>
                    <p
                      className={`text-sm mt-1 ${
                        notif.type === "success"
                          ? "text-green-700"
                          : notif.type === "warning"
                          ? "text-yellow-700"
                          : "text-blue-700"
                      }`}
                    >
                      {notif.description}
                    </p>
                  </div>

                  <p className="text-xs text-gray-500 ml-4 whitespace-nowrap">
                    {notif.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Footer />
    </main>
  );
}

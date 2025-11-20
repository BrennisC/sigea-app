"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Badge from "../../components/Badge";
import Link from "next/link";

interface NotificationTemplate {
  id: number;
  name: string;
  type: "email" | "whatsapp" | "sms";
  subject: string;
  recipients: number;
  createdDate: string;
  status: "activa" | "inactiva";
}

interface NotificationHistory {
  id: number;
  template: string;
  type: string;
  sentDate: string;
  recipients: number;
  status: "enviado" | "pendiente" | "error";
}

export default function AdminNotificationsPage() {
  const [templates, setTemplates] = useState<NotificationTemplate[]>([
    {
      id: 1,
      name: "Confirmación de Inscripción",
      type: "email",
      subject: "Tu inscripción ha sido confirmada",
      recipients: 156,
      createdDate: "10 de Marzo, 2024",
      status: "activa",
    },
    {
      id: 2,
      name: "Recordatorio de Evento",
      type: "whatsapp",
      subject: "Recordatorio: Tu evento es mañana",
      recipients: 243,
      createdDate: "8 de Marzo, 2024",
      status: "activa",
    },
    {
      id: 3,
      name: "Certificado Disponible",
      type: "email",
      subject: "Tu certificado está listo",
      recipients: 89,
      createdDate: "5 de Marzo, 2024",
      status: "activa",
    },
  ]);

  const [history, setHistory] = useState<NotificationHistory[]>([
    {
      id: 1,
      template: "Confirmación de Inscripción",
      type: "Email",
      sentDate: "15 de Marzo, 2024",
      recipients: 156,
      status: "enviado",
    },
    {
      id: 2,
      template: "Recordatorio de Evento",
      type: "WhatsApp",
      sentDate: "14 de Marzo, 2024",
      recipients: 243,
      status: "enviado",
    },
    {
      id: 3,
      template: "Certificado Disponible",
      type: "Email",
      sentDate: "13 de Marzo, 2024",
      recipients: 89,
      status: "enviado",
    },
  ]);

  const [showNewTemplateForm, setShowNewTemplateForm] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    type: "email" as const,
    subject: "",
    content: "",
  });

  const handleCreateTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTemplate.name && newTemplate.subject) {
      setTemplates([
        ...templates,
        {
          id: Math.max(...templates.map((t) => t.id)) + 1,
          name: newTemplate.name,
          type: newTemplate.type,
          subject: newTemplate.subject,
          recipients: 0,
          createdDate: new Date().toLocaleDateString("es-PE"),
          status: "activa",
        },
      ]);
      setNewTemplate({
        name: "",
        type: "email",
        subject: "",
        content: "",
      });
      setShowNewTemplateForm(false);
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
                Módulo de Notificaciones
              </h1>
            </div>

            <Button
              size="lg"
              onClick={() =>
                setShowNewTemplateForm(!showNewTemplateForm)
              }
            >
              {showNewTemplateForm
                ? "Cancelar"
                : "+ Nueva Plantilla"}
            </Button>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* New Template Form */}
        {showNewTemplateForm && (
          <Card className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-6">
              Crear Plantilla de Notificación
            </h2>

            <form onSubmit={handleCreateTemplate} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Nombre de Plantilla"
                  value={newTemplate.name}
                  onChange={(e) =>
                    setNewTemplate({
                      ...newTemplate,
                      name: e.target.value,
                    })
                  }
                  required
                />

                <div>
                  <label className="block text-sm font-bold text-primary mb-2">
                    Tipo de Notificación
                  </label>
                  <select
                    value={newTemplate.type}
                    onChange={(e) =>
                      setNewTemplate({
                        ...newTemplate,
                        type: e.target.value as any,
                      })
                    }
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                  >
                    <option value="email">Email</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="sms">SMS</option>
                  </select>
                </div>
              </div>

              <Input
                label="Asunto/Título"
                value={newTemplate.subject}
                onChange={(e) =>
                  setNewTemplate({
                    ...newTemplate,
                    subject: e.target.value,
                  })
                }
                required
              />

              <div>
                <label className="block text-sm font-bold text-primary mb-2">
                  Contenido
                </label>
                <textarea
                  value={newTemplate.content}
                  onChange={(e) =>
                    setNewTemplate({
                      ...newTemplate,
                      content: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                  rows={5}
                  placeholder="Escribe el contenido de tu mensaje..."
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  Crear Plantilla
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowNewTemplateForm(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Templates */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Plantillas de Notificación
          </h2>

          <div className="space-y-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-gray-800">
                        {template.name}
                      </h3>
                      <Badge
                        variant={
                          template.type === "email"
                            ? "primary"
                            : template.type === "whatsapp"
                            ? "success"
                            : "warning"
                        }
                      >
                        {template.type === "email"
                          ? "Email"
                          : template.type === "whatsapp"
                          ? "WhatsApp"
                          : "SMS"}
                      </Badge>
                      <Badge variant="gray">
                        {template.status === "activa" ? "✓ Activa" : "Inactiva"}
                      </Badge>
                    </div>

                    <p className="text-gray-600 mb-2">
                      {template.subject}
                    </p>

                    <div className="text-sm text-gray-500">
                      <p>👥 {template.recipients} destinatarios</p>
                      <p>📅 Creada: {template.createdDate}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm">
                      Editar
                    </Button>
                    <Button size="sm">Enviar Ahora</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Send Notification */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Enviar Notificación
          </h2>

          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-primary mb-2">
                  Seleccionar Plantilla
                </label>
                <select className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary">
                  <option>Selecciona una plantilla</option>
                  {templates.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-primary mb-2">
                  Audiencia
                </label>
                <select className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary">
                  <option>Todos los participantes</option>
                  <option>Último evento</option>
                  <option>Por evento específico</option>
                  <option>Inscritos sin pagar</option>
                </select>
              </div>
            </div>

            <Button className="w-full">📤 Enviar Notificaciones</Button>
          </form>
        </Card>

        {/* History */}
        <Card>
          <h2 className="text-2xl font-bold text-primary mb-6">
            Histórico de Envíos
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-bold text-gray-800">
                    Plantilla
                  </th>
                  <th className="text-center py-3 px-4 font-bold text-gray-800">
                    Tipo
                  </th>
                  <th className="text-center py-3 px-4 font-bold text-gray-800">
                    Destinatarios
                  </th>
                  <th className="text-left py-3 px-4 font-bold text-gray-800">
                    Fecha
                  </th>
                  <th className="text-center py-3 px-4 font-bold text-gray-800">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {item.template}
                    </td>
                    <td className="py-3 px-4 text-center text-sm text-gray-600">
                      {item.type}
                    </td>
                    <td className="py-3 px-4 text-center font-medium text-primary">
                      {item.recipients}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {item.sentDate}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant="success">
                        {item.status === "enviado"
                          ? "✓ Enviado"
                          : item.status === "pendiente"
                          ? "⏳ Pendiente"
                          : "⚠ Error"}
                      </Badge>
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

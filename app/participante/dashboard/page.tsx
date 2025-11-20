"use client";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ProtectedRoute from "../../components/ProtectedRoute";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Badge from "../../components/Badge";
import Link from "next/link";

interface Inscription {
  id: number;
  eventTitle: string;
  eventType: string;
  date: string;
  status: "confirmada" | "pendiente" | "completada";
  inscriptionDate: string;
}

interface Payment {
  id: number;
  eventTitle: string;
  amount: number;
  date: string;
  status: "pagado" | "pendiente" | "rechazado";
  method: string;
}

interface Certificate {
  id: number;
  eventTitle: string;
  issueDate: string;
  status: "emitido" | "pendiente" | "rechazado";
  code: string;
}

interface UserProfile {
  name: string;
  surname: string;
  email: string;
  phone: string;
  dni: string;
  profilePhoto: string;
}

type TabType = "inscriptions" | "payments" | "certificates" | "profile";

export default function ParticipantDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("inscriptions");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: "Juan",
    surname: "García López",
    email: "juan.garcia@example.com",
    phone: "987654321",
    dni: "12345678",
    profilePhoto: "👤",
  });

  const [profileForm, setProfileForm] = useState(profile);

  const inscriptions: Inscription[] = [
    {
      id: 1,
      eventTitle: "Conferencia: IA en la Educación",
      eventType: "Conferencia",
      date: "15 de Marzo, 2024",
      status: "confirmada",
      inscriptionDate: "10 de Marzo, 2024",
    },
    {
      id: 2,
      eventTitle: "Taller de Desarrollo Web",
      eventType: "Taller",
      date: "22-24 de Marzo, 2024",
      status: "confirmada",
      inscriptionDate: "15 de Marzo, 2024",
    },
    {
      id: 3,
      eventTitle: "Diplomado en Agricultura Sostenible",
      eventType: "Diplomado",
      date: "30 de Marzo - 15 de Abril, 2024",
      status: "completada",
      inscriptionDate: "25 de Marzo, 2024",
    },
  ];

  const payments: Payment[] = [
    {
      id: 1,
      eventTitle: "Conferencia: IA en la Educación",
      amount: 50,
      date: "11 de Marzo, 2024",
      status: "pagado",
      method: "Tarjeta de Crédito",
    },
    {
      id: 2,
      eventTitle: "Taller de Desarrollo Web",
      amount: 100,
      date: "16 de Marzo, 2024",
      status: "pagado",
      method: "Transferencia Bancaria",
    },
    {
      id: 3,
      eventTitle: "Diplomado en Agricultura Sostenible",
      amount: 200,
      date: "Pendiente",
      status: "pendiente",
      method: "-",
    },
  ];

  const certificates: Certificate[] = [
    {
      id: 1,
      eventTitle: "Conferencia: IA en la Educación",
      issueDate: "16 de Marzo, 2024",
      status: "emitido",
      code: "CERT-2024-001",
    },
    {
      id: 2,
      eventTitle: "Taller de Desarrollo Web",
      issueDate: "Pendiente",
      status: "pendiente",
      code: "-",
    },
    {
      id: 3,
      eventTitle: "Diplomado en Agricultura Sostenible",
      issueDate: "20 de Abril, 2024",
      status: "emitido",
      code: "CERT-2024-003",
    },
  ];

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "pagado":
      case "confirmada":
      case "emitido":
        return "success";
      case "pendiente":
        return "warning";
      case "rechazado":
        return "error";
      case "completada":
        return "primary";
      default:
        return "gray" as const;
    }
  };

  const handleProfileChange = (field: string, value: string) => {
    setProfileForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveProfile = () => {
    setProfile(profileForm);
    setIsEditingProfile(false);
  };

  return (
    <main className="w-full min-h-screen bg-background-light">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary-light py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-6xl">{profile.profilePhoto}</div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Bienvenido, {profile.name}
              </h1>
              <p className="text-blue-100">Panel de Participante</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-lg shadow-md">
          {[
            { id: "inscriptions", label: "Mis Inscripciones" },
            { id: "payments", label: "Mis Pagos" },
            { id: "certificates", label: "Mis Certificados" },
            { id: "profile", label: "Mi Perfil" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-6 py-2 font-medium rounded-lg transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Inscriptions Tab */}
        {activeTab === "inscriptions" && (
          <Card>
            <h2 className="text-2xl font-bold text-primary mb-6">
              Mis Inscripciones
            </h2>

            {inscriptions.length > 0 ? (
              <div className="space-y-4">
                {inscriptions.map((inscription) => (
                  <div
                    key={inscription.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-800 mb-1">
                          {inscription.eventTitle}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="primary">
                            {inscription.eventType}
                          </Badge>
                          <Badge
                            variant={getStatusBadgeVariant(
                              inscription.status
                            )}
                          >
                            {inscription.status === "confirmada"
                              ? "Confirmada"
                              : inscription.status === "pendiente"
                              ? "Pendiente"
                              : "Completada"}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>📅 {inscription.date}</p>
                          <p>
                            📝 Inscrito: {inscription.inscriptionDate}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="secondary" size="sm">
                          Ver Detalles
                        </Button>

                        {inscription.status === "confirmada" && (
                          <Button size="sm">Descargar QR</Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">
                  No tienes inscripciones registradas
                </p>
                <Link href="/eventos">
                  <Button>Ver Eventos</Button>
                </Link>
              </div>
            )}
          </Card>
        )}

        {/* Payments Tab */}
        {activeTab === "payments" && (
          <Card>
            <h2 className="text-2xl font-bold text-primary mb-6">Mis Pagos</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-bold text-gray-800">
                      Evento
                    </th>
                    <th className="text-right py-3 px-4 font-bold text-gray-800">
                      Monto
                    </th>
                    <th className="text-center py-3 px-4 font-bold text-gray-800">
                      Fecha
                    </th>
                    <th className="text-center py-3 px-4 font-bold text-gray-800">
                      Método
                    </th>
                    <th className="text-center py-3 px-4 font-bold text-gray-800">
                      Estado
                    </th>
                    <th className="text-center py-3 px-4 font-bold text-gray-800">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">
                        <p className="font-medium text-gray-800">
                          {payment.eventTitle}
                        </p>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <p className="font-bold text-primary">
                          S/.{payment.amount}
                        </p>
                      </td>
                      <td className="py-3 px-4 text-center text-sm text-gray-600">
                        {payment.date}
                      </td>
                      <td className="py-3 px-4 text-center text-sm text-gray-600">
                        {payment.method}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Badge
                          variant={getStatusBadgeVariant(payment.status)}
                        >
                          {payment.status === "pagado"
                            ? "Pagado"
                            : payment.status === "pendiente"
                            ? "Pendiente"
                            : "Rechazado"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {payment.status === "pagado" ? (
                          <Button variant="secondary" size="sm">
                            Ver Comprobante
                          </Button>
                        ) : (
                          <Button size="sm">Pagar Ahora</Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Certificates Tab */}
        {activeTab === "certificates" && (
          <Card>
            <h2 className="text-2xl font-bold text-primary mb-6">
              Mis Certificados
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-bold text-gray-800 flex-1">
                      {cert.eventTitle}
                    </h3>
                    <Badge variant={getStatusBadgeVariant(cert.status)}>
                      {cert.status === "emitido"
                        ? "Emitido"
                        : cert.status === "pendiente"
                        ? "Pendiente"
                        : "Rechazado"}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p>📅 {cert.issueDate}</p>
                    <p>🔐 Código: {cert.code}</p>
                  </div>

                  {cert.status === "emitido" && (
                    <div className="flex gap-2">
                      <Button className="flex-1" size="sm">
                        Descargar PDF
                      </Button>

                      <Button variant="secondary" size="sm">
                        Compartir
                      </Button>
                    </div>
                  )}

                  {cert.status === "pendiente" && (
                    <Button variant="secondary" size="sm" className="w-full">
                      Verificar Estado
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-primary">Mi Perfil</h2>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    if (isEditingProfile) {
                      handleSaveProfile();
                    } else {
                      setIsEditingProfile(true);
                      setProfileForm(profile);
                    }
                  }}
                >
                  {isEditingProfile ? "Guardar Cambios" : "Editar Perfil"}
                </Button>
              </div>

              <div className="space-y-4">
                {isEditingProfile ? (
                  <>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        label="Nombres"
                        value={profileForm.name}
                        onChange={(e) =>
                          handleProfileChange("name", e.target.value)
                        }
                      />
                      <Input
                        label="Apellidos"
                        value={profileForm.surname}
                        onChange={(e) =>
                          handleProfileChange("surname", e.target.value)
                        }
                      />
                    </div>

                    <Input
                      label="Correo Electrónico"
                      type="email"
                      value={profileForm.email}
                      onChange={(e) =>
                        handleProfileChange("email", e.target.value)
                      }
                    />

                    <Input
                      label="Teléfono / WhatsApp"
                      value={profileForm.phone}
                      onChange={(e) =>
                        handleProfileChange("phone", e.target.value)
                      }
                    />

                    <Input
                      label="DNI"
                      value={profileForm.dni}
                      disabled
                      className="bg-gray-100"
                    />

                    <div className="flex gap-2 pt-4">
                      <Button
                        onClick={handleSaveProfile}
                        className="flex-1"
                      >
                        Guardar
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => setIsEditingProfile(false)}
                        className="flex-1"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Nombres</p>
                        <p className="font-semibold text-gray-800">
                          {profile.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Apellidos</p>
                        <p className="font-semibold text-gray-800">
                          {profile.surname}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Correo Electrónico
                      </p>
                      <p className="font-semibold text-gray-800">
                        {profile.email}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-1">
                        Teléfono / WhatsApp
                      </p>
                      <p className="font-semibold text-gray-800">
                        +51 {profile.phone}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-1">DNI</p>
                      <p className="font-semibold text-gray-800">{profile.dni}</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Profile Actions */}
            <Card className="h-fit">
              <h3 className="font-bold text-primary mb-4">
                Más Opciones
              </h3>

              <div className="space-y-3">
                <Button variant="secondary" className="w-full" size="sm">
                  Cambiar Contraseña
                </Button>

                <Button variant="secondary" className="w-full" size="sm">
                  Descargar Datos
                </Button>

                <Button variant="secondary" className="w-full" size="sm">
                  Notificaciones
                </Button>

                <Button
                  variant="danger"
                  className="w-full"
                  size="sm"
                >
                  Cerrar Sesión
                </Button>
              </div>

              <div className="bg-gray-100 rounded p-3 mt-4 text-xs text-gray-600">
                <p>
                  <strong>Última conexión:</strong> Hoy a las 10:30 AM
                </p>
              </div>
            </Card>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}

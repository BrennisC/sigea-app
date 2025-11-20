"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Badge from "../../components/Badge";
import Link from "next/link";

interface Payment {
  id: number;
  participantName: string;
  eventTitle: string;
  amount: number;
  date: string;
  status: "pagado" | "pendiente" | "rechazado";
  method: string;
  reference: string;
}

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: 1,
      participantName: "Juan García López",
      eventTitle: "Conferencia: IA en la Educación",
      amount: 50,
      date: "11 de Marzo, 2024",
      status: "pagado",
      method: "Tarjeta de Crédito",
      reference: "TRX-2024-001",
    },
    {
      id: 2,
      participantName: "María Rodriguez",
      eventTitle: "Taller de Desarrollo Web",
      amount: 100,
      date: "16 de Marzo, 2024",
      status: "pagado",
      method: "Transferencia Bancaria",
      reference: "TRX-2024-002",
    },
    {
      id: 3,
      participantName: "Carlos López",
      eventTitle: "Diplomado en Agricultura Sostenible",
      amount: 200,
      date: "Pendiente",
      status: "pendiente",
      method: "-",
      reference: "TRX-2024-003",
    },
    {
      id: 4,
      participantName: "Ana Fernández",
      eventTitle: "Workshop: Transformación Digital",
      amount: 75,
      date: "20 de Marzo, 2024",
      status: "rechazado",
      method: "Stripe",
      reference: "TRX-2024-004",
    },
  ]);

  const [selectedStatus, setSelectedStatus] = useState("todos");
  const [showManualPaymentForm, setShowManualPaymentForm] = useState(false);
  const [newPayment, setNewPayment] = useState({
    participantName: "",
    eventTitle: "",
    amount: 0,
    method: "Transferencia Bancaria",
    reference: "",
  });

  const filteredPayments =
    selectedStatus === "todos"
      ? payments
      : payments.filter((p) => p.status === selectedStatus);

  const handleAddManualPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPayment.participantName && newPayment.eventTitle) {
      setPayments([
        ...payments,
        {
          id: Math.max(...payments.map((p) => p.id)) + 1,
          ...newPayment,
          date: new Date().toLocaleDateString("es-PE"),
          status: "pagado" as const,
        },
      ]);
      setNewPayment({
        participantName: "",
        eventTitle: "",
        amount: 0,
        method: "Transferencia Bancaria",
        reference: "",
      });
      setShowManualPaymentForm(false);
    }
  };

  const totalRecaudado = payments
    .filter((p) => p.status === "pagado")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPendiente = payments
    .filter((p) => p.status === "pendiente")
    .reduce((sum, p) => sum + p.amount, 0);

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
                Módulo de Pagos
              </h1>
            </div>

            <Button
              size="lg"
              onClick={() =>
                setShowManualPaymentForm(!showManualPaymentForm)
              }
            >
              {showManualPaymentForm
                ? "Cancelar"
                : "+ Registrar Pago Manual"}
            </Button>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <p className="text-green-100 text-sm">Total Recaudado</p>
            <p className="text-3xl font-bold">S/.{totalRecaudado}</p>
            <p className="text-green-100 text-xs mt-1">
              {payments.filter((p) => p.status === "pagado").length} pagos
              confirmados
            </p>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
            <p className="text-yellow-100 text-sm">Pagos Pendientes</p>
            <p className="text-3xl font-bold">S/.{totalPendiente}</p>
            <p className="text-yellow-100 text-xs mt-1">
              {payments.filter((p) => p.status === "pendiente").length} pagos
              por confirmar
            </p>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <p className="text-blue-100 text-sm">Tasa de Pagos</p>
            <p className="text-3xl font-bold">
              {Math.round(
                (totalRecaudado / (totalRecaudado + totalPendiente)) * 100
              )}
              %
            </p>
            <p className="text-blue-100 text-xs mt-1">Cobertura de ingresos</p>
          </Card>
        </div>

        {/* Manual Payment Form */}
        {showManualPaymentForm && (
          <Card className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-6">
              Registrar Pago Manual
            </h2>

            <form onSubmit={handleAddManualPayment} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Nombre del Participante"
                  value={newPayment.participantName}
                  onChange={(e) =>
                    setNewPayment({
                      ...newPayment,
                      participantName: e.target.value,
                    })
                  }
                  required
                />

                <Input
                  label="Título del Evento"
                  value={newPayment.eventTitle}
                  onChange={(e) =>
                    setNewPayment({
                      ...newPayment,
                      eventTitle: e.target.value,
                    })
                  }
                  required
                />

                <Input
                  label="Monto (Soles)"
                  type="number"
                  value={newPayment.amount || ""}
                  onChange={(e) =>
                    setNewPayment({
                      ...newPayment,
                      amount: parseFloat(e.target.value) || 0,
                    })
                  }
                  required
                />

                <div>
                  <label className="block text-sm font-bold text-primary mb-2">
                    Método de Pago
                  </label>
                  <select
                    value={newPayment.method}
                    onChange={(e) =>
                      setNewPayment({
                        ...newPayment,
                        method: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                  >
                    <option>Transferencia Bancaria</option>
                    <option>Tarjeta de Crédito</option>
                    <option>Yape</option>
                    <option>Plin</option>
                    <option>Efectivo</option>
                  </select>
                </div>

                <Input
                  label="Referencia de Transacción"
                  value={newPayment.reference}
                  onChange={(e) =>
                    setNewPayment({
                      ...newPayment,
                      reference: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  Registrar Pago
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setShowManualPaymentForm(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Payments List */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-primary">Registro de Pagos</h2>

            <div>
              <label className="text-sm text-gray-600 mr-3">Filtrar:</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary"
              >
                <option value="todos">Todos</option>
                <option value="pagado">Pagados</option>
                <option value="pendiente">Pendientes</option>
                <option value="rechazado">Rechazados</option>
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
                {filteredPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {payment.participantName}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {payment.eventTitle}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-primary">
                      S/.{payment.amount}
                    </td>
                    <td className="py-3 px-4 text-center text-sm text-gray-600">
                      {payment.date}
                    </td>
                    <td className="py-3 px-4 text-center text-sm text-gray-600">
                      {payment.method}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge
                        variant={
                          payment.status === "pagado"
                            ? "success"
                            : payment.status === "pendiente"
                            ? "warning"
                            : "error"
                        }
                      >
                        {payment.status === "pagado"
                          ? "Pagado"
                          : payment.status === "pendiente"
                          ? "Pendiente"
                          : "Rechazado"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Button variant="secondary" size="sm">
                        Ver
                      </Button>
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

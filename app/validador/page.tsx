"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import Badge from "../components/Badge";
import Link from "next/link";

interface CertificateData {
  code: string;
  participantName: string;
  event: string;
  issueDate: string;
  isValid: boolean;
  qrCode: string;
}

export default function ValidadorPage() {
  const [certificateCode, setCertificateCode] = useState("");
  const [result, setResult] = useState<CertificateData | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Mock certificate database
  const certificateDatabase: Record<string, CertificateData> = {
    "CERT-2024-001": {
      code: "CERT-2024-001",
      participantName: "Juan García López",
      event: "Conferencia: IA en la Educación",
      issueDate: "16 de Marzo, 2024",
      isValid: true,
      qrCode:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23fff' width='200' height='200'/%3E%3Crect fill='%23003366' x='30' y='30' width='140' height='140'/%3E%3C/svg%3E",
    },
    "CERT-2024-003": {
      code: "CERT-2024-003",
      participantName: "Carlos López Fernández",
      event: "Diplomado en Agricultura Sostenible",
      issueDate: "20 de Abril, 2024",
      isValid: true,
      qrCode:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23fff' width='200' height='200'/%3E%3Crect fill='%23003366' x='30' y='30' width='140' height='140'/%3E%3C/svg%3E",
    },
    "CERT-2024-005": {
      code: "CERT-2024-005",
      participantName: "Ana Martínez García",
      event: "Taller de Desarrollo Web",
      issueDate: "25 de Marzo, 2024",
      isValid: true,
      qrCode:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23fff' width='200' height='200'/%3E%3Crect fill='%23003366' x='30' y='30' width='140' height='140'/%3E%3C/svg%3E",
    },
  };

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    setTimeout(() => {
      const code = certificateCode.toUpperCase().trim();
      const certificate = certificateDatabase[code];

      if (certificate) {
        setResult(certificate);
      } else {
        setResult({
          code: code,
          participantName: "",
          event: "",
          issueDate: "",
          isValid: false,
          qrCode: "",
        });
      }

      setIsSearching(false);
    }, 500);
  };

  const handleReset = () => {
    setCertificateCode("");
    setResult(null);
  };

  return (
    <main className="w-full min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary-light py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Validador de Certificados
          </h1>

          <p className="text-blue-100 text-lg">
            Verifica la autenticidad de certificados de UNAS
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!result ? (
          <>
            {/* Main Form */}
            <Card className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-6">
                🔐 Validar Certificado
              </h2>

              <form onSubmit={handleValidate} className="space-y-6">
                <div>
                  <Input
                    label="Código de Certificado"
                    placeholder="Ejemplo: CERT-2024-001"
                    value={certificateCode}
                    onChange={(e) => setCertificateCode(e.target.value)}
                    helpText="El código de certificado se encuentran en tu email de confirmación"
                    required
                  />
                </div>

                <div className="bg-blue-50 border-l-4 border-primary p-4 rounded">
                  <h3 className="font-bold text-primary mb-2">
                    ¿Dónde encontrar tu código?
                  </h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>✓ En el correo de confirmación del evento</li>
                    <li>✓ En tu perfil bajo "Mis Certificados"</li>
                    <li>✓ En el documento PDF del certificado</li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  isLoading={isSearching}
                >
                  {isSearching ? "Validando..." : "Validar Certificado"}
                </Button>
              </form>
            </Card>

            {/* Examples */}
            <Card>
              <h3 className="text-xl font-bold text-primary mb-4">
                📋 Certificados de Ejemplo (para pruebas)
              </h3>

              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  Prueba con estos códigos para ver ejemplos de certificados válidos:
                </p>

                <div className="grid md:grid-cols-3 gap-3">
                  {[
                    "CERT-2024-001",
                    "CERT-2024-003",
                    "CERT-2024-005",
                  ].map((code) => (
                    <button
                      key={code}
                      onClick={() => {
                        setCertificateCode(code);
                      }}
                      className="p-3 border-2 border-primary rounded-lg hover:bg-blue-50 transition-colors text-center"
                    >
                      <p className="font-mono font-bold text-primary">
                        {code}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </>
        ) : (
          <>
            {/* Result */}
            {result.isValid ? (
              <Card className="mb-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">✅</div>
                  <h2 className="text-3xl font-bold text-green-700 mb-2">
                    Certificado Válido
                  </h2>
                  <p className="text-green-600">
                    Este certificado ha sido verificado y es auténtico
                  </p>
                </div>

                <div className="bg-white rounded-lg p-8 mb-8 space-y-6">
                  {/* Certificate Info */}
                  <div className="border-b pb-6">
                    <p className="text-sm text-gray-600 mb-1">
                      Código de Certificado
                    </p>
                    <p className="text-2xl font-bold text-primary font-mono">
                      {result.code}
                    </p>
                  </div>

                  {/* Participant Info */}
                  <div className="border-b pb-6">
                    <p className="text-sm text-gray-600 mb-1">
                      Nombre del Participante
                    </p>
                    <p className="text-xl font-bold text-gray-800">
                      {result.participantName}
                    </p>
                  </div>

                  {/* Event Info */}
                  <div className="border-b pb-6">
                    <p className="text-sm text-gray-600 mb-1">Evento</p>
                    <p className="text-xl font-bold text-gray-800">
                      {result.event}
                    </p>
                  </div>

                  {/* Issue Date */}
                  <div className="border-b pb-6">
                    <p className="text-sm text-gray-600 mb-1">
                      Fecha de Emisión
                    </p>
                    <p className="text-xl font-bold text-gray-800">
                      {result.issueDate}
                    </p>
                  </div>

                  {/* QR Code */}
                  <div>
                    <p className="text-sm text-gray-600 mb-3">Código QR</p>
                    <div className="bg-gray-100 p-4 rounded-lg flex justify-center">
                      <img
                        src={result.qrCode}
                        alt="QR Code"
                        className="w-40 h-40"
                      />
                    </div>
                    <p className="text-xs text-gray-500 text-center mt-2">
                      Escanea para validar
                    </p>
                  </div>
                </div>

                {/* Verification Details */}
                <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded mb-8">
                  <h3 className="font-bold text-green-800 mb-2">
                    ✓ Verificado
                  </h3>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>✓ Certificado auténtico</li>
                    <li>✓ Registrado en base de datos</li>
                    <li>✓ Vigente y válido</li>
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="flex-1"
                    onClick={handleReset}
                  >
                    Validar Otro
                  </Button>

                  <Button size="lg" className="flex-1">
                    📥 Descargar Certificado
                  </Button>

                  <Button variant="outline" size="lg" className="flex-1">
                    📤 Compartir
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="mb-8 bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">❌</div>
                  <h2 className="text-3xl font-bold text-red-700 mb-2">
                    Certificado No Válido
                  </h2>
                  <p className="text-red-600">
                    El código ingresado no fue encontrado en nuestra base de
                    datos
                  </p>
                </div>

                <div className="bg-white rounded-lg p-8 mb-8">
                  <p className="text-sm text-gray-600 mb-1">
                    Código buscado
                  </p>
                  <p className="text-2xl font-bold text-gray-800 font-mono mb-6">
                    {result.code}
                  </p>

                  <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded">
                    <h3 className="font-bold text-red-800 mb-2">
                      Posibles causas:
                    </h3>
                    <ul className="text-sm text-red-800 space-y-1">
                      <li>• El código fue ingresado incorrectamente</li>
                      <li>• El certificado aún no ha sido generado</li>
                      <li>• El certificado ha sido anulado</li>
                      <li>• El participante no asistió al evento</li>
                    </ul>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    className="flex-1"
                    onClick={handleReset}
                  >
                    Validar Otro Código
                  </Button>

                  <Link href="/contacto" className="flex-1">
                    <Button variant="secondary" className="w-full">
                      Contactar Soporte
                    </Button>
                  </Link>
                </div>
              </Card>
            )}

            {/* FAQs */}
            <Card>
              <h3 className="text-xl font-bold text-primary mb-6">
                ❓ Preguntas Frecuentes
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">
                    ¿Cuál es el formato del código de certificado?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    El código tiene el formato CERT-YYYY-XXX donde YYYY es el
                    año y XXX es el número secuencial.
                  </p>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-bold text-gray-800 mb-1">
                    ¿Dónde puedo encontrar mi código?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Se envía por email después de que se genera tu certificado,
                    también está disponible en tu panel de participante.
                  </p>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-bold text-gray-800 mb-1">
                    ¿Puedo compartir mi certificado?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Sí, puedes descargar el PDF o compartir el código QR. Es
                    seguro porque cada certificado es único.
                  </p>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-bold text-gray-800 mb-1">
                    ¿Qué pasa si mi certificado es rechazado?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Contacta con nuestro equipo de soporte. Puede ser que no
                    hayas completado los requisitos del evento.
                  </p>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>

      <Footer />
    </main>
  );
}

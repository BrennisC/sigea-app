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

      {/* Header Banner */}
      <section className="bg-gradient-to-br from-primary via-primary to-primary-light py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-60 h-60 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              🔐 Validador de Certificados
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Verifica la autenticidad de certificados emitidos por UNAS
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {!result ? (
          <>
            {/* Main Form Card */}
            <Card className="mb-12 hover-lift">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <div className="inline-block p-4 bg-gradient-to-br from-primary-light to-primary rounded-2xl mb-4">
                    <span className="text-4xl">📄</span>
                  </div>
                  <h2 className="text-3xl font-bold text-primary mb-2">
                    Valida tu Certificado
                  </h2>
                  <p className="text-gray-600">
                    Ingresa el código único de tu certificado para verificar su
                    autenticidad
                  </p>
                </div>

                <form onSubmit={handleValidate} className="space-y-6">
                  <div>
                    <Input
                      label="Código de Certificado"
                      placeholder="Ejemplo: CERT-2024-001"
                      value={certificateCode}
                      onChange={(e) => setCertificateCode(e.target.value)}
                      helpText="🔍 Se encuentra en tu correo de confirmación y en tu perfil"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    isLoading={isSearching}
                  >
                    {isSearching ? "Validando..." : "✓ Validar Certificado"}
                  </Button>
                </form>
              </div>
            </Card>

            {/* Info Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="text-center hover-lift">
                <div className="text-4xl mb-3">📧</div>
                <h3 className="font-bold text-primary mb-2">En tu Email</h3>
                <p className="text-sm text-gray-600">
                  Revisa el correo de confirmación del evento
                </p>
              </Card>

              <Card className="text-center hover-lift">
                <div className="text-4xl mb-3">👤</div>
                <h3 className="font-bold text-primary mb-2">En tu Perfil</h3>
                <p className="text-sm text-gray-600">
                  Sección "Mis Certificados" en el panel
                </p>
              </Card>

              <Card className="text-center hover-lift">
                <div className="text-4xl mb-3">📄</div>
                <h3 className="font-bold text-primary mb-2">En el PDF</h3>
                <p className="text-sm text-gray-600">
                  Consulta el documento descargado
                </p>
              </Card>
            </div>

            {/* Examples Section */}
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50">
              <h3 className="text-2xl font-bold text-primary mb-4">
                ��� Prueba con Ejemplos
              </h3>

              <p className="text-gray-600 mb-6">
                Usa estos códigos para ver cómo funciona la validación:
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                {["CERT-2024-001", "CERT-2024-003", "CERT-2024-005"].map(
                  (code) => (
                    <button
                      key={code}
                      onClick={() => {
                        setCertificateCode(code);
                      }}
                      className="p-4 bg-white border-2 border-primary-light rounded-lg hover:bg-blue-100 hover:border-primary transition-all font-mono font-bold text-primary hover:shadow-lg"
                    >
                      {code}
                    </button>
                  )
                )}
              </div>
            </Card>
          </>
        ) : (
          <>
            {/* Result - Valid Certificate */}
            {result.isValid ? (
              <>
                <div className="text-center mb-8 animate-slide-up">
                  <div className="inline-block p-6 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full mb-6">
                    <span className="text-6xl">✅</span>
                  </div>
                  <h2 className="text-4xl font-bold text-green-700 mb-2">
                    Certificado Válido
                  </h2>
                  <p className="text-xl text-green-600">
                    Este certificado ha sido verificado y es auténtico
                  </p>
                </div>

                {/* Certificate Details Card */}
                <Card className="mb-8 border-2 border-green-200">
                  <div className="max-w-2xl mx-auto">
                    <div className="space-y-6">
                      {/* Code */}
                      <div className="text-center pb-6 border-b border-gray-200">
                        <p className="text-sm text-gray-600 mb-2">
                          Código de Certificado
                        </p>
                        <p className="text-3xl font-bold text-primary font-mono">
                          {result.code}
                        </p>
                      </div>

                      {/* Participant */}
                      <div className="text-center pb-6 border-b border-gray-200">
                        <p className="text-sm text-gray-600 mb-2">
                          Nombre del Participante
                        </p>
                        <p className="text-2xl font-bold text-gray-800">
                          {result.participantName}
                        </p>
                      </div>

                      {/* Event */}
                      <div className="text-center pb-6 border-b border-gray-200">
                        <p className="text-sm text-gray-600 mb-2">Evento</p>
                        <p className="text-xl font-bold text-gray-800">
                          {result.event}
                        </p>
                      </div>

                      {/* Date */}
                      <div className="text-center pb-6 border-b border-gray-200">
                        <p className="text-sm text-gray-600 mb-2">
                          Fecha de Emisión
                        </p>
                        <p className="text-lg font-medium text-gray-800">
                          {result.issueDate}
                        </p>
                      </div>

                      {/* QR Code */}
                      <div className="text-center">
                        <p className="text-sm text-gray-600 mb-4">Código QR</p>
                        <div className="bg-gray-100 p-6 rounded-lg inline-block">
                          <img
                            src={result.qrCode}
                            alt="QR Code"
                            className="w-48 h-48"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-3">
                          Escanea con tu teléfono para validar
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Success Info */}
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">🎓</div>
                    <div>
                      <h3 className="font-bold text-green-800 mb-2">
                        Certificado Verificado
                      </h3>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>✓ Certificado auténtico y registrado</li>
                        <li>✓ Emitido por UNAS</li>
                        <li>✓ Vigente y válido</li>
                      </ul>
                    </div>
                  </div>
                </Card>

                {/* Actions */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={handleReset}
                  >
                    📥 Descargar Certificado
                  </Button>

                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full"
                  >
                    📤 Compartir
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={handleReset}
                  >
                    🔍 Validar Otro
                  </Button>
                </div>
              </>
            ) : (
              <>
                {/* Result - Invalid Certificate */}
                <div className="text-center mb-8 animate-slide-up">
                  <div className="inline-block p-6 bg-gradient-to-br from-red-100 to-pink-100 rounded-full mb-6">
                    <span className="text-6xl">❌</span>
                  </div>
                  <h2 className="text-4xl font-bold text-red-700 mb-2">
                    Certificado No Válido
                  </h2>
                  <p className="text-xl text-red-600">
                    No se encontró el código en nuestra base de datos
                  </p>
                </div>

                <Card className="mb-8 border-2 border-red-200">
                  <div className="max-w-2xl mx-auto">
                    <p className="text-sm text-gray-600 mb-2 text-center">
                      Código buscado
                    </p>
                    <p className="text-3xl font-bold text-gray-800 font-mono text-center mb-8">
                      {result.code}
                    </p>

                    <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                      <h3 className="font-bold text-red-800 mb-3">
                        Posibles causas:
                      </h3>
                      <ul className="text-sm text-red-800 space-y-2">
                        <li>• El código fue ingresado incorrectamente</li>
                        <li>• El certificado aún no ha sido generado</li>
                        <li>• El certificado ha sido anulado</li>
                        <li>• No completaste los requisitos del evento</li>
                      </ul>
                    </div>
                  </div>
                </Card>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button
                    className="flex-1"
                    size="lg"
                    onClick={handleReset}
                  >
                    🔍 Intentar Nuevamente
                  </Button>

                  <Link href="/contacto" className="flex-1">
                    <Button
                      variant="secondary"
                      className="w-full"
                      size="lg"
                    >
                      📞 Contactar Soporte
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </>
        )}
      </div>

      <Footer />
    </main>
  );
}

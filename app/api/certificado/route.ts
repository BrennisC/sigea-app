import { supabase } from "@/supabase/supabase";
import { NextResponse } from "next/server";

export async function GET() {
    const { data, error } = await supabase
        .from("certificado")
        .select(`
      id_certificado,
      codigo_validacion,
      fecha_emision,
      estado_certificado:estado_id (codigo, etiqueta),
      url_pdf,
      asistencia:asistencia_id (
        presente,
        inscripcion:inscripcion_id (
          usuario:usuario_id (nombres, apellidos),
          actividad:actividad_id (titulo)
        )
      )
    `);

    if (error) return NextResponse.json({ error }, { status: 500 });

    return NextResponse.json(data);
}

import { supabase } from "@/supabase/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabase
    .from("pago")
    .select(`
      id_pago,
      monto,
      moneda,
      fecha_pago,
      comprobante,
      metodo:metodo_id (nombre_metodo),
      estado_pago:estado_id (codigo),
      inscripcion:inscripcion_id (
        id_inscripcion,
        usuario:usuario_id (nombres, correo),
        actividad:actividad_id (titulo)
      )
    `);

  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json(data);
}
